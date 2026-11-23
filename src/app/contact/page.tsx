import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Mail, Globe2, Clock, MessageSquare, ArrowRight, Phone } from "lucide-react";
import { siteConfig } from "@/content/site";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact NEXVORA Technologies",
  description:
    "Reach us by form, email or WhatsApp. We respond within 24 business hours.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
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
            "name": "Contact",
            "item": `${siteConfig.url}/contact`,
          },
        ],
      },
      {
        "@type": "ContactPage",
        "name": "Contact NEXVORA Technologies",
        "description": "Reach the founders by form, email, or WhatsApp.",
        "url": `${siteConfig.url}/contact`,
        ...(siteConfig.contact.hasRealEmail || siteConfig.contact.hasRealPhone
          ? {
              "mainEntity": {
                "@type": "Organization",
                "name": siteConfig.name,
                ...(siteConfig.contact.hasRealEmail && siteConfig.contact.displayEmail
                  ? { "email": siteConfig.contact.displayEmail }
                  : {}),
                ...(siteConfig.contact.hasRealPhone && siteConfig.contact.phone
                  ? { "telephone": siteConfig.contact.phone }
                  : {}),
              },
            }
          : {}),
      },
    ],
  };

  const encodedGreeting = encodeURIComponent(siteConfig.contact.whatsappGreeting);
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodedGreeting}`;

  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
              <li className="text-cyan-400 font-medium" aria-current="page">Contact</li>
            </ol>
          </nav>

          <div className="max-w-3xl space-y-4">
            <span className="eyebrow text-cyan-400">Direct Communication</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white">
              Get in Touch with NEXVORA
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Whether you need to scope a new software build, modernize cloud infrastructure, or untangle CRM datasets, founders Muhammad Azhar and Owais Ahmad review every inquiry personally.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content Grid */}
      <section className="py-20 sm:py-24 bg-gray-50 border-b border-gray-200">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Direct Channels & Operational Details */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="eyebrow text-blue-600">Direct Channels</span>
                <h2 className="text-2xl font-bold font-heading text-navy-950">
                  Multiple Ways to Connect
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We maintain fast, accessible communication channels for technical teams and business owners.
                </p>
              </div>

              {/* Channels List */}
              <div className="space-y-4">
                {/* Email Channel */}
                {siteConfig.contact.hasRealEmail && siteConfig.contact.displayEmail ? (
                  <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block font-heading">
                        Corporate Email
                      </span>
                      <a
                        href={`mailto:${siteConfig.contact.displayEmail}?subject=Direct%20Inquiry%20to%20NEXVORA`}
                        className="text-sm font-semibold text-navy-950 hover:text-blue-600 underline transition-colors"
                      >
                        {siteConfig.contact.displayEmail}
                      </a>
                      <p className="text-xs text-gray-500">
                        Best for RFPs, technical specifications, and formal project briefs.
                      </p>
                    </div>
                  </div>
                ) : null}

                {/* Direct Phone / Call */}
                {siteConfig.contact.hasRealPhone && siteConfig.contact.displayPhone ? (
                  <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block font-heading">
                        Direct Phone / Call
                      </span>
                      <a
                        href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                        className="text-sm font-semibold text-navy-950 hover:text-blue-600 underline transition-colors"
                      >
                        {siteConfig.contact.displayPhone}
                      </a>
                      <p className="text-xs text-gray-500">
                        Available Mon – Fri during PKT (UTC+5) business hours.
                      </p>
                    </div>
                  </div>
                ) : null}

                {/* WhatsApp Direct Chat */}
                {siteConfig.contact.hasRealWhatsapp && siteConfig.contact.whatsappNumber ? (
                  <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block font-heading">
                        WhatsApp Messaging
                      </span>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-navy-950 hover:text-blue-600 underline transition-colors block"
                      >
                        Chat Directly with the Founders →
                      </a>
                      <p className="text-xs text-gray-500">
                        Preferred by our regional clients in Pakistan and the Gulf.
                      </p>
                    </div>
                  </div>
                ) : null}

                {/* Company Model & Operations */}
                {siteConfig.contact.hasRealAddress && siteConfig.contact.address ? (
                  <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Globe2 className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block font-heading">
                        Headquarters &amp; Operational Model
                      </span>
                      <p className="text-sm font-semibold text-navy-950">
                        {siteConfig.contact.address}
                      </p>
                      <p className="text-xs text-gray-500">
                        Remote-first engineering organization operating nationally and internationally across multiple time zones.
                      </p>
                    </div>
                  </div>
                ) : null}

                {/* Business Hours & Response Window */}
                <div className="p-5 rounded-2xl bg-navy-950 text-white border border-navy-700 space-y-3">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold font-heading">
                    <Clock className="w-4 h-4" />
                    <span>Response-Time Promise</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    We operate Monday to Friday during PKT (UTC+5) / GST (UTC+4) hours and aim to respond to qualified inquiries within <strong className="text-white">{siteConfig.contact.responseTime}</strong>.
                  </p>
                </div>
              </div>

              {/* Start a project alternative card */}
              <div className="p-6 rounded-2xl bg-blue-600/10 border border-blue-600/30 space-y-2">
                <h3 className="text-sm font-bold font-heading text-navy-950">
                  Looking for a detailed proposal?
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Use our structured 4-step quote workflow to specify deliverables, stack preferences, and timelines.
                </p>
                <Link
                  href="/start-a-project"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:underline pt-1"
                >
                  <span>Launch Quote Calculator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Column: Full Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
