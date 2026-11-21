"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/content/site";
import { trackEvent } from "@/lib/analytics";

export function StickyMobileBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear after scrolling past hero (~350px)
      if (window.scrollY > 350) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide on /start-a-project to avoid duplication (PRD Section 17)
  if (pathname === "/start-a-project" || !show) {
    return null;
  }

  const encodedGreeting = encodeURIComponent(siteConfig.contact.whatsappGreeting);
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodedGreeting}`;

  return (
    <div
      role="region"
      aria-label="Mobile quick actions"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy-950/95 backdrop-blur-md border-t border-navy-700/80 px-4 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom duration-200"
    >
      {/* WhatsApp or Contact Action Button */}
      {siteConfig.contact.hasRealWhatsapp && siteConfig.contact.whatsappNumber ? (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click", { location: "sticky_mobile_bar" })}
          aria-label="Chat with NEXVORA on WhatsApp"
          className="flex-1 h-11 px-3 border border-navy-700 bg-navy-900 hover:bg-navy-700 text-white rounded-btn text-xs font-semibold flex items-center justify-center gap-2 transition-colors active:scale-95"
        >
          {/* WhatsApp Official Green Icon */}
          <svg
            className="w-4 h-4 flex-shrink-0 fill-[#25D366]"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
          </svg>
          <span>WhatsApp</span>
        </a>
      ) : (
        <Link
          href="/contact"
          className="flex-1 h-11 px-3 border border-navy-700 bg-navy-900 hover:bg-navy-700 text-white rounded-btn text-xs font-semibold flex items-center justify-center gap-2 transition-colors active:scale-95"
        >
          <span>Contact Us</span>
        </Link>
      )}

      {/* Start a Project Primary Action */}
      <Link
        href="/start-a-project"
        onClick={() => trackEvent("cta_click", { location: "sticky_mobile_bar" })}
        className="flex-1 h-11 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-btn text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors active:scale-95"
      >
        <span>Start a Project</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
