"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ProjectItem } from "@/content/site";
import { ArrowRight, RotateCcw } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface ProjectFiltersProps {
  projects: ProjectItem[];
}

export function ProjectFilters({ projects }: ProjectFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentService = searchParams.get("service") || "all";
  const currentIndustry = searchParams.get("industry") || "all";

  // Derive unique services & industries from real project data
  const servicesList = useMemo(() => {
    const list = Array.from(new Set(projects.map((p) => p.serviceSlug)));
    return list;
  }, [projects]);

  const industriesList = useMemo(() => {
    const list = Array.from(new Set(projects.map((p) => p.industry)));
    return list;
  }, [projects]);

  const setFilter = (type: "service" | "industry", val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val === "all") {
      params.delete(type);
    } else {
      params.set(type, val);
    }
    trackEvent("project_filter", { filterType: type, value: val });
    router.push(`/projects?${params.toString()}`, { scroll: false });
  };

  const resetFilters = () => {
    router.push("/projects", { scroll: false });
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchService = currentService === "all" || p.serviceSlug === currentService;
      const matchIndustry = currentIndustry === "all" || p.industry === currentIndustry;
      return matchService && matchIndustry;
    });
  }, [projects, currentService, currentIndustry]);

  return (
    <div className="space-y-10">
      {/* Filters Bar */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-6">
        {/* Service Filters */}
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-navy-950 font-heading block">
            Filter by Service Domain
          </span>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Service Filter Chips">
            <button
              onClick={() => setFilter("service", "all")}
              aria-pressed={currentService === "all"}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                currentService === "all"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-gray-400"
              }`}
            >
              All Services
            </button>
            {servicesList.map((slug) => {
              const matchedProject = projects.find((p) => p.serviceSlug === slug);
              const name = matchedProject ? matchedProject.serviceName : slug;
              const isActive = currentService === slug;
              return (
                <button
                  key={slug}
                  onClick={() => setFilter("service", slug)}
                  aria-pressed={isActive}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Industry Filters */}
        <div className="space-y-2 pt-2 border-t border-gray-200/60">
          <span className="text-xs font-semibold uppercase tracking-wider text-navy-950 font-heading block">
            Filter by Industry
          </span>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Industry Filter Chips">
            <button
              onClick={() => setFilter("industry", "all")}
              aria-pressed={currentIndustry === "all"}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                currentIndustry === "all"
                  ? "bg-navy-950 text-white shadow-sm"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-gray-400"
              }`}
            >
              All Industries
            </button>
            {industriesList.map((ind) => {
              const isActive = currentIndustry === ind;
              return (
                <button
                  key={ind}
                  onClick={() => setFilter("industry", ind)}
                  aria-pressed={isActive}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? "bg-navy-950 text-white shadow-sm"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {ind}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Screen reader live announcement */}
      <div aria-live="polite" className="text-xs text-gray-500 font-mono">
        Showing {filteredProjects.length} of {projects.length} project entries.
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group bg-white rounded-card border border-gray-200 hover:border-blue-600 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col"
            >
              {/* 16:10 Image Frame */}
              <div className="aspect-[16/10] bg-navy-950 relative overflow-hidden border-b border-gray-100 flex items-center justify-center p-4">
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  width={800}
                  height={500}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-navy-950/90 text-cyan-300 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md border border-navy-700">
                  {project.client}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider font-heading">
                    <span>{project.serviceName}</span>
                    <span>·</span>
                    <span className="text-gray-400">{project.industry}</span>
                  </div>
                  <h2 className="text-lg font-bold font-heading text-navy-950 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {project.title}
                  </h2>
                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span className="font-mono">{project.technologies.slice(0, 3).join(" · ")}</span>
                  <span className="font-semibold text-blue-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Read Case Study →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-12 text-center space-y-4">
          <h3 className="text-lg font-bold font-heading text-navy-950">
            No projects match the selected filters
          </h3>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            We are continuously documenting case studies. Try resetting filters or discuss your specific domain requirements with the founders.
          </p>
          <div className="pt-2 flex items-center justify-center gap-4">
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-white border border-gray-300 rounded-btn text-xs font-semibold text-navy-950 hover:bg-gray-50 inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
            <Link
              href="/start-a-project"
              className="px-4 py-2 bg-blue-600 text-white rounded-btn text-xs font-semibold hover:bg-blue-700 inline-flex items-center gap-1.5"
            >
              Start a Project <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

