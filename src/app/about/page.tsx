import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight,
  CheckCircle2,
  Target,
  Eye,
  Compass,
  HeartHandshake,
} from "lucide-react";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "About NEXVORA Technologies — Engineering Intelligence. Building Tomorrow.",
  description:
    "Learn about NEXVORA Technologies: our mission, vision, core engineering values, and founder-led delivery approach across data, AI, cloud, and software.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  const coreValues = [
    {
      title: "Engineering Excellence",
      description: "We prioritize solid architecture, type-safety, automated tests, and clear documentation over superficial shortcuts.",
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Innovation",
      description: "We apply modern technologies like Medallion Lakehouses, Vision Transformers, and multi-agent RAG where they deliver genuine business leverage.",
      icon: <Zap className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Transparency",
      description: "No hidden subcontracting, no vague estimates, and no vanity metrics. We provide weekly milestone demos and repository access from sprint one.",
      icon: <Eye className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Ownership",
      description: "We take full accountability for our code, system architectures, and deadlines. When we take on a project, we treat it with absolute dedication.",
      icon: <Target className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Reliability",
      description: "Every platform is built with least-privilege security, idempotent data pipelines, automated error recovery, and zero downtime deployments.",
      icon: <Lock className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Continuous Learning",
      description: "Technology evolves rapidly. Our engineers continually upskill, test emerging research, and bring verified industry practices to every client system.",
      icon: <Compass className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Client Success",
      description: "We measure our success not by hours billed, but by the tangible operational efficiency, uptime, and growth our software delivers to our partners.",
      icon: <HeartHandshake className="w-6 h-6 text-blue-600" />,
    },
  ];

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-navy-950 text-white pt-32 pb-20 border-b border-navy-700">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-gray-400">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-cyan-400">Home</Link>
              </li>
              <li>/</li>
              <li className="text-cyan-400 font-medium" aria-current="page">About Us</li>
            </ol>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-900 border border-navy-700 text-cyan-400 text-xs font-mono font-semibold">
              <span>Engineering Intelligence. Building Tomorrow.</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white">
              About NEXVORA Technologies
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              NEXVORA Technologies is an engineering-focused technology company building intelligent digital solutions across data engineering, artificial intelligence, cloud infrastructure and software development. We combine engineering expertise, modern architecture and practical innovation to help organizations solve complex technical challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white border-b border-gray-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Mission Box */}
            <div className="p-8 sm:p-10 rounded-2xl bg-gray-50 border border-gray-200 space-y-4 hover:border-blue-600 transition-colors shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider block">
                Our Purpose
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-navy-950">
                Our Mission
              </h2>
              <p className="text-base text-gray-700 leading-relaxed">
                To engineer reliable, intelligent and scalable technology solutions that help businesses innovate, automate and make better decisions.
              </p>
            </div>

            {/* Vision Box */}
            <div className="p-8 sm:p-10 rounded-2xl bg-navy-950 text-white border border-navy-700 space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400">
                <Eye className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                Our Horizon
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                Our Vision
              </h2>
              <p className="text-base text-gray-300 leading-relaxed">
                To become a trusted global engineering partner for organizations transforming their operations through data, AI, cloud and software technologies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 sm:py-24 bg-gray-50 border-b border-gray-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 space-y-3">
            <span className="eyebrow text-blue-600">Our Foundation</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-navy-950">
              Core Engineering Values
            </h2>
            <p className="text-base text-gray-600">
              The fundamental principles that guide our technical design decisions, client partnerships, and team standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((val, idx) => (
              <div
                key={val.title}
                className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 space-y-3 shadow-sm hover:border-blue-600 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-200/60">
                    {val.icon}
                  </div>
                  <span className="text-xs font-mono font-bold text-gray-400">0{idx + 1}</span>
                </div>
                <h3 className="text-lg font-bold font-heading text-navy-950">
                  {val.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder-Led Difference */}
      <section className="py-20 sm:py-24 bg-white border-b border-gray-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="eyebrow text-blue-600">The NEXVORA Standard</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-navy-950 leading-tight">
                Why Emerging Enterprises Choose NEXVORA
              </h2>
              <p className="text-base text-gray-700 leading-relaxed">
                Too many development agencies act as brokerages — marketing senior talent, then quietly passing the actual coding and architectural decisions to offshore contractors.
              </p>
              <p className="text-base text-gray-700 leading-relaxed">
                NEXVORA is deliberately founder-led. When you work with us, founders Muhammad Azhar and Owais Ahmad directly design your schemas, architect your cloud environments, review code, and verify every release. You get unfiltered access to technical depth without translation layers.
              </p>

              <div className="pt-2">
                <Link
                  href="/team"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 underline"
                >
                  <span>Meet Our Engineering Leadership</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 bg-navy-950 rounded-2xl p-8 sm:p-10 text-white border border-navy-700 space-y-6">
              <h3 className="text-xl font-bold font-heading text-white border-b border-navy-700 pb-4">
                Our Non-Negotiable Commitments
              </h3>
              <ul className="space-y-4 text-sm text-gray-300">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Documented IP Terms:</strong> Project-specific IP ownership and transfer terms are documented in signed agreements.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Founder-Led Engineering:</strong> Architecture design, core code delivery, and technical reviews are led directly by our founding engineers.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Weekly Live Demos:</strong> You inspect working preview software and staging databases every sprint.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Security by Default:</strong> Least-privilege IAM, encrypted connections, and zero data retention enterprise AI.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-navy-950 text-white text-center">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-6">
          <h2 className="text-3xl font-bold font-heading">
            Partner With Our Engineering Team
          </h2>
          <p className="text-base text-gray-300">
            Tell us about your upcoming software initiative, data migration, or AI workflow. We provide clear architectural feedback and fixed-scope roadmaps within {siteConfig.contact.responseTime}.
          </p>
          <div className="pt-2">
            <Link
              href="/start-a-project"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-btn font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-colors"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
