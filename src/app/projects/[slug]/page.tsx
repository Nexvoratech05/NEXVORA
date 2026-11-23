import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ArrowLeft, ArrowRight, CheckCircle2, Info, ExternalLink, Github } from "lucide-react";
import { projectsData, siteConfig } from "@/content/site";
import { ArchitectureModalViewer } from "@/components/ArchitectureModalViewer";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs: { slug: string }[] = [];
  projectsData.forEach((p) => {
    slugs.push({ slug: p.slug });
    if (p.aliases) {
      p.aliases.forEach((alias) => slugs.push({ slug: alias }));
    }
  });
  return slugs;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = projectsData.find(
    (p) => p.slug === params.slug || p.aliases?.includes(params.slug)
  );
  if (!project) return {};

  const seoTitle = `${project.title} — System Architecture Case Study | NEXVORA`;

  return {
    title: seoTitle,
    description: `${project.summary} Engineered with ${project.technologies.slice(0, 4).join(", ")}.`,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: seoTitle,
      description: project.summary,
      url: `${siteConfig.url}/projects/${project.slug}`,
      type: "article",
      images: [
        {
          url: project.images[0] || "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${project.title} Technical Architecture Blueprint`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: project.summary,
      images: [project.images[0] || "/og-image.png"],
    },
  };
}

