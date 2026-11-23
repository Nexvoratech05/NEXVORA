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
} from "lucide-react";
import { services, siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Specialized Engineering Divisions & Solutions | NEXVORA Technologies",
  description:
    "Explore NEXVORA's six specialized engineering divisions: Data Lakehouses, AI & Vision, Generative AI & Agents, Cloud & DevOps, Software & APIs, and Enterprise ERP Automation.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Specialized Engineering Divisions & Solutions | NEXVORA Technologies",
    description:
      "Explore NEXVORA's six specialized engineering divisions: Data Lakehouses, AI & Vision, Generative AI & Agents, Cloud & DevOps, Software & APIs, and Enterprise ERP Automation.",
    url: `${siteConfig.url}/services`,
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Specialized Engineering Divisions & Solutions | NEXVORA Technologies",
    description:
      "Explore NEXVORA's six specialized engineering divisions: Data Lakehouses, AI & Vision, Generative AI & Agents, Cloud & DevOps, Software & APIs, and Enterprise ERP Automation.",
    images: ["/og-image.png"],
  },
};

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-6 h-6 text-cyan-400" />,
  Cloud: <Cloud className="w-6 h-6 text-cyan-400" />,
  Database: <Database className="w-6 h-6 text-cyan-400" />,
  Users: <Users className="w-6 h-6 text-cyan-400" />,
  Cpu: <Cpu className="w-6 h-6 text-cyan-400" />,
  Layout: <Layout className="w-6 h-6 text-cyan-400" />,
};

export default function ServicesPage() {
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
            name: "Services",
            item: `${siteConfig.url}/services`,
          },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "Specialized Engineering Divisions & Solutions",
        description:
          "Explore NEXVORA's six core engineering divisions spanning Lakehouses, AI, Generative AI, Cloud DevOps, Custom Software, and ERP Automation.",
        url: `${siteConfig.url}/services`,
        hasPart: services.map((svc) => ({
          "@type": "Service",
          name: svc.title,
          description: svc.heroOutcome,
          url: `${siteConfig.url}/services/${svc.slug}`,
          provider: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
          },
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-900 border border-navy-700 text-cyan-400 text-xs font-mono font-semibold">
              <span>Six Major Engineering Divisions</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white">
              Engineering Disciplines &amp; Technical Capabilities
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              We specialize in the foundational engineering pillars that power modern digital enterprises: scalable data platforms, deep AI/ML systems, enterprise Generative AI, resilient cloud topologies, bespoke software systems, and end-to-end business automation.
            </p>
          </div>
        </div>
      </section>

      {/* 6 Engineering Divisions in Detail */}
      <section className="py-20 sm:py-24 bg-gray-50 border-b border-gray-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc) => (
              <div
                key={svc.slug}
                className="group bg-white rounded-2xl border border-gray-200 hover:border-blue-600 p-8 transition-all duration-200 shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 border border-blue-200/60 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {svc.divisionNumber}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-navy-950 flex items-center justify-center">
                      {iconMap[svc.iconName] || <Code2 className="w-5 h-5 text-cyan-400" />}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold font-heading text-navy-950 group-hover:text-blue-600 transition-colors">
                      {svc.title}
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed mt-2.5">
                      {svc.heroOutcome}
                    </p>
                  </div>

                  {/* Sub-services highlight */}
                  <div className="pt-3 border-t border-gray-100">
                    <span className="text-[11px] font-mono text-gray-500 uppercase tracking-wider font-semibold block mb-2.5">
                      Specialized Capabilities:
                    </span>
                    <ul className="space-y-1.5 text-xs text-gray-700">
                      {svc.subServices.slice(0, 4).map((sub, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span>{sub.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
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
                    className="text-xs text-gray-400 hover:text-navy-950 font-medium underline"
                  >
                    Request Scope
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Discipline Synergy */}
      <section className="py-20 sm:py-24 bg-navy-950 text-white">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 space-y-3">
            <span className="eyebrow text-cyan-400">Architectural Cohesion</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white">
              Why Full-Stack Engineering Matters
            </h2>
            <p className="text-base text-gray-300">
              Isolated specialists create brittle integration seams. We connect cloud architecture, data pipelines, and intelligent software into unified, high-performance engines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-navy-900 border border-navy-700 space-y-3">
              <h3 className="text-lg font-bold font-heading text-white">
                1. Data-Informed Software
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                We build web applications that interact with normalized data models, sub-second analytical caches, and event-driven data streaming layers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-navy-900 border border-navy-700 space-y-3">
              <h3 className="text-lg font-bold font-heading text-white">
                2. Private, Grounded AI
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Rather than generic wrappers, we embed RAG architectures grounded in your proprietary databases and private object stores with strict security controls.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-navy-900 border border-navy-700 space-y-3">
              <h3 className="text-lg font-bold font-heading text-white">
                3. Automated Reliability
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Every solution ships with automated CI/CD pipelines, containerized Docker runtimes, and multi-region disaster recovery topologies.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
