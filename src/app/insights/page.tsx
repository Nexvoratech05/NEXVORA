import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import { siteConfig, insightsArticles } from "@/content/site";

export const metadata: Metadata = {
  title: "Technical Insights & Engineering Architecture Guides | NEXVORA Technologies",
  description:
    "In-depth technical whitepapers, architectural deep-dives, and engineering guides on Medallion Lakehouses, computer vision explainability, and enterprise microservices.",
  alternates: {
    canonical: "/insights",
  },
  openGraph: {
    title: "Technical Insights & Engineering Architecture Guides | NEXVORA Technologies",
    description:
      "In-depth technical whitepapers, architectural deep-dives, and engineering guides on Medallion Lakehouses, computer vision explainability, and enterprise microservices.",
    url: `${siteConfig.url}/insights`,
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Insights & Engineering Architecture Guides | NEXVORA Technologies",
    description:
      "In-depth technical whitepapers, architectural deep-dives, and engineering guides on Medallion Lakehouses, computer vision explainability, and enterprise microservices.",
    images: ["/og-image.png"],
  },
};

export default function InsightsPage() {
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
            name: "Insights",
            item: `${siteConfig.url}/insights`,
          },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "NEXVORA Engineering Insights",
        description:
          "Practical architecture guides and technical engineering deep-dives covering Medallion Lakehouses, telephony microservices, and explainable medical AI.",
        url: `${siteConfig.url}/insights`,
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
                Insights
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-900 border border-navy-700 text-cyan-400 text-xs font-mono font-semibold">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Technical Architecture Whitepapers</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white">
              Engineering Insights &amp; Guides
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              In-depth technical guides, architecture breakdowns, and practical
              engineering lessons authored by our founding engineers. No generic
              marketing fluff—only concrete code patterns, system designs, and
              verified architectural trade-offs.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid (Light Gray #F4F7FB) */}
      <section className="py-16 sm:py-20 bg-gray-50 border-b border-gray-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {insightsArticles.map((article) => (
              <article
                key={article.slug}
                className="bg-white rounded-2xl border border-gray-200 p-7 flex flex-col justify-between hover:border-blue-300 hover:shadow-lg transition-all duration-200 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-blue-600 font-semibold uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span className="text-gray-400 font-mono flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readingTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold font-heading text-navy-950 group-hover:text-blue-600 transition-colors leading-snug">
                    <Link href={`/insights/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h2>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {article.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-gray-50 text-gray-600 border border-gray-200/80"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-navy-950 block">
                      {article.author.name}
                    </span>
                    <span className="text-[11px] text-gray-500 font-sans block">
                      {article.author.role}
                    </span>
                  </div>

                  <Link
                    href={`/insights/${article.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors group-hover:translate-x-0.5 transform duration-150"
                  >
                    Read Guide <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy-950 rounded-2xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border border-navy-700">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold block">
                Engineering Collaboration
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                Need to implement these architectures in your company?
              </h2>
              <p className="text-sm text-gray-300">
                Founders Muhammad Azhar and Owais Ahmad lead client engagements
                directly, architecting customized lakehouse pipelines, cloud
                microservices, and AI integrations.
              </p>
            </div>
            <Link
              href="/start-a-project"
              className="inline-flex items-center justify-center h-12 px-6 rounded-btn font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all duration-150 flex-shrink-0"
            >
              Start an Architecture Review <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
