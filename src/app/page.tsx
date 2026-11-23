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
  ExternalLink,
  GraduationCap,
  Activity,
  TrendingUp,
  Headphones,
  ShoppingBag,
  Truck,
  Factory,
  Rocket,
  Building2,
  Globe2,
  FileCheck2,
  Lock,
  Clock,
  MessageCircle,
} from "lucide-react";
import {
  siteConfig,
  services,
  founders,
  projectsData,
  developmentProcess,
  techStackCategories,
  industries,
  faqsList,
} from "@/content/site";
import { HeroGraphic } from "@/components/HeroGraphic";
import { HomeInquiryForm } from "@/components/HomeInquiryForm";
import { ArchitectureModalViewer } from "@/components/ArchitectureModalViewer";

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-6 h-6 text-cyan-400" />,
  Cloud: <Cloud className="w-6 h-6 text-cyan-400" />,
  Database: <Database className="w-6 h-6 text-cyan-400" />,
  Users: <Users className="w-6 h-6 text-cyan-400" />,
  Cpu: <Cpu className="w-6 h-6 text-cyan-400" />,
  Layout: <Layout className="w-6 h-6 text-cyan-400" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-cyan-400" />,
  Layers: <Layers className="w-6 h-6 text-cyan-400" />,
  GitBranch: <GitBranch className="w-6 h-6 text-cyan-400" />,
  MessageSquare: <MessageSquare className="w-6 h-6 text-cyan-400" />,
};

