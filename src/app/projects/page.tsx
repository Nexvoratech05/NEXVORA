import React, { Suspense } from "react";
import Link from "next/link";
import { Metadata } from "next";
import { projectsData, siteConfig } from "@/content/site";
import { ProjectFilters } from "@/components/ProjectFilters";

export const metadata: Metadata = {
  title: "Architecture Case Studies & System Blueprints | NEXVORA Technologies",
  description:
    "Explore production-grade architectures and case studies across lakehouses, medical computer vision, telephony CRM, biometric ERP integration, and multi-agent RAG.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Architecture Case Studies & System Blueprints | NEXVORA Technologies",
    description:
      "Explore production-grade architectures and case studies across lakehouses, medical computer vision, telephony CRM, biometric ERP integration, and multi-agent RAG.",
    url: `${siteConfig.url}/projects`,
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Architecture Case Studies & System Blueprints | NEXVORA Technologies",
    description:
      "Explore production-grade architectures and case studies across lakehouses, medical computer vision, telephony CRM, biometric ERP integration, and multi-agent RAG.",
    images: ["/og-image.png"],
  },
};

export default function ProjectsPage() {
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
            name: "Case Studies & Architecture",
            item: `${siteConfig.url}/projects`,
          },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "Architecture Case Studies & System Blueprints",
        description:
          "Production-grade technical case studies and architectural reference designs engineered by NEXVORA Technologies.",
        url: `${siteConfig.url}/projects`,
        hasPart: projectsData.map((p) => ({
          "@type": "CreativeWork",
          name: p.title,
          headline: p.title,
          description: p.summary,
          url: `${siteConfig.url}/projects/${p.slug}`,
          image: p.images[0] ? `${siteConfig.url}${p.images[0]}` : undefined,
          keywords: p.technologies.join(", "),
        })),
      },
    ],
  };

  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
              <li className="text-cyan-400 font-medium" aria-current="page">Projects</li>
            </ol>
          </nav>

          <div className="max-w-3xl space-y-4">
            <span className="eyebrow text-cyan-400">Portfolio &amp; Case Studies</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white">
              Selected Work &amp; Architecture
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Explore our software systems, cloud migrations, and CRM pipelines. Every case study represents verified engineering architecture and concept reference builds.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Filterable Grid */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="text-sm text-gray-400 py-12 text-center">Loading portfolio projects...</div>}>
            <ProjectFilters projects={projectsData} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}

