import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { Users, Mail, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers & Talent Network | NEXVORA Technologies",
  description: "Explore engineering careers and talent network opportunities in AI, data lakehouses, cloud infrastructure, and software engineering at NEXVORA Technologies.",
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: "Careers & Talent Network | NEXVORA Technologies",
    description: "Explore engineering careers and talent network opportunities in AI, data lakehouses, cloud infrastructure, and software engineering at NEXVORA Technologies.",
    url: `${siteConfig.url}/careers`,
    type: "website",
    images: ["/og-image.png"],
  },
};

export default function CareersPage() {
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
              <li className="text-cyan-400 font-medium" aria-current="page">Careers</li>
            </ol>
          </nav>

          <div className="max-w-3xl space-y-4">
            <span className="eyebrow text-cyan-400">Phase 2 Engineering Growth</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white">
              Careers at NEXVORA
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              We are building a culture centered around high-craft software engineering, clean cloud architecture, and modern data systems.
            </p>
          </div>
        </div>
      </section>

      {/* Talent Network Capture Content */}
      <section className="py-20 sm:py-24 bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          <div className="w-16 h-16 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center mx-auto">
            <Users className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <span className="eyebrow text-blue-600">Active Roles Coming in Phase 2</span>
            <h2 className="text-3xl font-bold font-heading text-navy-950">
              Join Our Engineering Talent Network
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              In accordance with our strict no-fabrication policy, we do not post phantom vacancies. Current client deliverables are led directly by founders Muhammad Azhar and Owais Ahmad. As our project backlog expands in Phase 2, we will recruit specialized full-stack engineers and data pipeline specialists.
            </p>
          </div>

          {/* Talent Network Email Box */}
          <div className="p-8 rounded-2xl bg-gray-50 border border-gray-200 text-left space-y-4">
            <h3 className="text-base font-bold font-heading text-navy-950">
              Submit Your Profile for Future Sprints
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              If you are a disciplined software engineer (Next.js, TypeScript, Python), cloud practitioner (AWS/Azure), or data engineer (ETL, PostgreSQL, CRM APIs), share your GitHub or CV with the founders:
            </p>

            <div className="pt-2">
              {siteConfig.contact.hasRealEmail && siteConfig.contact.displayEmail ? (
                <a
                  href={`mailto:${siteConfig.contact.displayEmail}?subject=Talent%20Network%20Application%20-%20NEXVORA`}
                  className="h-12 px-6 rounded-btn font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow inline-flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send CV &amp; GitHub Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              ) : (
                <Link
                  href="/contact"
                  className="h-12 px-6 rounded-btn font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow inline-flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact Founders via Inquiry Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
            <p className="text-[11px] text-gray-400 font-mono">
              Direct inbox review by founding team. No automated ATS rejection filters.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
