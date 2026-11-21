import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Code2,
  Cloud,
  Database,
  Users,
  Cpu,
  Layout,
  ArrowRight,
  ShieldCheck,
  Layers,
  GitBranch,
  MessageSquare,
  CheckCircle2,
  Phone,
} from "lucide-react";
import {
  siteConfig,
  services,
  founders,
  projectsData,
  developmentProcess,
  differentiators,
  techStackCategories,
} from "@/content/site";
import { HeroGraphic } from "@/components/HeroGraphic";
import { HomeInquiryForm } from "@/components/HomeInquiryForm";

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-6 h-6 text-blue-600" />,
  Cloud: <Cloud className="w-6 h-6 text-blue-600" />,
  Database: <Database className="w-6 h-6 text-blue-600" />,
  Users: <Users className="w-6 h-6 text-blue-600" />,
  Cpu: <Cpu className="w-6 h-6 text-blue-600" />,
  Layout: <Layout className="w-6 h-6 text-blue-600" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-cyan-400" />,
  Layers: <Layers className="w-6 h-6 text-cyan-400" />,
  GitBranch: <GitBranch className="w-6 h-6 text-cyan-400" />,
  MessageSquare: <MessageSquare className="w-6 h-6 text-cyan-400" />,
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": siteConfig.name,
        "url": siteConfig.url,
        "logo": `${siteConfig.url}/logo.svg`,
        "sameAs": Object.values(siteConfig.socials).filter(Boolean),
        ...(siteConfig.contact.hasRealEmail && siteConfig.contact.displayEmail
          ? {
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                email: siteConfig.contact.displayEmail,
                telephone: siteConfig.contact.phone,
                availableLanguage: ["English", "Urdu"],
              },
            }
          : {}),
      },
      {
        "@type": "WebSite",
        "name": siteConfig.name,
        "url": siteConfig.url,
        "description": siteConfig.description,
      },
    ],
  };

  return (
    <div className="flex flex-col w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* SECTION 2: HERO */}
      <section className="relative bg-gradient-to-b from-navy-950 to-navy-900 text-white pt-28 sm:pt-36 pb-20 sm:pb-28 overflow-hidden border-b border-navy-700">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headline and CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-700/60 border border-navy-700 text-cyan-400 text-xs font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>Founder-Led Technology Engineering</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading leading-[1.08] text-white">
                Build Beyond <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-400 to-cyan-300">Limits.</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-300 max-w-xl font-normal leading-relaxed">
                Software, cloud, and data engineering for businesses ready to scale. Led directly by founders Muhammad Azhar and Owais Ahmad.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/start-a-project"
                  className="h-12 px-7 rounded-btn font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/projects"
                  className="h-12 px-7 rounded-btn font-medium text-sm border border-navy-700 hover:bg-navy-700/60 text-white flex items-center justify-center gap-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <span>View Our Work</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-navy-700/60 grid grid-cols-3 gap-4 text-xs text-gray-400 font-mono">
                <div>
                  <span className="text-white block font-sans font-semibold text-sm">Direct Access</span>
                  <span>Founder-Led Delivery</span>
                </div>
                <div>
                  <span className="text-white block font-sans font-semibold text-sm">Zero Fabrication</span>
                  <span>Verified Credentials</span>
                </div>
                <div>
                  <span className="text-white block font-sans font-semibold text-sm">Full Ownership</span>
                  <span>100% IP &amp; Code Handover</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Brand Graphic */}
            <div className="lg:col-span-5 flex justify-center">
              <HeroGraphic />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: POSITIONING STRIP */}
      <section className="bg-navy-950 py-7 border-b border-navy-700/80 text-white">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-sm font-medium text-gray-300 max-w-2xl">
              NEXVORA Technologies combines cloud, data, and software expertise to deliver digital products and intelligent systems.
            </p>
            <div className="flex items-center gap-3 text-xs font-semibold text-cyan-400 uppercase tracking-widest font-heading">
              <span>Cloud</span>
              <span className="text-navy-700">·</span>
              <span>Data</span>
              <span className="text-navy-700">·</span>
              <span>Software</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: SERVICES OVERVIEW */}
      <section className="py-20 sm:py-24 bg-white border-b border-gray-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="eyebrow text-blue-600">Core Capabilities</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-navy-950">
              Engineering Disciplines Built on Real Depth
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              Every service is grounded in the founders&apos; verified expertise in software systems, cloud operations, CRM pipelines, and intelligent automation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((svc) => (
              <div
                key={svc.slug}
                className="group bg-white border border-gray-200 hover:border-blue-600 rounded-card p-8 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:bg-blue-600/10 transition-colors">
                    {iconMap[svc.iconName] || <Code2 className="w-6 h-6 text-blue-600" />}
                  </div>
                  <h3 className="text-xl font-bold font-heading text-navy-950 group-hover:text-blue-600 transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {svc.heroOutcome}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    href={`/services/${svc.slug}`}
                    className="text-sm font-semibold text-blue-600 group-hover:text-blue-700 inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>Explore Capability</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <span className="text-xs font-mono text-gray-400">{svc.technologies.slice(0, 2).join(", ")}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-card bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold font-heading text-navy-950">Need a specialized architectural review?</h4>
              <p className="text-sm text-gray-600">We audit existing systems and map technical feasibility before proposing scope.</p>
            </div>
            <Link
              href="/start-a-project"
              className="h-11 px-5 rounded-btn bg-navy-950 hover:bg-navy-900 text-white font-medium text-sm flex items-center gap-2 whitespace-nowrap"
            >
              Request Technical Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5: FEATURED PROJECTS */}
      <section className="py-20 sm:py-24 bg-gray-50 border-b border-gray-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-3 max-w-2xl">
              <span className="eyebrow text-blue-600">Selected Work</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-navy-950">
                Architectural Execution &amp; Measurable Outcomes
              </h2>
              <p className="text-base text-gray-600">
                In line with our credibility-first commitment, all case studies represent genuine engineering builds or internal capability demonstrations.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-semibold text-sm text-blue-600 hover:text-blue-700 underline underline-offset-4"
            >
              <span>View All Portfolio Entries</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.slice(0, 6).map((project) => (
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

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider font-heading">
                      <span>{project.serviceName}</span>
                      <span>·</span>
                      <span className="text-gray-400">{project.industry}</span>
                    </div>
                    <h3 className="text-lg font-bold font-heading text-navy-950 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span className="font-mono">{project.technologies.slice(0, 3).join(" · ")}</span>
                    <span className="font-semibold text-blue-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Read Details →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: WHY CHOOSE NEXVORA */}
      <section className="py-20 sm:py-24 bg-navy-950 text-white border-b border-navy-700">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="eyebrow text-cyan-400">Why Partner With Us</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white">
              The NEXVORA Advantage
            </h2>
            <p className="text-base text-gray-300 leading-relaxed">
              We replace agency bureaucracy with direct engineering collaboration and transparent execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {differentiators.map((diff) => (
              <div
                key={diff.title}
                className="bg-navy-900 border border-navy-700 rounded-card p-6 space-y-4 hover:border-cyan-400/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-navy-950 border border-navy-700 flex items-center justify-center">
                  {iconMap[diff.iconName] || <ShieldCheck className="w-6 h-6 text-cyan-400" />}
                </div>
                <h3 className="text-lg font-bold font-heading text-white">
                  {diff.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {diff.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: COMPANY INTRODUCTION */}
      <section className="py-16 sm:py-20 bg-white border-b border-gray-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="eyebrow text-blue-600">About NEXVORA</span>
            <h2 className="text-3xl font-bold font-heading text-navy-950">
              Built to Solve Real Engineering Bottlenecks
            </h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              NEXVORA Technologies was established to bridge the divide between brittle software builds and operational business realities. Founded by engineers Muhammad Azhar and Owais Ahmad, we combine cloud infrastructure resilience, automated data pipelines, modern CRM architectures, and custom full-stack software to deliver dependable digital products. We treat every client engagement with architectural precision and long-term maintainability.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-semibold text-sm text-blue-600 hover:text-blue-700"
              >
                <span>Read Our Full Story &amp; Operating Principles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: LEADERSHIP PREVIEW */}
      <section className="py-20 sm:py-24 bg-gray-50 border-b border-gray-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-3 max-w-2xl">
              <span className="eyebrow text-blue-600">Leadership</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-navy-950">
                Direct Founder Leadership
              </h2>
              <p className="text-base text-gray-600">
                Every project is spearheaded directly by the founders. No delegating to unvetted subcontractors.
              </p>
            </div>
            <Link
              href="/team"
              className="inline-flex items-center gap-2 font-semibold text-sm text-blue-600 hover:text-blue-700 underline underline-offset-4"
            >
              <span>Meet the Leadership Team</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {founders.map((founder) => (
              <div
                key={founder.name}
                className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6"
              >
                {/* Compact Headshot & Identity Header on White Background */}
                <div className="flex items-center gap-5">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm flex-shrink-0">
                    <Image
                      src={founder.image}
                      alt={founder.name}
                      width={240}
                      height={300}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/60 font-mono">
                      Co-Founder &amp; Engineering Lead
                    </span>
                    <h3 className="text-xl font-bold font-heading text-navy-950">{founder.name}</h3>
                    <p className="text-xs text-gray-600 font-medium">{founder.role}</p>
                  </div>
                </div>

                <div className="space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {founder.bio}
                  </p>

                  <div className="pt-4 border-t border-gray-100 space-y-3">
                    <span className="text-xs font-semibold text-navy-950 block font-heading">
                      Core Technical Focus:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {founder.expertiseTags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-tag bg-gray-50 text-navy-950 text-xs font-medium border border-gray-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="pt-2 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        {founder.portfolioUrl ? (
                          <a
                            href={founder.portfolioUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 font-semibold underline"
                          >
                            Portfolio ↗
                          </a>
                        ) : null}
                        {founder.linkedin ? (
                          <a
                            href={founder.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-navy-950 font-medium underline"
                          >
                            LinkedIn
                          </a>
                        ) : null}
                      </div>
                      <Link href="/team" className="text-gray-500 hover:text-blue-600">
                        Full Bio →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: DEVELOPMENT PROCESS */}
      <section className="py-20 sm:py-24 bg-white border-b border-gray-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="eyebrow text-blue-600">Delivery Methodology</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-navy-950">
              A 5-Step Process for Predictable Outcomes
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              We de-risk project delivery through structured discovery, weekly milestones, automated testing, and proactive maintenance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {developmentProcess.map((step, idx) => (
              <div
                key={step.step}
                className="bg-gray-50 border border-gray-200 rounded-card p-6 relative flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-extrabold font-mono text-blue-600">
                      {step.step}
                    </span>
                    {idx < 4 && (
                      <span className="hidden md:inline-block text-gray-300 font-bold">→</span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold font-heading text-navy-950">
                    {step.name}
                  </h3>
                  <div className="text-xs font-semibold text-cyan-600 uppercase tracking-wider">
                    {step.tagline}
                  </div>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed pt-2">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: TECHNOLOGY STACK */}
      <section className="py-20 sm:py-24 bg-gray-50 border-b border-gray-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="eyebrow text-blue-600">Engineering Stack</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-navy-950">
              Technologies We Actually Build With
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              No inflated tool lists. Only battle-tested languages, frameworks, cloud primitives, and data engines we deploy into production.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStackCategories.map((cat) => (
              <div
                key={cat.name}
                className="bg-white border border-gray-200 rounded-card p-6 space-y-4 shadow-sm"
              >
                <h3 className="text-base font-bold font-heading text-navy-950 border-b border-gray-100 pb-2 flex items-center justify-between">
                  <span>{cat.name}</span>
                  <span className="text-xs font-mono text-blue-600">Verified</span>
                </h3>
                <ul className="space-y-3">
                  {cat.technologies.map((t) => (
                    <li key={t.name} className="text-xs space-y-0.5">
                      <div className="font-semibold text-navy-950 font-mono">{t.name}</div>
                      <div className="text-gray-500">{t.description}</div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11: INQUIRY SECTION */}
      <section className="py-20 sm:py-28 bg-navy-950 text-white relative">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
            {/* Left Col: Contact Intro & Direct Channels */}
            <div className="lg:col-span-5 space-y-6">
              <span className="eyebrow text-cyan-400">Direct Inquiries</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white">
                Have a Technical Project in Mind?
              </h2>
              <p className="text-base text-gray-300 leading-relaxed">
                Reach out directly to discuss architecture, timeline, and scope. Whether you are modernizing legacy infrastructure, integrating CRMs, or building a new web platform, we provide transparent assessments.
              </p>

              {/* Response Promise Badge */}
              <div className="p-4 rounded-xl bg-navy-900 border border-navy-700 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-gray-300 space-y-1">
                  <span className="font-bold text-white block">Response-Time Guarantee:</span>
                  <span>We review every qualified technical inquiry and reply within {siteConfig.contact.responseTime}.</span>
                </div>
              </div>

              {/* Direct channels (rendered when verified credentials exist) */}
              {(siteConfig.contact.hasRealEmail || siteConfig.contact.hasRealWhatsapp || siteConfig.contact.hasRealPhone) && (
                <div className="space-y-3 pt-2">
                  {siteConfig.contact.hasRealEmail && siteConfig.contact.displayEmail ? (
                    <a
                      href={`mailto:${siteConfig.contact.displayEmail}?subject=NEXVORA%20Project%20Inquiry`}
                      className="flex items-center gap-3 p-3.5 rounded-lg border border-navy-700 hover:border-cyan-400/50 hover:bg-navy-900 transition-colors text-sm text-gray-300"
                    >
                      <span className="w-8 h-8 rounded-md bg-blue-600/20 text-cyan-400 flex items-center justify-center font-bold">@</span>
                      <div>
                        <span className="text-xs text-gray-400 block">Direct Email</span>
                        <span className="font-medium text-white">{siteConfig.contact.displayEmail}</span>
                      </div>
                    </a>
                  ) : null}

                  {siteConfig.contact.hasRealPhone && siteConfig.contact.displayPhone ? (
                    <a
                      href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                      className="flex items-center gap-3 p-3.5 rounded-lg border border-navy-700 hover:border-cyan-400/50 hover:bg-navy-900 transition-colors text-sm text-gray-300"
                    >
                      <span className="w-8 h-8 rounded-md bg-cyan-600/20 text-cyan-400 flex items-center justify-center">
                        <Phone className="w-4 h-4" />
                      </span>
                      <div>
                        <span className="text-xs text-gray-400 block">Direct Phone</span>
                        <span className="font-medium text-white">{siteConfig.contact.displayPhone}</span>
                      </div>
                    </a>
                  ) : null}

                  {siteConfig.contact.hasRealWhatsapp && siteConfig.contact.whatsappNumber ? (
                    <a
                      href={`https://wa.me/${siteConfig.contact.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(siteConfig.contact.whatsappGreeting)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3.5 rounded-lg border border-navy-700 hover:border-cyan-400/50 hover:bg-navy-900 transition-colors text-sm text-gray-300"
                    >
                      <span className="w-8 h-8 rounded-md bg-[#25D366]/20 text-[#25D366] flex items-center justify-center font-bold">WA</span>
                      <div>
                        <span className="text-xs text-gray-400 block">WhatsApp Direct Chat</span>
                        <span className="font-medium text-white">Chat with Founders</span>
                      </div>
                    </a>
                  ) : null}
                </div>
              )}
            </div>

            {/* Right Col: Quick Inquiry Form */}
            <div className="lg:col-span-7">
              <HomeInquiryForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