const industryIconMap: Record<string, React.ReactNode> = {
  Activity: <Activity className="w-6 h-6 text-cyan-400" />,
  TrendingUp: <TrendingUp className="w-6 h-6 text-cyan-400" />,
  Headphones: <Headphones className="w-6 h-6 text-cyan-400" />,
  ShoppingBag: <ShoppingBag className="w-6 h-6 text-cyan-400" />,
  Truck: <Truck className="w-6 h-6 text-cyan-400" />,
  Factory: <Factory className="w-6 h-6 text-cyan-400" />,
  GraduationCap: <GraduationCap className="w-6 h-6 text-cyan-400" />,
  Rocket: <Rocket className="w-6 h-6 text-cyan-400" />,
  Building2: <Building2 className="w-6 h-6 text-cyan-400" />,
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
        "description": siteConfig.description,
        ...(siteConfig.contact.hasRealEmail && siteConfig.contact.displayEmail
          ? {
              contactPoint: {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": siteConfig.contact.displayEmail,
                "telephone": siteConfig.contact.phone,
                "availableLanguage": ["English", "Urdu"],
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

  const encodedGreeting = encodeURIComponent(
    siteConfig.contact.whatsappGreeting || "Hello NEXVORA Technologies, I would like to discuss an engineering project."
  );
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodedGreeting}`;

  return (
    <div className="flex flex-col w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* =========================================================================
          SECTION 1: HERO SECTION (Dark Navy)
          ========================================================================= */}
      <section className="relative bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white pt-28 sm:pt-36 pb-20 sm:pb-28 overflow-hidden border-b border-navy-700/80">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headline, Subheadline & Primary/Secondary CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-800/80 border border-navy-700 text-cyan-400 text-xs font-semibold tracking-wide shadow-inner">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>Founder-Led Technology Engineering</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading leading-[1.08] text-white">
                Build Beyond Limits.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-cyan-300 block mt-1">
                  Engineering Scalable Systems.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-300 max-w-xl font-normal leading-relaxed">
                {siteConfig.description}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/start-a-project"
                  className="h-12 px-7 rounded-btn font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#case-studies"
                  className="h-12 px-7 rounded-btn font-medium text-sm border border-navy-700 hover:bg-navy-800/60 text-white flex items-center justify-center gap-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <span>Explore Architecture Case Studies</span>
                </a>
              </div>

              {/* Direct Trust Indicators */}
              <div className="pt-6 border-t border-navy-700/60 grid grid-cols-3 gap-4 text-xs text-gray-400 font-mono">
                <div>
                  <span className="text-white block font-sans font-semibold text-sm">Founder-Led</span>
                  <span>Direct Engineering Access</span>
                </div>
                <div>
                  <span className="text-white block font-sans font-semibold text-sm">Zero Fabrication</span>
                  <span>Verified Credentials</span>
                </div>
                <div>
                  <span className="text-white block font-sans font-semibold text-sm">Documented IP</span>
                  <span>Signed Agreement Terms</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Architecture Schematic */}
            <div className="lg:col-span-5 flex justify-center">
              <HeroGraphic />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: GLOBAL TRUST & CAPABILITIES BAR (Dark Navy / Hybrid Surface)
          ========================================================================= */}
      <section className="bg-navy-950 py-8 border-b border-navy-700 text-white" aria-label="Global Operational Capabilities">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-navy-900/60 border border-navy-700/60">
              <Globe2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-xs font-mono font-semibold text-white uppercase tracking-wider block">
                  Multi-Regional Overlap
                </span>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Flexible working hours across Pakistan, Gulf (UAE, KSA), UK, and US time zones.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-navy-900/60 border border-navy-700/60">
              <Lock className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-xs font-mono font-semibold text-white uppercase tracking-wider block">
                  Mutual NDA Availability
                </span>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Mutual NDAs are available upon request and subject to agreement.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-navy-900/60 border border-navy-700/60">
              <FileCheck2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-xs font-mono font-semibold text-white uppercase tracking-wider block">
                  Project-Specific IP Terms
                </span>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Project-specific IP ownership and transfer terms are documented in signed agreements.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-navy-900/60 border border-navy-700/60">
              <Clock className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-xs font-mono font-semibold text-white uppercase tracking-wider block">
                  Fast Technical Response
                </span>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Our team aims to respond within one business day with direct lead engineer feedback.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: CORE ENGINEERING DIVISIONS (Light Gray Surface)
          ========================================================================= */}
      <section id="divisions" className="py-20 sm:py-24 bg-gray-50 border-b border-gray-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div className="space-y-3 max-w-2xl">
              <span className="eyebrow text-blue-600">Six Core Divisions</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-navy-950">
                Specialized Engineering Divisions
              </h2>
              <p className="text-base text-gray-600">
                Organized into six specialized engineering divisions led directly by senior practitioners.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 font-semibold text-sm text-blue-600 hover:text-blue-700 underline underline-offset-4"
            >
              <span>Explore All Specifications</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc) => (
              <div
                key={svc.slug}
                className="group bg-white rounded-2xl border border-gray-200 hover:border-blue-600 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Architecture Blueprint Diagram Header (Consistent with Case Study Cards) */}
                  {svc.diagramImage && (
                    <ArchitectureModalViewer
                      imageSrc={svc.diagramImage}
                      imageAlt={`Technical architecture blueprint for ${svc.title}`}
                      title={svc.title}
                      classification={svc.divisionNumber}
                      deliverables={svc.subServices.slice(0, 3).map((s) => s.title)}
                    />
                  )}

                  {/* Card Content */}
                  <div className="p-6 sm:p-7 space-y-4">
                    {/* Dual Badges matching reference mockup */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-cyan-50 border border-cyan-200/80 text-cyan-900 uppercase tracking-wider">
                        {iconMap[svc.iconName] ? (
                          <span className="w-3.5 h-3.5 flex items-center justify-center text-cyan-600 [&>svg]:w-3.5 [&>svg]:h-3.5">
                            {iconMap[svc.iconName]}
                          </span>
                        ) : (
                          <Code2 className="w-3.5 h-3.5 text-cyan-600" />
                        )}
                        <span>{svc.divisionNumber}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-amber-50 border border-amber-200/80 text-amber-900 uppercase tracking-wider">
                        <ShieldCheck className="w-3 h-3 text-amber-600" />
                        <span>CORE DIVISION</span>
                      </span>
                    </div>

                    <div>
                      <Link href={`/services/${svc.slug}`}>
                        <h3 className="text-xl font-bold font-heading text-navy-950 group-hover:text-blue-600 transition-colors">
                          {svc.title}
                        </h3>
                      </Link>
                      <p className="text-xs text-gray-500 font-medium mt-1">
                        {svc.heroHeadline || svc.shortTitle}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-2.5 line-clamp-3">
                        {svc.heroOutcome}
                      </p>
                    </div>

                    {/* Sub-services pills */}
                    <div className="pt-3 border-t border-gray-100 space-y-1.5">
                      <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider font-semibold block mb-1">
                        Included Capabilities:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {svc.subServices.slice(0, 3).map((sub, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-gray-50 border border-gray-200 text-gray-700"
                          >
                            {sub.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-7 pt-0">
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                    <Link
                      href={`/services/${svc.slug}`}
                      className="text-xs sm:text-sm font-semibold text-blue-600 group-hover:text-blue-700 inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span>Full Division Scope</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      href={`/start-a-project?service=${svc.slug}`}
                      className="text-xs font-medium text-gray-400 hover:text-navy-950 underline"
                    >
                      Inquire
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: FEATURED ARCHITECTURE CASE STUDIES (Pure White Surface)
          ========================================================================= */}
      <section id="case-studies" className="py-20 sm:py-24 bg-white border-b border-gray-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div className="space-y-3 max-w-2xl">
              <span className="eyebrow text-blue-600">Verified Case Studies</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-navy-950">
                Architectural Decisions &amp; Measurable Outcomes
              </h2>
              <p className="text-base text-gray-600">
                In strict adherence to our authentic transparency policy, each case study is classified by engagement type and features full system blueprints.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-semibold text-sm text-blue-600 hover:text-blue-700 underline underline-offset-4"
            >
              <span>View All 6 Case Studies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.slice(0, 6).map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-2xl border border-gray-200 hover:border-blue-600 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Architecture Diagram with Modal Inspection Capability */}
                  <ArchitectureModalViewer
                    imageSrc={project.images[0]}
                    imageAlt={`Architecture blueprint for ${project.title}`}
                    title={project.title}
                    classification={project.classification}
                    deliverables={project.architectureDetails.slice(0, 3)}
                  />

                  {/* Card Content */}
                  <div className="p-6 space-y-3">
                    {/* Dual Badges matching reference mockup */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-cyan-50 border border-cyan-200/80 text-cyan-900 uppercase tracking-wider">
                        {project.serviceName}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-amber-50 border border-amber-200/80 text-amber-900 uppercase tracking-wider">
                        <ShieldCheck className="w-3 h-3 text-amber-600" />
                        <span>FEATURED</span>
                      </span>
                    </div>

                    <div>
                      <Link href={`/projects/${project.slug}`}>
                        <h3 className="text-lg font-bold font-heading text-navy-950 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {project.title}
                        </h3>
                      </Link>
                      <p className="text-xs text-gray-500 font-medium line-clamp-1 mt-0.5">
                        {project.classification}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span className="font-mono">{project.technologies.slice(0, 3).join(" · ")}</span>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      Read Architecture →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: TECHNOLOGY ECOSYSTEM & CLOUD TOOLCHAIN (Light Gray Surface)
          ========================================================================= */}
      <section className="py-20 sm:py-24 bg-gray-50 border-b border-gray-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div className="space-y-3 max-w-2xl">
              <span className="eyebrow text-blue-600">Enterprise Toolchain</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-navy-950">
                Technology Ecosystem &amp; Cloud Toolchain
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">
                We engineer systems with battle-tested distributed data platforms, modern cloud runtimes, and type-safe software frameworks.
              </p>
            </div>
            <Link
              href="/technologies"
              className="inline-flex items-center gap-2 font-semibold text-sm text-blue-600 hover:text-blue-700 underline underline-offset-4"
            >
              <span>Explore Interactive Directory</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStackCategories.map((cat) => (
              <div
                key={cat.name}
                className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm"
              >
                <h3 className="text-base font-bold font-heading text-navy-950 border-b border-gray-100 pb-3 flex items-center justify-between">
                  <span>{cat.name}</span>
                  <span className="text-xs font-mono text-blue-600 font-semibold">Active Toolchain</span>
                </h3>
                <ul className="space-y-3">
                  {cat.technologies.map((t) => (
                    <li key={t.name} className="text-xs space-y-0.5">
                      <div className="font-semibold text-navy-950 font-mono">{t.name}</div>
                      <div className="text-gray-500 leading-relaxed">{t.description}</div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Interactive Directory Highlight Banner */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-navy-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-navy-700">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-lg font-bold font-heading text-white">
                Looking for Detailed Framework Specifications &amp; Architectural Insights?
              </h4>
              <p className="text-xs sm:text-sm text-gray-300">
                Filter our verified technology inventory by operational domain, status, and related case studies.
              </p>
            </div>
            <Link
              href="/technologies"
              className="h-11 px-6 rounded-btn font-semibold text-xs bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 transition-colors flex-shrink-0"
            >
              <span>View Full Technology Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: ENGINEERING METHODOLOGY & DELIVERY LIFECYCLE (Pure White)
          ========================================================================= */}
      <section className="py-20 sm:py-24 bg-white border-b border-gray-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="eyebrow text-blue-600">Execution Framework</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-navy-950">
              Our 6-Stage Engineering Methodology
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              Predictable, low-risk project delivery through structured discovery, weekly demo milestones, and rigorous QA hardening.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {developmentProcess.map((step) => (
              <div
                key={step.step}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-5 flex flex-col justify-between space-y-3 hover:border-blue-600 transition-colors shadow-sm"
              >
                <div className="space-y-2">
                  <span className="text-2xl font-extrabold font-mono text-blue-600">
                    {step.step}
                  </span>
                  <h3 className="text-sm font-bold font-heading text-navy-950">
                    {step.name}
                  </h3>
                  <div className="text-[11px] font-semibold text-cyan-600 uppercase tracking-wider">
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

      {/* =========================================================================
          SECTION 7: FOUNDER-LED ENGINEERING CREDIBILITY (Light Gray Surface)
          ========================================================================= */}
      <section className="py-20 sm:py-24 bg-gray-50 border-b border-gray-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div className="space-y-3 max-w-2xl">
              <span className="eyebrow text-blue-600">Executive Engineering</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-navy-950">
                Direct Founder Leadership
              </h2>
              <p className="text-base text-gray-600">
                Founders Muhammad Azhar and Owais Ahmad lead technical architecture, code delivery, and client communication.
              </p>
            </div>
            <Link
              href="/team"
              className="inline-flex items-center gap-2 font-semibold text-sm text-blue-600 hover:text-blue-700 underline underline-offset-4"
            >
              <span>View Full Founder Profiles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {founders.map((founder) => (
              <div
                key={founder.name}
                className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between space-y-6"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-5 border-b border-gray-100">
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
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-blue-50 text-blue-700 border border-blue-200/60 uppercase tracking-wider">
                      {founder.role}
                    </span>
                    <h3 className="text-2xl font-bold font-heading text-navy-950">{founder.name}</h3>
                    <p className="text-xs text-gray-500 font-sans leading-tight">{founder.headline}</p>
                  </div>
                </div>

                <div className="space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    {founder.bio}
                  </p>

                  <div className="pt-4 border-t border-gray-100 space-y-3">
                    <span className="text-xs font-semibold text-navy-950 block font-heading">
                      Core Specializations:
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
                            className="text-blue-600 hover:text-blue-800 font-semibold underline flex items-center gap-1"
                          >
                            <span>Portfolio</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : null}
                        {founder.linkedin ? (
                          <a
                            href={founder.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-navy-950 font-medium underline flex items-center gap-1"
                          >
                            <span>LinkedIn</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : null}
                        {founder.github ? (
                          <a
                            href={founder.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-navy-950 font-medium underline flex items-center gap-1"
                          >
                            <span>GitHub</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : null}
                      </div>

                      <Link href="/team" className="text-blue-600 font-semibold hover:underline">
                        Full Credentials →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: INDUSTRIES WE SERVE (Pure White Surface)
          ========================================================================= */}
      <section className="py-20 sm:py-24 bg-white border-b border-gray-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="eyebrow text-blue-600">Domain Alignment</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-navy-950">
              Industries We Serve
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              We apply software, data, cloud, and AI engineering to solve concrete operational and technical bottlenecks across key global sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind) => (
              <div
                key={ind.slug}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-4 hover:border-blue-600 transition-colors shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-navy-950 flex items-center justify-center">
                    {industryIconMap[ind.iconName] || <Rocket className="w-5 h-5 text-cyan-400" />}
                  </div>
                  <h3 className="text-lg font-bold font-heading text-navy-950">
                    {ind.name}
                  </h3>
                  <div className="text-xs font-semibold text-blue-600 font-mono">
                    {ind.tagline}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {ind.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-200/80">
                  <span className="text-[11px] font-mono font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                    Engineered Solutions:
                  </span>
                  <ul className="space-y-1 text-xs text-gray-700">
                    {ind.engineeredSolutions.slice(0, 2).map((sol, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>{sol}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: CLIENT TRUST, RISK REVERSAL & FAQS (Light Gray Surface)
          ========================================================================= */}
      <section className="py-20 sm:py-24 bg-gray-50 border-b border-gray-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-16 space-y-3">
            <span className="eyebrow text-blue-600">Client Trust &amp; Governance</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-navy-950">
              Frequently Asked Questions &amp; Risk Reversal
            </h2>
            <p className="text-base text-gray-600">
              Clear answers regarding project-specific IP ownership terms, mutual NDA availability upon request, time zone overlap, and delivery standards.
            </p>
          </div>

          <div className="space-y-4">
            {faqsList.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white border border-gray-200 rounded-2xl p-6 transition-colors open:border-blue-600 shadow-sm"
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

      {/* =========================================================================
          SECTION 10: DUAL-ACTION CONVERSION SECTION (Dark Navy)
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-navy-950 text-white relative">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
            {/* Left Col: Contact Intro, WhatsApp CTA & Structured Pathways */}
            <div className="lg:col-span-5 space-y-6">
              <span className="eyebrow text-cyan-400">Collaborate With Us</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white">
                Ready to Build Your Next Engineering Initiative?
              </h2>
              <p className="text-base text-gray-300 leading-relaxed">
                Whether you need a Delta Lakehouse migration, a bespoke medical computer vision model, a scalable cloud topology, or end-to-end software development, reach out directly.
              </p>

              {/* WhatsApp Direct Chat Box */}
              {siteConfig.contact.hasRealWhatsapp && (
                <div className="p-4 rounded-xl bg-navy-900 border border-emerald-600/40 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Engineering Access</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Message our technical lead directly for immediate scoping questions or technical consultation.
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold inline-flex items-center justify-center gap-2 transition-colors w-full sm:w-auto"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Open WhatsApp Chat</span>
                  </a>
                </div>
              )}

              {/* 4 Specialized CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <Link
                  href="/start-a-project"
                  className="p-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center justify-between transition-colors shadow-sm"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/start-a-project?service=cloud-devops"
                  className="p-3.5 rounded-xl bg-navy-900 border border-navy-700 hover:border-cyan-400/60 text-white text-xs font-semibold flex items-center justify-between transition-colors"
                >
                  <span>Cloud Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/start-a-project?service=generative-ai"
                  className="p-3.5 rounded-xl bg-navy-900 border border-navy-700 hover:border-cyan-400/60 text-white text-xs font-semibold flex items-center justify-between transition-colors"
                >
                  <span>AI Solution Discovery</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/start-a-project?service=data-engineering"
                  className="p-3.5 rounded-xl bg-navy-900 border border-navy-700 hover:border-cyan-400/60 text-white text-xs font-semibold flex items-center justify-between transition-colors"
                >
                  <span>Data Assessment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Trust badges */}
              <div className="pt-4 space-y-2 border-t border-navy-700/80 text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>{siteConfig.contact.responseTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Mutual NDAs are available upon request and subject to agreement</span>
                </div>
              </div>
            </div>

            {/* Right Col: Fast-Track Quick Inquiry Form */}
            <div className="lg:col-span-7">
              <HomeInquiryForm />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: Corporate Engineering Footer is rendered in layout via src/components/Footer.tsx */}
    </div>
  );
}
