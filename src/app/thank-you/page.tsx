import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { CheckCircle2, ArrowRight, MessageSquare, Home } from "lucide-react";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Inquiry Received — NEXVORA Technologies",
  description: "Thank you for reaching out to NEXVORA Technologies. Your project request has been delivered to the founders.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  const encodedGreeting = encodeURIComponent(siteConfig.contact.whatsappGreeting);
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodedGreeting}`;

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center py-24 sm:py-32 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center space-y-8">
        {/* Animated Check Icon */}
        <div className="w-20 h-20 rounded-full bg-green-100 border border-green-300 text-success mx-auto flex items-center justify-center shadow-lg">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-3">
          <span className="eyebrow text-blue-600">Submission Confirmed</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-navy-950">
            Thank You — We Have Received Your Request
          </h1>
          <p className="text-base text-gray-600 max-w-lg mx-auto leading-relaxed">
            Your project details have been successfully delivered to founding engineers Muhammad Azhar and Owais Ahmad.
          </p>
        </div>

        {/* Next Steps Box */}
        <div className="p-8 rounded-2xl bg-white border border-gray-200 text-left space-y-4 shadow-sm">
          <h2 className="text-sm font-bold font-heading text-navy-950 uppercase tracking-wider border-b border-gray-100 pb-2">
            What to Expect Next:
          </h2>
          <ol className="space-y-3.5 text-xs text-gray-600 leading-relaxed list-decimal pl-4">
            <li>
              <strong className="text-navy-950">Technical Scope Assessment:</strong> Our founding engineering leads Muhammad Azhar and Owais Ahmad will personally review your technical requirements and objectives.
            </li>
            <li>
              <strong className="text-navy-950">Mutual NDA:</strong> Mutual NDAs are available upon request and subject to agreement prior to reviewing proprietary architectures or private datasets.
            </li>
            <li>
              <strong className="text-navy-950">Direct Discovery Session:</strong> {siteConfig.contact.responseTime} We will provide an initial architecture evaluation and propose a structured discovery session.
            </li>
          </ol>
        </div>

        {/* Alternative Urgent Channel */}
        {siteConfig.contact.hasRealWhatsapp && siteConfig.contact.whatsappNumber ? (
          <div className="p-4 rounded-xl bg-navy-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <span className="text-gray-300">
              Have an urgent question or RFP deadline?
            </span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-btn bg-[#25D366] text-navy-950 font-bold hover:bg-[#20ba59] transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        ) : null}

        {/* Navigation CTAs */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="h-11 px-6 rounded-btn font-medium text-xs border border-gray-300 bg-white hover:bg-gray-50 text-navy-950 flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            href="/projects"
            className="h-11 px-6 rounded-btn font-semibold text-xs bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 shadow"
          >
            <span>Explore Engineering Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
