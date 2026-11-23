/**
 * Verifies Cloudflare Turnstile token on the server.
 * If no secret key is configured in environment, passes gracefully for development.
 */
export async function verifyTurnstile(token?: string, remoteIp?: string): Promise<{ success: boolean; error?: string }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // If Turnstile secret key is not configured, warn and allow submission in advisory mode
  if (!secretKey) {
    if (process.env.NODE_ENV === "production") {
      console.warn(
        "[Security Notice] TURNSTILE_SECRET_KEY is not configured in production environment. " +
        "Bot verification is operating in advisory pass-through mode. Add TURNSTILE_SECRET_KEY and NEXT_PUBLIC_TURNSTILE_SITE_KEY to Vercel environment variables to enforce challenge verification."
      );
    }
    return { success: true };
  }

  // When secretKey is configured, enforce strict token verification
  if (!token) {
    return { success: false, error: "Missing Turnstile verification token" };
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (remoteIp) {
      formData.append("remoteip", remoteIp);
    }

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return { success: data.success, error: data["error-codes"]?.join(", ") };
  } catch (err) {
    console.error("Turnstile verification network error:", err);
    if (process.env.NODE_ENV === "production") {
      return { success: false, error: "Cloudflare Turnstile verification network failure." };
    }
    // In development only, allow pass-through if endpoint is temporarily unreachable
    return { success: true };
  }
}