export default function ProjectDetailPage({ params }: PageProps) {
  const currentIndex = projectsData.findIndex(
    (p) => p.slug === params.slug || p.aliases?.includes(params.slug)
  );
  if (currentIndex === -1) {
    notFound();
  }

  const project = projectsData[currentIndex];
  const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : null;
  const nextProject = currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : null;

  const classificationColor: Record<string, string> = {
    "Client Engagement": "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    "Academic Research": "bg-purple-500/10 text-purple-300 border-purple-500/30",
    "Demonstration": "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
    "Internal Project": "bg-blue-500/10 text-blue-300 border-blue-500/30",
  };

  // JSON-LD Schema (CreativeWork & BreadcrumbList)
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
            "name": "Projects",
            "item": `${siteConfig.url}/projects`,
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": project.title,
            "item": `${siteConfig.url}/projects/${project.slug}`,
          },
        ],
      },
      {
        "@type": "CreativeWork",
        "name": project.title,
        "headline": project.title,
        "description": project.summary,
        "genre": "Architecture Reference / Engineering Case Study",
        "isBasedOn": project.client,
        "creativeWorkStatus": project.classification,
        "author": {
          "@type": "Organization",
          "name": siteConfig.name,
          "url": siteConfig.url,
        },
        "image": project.images[0] ? `${siteConfig.url}${project.images[0]}` : undefined,
        "keywords": project.technologies.join(", "),
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
              <li>
                <Link href="/projects" className="hover:text-cyan-400">Projects</Link>
              </li>
              <li>/</li>
              <li className="text-cyan-400 font-medium truncate max-w-xs" aria-current="page">
                {project.title}
              </li>
            </ol>
          </nav>

          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-blue-600/20 text-cyan-400 border border-navy-700 text-xs font-semibold">
                {project.serviceName}
              </span>
              <span className="px-3 py-1 rounded-full bg-navy-900 text-gray-300 border border-navy-700 text-xs font-mono">
                {project.industry}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-mono font-medium border ${
                  classificationColor[project.classification] || "bg-navy-900 text-cyan-300 border-navy-700"
                }`}
              >
                {project.classification}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight">
              {project.title}
            </h1>

            <p className="text-lg text-gray-300 leading-relaxed">
              {project.summary}
            </p>
          </div>
        </div>
      </section>

      {/* Main Case Study Body */}
      <section className="py-16 sm:py-20 bg-white border-b border-gray-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-12">
              {/* Engineering Case Study & Verification Notice */}
              <div className="p-5 rounded-2xl bg-blue-50/90 border border-blue-200/80 flex items-start gap-3.5 shadow-sm">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-navy-950 uppercase tracking-wider block font-heading">
                    {project.classification === "Client Engagement"
                      ? "Production Client Delivery"
                      : project.classification === "Academic Research"
                      ? "Academic Research & Peer-Reviewed Methodology"
                      : project.classification === "Internal Project"
                      ? "Internal Company Solution & Architecture Spikes"
                      : "Verified Engineering Demonstration"}
                  </span>
                  <p className="text-gray-700 leading-relaxed">
                    {project.classification === "Client Engagement"
                      ? `This case study documents verified production software, cloud architectures, and data pipelines engineered by NEXVORA's founding engineering team for ${project.client}.`
                      : project.classification === "Academic Research"
                      ? "This project represents academic research and deep learning experimentation conducted to advance clinical explainability and radiograph grading using Vision Transformers and Grad-CAM."
                      : project.classification === "Internal Project"
                      ? "This solution represents an internal engineering project built by NEXVORA to automate proprietary workflows, validate RAG pipelines, and demonstrate multi-agent tool execution."
                      : "This case study represents an architectural reference and capability demonstration engineered to showcase technical feasibility, Medallion Lakehouse patterns, and systems integration."}
                  </p>
                </div>
              </div>

              {/* Architecture Blueprint Screenshot / Diagram */}
              <div className="rounded-2xl overflow-hidden border border-gray-200 bg-navy-950 shadow-md">
                <div className="p-3 bg-navy-900 border-b border-navy-700 flex items-center justify-between text-xs text-gray-400 font-mono">
                  <span>Architecture Specification Blueprint</span>
                  <span className="text-cyan-400">Click to Inspect Full Resolution</span>
                </div>
                <div className="p-4 sm:p-6 flex items-center justify-center">
                  <ArchitectureModalViewer
                    imageSrc={project.images[0]}
                    imageAlt={`${project.title} Architecture Diagram`}
                    title={project.title}
                    classification={project.classification}
                    deliverables={project.architectureDetails}
                  />
                </div>
              </div>

              {/* Problem Statement */}
              <div className="space-y-4">
                <span className="eyebrow text-blue-600">The Problem</span>
                <h2 className="text-2xl font-bold font-heading text-navy-950">
                  Problem Statement &amp; Operational Bottleneck
                </h2>
                <p className="text-base text-gray-700 leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              {/* Solution */}
              <div className="space-y-4">
                <span className="eyebrow text-blue-600">The Engineering</span>
                <h2 className="text-2xl font-bold font-heading text-navy-950">
                  Architectural Solution &amp; Implementation Details
                </h2>
                <p className="text-base text-gray-700 leading-relaxed">
                  {project.solution}
                </p>
              </div>

              {/* Key Architecture Pillars */}
              {project.architectureDetails && project.architectureDetails.length > 0 && (
                <div className="space-y-4">
                  <span className="eyebrow text-blue-600">Systems Design</span>
                  <h3 className="text-xl font-bold font-heading text-navy-950">
                    Architectural Highlights &amp; Flow
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.architectureDetails.map((detail, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-700 leading-relaxed space-y-1"
                      >
                        <div className="flex items-center gap-2 text-blue-600 font-bold font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Pillar 0{idx + 1}</span>
                        </div>
                        <p>{detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Verified Results & Outcomes */}
              <div className="p-8 rounded-2xl bg-gray-50 border border-gray-200 space-y-4">
                <span className="eyebrow text-blue-600">Verified Impact</span>
                <h3 className="text-xl font-bold font-heading text-navy-950 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  Engineering Results &amp; Deliverables
                </h3>
                <p className="text-base text-gray-700 leading-relaxed font-medium">
                  {project.outcome}
                </p>
              </div>
            </div>

            {/* Right Meta Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-6">
                <div>
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-1">
                    Classification
                  </span>
                  <p className="text-sm font-semibold text-navy-950 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-500" aria-hidden="true" />
                    {project.classification}
                  </p>
                  <span className="text-xs text-gray-500 mt-0.5 block">{project.client}</span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-1">
                    Industry Domain
                  </span>
                  <p className="text-sm font-semibold text-navy-950">
                    {project.industry}
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-1">
                    Engineering Division
                  </span>
                  <Link
                    href={`/services/${project.serviceSlug}`}
                    className="text-sm font-semibold text-blue-600 hover:underline inline-flex items-center gap-1"
                  >
                    <span>{project.serviceName}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-1">
                    Technologies Deployed
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-tag bg-white border border-gray-200 text-xs font-mono text-navy-950"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {project.githubUrl && (
                  <div className="border-t border-gray-200 pt-4">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-navy-950 hover:text-blue-600 underline"
                    >
                      <Github className="w-4 h-4" />
                      <span>View Verified GitHub Profile</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-6">
                  <Link
                    href={`/start-a-project?service=${project.serviceSlug}`}
                    className="w-full h-11 rounded-btn bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <span>Request Similar Scope</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Next / Prev Navigation */}
          <div className="mt-16 pt-8 border-t border-gray-200 flex items-center justify-between">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group flex items-center gap-2 text-sm font-semibold text-navy-950 hover:text-blue-600"
              >
                <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                <div className="text-left">
                  <span className="text-xs text-gray-400 block font-normal">Previous</span>
                  <span>{prevProject.title}</span>
                </div>
              </Link>
            ) : <div />}

            {nextProject ? (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group flex items-center gap-2 text-sm font-semibold text-navy-950 hover:text-blue-600 text-right"
              >
                <div>
                  <span className="text-xs text-gray-400 block font-normal">Next</span>
                  <span>{nextProject.title}</span>
                </div>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>
    </div>
  );
}
