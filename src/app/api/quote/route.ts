import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import { checkRateLimit, getClientIp } from "@/lib/server/rate-limit";
import { verifyTurnstile } from "@/lib/server/turnstile";
import { sendEmail } from "@/lib/server/email";
import { saveLead } from "@/lib/server/leads";
import { siteConfig } from "@/content/site";

const quoteSchema = z.object({
  services: z.array(z.string()).min(1, "Please select at least one service category"),
  projectName: z.string().optional(),
  projectDescription: z
    .string()
    .min(50, "Project description must be at least 50 characters")
    .max(3000, "Project description cannot exceed 3000 characters"),
  mainGoal: z.string().min(1, "Main goal is required"),
  existingUrl: z.string().optional(),
  timeline: z.string().min(1, "Timeline is required"),
  budgetRange: z.string().min(1, "Budget range is required"),
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name cannot exceed 80 characters")
    .transform((v) => v.trim()),
  email: z
    .string()
    .email("Please provide a valid work email address")
    .max(120, "Email cannot exceed 120 characters"),
  phone: z
    .string()
    .refine((val) => {
      const digitsOnly = val.replace(/[^0-9]/g, "");
      return digitsOnly.length >= 7 && digitsOnly.length <= 15;
    }, "Please provide a valid phone number (7 to 15 digits)"),
  company: z.string().optional(),
  country: z.string().min(2, "Country is required"),
  contactMethod: z.enum(["Email", "WhatsApp", "Video Call"]),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must accept the privacy policy" }),
  }),
  honeypot: z.string().max(0, "Bot submission rejected"),
  turnstileToken: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    // 1. Rate Limit Check (5 submissions per IP per hour)
    const rateLimit = await checkRateLimit(ip, 5, 60);
    if (!rateLimit.success) {
      const isConfigError = Boolean(rateLimit.error);
      return NextResponse.json(
        {
          error:
            rateLimit.error ||
            "Rate limit exceeded. Please wait a while or contact us directly on WhatsApp.",
        },
        { status: isConfigError ? 500 : 429 }
      );
    }

    const body = await req.json();

    // 2. Honeypot Check
    if (body.honeypot && body.honeypot.length > 0) {
      return NextResponse.json({ success: true, message: "Quote request received" });
    }

    // 3. Zod Schema Validation
    const parsed = quoteSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Validation failed";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const data = parsed.data;

    // 4. Cloudflare Turnstile
    const turnstileResult = await verifyTurnstile(data.turnstileToken, ip);
    if (!turnstileResult.success) {
      const isConfigError = turnstileResult.error?.includes("TURNSTILE_SECRET_KEY");
      return NextResponse.json(
        {
          error: isConfigError
            ? "Bot verification service (TURNSTILE_SECRET_KEY) is not configured in production."
            : "Bot verification failed. Please try again.",
        },
        { status: isConfigError ? 500 : 403 }
      );
    }

    // 5. Sanitize HTML strings
    const sanitize = (str: string) =>
      str.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&#39;", '"': "&quot;" }[c] || c));

    const safeName = sanitize(data.fullName);
    const safeEmail = sanitize(data.email);
    const safePhone = sanitize(data.phone);
    const safeCompany = data.company ? sanitize(data.company) : "Not specified";
    const safeCountry = sanitize(data.country);
    const safeProjectName = data.projectName ? sanitize(data.projectName) : "Untitled Project";
    const safeDescription = sanitize(data.projectDescription);
    const safeGoal = sanitize(data.mainGoal);
    const safeTimeline = sanitize(data.timeline);
    const safeBudget = sanitize(data.budgetRange);
    const safeExistingUrl = data.existingUrl ? sanitize(data.existingUrl) : "None";
    const safeServices = data.services.map(sanitize).join(", ");

    const recipientEmail = process.env.CONTACT_RECEIVER_EMAIL || siteConfig.contact.displayEmail;

    if (!recipientEmail && process.env.NODE_ENV === "production") {
      console.error("[Email Error] No recipient email configured in production (CONTACT_RECEIVER_EMAIL).");
      return NextResponse.json(
        { error: "Server notification destination (CONTACT_RECEIVER_EMAIL) is not configured." },
        { status: 500 }
      );
    }

    // 6. Persist Quote Request to Storage
    await saveLead({
      type: "quote_request",
      fullName: safeName,
      email: safeEmail,
      phone: safePhone !== "Not provided" ? safePhone : undefined,
      ip,
      details: {
        company: safeCompany,
        country: safeCountry,
        contactMethod: data.contactMethod,
        services: data.services,
        projectName: safeProjectName,
        projectDescription: safeDescription,
        mainGoal: safeGoal,
        timeline: safeTimeline,
        budgetRange: safeBudget,
        existingUrl: safeExistingUrl,
        recipient: recipientEmail,
      },
    });

    // 7. Notify Founders
    const quoteNotification = await sendEmail({
      to: recipientEmail || "founders@nexvora.com",
      subject: `[NEXVORA Quote Request] ${safeProjectName} from ${safeName} (${safeCompany})`,
      replyTo: safeEmail,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 650px; margin: 0 auto; color: #071426;">
          <h2 style="color: #087BCE; border-bottom: 2px solid #DCE4EE; padding-bottom: 8px;">New 4-Step Quote Request</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr><td style="padding: 6px 0; color: #4A5B73; width: 140px;"><strong>Client Name:</strong></td><td>${safeName}</td></tr>
            <tr><td style="padding: 6px 0; color: #4A5B73;"><strong>Work Email:</strong></td><td>${safeEmail}</td></tr>
            <tr><td style="padding: 6px 0; color: #4A5B73;"><strong>Phone / WhatsApp:</strong></td><td>${safePhone}</td></tr>
            <tr><td style="padding: 6px 0; color: #4A5B73;"><strong>Company:</strong></td><td>${safeCompany}</td></tr>
            <tr><td style="padding: 6px 0; color: #4A5B73;"><strong>Country / Region:</strong></td><td>${safeCountry}</td></tr>
            <tr><td style="padding: 6px 0; color: #4A5B73;"><strong>Contact Preference:</strong></td><td>${data.contactMethod}</td></tr>
            <tr><td style="padding: 6px 0; color: #4A5B73;"><strong>Services Needed:</strong></td><td>${safeServices}</td></tr>
            <tr><td style="padding: 6px 0; color: #4A5B73;"><strong>Primary Objective:</strong></td><td>${safeGoal}</td></tr>
            <tr><td style="padding: 6px 0; color: #4A5B73;"><strong>Timeline:</strong></td><td>${safeTimeline}</td></tr>
            <tr><td style="padding: 6px 0; color: #4A5B73;"><strong>Budget Range:</strong></td><td>${safeBudget}</td></tr>
            <tr><td style="padding: 6px 0; color: #4A5B73;"><strong>Existing System URL:</strong></td><td>${safeExistingUrl}</td></tr>
          </table>

          <div style="background: #F4F7FB; border: 1px solid #DCE4EE; padding: 18px; border-radius: 8px;">
            <strong style="color: #071426; display: block; margin-bottom: 8px;">Project Scope &amp; Bottlenecks:</strong>
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${safeDescription}</p>
          </div>
        </div>
      `,
    });

    if (!quoteNotification.success) {
      console.error("[Email Delivery Failure] /api/quote:", quoteNotification.error);
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
          { error: quoteNotification.error || "Email delivery failed in production." },
          { status: 500 }
        );
      }
    }

    // 8. Send Confirmation to Prospect
    await sendEmail({
      to: safeEmail,
      subject: `Project Scope Confirmation — NEXVORA Technologies`,
      isConfirmationReceipt: true,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #071426;">
          <h2 style="color: #087BCE;">We have received your project details, ${safeName}</h2>
          <p>Thank you for submitting your project specifications for <strong>${safeProjectName}</strong>.</p>
          <p>Founders Muhammad Azhar and Owais Ahmad will personally examine your scope, timeline, and architectural requirements. We respond to every qualified inquiry within <strong>${siteConfig.contact.responseTime}</strong>.</p>
          
          <div style="background: #F4F7FB; border: 1px solid #DCE4EE; border-radius: 8px; padding: 16px; margin: 20px 0; font-size: 13px;">
            <p style="margin: 0 0 6px 0;"><strong>Summary of Submitted Information:</strong></p>
            <p style="margin: 0;"><strong>Services:</strong> ${safeServices}<br><strong>Timeline:</strong> ${safeTimeline}<br><strong>Budget:</strong> ${safeBudget}</p>
          </div>

          <p style="font-size: 13px; color: #4A5B73;">If you need to provide additional architecture documents, reply directly to this email or reach us on WhatsApp.</p>
          <p style="margin-top: 24px; font-size: 13px;">Sincerely,<br><strong>NEXVORA Technologies Founding Engineers</strong><br><em>Build Beyond Limits.</em></p>
        </div>
      `,
    });

    // 7. Send Confirmation to Prospect
    await sendEmail({
      to: safeEmail,
      subject: `Project Scope Confirmation — NEXVORA Technologies`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #071426;">
          <h2 style="color: #087BCE;">We have received your project details, ${safeName}</h2>
          <p>Thank you for submitting your project specifications for <strong>${safeProjectName}</strong>.</p>
          <p>Founders Muhammad Azhar and Owais Ahmad will personally examine your scope, timeline, and architectural requirements. We respond to every qualified inquiry within <strong>${siteConfig.contact.responseTime}</strong>.</p>
          
          <div style="background: #F4F7FB; border: 1px solid #DCE4EE; border-radius: 8px; padding: 16px; margin: 20px 0; font-size: 13px;">
            <p style="margin: 0 0 6px 0;"><strong>Summary of Submitted Information:</strong></p>
            <p style="margin: 0;"><strong>Services:</strong> ${safeServices}<br><strong>Timeline:</strong> ${safeTimeline}<br><strong>Budget:</strong> ${safeBudget}</p>
          </div>

          <p style="font-size: 13px; color: #4A5B73;">If you need to provide additional architecture documents, reply directly to this email or reach us on WhatsApp.</p>
          <p style="margin-top: 24px; font-size: 13px;">Sincerely,<br><strong>NEXVORA Technologies Founding Engineers</strong><br><em>Build Beyond Limits.</em></p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Quote request successfully processed.",
    });
  } catch (err) {
    console.error("API /api/quote uncaught error:", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again or email us directly." },
      { status: 500 }
    );
  }
}

