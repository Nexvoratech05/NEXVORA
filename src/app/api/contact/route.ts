import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

export const dynamic = "force-dynamic";
import { checkRateLimit, getClientIp } from "@/lib/server/rate-limit";
import { verifyTurnstile } from "@/lib/server/turnstile";
import { sendEmail } from "@/lib/server/email";
import { saveLead } from "@/lib/server/leads";
import { siteConfig } from "@/content/site";

const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name cannot exceed 80 characters")
    .transform((v) => v.trim()),
  email: z
    .string()
    .email("Please provide a valid email address")
    .max(120, "Email cannot exceed 120 characters"),
  phone: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const digitsOnly = val.replace(/[^0-9]/g, "");
      return digitsOnly.length >= 7 && digitsOnly.length <= 15;
    }, "Please provide a valid phone number (7 to 15 digits)"),
  subject: z.string().optional(),
  projectType: z.string().optional(),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(2000, "Message cannot exceed 2000 characters"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must accept the privacy policy" }),
  }),
  honeypot: z.string().max(0, "Bot submission rejected"),
  turnstileToken: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    // 1. Rate Limit: 5 submissions per IP per hour
    const rateLimit = await checkRateLimit(ip, 5, 60);
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error:
            rateLimit.error ||
            "Submission rate limit exceeded. Please wait a while or reach out directly via email or WhatsApp.",
        },
        { status: 429 }
      );
    }

    const body = await req.json();

    // 2. Honeypot check (bot traps)
    if (body.honeypot && body.honeypot.length > 0) {
      // Silent reject: pretend success to deceive spam bots
      return NextResponse.json({ success: true, message: "Inquiry received" });
    }

    // 3. Server-side Zod validation
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Validation failed";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const data = parsed.data;

    // 4. Cloudflare Turnstile Verification
    const turnstileResult = await verifyTurnstile(data.turnstileToken, ip);
    if (!turnstileResult.success) {
      const isConfigError = turnstileResult.error?.includes("TURNSTILE_SECRET_KEY");
      return NextResponse.json(
        {
          error: isConfigError
            ? "Bot verification service (TURNSTILE_SECRET_KEY) is not configured in production."
            : "Security check failed. Please refresh and try again.",
        },
        { status: isConfigError ? 500 : 403 }
      );
    }

    // 5. Sanitize HTML strings
    const sanitize = (str: string) =>
      str.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&#39;", '"': "&quot;" }[c] || c));

    const safeName = sanitize(data.fullName);
    const safeEmail = sanitize(data.email);
    const safePhone = data.phone ? sanitize(data.phone) : "Not provided";
    const safeSubject = sanitize(data.subject || data.projectType || "General Inquiry");
    const safeMessage = sanitize(data.message);

    const recipientEmail = process.env.CONTACT_RECEIVER_EMAIL || siteConfig.contact.displayEmail;

    if (!recipientEmail && process.env.NODE_ENV === "production") {
      console.error("[Email Error] No recipient email configured in production (CONTACT_RECEIVER_EMAIL).");
      return NextResponse.json(
        { error: "Server notification destination (CONTACT_RECEIVER_EMAIL) is not configured." },
        { status: 500 }
      );
    }

    // 6. Persist Lead to Storage
    await saveLead({
      type: "contact_inquiry",
      fullName: safeName,
      email: safeEmail,
      phone: safePhone !== "Not provided" ? safePhone : undefined,
      ip,
      details: {
        subject: safeSubject,
        message: safeMessage,
        recipient: recipientEmail,
      },
    });

    // 7. Notify Founders via Email
    const founderNotification = await sendEmail({
      to: recipientEmail || "founders@nexvora.com",
      subject: `[NEXVORA Inquiry] ${safeSubject} from ${safeName}`,
      replyTo: safeEmail,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #071426;">
          <h2 style="color: #087BCE; border-bottom: 2px solid #DCE4EE; padding-bottom: 8px;">New NEXVORA Project Inquiry</h2>
          <p><strong>From:</strong> ${safeName} (&lt;${safeEmail}&gt;)</p>
          <p><strong>Phone:</strong> ${safePhone}</p>
          <p><strong>Subject:</strong> ${safeSubject}</p>
          <div style="background: #F4F7FB; border: 1px solid #DCE4EE; padding: 16px; border-radius: 8px; margin-top: 16px;">
            <p style="margin: 0; white-space: pre-wrap;">${safeMessage}</p>
          </div>
          <p style="font-size: 12px; color: #4A5B73; margin-top: 24px;">Dispatched from nexvora.com corporate website API.</p>
        </div>
      `,
    });

    if (!founderNotification.success) {
      console.warn("[Email Notification Warning] Lead saved but email dispatch was skipped or failed:", founderNotification.error);
    }

    // 8. Send Confirmation Email to Sender
    await sendEmail({
      to: safeEmail,
      subject: `Inquiry Received — NEXVORA Technologies`,
      isConfirmationReceipt: true,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #071426;">
          <h2 style="color: #087BCE;">Thank You, ${safeName}</h2>
          <p>We have successfully received your inquiry regarding <strong>${safeSubject}</strong>.</p>
          <p>Founders Muhammad Azhar and Owais Ahmad review every project personally and will respond within <strong>${siteConfig.contact.responseTime}</strong>.</p>
          <div style="margin: 20px 0; padding: 14px; background: #F4F7FB; border-radius: 8px; font-size: 13px; color: #4A5B73;">
            <p style="margin: 0;"><strong>Direct Contact:</strong> If you have urgent materials to share, you can reply directly to this email or reach us on WhatsApp.</p>
          </div>
          <p style="margin-top: 24px; font-size: 13px;">Warm regards,<br><strong>NEXVORA Technologies Founding Team</strong><br><em>Build Beyond Limits.</em></p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Your inquiry has been delivered to the founders.",
    });
  } catch (err) {
    console.error("API /api/contact uncaught error:", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again or email us directly." },
      { status: 500 }
    );
  }
}

