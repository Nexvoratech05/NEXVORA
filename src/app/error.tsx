"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Mail, Home } from "lucide-react";
import { siteConfig } from "@/content/site";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Runtime Error:", error);
  }, [error]);

  return (
    <div className="w-full min-h-[75vh] flex items-center justify-center py-20 bg-gray-50">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center space-y-8">
        <div className="w-16 h-16 rounded-2xl bg-red-100 text-error flex items-center justify-center mx-auto shadow-sm">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-3">
          <span className="text-sm font-mono text-error font-semibold uppercase tracking-wider block">
            HTTP 500 · System Interrupt
          </span>
          <h1 className="text-3xl font-bold font-heading text-navy-950">
            Unexpected Application State
          </h1>
          <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
            An unexpected error occurred while rendering this view. Your submitted data has not been lost.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => reset()}
            className="h-12 px-6 rounded-btn font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow inline-flex items-center gap-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retry Operation</span>
          </button>

          {siteConfig.contact.hasRealEmail && siteConfig.contact.displayEmail ? (
            <a
              href={`mailto:${siteConfig.contact.displayEmail}?subject=Application%20Error%20Report`}
              className="h-12 px-6 rounded-btn font-medium text-sm border border-gray-300 bg-white hover:bg-gray-50 text-navy-950 inline-flex items-center gap-2 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Report Issue</span>
            </a>
          ) : (
            <Link
              href="/contact"
              className="h-12 px-6 rounded-btn font-medium text-sm border border-gray-300 bg-white hover:bg-gray-50 text-navy-950 inline-flex items-center gap-2 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Support</span>
            </Link>
          )}

          <Link
            href="/"
            className="h-12 px-6 rounded-btn font-medium text-sm border border-gray-300 bg-white hover:bg-gray-50 text-navy-950 inline-flex items-center gap-2 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

