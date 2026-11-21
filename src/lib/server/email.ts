interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail({ to, subject, html, replyTo }: SendEmailParams): Promise<{ success: boolean; id?: string; error?: string }> {
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

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
        reply_to: replyTo,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Resend API error:", data);
      return { success: false, error: data.message || "Resend API error" };
    }

    return { success: true, id: data.id };
  } catch (err) {
    console.error("Failed to send transactional email:", err);
    return { success: false, error: err instanceof Error ? err.message : "Failed to connect to email service" };
  }
}
