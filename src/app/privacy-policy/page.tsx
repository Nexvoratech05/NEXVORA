import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | NEXVORA Technologies",
  description: "Privacy policy, data protection governance, and mutual confidentiality terms at NEXVORA Technologies.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | NEXVORA Technologies",
    description: "Privacy policy, data protection governance, and mutual confidentiality terms at NEXVORA Technologies.",
    url: `${siteConfig.url}/privacy-policy`,
    type: "website",
    images: ["/og-image.png"],
  },
};

export default function PrivacyPolicyPage() {
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
              <li className="text-cyan-400 font-medium" aria-current="page">Privacy Policy</li>
            </ol>
          </nav>

          <div className="max-w-3xl space-y-4">
            <span className="eyebrow text-cyan-400">Governance &amp; Data Rights</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-400 font-mono">
              Last Updated: November 22, 2026 · Effective Immediately
            </p>
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-16 sm:py-24 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-sm text-gray-700 leading-relaxed">
          {/* Data Commitment */}
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 flex-shrink-0 text-blue-600 mt-0.5" />
            <div>
              <strong className="block mb-0.5 text-navy-950 font-heading">Data Protection Commitment:</strong>
              This privacy policy outlines the operational data governance standards of {siteConfig.name}. We prioritize user confidentiality, strict data minimization, least-privilege access, and end-to-end transport encryption.
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold font-heading text-navy-950">1. Information We Collect</h2>
            <p>
              NEXVORA Technologies collects personal and project data strictly through explicit submission on our website inquiry and quote request forms:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Contact Information:</strong> Full name, professional work email address, telephone/WhatsApp number, country of operation, and company name.
              </li>
              <li>
                <strong>Project Scope Details:</strong> System requirements, timeline selections, budget bracket estimates, architecture briefs, and optional technical specifications.
              </li>
              <li>
                <strong>Technical Analytics Data:</strong> Anonymized usage metadata (e.g., page views, button clicks) collected via privacy-first, cookie-less telemetry. We do not store personally identifiable IP addresses in our telemetry logs.
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold font-heading text-navy-950">2. How We Use Collected Data</h2>
            <p>
              We process submitted data exclusively for the following legitimate commercial and engineering purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Evaluating technical project feasibility, estimating milestones, and generating formal engineering proposals.</li>
              <li>Direct founder communication via email, WhatsApp, or scheduled video calls in response to your explicit inquiry.</li>
              <li>Enforcing bot and abuse prevention mechanisms (e.g. rate limiting and Cloudflare Turnstile).</li>
            </ul>
            <p className="font-semibold text-navy-950">
              We never sell, rent, monetize, or disclose your corporate or personal data to third-party marketing brokers.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold font-heading text-navy-950">3. Third-Party Service Processors</h2>
            <p>
              To maintain secure and performant operations, we utilize trusted infrastructure providers who act as data processors:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Hosting &amp; Edge Delivery:</strong> Vercel and Cloudflare (SSL/TLS, edge caching, and DDoS mitigation).</li>
              <li><strong>Transactional Email:</strong> Resend / Postmark (delivering form submission notifications and receipts).</li>
              <li><strong>Spam Protection:</strong> Cloudflare Turnstile (privacy-preserving non-intrusive bot challenge).</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold font-heading text-navy-950">4. Data Retention &amp; Security Controls</h2>
            <p>
              We retain submitted inquiries for a standard operational period of 12 months unless an active client engagement requires ongoing archival retention. All data in transit is encrypted using modern TLS 1.3 encryption, and data stored in databases or CRM systems is encrypted at rest. Access is strictly restricted to founders Muhammad Azhar and Owais Ahmad.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold font-heading text-navy-950">5. Your Data Rights &amp; Erasure Requests</h2>
            <p>
              Depending on your jurisdiction (such as GDPR for European individuals or applicable regional data protection frameworks), you hold the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Request a complete copy of all personal details retained about you.</li>
              <li>Request the immediate deletion (right to erasure) of your submitted inquiry data.</li>
              <li>Correct or update inaccurate contact records.</li>
            </ul>
            <p>
              To execute any data rights, submit your request to{" "}
              <a href={`mailto:${siteConfig.contact.displayEmail}`} className="text-blue-600 underline font-medium">
                {siteConfig.contact.displayEmail}
              </a>
              . Requests are reviewed and honored within 3 business days.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold font-heading text-navy-950">6. Policy Updates</h2>
            <p>
              Any changes to this policy will be posted on this page with an updated revision date.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
