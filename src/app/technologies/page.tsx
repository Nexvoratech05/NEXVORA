import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Cpu, ShieldCheck, ArrowRight } from "lucide-react";
import { siteConfig, technologiesData } from "@/content/site";
import { TechnologiesDirectory } from "@/components/TechnologiesDirectory";

export const metadata: Metadata = {
  title: "Technology Ecosystem & Cloud Toolchain Directory | NEXVORA Technologies",
  description:
    "Explore the 36+ verified frameworks, distributed data platforms, and cloud environments engineered at NEXVORA: Spark, Databricks, PyTorch, FastAPI, Next.js, AWS & Azure.",
  alternates: {
    canonical: "/technologies",
  },
  openGraph: {
    title: "Technology Ecosystem & Cloud Toolchain Directory | NEXVORA Technologies",
    description:
      "Explore the 36+ verified frameworks, distributed data platforms, and cloud environments engineered at NEXVORA: Spark, Databricks, PyTorch, FastAPI, Next.js, AWS & Azure.",
    url: `${siteConfig.url}/technologies`,
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technology Ecosystem & Cloud Toolchain Directory | NEXVORA Technologies",
    description:
      "Explore the 36+ verified frameworks, distributed data platforms, and cloud environments engineered at NEXVORA: Spark, Databricks, PyTorch, FastAPI, Next.js, AWS & Azure.",
    images: ["/og-image.png"],
  },
};

export default function TechnologiesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Technologies",
            item: `${siteConfig.url}/technologies`,
          },
        ],
      },
      {
        "@type": "ItemPage",
        name: "NEXVORA Technology Ecosystem",
        description:
          "Verified engineering frameworks, databases, cloud platforms, and AI toolchains utilized by NEXVORA Technologies.",
        url: `${siteConfig.url}/technologies`,
      },
    ],
  };

  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section (Dark Navy #071426) */}
      <section className="bg-navy-950 text-white pt-32 pb-20 border-b border-navy-700">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-gray-400">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-cyan-400">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-cyan-400 font-medium" aria-current="page">
                Technologies
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-900 border border-navy-700 text-cyan-400 text-xs font-mono font-semibold">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Full-Stack Engineering Toolchain</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white">
              Technology Ecosystem &amp; Stacks
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              We select mature, proven, and maintainable engineering technologies.
              From distributed PySpark compute and Databricks lakehouses to AWS
              serverless microservices and typed Next.js applications, explore
              our verified toolchain across six specialized domains.
            </p>
          </div>
        </div>
      </section>

      {/* Directory Section (Light Gray #F4F7FB) */}
      <section className="py-16 sm:py-20 bg-gray-50 border-b border-gray-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 bg-blue-50/80 border border-blue-200/60 rounded-xl p-4 sm:p-5 flex items-start gap-3.5 text-xs text-blue-900">
            <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-semibold block text-navy-950">
                Engineering Transparency &amp; Verified Classifications
              </strong>
              <p className="text-gray-700 leading-relaxed">
                Technologies displayed below correspond to demonstrated production
                architectures, internal benchmarks, and verified reference designs
                authored by founding engineers Muhammad Azhar and Owais Ahmad. We
                maintain strict technical honesty and do not claim unverified
                enterprise partnerships.
              </p>
            </div>
          </div>

          <TechnologiesDirectory technologies={technologiesData} />
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-16 bg-white">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy-950 rounded-2xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border border-navy-700">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold block">
                Architectural Fit Assessment
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                Have a specific technology stack in mind?
              </h2>
              <p className="text-sm text-gray-300">
                Whether migrating legacy databases to a modern lakehouse or
                deploying serverless microservices on AWS, our founding engineers
                conduct targeted feasibility audits.
              </p>
            </div>
            <Link
              href="/start-a-project"
              className="inline-flex items-center justify-center h-12 px-6 rounded-btn font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all duration-150 flex-shrink-0"
            >
              Request Architectural Scope <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
