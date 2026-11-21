"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Shield } from "lucide-react";

export function ConsentBanner() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const existing = localStorage.getItem("nexvora_cookie_consent");
    if (!existing) {
      setVisible(true);
    }
  }, []);

  if (!mounted || !visible) return null;

  const accept = () => {
    localStorage.setItem("nexvora_cookie_consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("nexvora_cookie_consent", "declined");
    setVisible(false);
  };

  return (
    <aside
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-16 lg:bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-navy-900/95 backdrop-blur-md border border-navy-700 text-white p-4 rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200"
    >
      <div className="flex items-start gap-3">
        <Shield className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
        <div className="space-y-2 flex-1">
          <p className="text-xs text-gray-300 leading-relaxed">
            We use essential cookies and anonymized privacy-first analytics to understand inquiry traffic and ensure site security. Review our{" "}
            <Link href="/privacy-policy" className="text-cyan-400 underline hover:text-white">
              Privacy Policy
            </Link>.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={accept}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-btn text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              Accept
            </button>
            <button
              onClick={decline}
              className="px-3 py-1.5 border border-navy-700 hover:bg-navy-700/60 text-gray-300 rounded-btn text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              Decline Non-Essential
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

