import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  Code2,
  Cloud,
  Database,
  Users,
  Cpu,
  Layout,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import { services } from "@/content/site";

export const metadata: Metadata = {
  title: "Services — Software, Cloud, Data, CRM & AI",
  description:
    "Custom software, cloud infrastructure, data engineering, CRM solutions, AI automation and web design from NEXVORA.",
  alternates: {
    canonical: "/services",
  },
};

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-7 h-7 text-blue-600" />,
  Cloud: <Cloud className="w-7 h-7 text-blue-600" />,
  Database: <Database className="w-7 h-7 text-blue-600" />,
  Users: <Users className="w-7 h-7 text-blue-600" />,
  Cpu: <Cpu className="w-7 h-7 text-blue-600" />,
  Layout: <Layout className="w-7 h-7 text-blue-600" />,
};

export default function ServicesPage() {
  return (
    <div className="w-full">
      {/* Page Hero */}
      <section className="bg-navy-950 text-white pt-32 pb-20 border-b border-navy-700">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-gray-400">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-cyan-400">Home</Link>
              </li>
              <li>/</li>
              <li className="text-cyan-400 font-medium" aria-current="page">Services</li>
            </ol>
          </nav>

          <div className="max-w-3xl space-y-4">
            <span className="eyebrow text-cyan-400">Engineering Capabilities</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white">
              Core Technical Services
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              We specialize in the critical engineering disciplines required to scale modern digital operations: custom software systems, resilient cloud infrastructure, automated data pipelines, sales CRM integration, and practical business automation.
            </p>
          </div>
        </div>
      </section>

      {/* 6 Service Cards in a 3x2 Grid (Desktop), Stacked on Mobile */}
      <section className="py-20 sm:py-24 bg-white border-b border-gray-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc) => (
              <div
                key={svc.slug}
                className="group bg-white rounded-card border border-gray-200 hover:border-blue-600 p-8 transition-all duration-200 shadow-sm hover:shadow-lg flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:bg-blue-600/10 transition-colors">
                    {iconMap[svc.iconName] || <Code2 className="w-7 h-7 text-blue-600" />}
                  </div>
                  <h2 className="text-2xl font-bold font-heading text-navy-950 group-hover:text-blue-600 transition-colors">
                    {svc.title}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {svc.heroOutcome}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    href={`/services/${svc.slug}`}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1.5"
                  >
                    <span>Full Specifications</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href={`/start-a-project?service=${svc.slug}`}
                    className="text-xs text-gray-400 hover:text-navy-950 underline"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* "Not Sure What You Need?" Panel */}
          <div className="mt-16 bg-navy-900 border border-navy-700 text-white rounded-2xl p-8 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-xl">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-950 border border-navy-700 text-cyan-400 text-xs font-semibold">
                <HelpCircle className="w-4 h-4" />
                <span>Architecture Discovery</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading">
                Not sure what you need or where to start?
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                Book a direct technical discovery call with founders Muhammad Azhar and Owais Ahmad. We will map your bottlenecks, evaluate your existing architecture, and provide honest recommendations on scope and feasibility.
              </p>
            </div>

            <div className="flex-shrink-0">
              <Link
                href="/contact"
                className="h-12 px-6 rounded-btn font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
              >
                <span>Schedule a Discovery Call</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Engagement Models Section */}
          <div className="mt-20">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="eyebrow text-blue-600">Flexible Collaboration</span>
              <h2 className="text-3xl font-bold font-heading text-navy-950">
                Engagement Models
              </h2>
              <p className="text-sm text-gray-600">
                Transparent commercial terms tailored to your timeline, certainty needs, and governance constraints.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 border border-gray-200 rounded-card p-6 space-y-3">
                <span className="text-xs font-mono font-bold text-blue-600">MODEL 01</span>
                <h3 className="text-lg font-bold font-heading text-navy-950">Fixed-Scope Project</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Best for MVPs, specific feature sets, cloud migrations, or website builds with clearly defined deliverables and fixed delivery deadlines.
                </p>
                <ul className="text-xs text-gray-500 space-y-1.5 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    Guaranteed milestone budget
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    Bi-weekly demo checkpoints
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 border border-blue-600/50 rounded-card p-6 space-y-3 relative shadow-sm">
                <span className="text-xs font-mono font-bold text-blue-600">MODEL 02</span>
                <h3 className="text-lg font-bold font-heading text-navy-950">Dedicated Engineering Team</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Best for growing companies needing dedicated monthly engineering capacity across software, cloud, and data without long-term hiring overhead.
                </p>
                <ul className="text-xs text-gray-500 space-y-1.5 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    Direct founder steering
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    Flexible backlog sprint planning
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-card p-6 space-y-3">
                <span className="text-xs font-mono font-bold text-blue-600">MODEL 03</span>
                <h3 className="text-lg font-bold font-heading text-navy-950">Technical Advisory</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Best for technical due diligence, cloud architecture audits, vendor evaluation, and CRM data strategy before committing large budgets.
                </p>
                <ul className="text-xs text-gray-500 space-y-1.5 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    Comprehensive audit reports
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    Actionable architecture blueprints
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

