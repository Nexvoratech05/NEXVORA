import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {
  ArrowRight,
  ShieldCheck,
  Globe,
  ExternalLink,
  GraduationCap,
  Award,
} from "lucide-react";
import { founders, siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Engineering Leadership & Technical Founders | NEXVORA Technologies",
  description:
    "Meet the founding engineers behind NEXVORA Technologies: Muhammad Azhar (Co-Founder & Technical Lead) and Owais Ahmad (Co-Founder & Data Lead).",
  alternates: {
    canonical: "/team",
  },
  openGraph: {
    title: "Engineering Leadership & Technical Founders | NEXVORA Technologies",
    description:
      "Meet the founding engineers behind NEXVORA Technologies: Muhammad Azhar (Co-Founder & Technical Lead) and Owais Ahmad (Co-Founder & Data Lead).",
    url: `${siteConfig.url}/team`,
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Leadership & Technical Founders | NEXVORA Technologies",
    description:
      "Meet the founding engineers behind NEXVORA Technologies: Muhammad Azhar (Co-Founder & Technical Lead) and Owais Ahmad (Co-Founder & Data Lead).",
    images: ["/og-image.png"],
  },
};

export default function TeamPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": siteConfig.url,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Team",
            "item": `${siteConfig.url}/team`,
          },
        ],
      },
      ...founders.map((f) => ({
        "@type": "Person",
        "name": f.name,
        "jobTitle": f.title,
        "worksFor": {
          "@type": "Organization",
          "name": siteConfig.name,
          "url": siteConfig.url,
        },
        "description": f.bio,
        "sameAs": [f.linkedin, f.github, f.portfolioUrl].filter(Boolean),
      })),
    ],
  };

  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-navy-950 text-white pt-32 pb-20 border-b border-navy-700">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-gray-400">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-cyan-400">Home</Link>
              </li>
              <li>/</li>
              <li className="text-cyan-400 font-medium" aria-current="page">Leadership</li>
            </ol>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-900 border border-navy-700 text-cyan-400 text-xs font-mono font-semibold">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Founder-Led Technology Engineering</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white">
              Engineering Leadership &amp; Founders
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              At NEXVORA Technologies, our founding engineers lead from the front. We do not maintain bloated account-management hierarchies or hand projects to unvetted contractors. You collaborate directly with senior practitioners who architect code, design distributed cloud topologies, and engineer modern data systems.
            </p>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 sm:py-24 bg-gray-50 border-b border-gray-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto items-stretch">
            {founders.map((founder) => (
              <div
                key={founder.name}
                className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between space-y-8"
              >
                {/* Header with Photo and Title */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-gray-100">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm flex-shrink-0">
                    <Image
                      src={founder.image}
                      alt={founder.name}
                      width={280}
                      height={350}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-blue-50 text-blue-700 border border-blue-200/60 uppercase tracking-wider">
                      Executive Engineering Lead
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold font-heading text-navy-950">
                      {founder.name}
                    </h2>
                    <p className="text-sm font-semibold text-blue-600">
                      {founder.role}
                    </p>
                    <p className="text-xs text-gray-500 font-sans leading-tight">
                      {founder.headline}
                    </p>
                  </div>
                </div>

                {/* Profile Details */}
                <div className="space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 p-2.5 bg-blue-50/80 rounded-lg border border-blue-200/60 text-xs text-blue-800">
                      <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span className="font-medium">Verified Engineering Credentials &amp; Case Studies</span>
                    </div>

                    <p className="text-sm text-gray-700 leading-relaxed">
                      {founder.bio}
                    </p>

                    {/* Education */}
                    {founder.education && (
                      <div className="flex items-start gap-2.5 pt-2 text-xs text-gray-700">
                        <GraduationCap className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-navy-950 font-semibold block">Education:</strong>
                          <span>{founder.education}</span>
                        </div>
                      </div>
                    )}

                    {/* Certifications */}
                    {founder.certifications && founder.certifications.length > 0 && (
                      <div className="space-y-2 pt-2">
                        <div className="flex items-center gap-2 text-xs font-semibold text-navy-950 font-heading">
                          <Award className="w-4 h-4 text-blue-600" />
                          <span>Verified Certifications &amp; Accreditations:</span>
                        </div>
                        <ul className="space-y-1.5 pl-6 list-disc text-xs text-gray-600">
                          {founder.certifications.map((cert, idx) => (
                            <li key={idx}>{cert}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Technical Breakdown if Owais */}
                    {founder.technicalExpertise && (
                      <div className="pt-3 border-t border-gray-100 space-y-2.5">
                        <span className="text-xs font-semibold uppercase tracking-wider text-navy-950 font-heading block">
                          Technical Specializations:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {Object.entries(founder.technicalExpertise).map(([cat, val]) => (
                            <div key={cat} className="p-2.5 rounded-lg bg-gray-50 border border-gray-200/80">
                              <span className="text-[11px] font-bold text-blue-600 block">{cat}</span>
                              <span className="text-[11px] text-gray-700">{val}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Technical Focus if Azhar */}
                    {founder.technicalFocus && (
                      <div className="pt-3 border-t border-gray-100 space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-navy-950 font-heading block">
                          Core Technical Focus:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {founder.technicalFocus.map((focus) => (
                            <span
                              key={focus}
                              className="px-2.5 py-1 rounded-tag bg-gray-50 text-navy-950 text-xs font-medium border border-gray-200"
                            >
                              {focus}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Verified Links & Direct Inquiry */}
                  <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                      {founder.portfolioUrl && (
                        <a
                          href={founder.portfolioUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-semibold underline flex items-center gap-1"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          <span>Personal Portfolio</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {founder.linkedin && (
                        <a
                          href={founder.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-navy-950 font-medium underline flex items-center gap-1"
                        >
                          <span>LinkedIn</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {founder.github && (
                        <a
                          href={founder.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-navy-950 font-medium underline flex items-center gap-1"
                        >
                          <span>GitHub</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    <Link
                      href={`/start-a-project?founder=${encodeURIComponent(founder.name)}`}
                      className="text-blue-600 font-semibold hover:underline inline-flex items-center gap-1 ml-auto"
                    >
                      <span>Inquire with {founder.name.split(" ")[0]}</span> →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Credibility Statement Box */}
          <div className="mt-16 max-w-3xl mx-auto p-6 rounded-card bg-white border border-gray-200 shadow-sm flex items-start gap-4 text-xs text-gray-600 leading-relaxed">
            <ShieldCheck className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <strong className="text-navy-950 block mb-1">Authentic Team Governance:</strong>
              In strict accordance with NEXVORA&apos;s corporate governance, all technical credentials, institutional affiliations, and code repositories are verified. We do not publish stock-photo personnel, fictitious advisory boards, or unverified staff.
            </div>
          </div>
        </div>
      </section>

      {/* Direct Contact CTA */}
      <section className="py-20 bg-navy-950 text-white text-center">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-6">
          <h2 className="text-3xl font-bold font-heading">
            Schedule a Technical Session with the Founders
          </h2>
          <p className="text-base text-gray-300">
            Discuss your system architecture, data synchronization bottlenecks, or new web build directly with Muhammad Azhar and Owais Ahmad.
          </p>
          <div className="pt-2">
            <Link
              href="/start-a-project"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-btn font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-colors"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
