import React, { Suspense } from "react";
import Link from "next/link";
import { Metadata } from "next";
import { projectsData } from "@/content/site";
import { ProjectFilters } from "@/components/ProjectFilters";

export const metadata: Metadata = {
  title: "Projects & Architecture Reference — NEXVORA Technologies",
  description:
    "Selected software, data and cloud engineering architecture by NEXVORA. Technical reference designs and internal concept builds.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
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

