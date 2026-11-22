interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
  isConfirmationReceipt?: boolean;
}

export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
  isConfirmationReceipt = false,
}: SendEmailParams): Promise<{ success: boolean; id?: string; error?: string; redirectedTo?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.EMAIL_FROM || "NEXVORA Technologies <notifications@nexvora.com>";

  if (!apiKey) {
    if (process.env.NODE_ENV === "production") {
      console.error("[Email Error] RESEND_API_KEY is not configured in production environment.");
      return { success: false, error: "Email delivery service (RESEND_API_KEY) is not configured in production." };
    }
    console.info(`[Email Dispatch Simulation (RESEND_API_KEY unset)] To: ${to} | Subject: ${subject}`);
    return { success: true, id: `sim-${Date.now()}` };
  }

  const recipients = Array.isArray(to) ? to : [to];

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: recipients,
        subject,
        html,
        reply_to: replyTo,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      return { success: true, id: data.id };
    }

    // Handle Resend free tier sandbox restriction:
    // "You can only send testing emails to your own email address (owner@example.com)..."
    const errorMessage = data.message || "";
    const isSandboxRestriction =
      res.status === 403 &&
      errorMessage.includes("You can only send testing emails to your own email address");

    if (isSandboxRestriction) {
      // If this is a client confirmation receipt (e.g. sent to client's email), skip quietly in sandbox
      if (isConfirmationReceipt) {
        console.warn(`[Resend Sandbox] Client confirmation email to <${recipients.join(", ")}> was skipped because the domain is in test mode.`);
        return { success: true, id: `sandbox-skipped-${Date.now()}` };
      }

      // Extract allowed owner email from Resend error message or env var fallback
      const match = errorMessage.match(/\(([^)]+)\)/);
      const fallbackEmail =
        match?.[1] || process.env.RESEND_SANDBOX_FALLBACK_EMAIL || "azharkhan726200@gmail.com";

      console.warn(
        `[Resend Sandbox Notice] Cannot send to ${recipients.join(", ")} directly before domain verification. Forwarding to Resend account owner: ${fallbackEmail}`
      );

      const modifiedHtml = `
        <div style="background: #FEF3C7; border: 1px solid #FCD34D; padding: 12px 16px; border-radius: 8px; margin-bottom: 20px; font-family: sans-serif; font-size: 13px; color: #92400E;">
          <strong>[Resend Sandbox Test Mode]</strong><br>
          <strong>Intended Corporate Recipient:</strong> ${recipients.join(", ")}<br>
          <em>Note: Delivered to ${fallbackEmail} because nexvora.com domain is not yet verified in resend.com/domains. Once verified, this will be delivered directly to ${recipients.join(", ")}.</em>
        </div>
        ${html}
      `;

      const retryRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: "NEXVORA Technologies <onboarding@resend.dev>",
          to: [fallbackEmail],
          subject: `[Intended: ${recipients.join(", ")}] ${subject}`,
          html: modifiedHtml,
          reply_to: replyTo,
        }),
      });

      const retryData = await retryRes.json();
      if (retryRes.ok) {
        return { success: true, id: retryData.id, redirectedTo: fallbackEmail };
      }

      return { success: false, error: retryData.message || "Resend retry failed" };
    }

    console.error("Resend API error:", data);
    return { success: false, error: errorMessage || "Resend API error" };
  } catch (err) {
    console.error("Failed to send transactional email:", err);
    return { success: false, error: err instanceof Error ? err.message : "Failed to connect to email service" };
  }
}
