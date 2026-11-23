import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  Code2,
  Cloud,
  Database,
  Users,
  Cpu,
  Layout,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Layers,
  Sparkles,
} from "lucide-react";
import { services, projectsData, siteConfig } from "@/content/site";
import { ServiceViewTracker } from "@/components/ServiceViewTracker";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs: { slug: string }[] = [];
  services.forEach((s) => {
    slugs.push({ slug: s.slug });
    if (s.aliases) {
      s.aliases.forEach((alias) => slugs.push({ slug: alias }));
    }
  });
  return slugs;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = services.find(
    (s) => s.slug === params.slug || s.aliases?.includes(params.slug)
  );
  if (!service) return {};

  return {
    title: `${service.title} — ${service.divisionNumber} | NEXVORA`,
    description: service.heroOutcome,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | NEXVORA Technologies`,
      description: service.heroOutcome,
      url: `${siteConfig.url}/services/${service.slug}`,
      type: "website",
    },
  };
}

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-8 h-8 text-cyan-400" />,
  Cloud: <Cloud className="w-8 h-8 text-cyan-400" />,
  Database: <Database className="w-8 h-8 text-cyan-400" />,
  Users: <Users className="w-8 h-8 text-cyan-400" />,
  Cpu: <Cpu className="w-8 h-8 text-cyan-400" />,
  Layout: <Layout className="w-8 h-8 text-cyan-400" />,
};

export default function ServiceDetailPage({ params }: PageProps) {
  const service = services.find(
    (s) => s.slug === params.slug || s.aliases?.includes(params.slug)
  );
  if (!service) {
    notFound();
  }

  // Find related projects for this service
  const relatedProjects = projectsData.filter(
    (p) =>
      p.serviceSlug === service.slug ||
      service.aliases?.includes(p.serviceSlug) ||
      service.relevantProjects.some((rp) => rp.slug === p.slug)
  );

  const challenges = service.businessChallenges || service.problemSolved || [];
  const deliverables = service.expectedDeliverables || service.deliverables || [];
  const approaches = service.engineeringApproach || service.processSteps || [];

  // Schema Markup (Service, FAQPage, BreadcrumbList)
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
            "name": "Services",
            "item": `${siteConfig.url}/services`,
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": service.shortTitle,
            "item": `${siteConfig.url}/services/${service.slug}`,
          },
        ],
      },
      {
        "@type": "Service",
        "name": service.title,
        "description": service.heroOutcome,
        "provider": {
          "@type": "Organization",
          "name": siteConfig.name,
          "url": siteConfig.url,
        },
      },
      {
        "@type": "FAQPage",
        "mainEntity": service.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="w-full">
      <ServiceViewTracker serviceSlug={service.slug} serviceTitle={service.title} />
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* SECTION 1: HERO */}
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
                <Link href="/services" className="hover:text-cyan-400">Services</Link>
              </li>
              <li>/</li>
              <li className="text-cyan-400 font-medium" aria-current="page">{service.shortTitle}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-900 border border-navy-700 text-cyan-400 text-xs font-semibold">
                {iconMap[service.iconName] || <Layers className="w-4 h-4 text-cyan-400" />}
                <span className="font-mono">{service.divisionNumber}</span>
                <span>•</span>
                <span>{service.shortTitle}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight">
                {service.title}
              </h1>

              <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
                {service.heroOutcome}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href={`/start-a-project?service=${service.slug}`}
                  className="h-12 px-7 rounded-btn font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center justify-center gap-2 transition-colors"
                >
                  <span>{service.ctaLabel || `Start a ${service.shortTitle} Project`}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#capabilities"
                  className="h-12 px-6 rounded-btn font-medium text-sm border border-navy-700 hover:bg-navy-900 text-white flex items-center justify-center transition-colors"
                >
                  Explore Capabilities
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 bg-navy-900 border border-navy-700 rounded-2xl p-6 text-xs space-y-3 font-mono">
              <span className="text-cyan-400 font-bold block text-sm font-heading">Division Highlights</span>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between border-b border-navy-700/60 pb-1.5">
                  <span className="text-gray-400">Engineering Lead:</span>
                  <span className="font-sans font-semibold text-white">Founder Led</span>
                </div>
                <div className="flex justify-between border-b border-navy-700/60 pb-1.5">
                  <span className="text-gray-400">IP Ownership:</span>
                  <span className="text-white">Per Signed Agreement</span>
                </div>
                <div className="flex justify-between border-b border-navy-700/60 pb-1.5">
                  <span className="text-gray-400">Engagement Model:</span>
                  <span className="text-white">Fixed-Scope / Sprint Retainer</span>
                </div>
                <div className="flex justify-between border-b border-navy-700/60 pb-1.5">
                  <span className="text-gray-400">Security Standard:</span>
                  <span className="text-white">Least-Privilege &amp; Zero Retention</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Response Window:</span>
                  <span className="text-white">{siteConfig.contact.responseTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: SPECIALIZED SUB-SERVICES & CAPABILITIES */}
      {service.subServices && service.subServices.length > 0 && (
        <section id="capabilities" className="py-20 sm:py-24 bg-white border-b border-gray-200">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12 space-y-3">
              <span className="eyebrow text-blue-600">Core Capabilities</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-navy-950">
                Specialized Engineering Services
              </h2>
              <p className="text-base text-gray-600">
                Deep, production-grade solutions engineered under {service.title}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.subServices.map((sub, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 border border-gray-200 rounded-card p-6 flex flex-col justify-between hover:border-blue-600 transition-colors shadow-sm"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-blue-600">
                        {service.divisionNumber}.0{idx + 1}
                      </span>
                      <Sparkles className="w-4 h-4 text-cyan-500" />
                    </div>
                    <h3 className="text-base font-bold font-heading text-navy-950">
                      {sub.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {sub.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: BUSINESS CHALLENGES */}
      {challenges.length > 0 && (
        <section className="py-16 sm:py-20 bg-gray-50 border-b border-gray-200">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12 space-y-3">
              <span className="eyebrow text-blue-600">The Problem Space</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-navy-950">
                Business Challenges We Eliminate
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Organizations lose velocity when critical engineering is neglected. Here are the concrete roadblocks we resolve:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {challenges.map((prob, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-card border border-gray-200 p-6 space-y-3 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-9 h-9 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-error" />
                    </div>
                    <h3 className="text-sm font-bold font-heading text-navy-950">
                      Challenge 0{idx + 1}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {prob}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-gray-100 text-xs font-semibold text-blue-600">
                    Engineered for resolution
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 4: OUR ENGINEERING APPROACH */}
      {approaches.length > 0 && (
        <section className="py-20 sm:py-24 bg-navy-950 text-white border-b border-navy-700">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-14 space-y-3">
              <span className="eyebrow text-cyan-400">Methodology &amp; Rigor</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white">
                Our Engineering Approach
              </h2>
              <p className="text-base text-gray-300">
                How we take your {service.shortTitle} initiative from requirement discovery to production-hardened execution.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {approaches.map((step, idx) => (
                <div
                  key={step.title}
                  className="bg-navy-900 border border-navy-700 rounded-card p-6 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-cyan-400">PHASE 0{idx + 1}</span>
                    <h3 className="text-base font-bold font-heading text-white">{step.title}</h3>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 5: TECHNICAL CAPABILITIES */}
      {service.technicalCapabilities && service.technicalCapabilities.length > 0 && (
        <section className="py-16 sm:py-20 bg-white border-b border-gray-200">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10 space-y-2">
              <span className="eyebrow text-blue-600">Technical Depth</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-navy-950">
                Key Technical Capabilities
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.technicalCapabilities.map((cap, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium text-navy-950"
                >
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 6: RELEVANT TECHNOLOGIES */}
      <section className="py-16 bg-gray-50 border-b border-gray-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="eyebrow text-blue-600">Technology Ecosystem</span>
              <h2 className="text-2xl font-bold font-heading text-navy-950">
                Primary Stack for {service.shortTitle}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 rounded-tag bg-white border border-gray-200 text-xs font-mono font-semibold text-navy-950 shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: RELEVANT PROJECT EXAMPLES */}
      {relatedProjects.length > 0 && (
        <section className="py-20 sm:py-24 bg-white border-b border-gray-200">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 space-y-2">
              <span className="eyebrow text-blue-600">Case Study Evidence</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-navy-950">
                Related {service.shortTitle} Architecture
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((p) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.slug}`}
                  className="group bg-gray-50 border border-gray-200 hover:border-blue-600 rounded-card p-6 flex flex-col justify-between transition-colors shadow-sm"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-blue-600 uppercase">
                        {p.industry}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                        {p.classification}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold font-heading text-navy-950 group-hover:text-blue-600">
                      {p.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {p.summary}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-gray-200 flex items-center justify-between text-xs text-blue-600 font-semibold">
                    <span>Explore Architecture &amp; Diagrams</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 8: EXPECTED DELIVERABLES */}
      {deliverables.length > 0 && (
        <section id="deliverables" className="py-20 sm:py-24 bg-gray-50 border-b border-gray-200">
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12 space-y-3">
              <span className="eyebrow text-blue-600">Scope of Work</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-navy-950">
                Expected Engineering Deliverables
              </h2>
              <p className="text-base text-gray-600">
                Clear, testable milestones with comprehensive documentation, clean repositories, and zero ambiguity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deliverables.map((del, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-card p-6 flex items-start gap-4 hover:border-blue-600 transition-colors shadow-sm"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs font-mono">
                    0{idx + 1}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold font-heading text-navy-950">
                      {del}
                    </h3>
                    <p className="text-xs text-gray-500">
                      Production-grade implementation with automated verification and deployment scripts.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 9: FAQs */}
      <section className="py-20 sm:py-24 bg-white border-b border-gray-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-14 space-y-3">
            <span className="eyebrow text-blue-600">Common Questions</span>
            <h2 className="text-3xl font-bold font-heading text-navy-950">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-gray-600">
              Transparent answers regarding our {service.shortTitle.toLowerCase()} engineering engagements.
            </p>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-gray-50 border border-gray-200 rounded-card p-6 transition-colors open:border-blue-600 open:bg-white"
              >
                <summary className="font-bold font-heading text-base text-navy-950 cursor-pointer list-none flex items-center justify-between gap-4">
                  <span>{faq.question}</span>
                  <span className="text-blue-600 group-open:rotate-180 transition-transform font-bold text-lg">
                    ↓
                  </span>
                </summary>
                <p className="text-sm text-gray-600 leading-relaxed pt-4 border-t border-gray-100 mt-4">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: CLOSING CTA */}
      <section className="py-20 sm:py-24 bg-navy-950 text-white text-center">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-6">
          <span className="eyebrow text-cyan-400">Initiate Collaboration</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white">
            Ready to Build Your {service.shortTitle} Solution?
          </h2>
          <p className="text-base text-gray-300 leading-relaxed">
            Collaborate directly with founders Muhammad Azhar and Owais Ahmad. We analyze your requirements, review architectural feasibility, and respond within {siteConfig.contact.responseTime}.
          </p>
          <div className="pt-2">
            <Link
              href={`/start-a-project?service=${service.slug}`}
              className="inline-flex items-center gap-2 h-12 px-8 rounded-btn font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-colors"
            >
              <span>{service.ctaLabel || `Start a ${service.shortTitle} Project`}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
