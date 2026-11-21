import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms and Conditions — NEXVORA Technologies",
  description: "Terms and conditions governing the use of the NEXVORA Technologies corporate website and engagement inquiries.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="w-full">
      {/* Header Banner */}
      <section className="bg-navy-950 text-white pt-32 pb-20 border-b border-navy-700">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-gray-400">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-cyan-400">Home</Link>
              </li>
              <li>/</li>
              <li className="text-cyan-400 font-medium" aria-current="page">Terms &amp; Conditions</li>
            </ol>
          </nav>

          <div className="max-w-3xl space-y-4">
            <span className="eyebrow text-cyan-400">Legal Agreement</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white">
              Terms &amp; Conditions
            </h1>
            <p className="text-sm text-gray-400 font-mono">
              Last Updated: November 19, 2026 · Effective Immediately
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-24 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-sm text-gray-700 leading-relaxed">
          {/* Legal Notice */}
          <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-200 text-xs text-yellow-900 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-yellow-700 mt-0.5" />
            <div>
              <strong className="block mb-0.5">Legal Notice:</strong>
              [PLACEHOLDER: Legal text and entity details]. These terms govern informational website access and inquiry submissions. Formal client engineering contracts are executed under separate Master Services Agreements (MSAs) and Statements of Work (SOWs).
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold font-heading text-navy-950">1. Acceptance of Terms</h2>
            <p>
              By accessing or using this website ({siteConfig.url}), you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any portion of these terms, please discontinue use of this site immediately.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold font-heading text-navy-950">2. Scope of Online Services &amp; Proposals</h2>
            <p>
              Content published on this website (including case study summaries, architecture diagrams, and service descriptions) is provided for informational and business evaluation purposes. Estimates submitted via our quote calculator constitute preliminary scopes and do not represent binding contractual obligations until finalized in an approved Statement of Work.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold font-heading text-navy-950">3. Intellectual Property Rights</h2>
            <p>
              All proprietary branding, logos, graphics, text, diagrams, and codebase displayed on this site are the exclusive property of {siteConfig.name} or its founding partners, protected under applicable copyright and intellectual property laws.
            </p>
            <p>
              For bespoke client engagements, 100% ownership of custom software code, data schemas, and deployment assets is assigned to the client upon full payment of agreed milestone deliverables.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold font-heading text-navy-950">4. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, {siteConfig.name} and its officers shall not be liable for any indirect, incidental, or consequential damages resulting from website downtime, technical inaccuracies, or third-party transmission failures.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold font-heading text-navy-950">5. Governing Law &amp; Jurisdiction</h2>
            <p>
              These Terms and Conditions shall be governed by and interpreted in accordance with the laws of [PLACEHOLDER: Jurisdiction / Country of registration, e.g. Pakistan / UAE], without regard to conflict of law principles.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold font-heading text-navy-950">6. Inquiries &amp; Legal Notices</h2>
            <p>
              For legal inquiries regarding these terms or commercial service agreements, contact our founding counsel via our{" "}
              {siteConfig.contact.hasRealEmail && siteConfig.contact.displayEmail ? (
                <a href={`mailto:${siteConfig.contact.displayEmail}`} className="text-blue-600 underline font-medium">
                  {siteConfig.contact.displayEmail}
                </a>
              ) : (
                <Link href="/contact" className="text-blue-600 underline font-medium">
                  contact inquiry portal
                </Link>
              )}.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

