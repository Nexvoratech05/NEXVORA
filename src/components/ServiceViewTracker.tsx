"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

interface ServiceViewTrackerProps {
  serviceSlug: string;
  serviceTitle: string;
}

export function ServiceViewTracker({ serviceSlug, serviceTitle }: ServiceViewTrackerProps) {
  useEffect(() => {
    trackEvent("service_view", { serviceSlug, serviceTitle });
  }, [serviceSlug, serviceTitle]);

  return null;
}
