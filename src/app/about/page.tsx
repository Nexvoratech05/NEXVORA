import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {
  ShieldCheck,
  Zap,
  Lock,
  Users2,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { siteConfig, founders } from "@/content/site";

export const metadata: Metadata = {
  title: "About NEXVORA — Founder-Led Engineering",
  description:
    "Meet the team behind NEXVORA: engineers in software, cloud, data and CRM building reliable digital products.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  const values = [
    {
      title: "Engineering Rigor Over Surface Polish",
      behavior: "We prioritize solid architecture, type-safety, automated tests, and documentation over superficial shortcuts.",
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Radical Transparency",
      behavior: "No hidden subcontracting, no vague estimates, and no vanity metrics. We share weekly milestone demos and repository access from sprint one.",
      icon: <Zap className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Data Integrity & Security by Default",
      behavior: "Every system is designed with least-privilege access, encrypted connections, and zero unnecessary data storage.",
      icon: <Lock className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Direct Founder Ownership",
      behavior: "Clients communicate directly with the engineers responsible for their codebase, ensuring zero misinterpretation.",
      icon: <Users2 className="w-6 h-6 text-blue-600" />,
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
            <span className="eyebrow text-cyan-400">Our Story &amp; Philosophy</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white">
              Engineering Built on Substance, Not Subcontracting
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              NEXVORA Technologies was founded to provide growing businesses with dependable software, resilient cloud operations, and clean data architectures, delivered directly by experienced engineers.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Statement */}
      <section className="py-20 bg-white border-b border-gray-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="eyebrow text-blue-600">Company Mission</span>
              <h2 className="text-3xl font-bold font-heading text-navy-950">
                Empowering Businesses to Build Beyond Operational Limits
              </h2>
              <p className="text-base text-gray-700 leading-relaxed">
                Most companies struggle with fragmented technology: custom web apps that break under load, CRM records cluttered with duplicates, and unmonitored cloud servers running up massive monthly bills.
              </p>
              <p className="text-base text-gray-700 leading-relaxed">
                NEXVORA brings software engineering, cloud architecture, and data pipelines together under one roof. We eliminate the friction of managing multiple agencies and deliver cohesive, well-documented digital products that stand the test of time.
              </p>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-500 font-mono">
                [PLACEHOLDER: Mission &amp; Vision statement draft pending final founder sign-off]
              </div>
            </div>

            {/* Operating Principles Grid */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 space-y-6">
              <h3 className="text-xl font-bold font-heading text-navy-950 border-b border-gray-200 pb-3">
                How We Operate
              </h3>
              <ul className="space-y-4 text-sm text-gray-700">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-navy-950 block">Founder-Led Engineering:</strong>
                    Founders Muhammad Azhar and Owais Ahmad architect and supervise every repository commit.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-navy-950 block">Remote-Ready &amp; Globally Minded:</strong>
                    Serving regional clients in Pakistan and the Gulf (UAE, Saudi Arabia) alongside international partners in the UK and US with seamless async workflows.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-navy-950 block">Documented Delivery:</strong>
                    Comprehensive handover kits, architecture schematics, deployment scripts, and 100% intellectual property transfer.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 sm:py-24 bg-gray-50 border-b border-gray-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="eyebrow text-blue-600">Core Values</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-navy-950">
              The Principles That Guide Every Build
            </h2>
            <p className="text-base text-gray-600">
              Our culture is rooted in craftsmanship, accountability, and demonstrable outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val) => (
              <div
                key={val.title}
                className="bg-white border border-gray-200 rounded-card p-6 space-y-4 shadow-sm hover:border-blue-600 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center">
                  {val.icon}
                </div>
                <h3 className="text-lg font-bold font-heading text-navy-950">
                  {val.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {val.behavior}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Preview Section */}
      <section className="py-20 bg-white border-b border-gray-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="eyebrow text-blue-600">Leadership Team</span>
            <h2 className="text-3xl font-bold font-heading text-navy-950">
              Led Directly by Experienced Practitioners
            </h2>
            <p className="text-sm text-gray-600">
              Learn more about the technical depth and background behind NEXVORA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {founders.map((f) => (
              <div
                key={f.name}
                className="bg-gray-50 rounded-card border border-gray-200 p-6 flex flex-col sm:flex-row items-center gap-6"
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white flex-shrink-0 border border-gray-200 shadow-sm">
                  <Image
                    src={f.image}
                    alt={f.name}
                    width={200}
                    height={250}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2 text-center sm:text-left flex-1">
                  <h3 className="text-lg font-bold font-heading text-navy-950">{f.name}</h3>
                  <p className="text-xs font-semibold text-blue-600">{f.role}</p>
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {f.bio}
                  </p>
                  <Link
                    href="/team"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline pt-1"
                  >
                    View Full Profile &amp; Focus Domains →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 bg-navy-950 text-white text-center">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-6">
          <h2 className="text-3xl font-bold font-heading">
            Ready to Work With a Dedicated Engineering Partner?
          </h2>
          <p className="text-base text-gray-300">
            Tell us about your technical goals, timeline, and challenges. We respond within {siteConfig.contact.responseTime}.
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
