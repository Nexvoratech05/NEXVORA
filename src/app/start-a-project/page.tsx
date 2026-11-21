import React, { Suspense } from "react";
import Link from "next/link";
import { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { MultiStepQuoteForm } from "@/components/MultiStepQuoteForm";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Start a Project — Request a Quote — NEXVORA",
  description:
    "Tell us about your project and receive a tailored engineering proposal from founders Muhammad Azhar and Owais Ahmad.",
  alternates: {
    canonical: "/start-a-project",
  },
};

export default function StartAProjectPage() {
  return (
    <div className="w-full">
      {/* Header Banner */}
      <section className="bg-navy-950 text-white pt-32 pb-20 border-b border-navy-700">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-gray-400">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-cyan-400">Home</Link>
              </li>
              <li>/</li>
              <li className="text-cyan-400 font-medium" aria-current="page">Start a Project</li>
            </ol>
          </nav>

          <div className="max-w-3xl space-y-4">
            <span className="eyebrow text-cyan-400">Tailored Proposal</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white">
              Request an Architectural Scope &amp; Quote
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Complete this 4-step scope calculator to describe your requirements. Founders Muhammad Azhar and Owais Ahmad review every submission and provide a realistic timeline, architectural blueprint, and budget breakdown.
            </p>
          </div>
        </div>
      </section>

      {/* Form Content */}
      <section className="py-16 sm:py-24 bg-gray-50 border-b border-gray-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Main Form Container */}
            <div className="lg:col-span-8">
              <Suspense fallback={<div className="p-12 text-center text-sm text-gray-400">Loading form...</div>}>
                <MultiStepQuoteForm />
              </Suspense>
            </div>

            {/* Right Side Trust Cues & Response Guarantees */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-base font-bold font-heading text-navy-950 border-b border-gray-100 pb-3">
                  What Happens Next?
                </h3>
                <ul className="space-y-3.5 text-xs text-gray-600 leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-navy-950 block">1. Founder Review:</strong>
                      Muhammad Azhar and Owais Ahmad analyze your stack and requirements directly.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-navy-950 block">2. Response in {siteConfig.contact.responseTime}:</strong>
                      You receive a technical assessment and clarifying questions within one business day.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-navy-950 block">3. Discovery Session:</strong>
                      A 30-minute video or audio call to align on architectural feasibility and milestones.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-navy-950 block">4. Formal Proposal:</strong>
                      Detailed sprint roadmap, fixed-scope budget, and team allocation.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Security & Confidentiality Commitment */}
              <div className="p-6 rounded-2xl bg-navy-950 text-white border border-navy-700 space-y-3">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold font-heading">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confidentiality &amp; NDA</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  All submitted system details, credentials, and attachments are treated as strictly confidential. We are happy to execute an NDA before deep technical disclosure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
