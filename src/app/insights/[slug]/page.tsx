import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  Clock,
  Calendar,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import { siteConfig, insightsArticles } from "@/content/site";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return insightsArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = insightsArticles.find((a) => a.slug === params.slug);
  if (!article) return {};

  const seoTitle = `${article.title} | NEXVORA Technical Insights`;

  return {
    title: seoTitle,
    description: article.excerpt,
    alternates: {
      canonical: `/insights/${article.slug}`,
    },
    openGraph: {
      title: seoTitle,
      description: article.excerpt,
      type: "article",
      url: `${siteConfig.url}/insights/${article.slug}`,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      tags: article.tags,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: article.excerpt,
      images: ["/og-image.png"],
    },
  };
}

export default function InsightArticlePage({ params }: PageProps) {
  const article = insightsArticles.find((a) => a.slug === params.slug);
  if (!article) notFound();

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
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: `${siteConfig.url}/insights/${article.slug}`,
          },
        ],
      },
      {
        "@type": "TechArticle",
        headline: article.title,
        description: article.excerpt,
        author: {
          "@type": "Person",
          name: article.author.name,
          jobTitle: article.author.role,
        },
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        url: `${siteConfig.url}/insights/${article.slug}`,
        keywords: article.tags.join(", "),
      },
    ],
  };

  // Convert basic markdown to clean paragraphs & pre code blocks
  const renderMarkdown = (content: string) => {
    const sections = content.split("```");
    return sections.map((section, idx) => {
      if (idx % 2 === 1) {
        // Code block
        const lines = section.trim().split("\n");
        const lang = lines[0].trim();
        const code = lines.slice(1).join("\n");
        return (
          <div key={idx} className="my-6 rounded-xl overflow-hidden border border-navy-700 bg-navy-950">
            <div className="bg-navy-900 px-4 py-2 text-xs font-mono text-cyan-400 border-b border-navy-800 flex items-center justify-between">
              <span>{lang || "code"}</span>
              <span className="text-gray-400 text-[10px]">Architecture Spec</span>
            </div>
            <pre className="p-4 text-xs font-mono text-gray-200 overflow-x-auto leading-relaxed">
              <code>{code || section}</code>
            </pre>
          </div>
        );
      }

      // Normal text and headings
      const lines = section.split("\n");
      return (
        <div key={idx} className="space-y-4">
          {lines.map((line, lineIdx) => {
            const trimmed = line.trim();
            if (!trimmed) return null;

            if (trimmed.startsWith("### ")) {
              return (
                <h3 key={lineIdx} className="text-xl font-bold font-heading text-navy-950 mt-8 mb-3">
                  {trimmed.replace("### ", "")}
                </h3>
              );
            }
            if (trimmed.startsWith("## ")) {
              return (
                <h2 key={lineIdx} className="text-2xl font-extrabold font-heading text-navy-950 mt-10 mb-4 pb-2 border-b border-gray-100">
                  {trimmed.replace("## ", "")}
                </h2>
              );
            }
            if (trimmed.startsWith("#### ")) {
              return (
                <h4 key={lineIdx} className="text-lg font-bold font-heading text-navy-900 mt-6 mb-2">
                  {trimmed.replace("#### ", "")}
                </h4>
              );
            }
            if (trimmed.startsWith("- ")) {
              return (
                <li key={lineIdx} className="text-sm text-gray-700 ml-6 list-disc leading-relaxed">
                  {trimmed.replace("- ", "")}
                </li>
              );
            }
            if (trimmed.match(/^[0-9]+\.\s/)) {
              return (
                <li key={lineIdx} className="text-sm text-gray-700 ml-6 list-decimal leading-relaxed">
                  {trimmed.replace(/^[0-9]+\.\s/, "")}
                </li>
              );
            }

            return (
              <p key={lineIdx} className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {trimmed}
              </p>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header (Dark Navy #071426) */}
      <section className="bg-navy-950 text-white pt-32 pb-16 border-b border-navy-700">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-gray-400">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-cyan-400">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/insights" className="hover:text-cyan-400">
                  Insights
                </Link>
              </li>
              <li>/</li>
              <li className="text-cyan-400 font-medium truncate max-w-xs sm:max-w-md" aria-current="page">
                {article.title}
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="px-2.5 py-1 rounded-full bg-navy-900 border border-navy-700 text-cyan-400 font-mono font-semibold uppercase tracking-wider">
                {article.category}
              </span>
              <span className="text-gray-400 font-mono flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                {article.readingTime}
              </span>
              <span className="text-gray-400 font-mono flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                {article.publishedAt}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight">
              {article.title}
            </h1>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              {article.excerpt}
            </p>

            <div className="pt-4 flex items-center gap-3 border-t border-navy-800">
              <div className="w-9 h-9 rounded-full bg-navy-800 border border-cyan-400/30 flex items-center justify-center font-bold font-mono text-cyan-400 text-xs">
                {article.author.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <span className="text-xs font-semibold text-white block">
                  {article.author.name}
                </span>
                <span className="text-[11px] text-gray-400 font-sans block">
                  {article.author.role}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content (Light Gray #F4F7FB) */}
      <section className="py-16 sm:py-20 bg-gray-50 border-b border-gray-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Article Body */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200 p-8 sm:p-12 shadow-sm space-y-6">
              {renderMarkdown(article.content)}

              <div className="pt-8 mt-10 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-gray-50 text-gray-600 border border-gray-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <Link
                  href="/insights"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to All Insights
                </Link>
              </div>
            </div>

            {/* Sidebar Cards */}
            <div className="lg:col-span-4 space-y-6">
              {/* Author Card */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-blue-600 font-semibold block">
                  Article Author
                </span>
                <h3 className="text-lg font-bold font-heading text-navy-950">
                  {article.author.name}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {article.author.role} at NEXVORA Technologies. Leading core system
                  architecture, data engineering pipelines, and verified client solutions.
                </p>
                <div className="pt-2">
                  <Link
                    href="/team"
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                  >
                    View Leadership Profile <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* Related Service Division */}
              <div className="bg-navy-950 text-white rounded-2xl border border-navy-700 p-6 shadow-sm space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold block">
                  Engineering Division
                </span>
                <h3 className="text-lg font-bold font-heading text-white">
                  Need this in production?
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  We engineer these exact systems for international clients. Work
                  directly with technical leads on systems design and deployment.
                </p>
                <div className="pt-2">
                  <Link
                    href={`/services/${article.serviceSlug}`}
                    className="inline-flex items-center justify-center h-10 px-4 rounded-btn font-semibold text-xs bg-blue-600 hover:bg-blue-700 text-white transition-colors w-full"
                  >
                    Explore Division Capabilities <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Link>
                </div>
              </div>

              {/* Related Case Study if available */}
              {article.projectSlug && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-3">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-gray-500 font-semibold block">
                    Verified Case Study
                  </span>
                  <h4 className="text-sm font-bold font-heading text-navy-950">
                    See Real Architecture Deliverables
                  </h4>
                  <p className="text-xs text-gray-600">
                    Inspect the full technical schematic and engineering deliverables
                    for this architecture.
                  </p>
                  <Link
                    href={`/projects/${article.projectSlug}`}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                  >
                    View Full Case Study <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
