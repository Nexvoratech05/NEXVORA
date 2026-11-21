"use client";

type AnalyticsEvent =
  | "cta_click"
  | "form_start"
  | "form_submit"
  | "whatsapp_click"
  | "email_click"
  | "project_filter"
  | "service_view";

interface EventPayload {
  [key: string]: string | number | boolean | undefined;
}

export const trackEvent = (event: AnalyticsEvent, payload?: EventPayload) => {
  if (typeof window === "undefined") return;

  // Check consent from localStorage
  const consent = localStorage.getItem("nexvora_cookie_consent");
  if (consent !== "accepted") {
    // Only fire anonymized non-identifying telemetry if not consented
    return;
  }

  // Log in development or forward to configured analytics provider (e.g. Plausible / GA4)
  if (process.env.NODE_ENV !== "production") {
    console.info(`[Analytics Event: ${event}]`, payload);
  }

  // Push to dataLayer or custom event
  const win = window as unknown as { dataLayer?: unknown[] };
  if (win.dataLayer) {
    win.dataLayer.push({ event, ...payload, timestamp: Date.now() });
  }
};

