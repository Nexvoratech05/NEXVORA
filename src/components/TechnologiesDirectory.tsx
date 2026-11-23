"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowRight, ExternalLink, Filter } from "lucide-react";
import { TechnologyItem } from "@/content/site";

interface Props {
  technologies: TechnologyItem[];
}

const CATEGORIES = [
  "All Domains",
  "Cloud & DevOps",
  "Data Engineering & Lakehouses",
  "Artificial Intelligence & Vision",
  "Generative AI & Agentic Systems",
  "Software & API Engineering",
  "Enterprise Automation & Hardware Protocols",
] as const;

export function TechnologiesDirectory({ technologies }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Domains");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredTechnologies = useMemo(() => {
    return technologies.filter((tech) => {
      const matchesCategory =
        selectedCategory === "All Domains" || tech.category === selectedCategory;
      const matchesSearch =
        tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [technologies, selectedCategory, searchQuery]);

  const getStatusColor = (status: TechnologyItem["verifiedStatus"]) => {
    switch (status) {
      case "Demonstrated Implementation":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/80";
      case "Academic Benchmark":
        return "bg-purple-50 text-purple-700 border-purple-200/80";
      case "Internal Engineering System":
        return "bg-blue-50 text-blue-700 border-blue-200/80";
      case "Reference Architecture":
        return "bg-cyan-50 text-cyan-800 border-cyan-200/80";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200/80";
    }
  };

  return (
    <div className="space-y-8">
      {/* Search & Category Filter Controls */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search frameworks, tools, protocols (e.g. PySpark, FastAPI, AWS)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm text-navy-950 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500 font-mono flex-shrink-0">
            <Filter className="w-3.5 h-3.5 text-blue-600" />
            <span>Showing {filteredTechnologies.length} of {technologies.length} Technologies</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-navy-950 text-cyan-400 shadow-sm"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-navy-950 border border-gray-200/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Technology Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTechnologies.map((tech) => (
          <div
            key={tech.id}
            className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition-all duration-150 group"
          >
            <div className="space-y-3.5">
              <div className="flex items-start justify-between gap-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-blue-600 font-semibold block">
                  {tech.category}
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full border uppercase tracking-wider font-semibold ${getStatusColor(
                    tech.verifiedStatus
                  )}`}
                >
                  {tech.verifiedStatus}
                </span>
              </div>

              <h3 className="text-lg font-bold font-heading text-navy-950 group-hover:text-blue-600 transition-colors">
                {tech.name}
              </h3>

              <p className="text-xs text-gray-600 leading-relaxed">
                {tech.role}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs">
              <Link
                href={`/services/${tech.relevantServiceSlug}`}
                className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1 transition-colors"
              >
                Service Division <ArrowRight className="w-3 h-3" />
              </Link>

              {tech.relevantProjectSlug && (
                <Link
                  href={`/projects/${tech.relevantProjectSlug}`}
                  className="text-gray-500 hover:text-navy-950 font-mono inline-flex items-center gap-1 transition-colors"
                >
                  Case Study <ExternalLink className="w-3 h-3" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredTechnologies.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center space-y-3">
          <p className="text-sm font-semibold text-navy-950">No technologies found matching &quot;{searchQuery}&quot;</p>
          <p className="text-xs text-gray-500">Try adjusting your keyword or reset to &quot;All Domains&quot;.</p>
          <button
            onClick={() => {
              setSelectedCategory("All Domains");
              setSearchQuery("");
            }}
            className="inline-flex items-center px-4 py-2 text-xs font-semibold rounded-btn bg-navy-950 text-white hover:bg-blue-600 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
