import React from "react";
import Link from "next/link";
import { NexvoraLogo } from "./NexvoraLogo";
import { siteConfig, services } from "@/content/site";
import { Mail, MapPin, ArrowRight, Phone } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-white border-t border-navy-700/80 pt-16 pb-24 md:pb-16" aria-label="Site Footer">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-navy-700/60">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <NexvoraLogo variant="dark" className="h-8 w-auto" />
            <p className="text-sm font-heading font-medium text-cyan-400">
              {siteConfig.tagline}
            </p>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              {siteConfig.positioning}
            </p>

            {/* Direct contact info */}
            <div className="pt-2 space-y-2 text-sm text-gray-300">
              {siteConfig.contact.hasRealEmail && siteConfig.contact.displayEmail ? (
                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <a
                    href={`mailto:${siteConfig.contact.displayEmail}?subject=Inquiry%20regarding%20NEXVORA%20Services`}
                    className="hover:text-cyan-400 underline underline-offset-2 transition-colors"
                  >
                    {siteConfig.contact.displayEmail}
                  </a>
                </div>
              ) : null}

              {siteConfig.contact.hasRealPhone && siteConfig.contact.displayPhone ? (
                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                    className="hover:text-cyan-400 underline underline-offset-2 transition-colors"
                  >
                    {siteConfig.contact.displayPhone}
                  </a>
                </div>
              ) : null}

              {siteConfig.contact.hasRealAddress && siteConfig.contact.address ? (
                <div className="flex items-start gap-2.5 text-gray-400">
                  <MapPin className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span>{siteConfig.contact.address}</span>
                </div>
              ) : null}

              {!siteConfig.contact.hasRealEmail && !siteConfig.contact.hasRealAddress && (
                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <Link href="/contact" className="hover:text-cyan-400 underline underline-offset-2 transition-colors">
                    Submit Technical Inquiry
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Services Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider font-heading">
              Services
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              {services.map((svc) => (
                <li key={svc.slug}>
                  <Link
                    href={`/services/${svc.slug}`}
                    className="hover:text-cyan-400 transition-colors inline-block"
                  >
                    {svc.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider font-heading">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-cyan-400 transition-colors">
                  Leadership &amp; Team
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-cyan-400 transition-colors">
                  Portfolio / Case Studies
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/start-a-project"
                  className="text-cyan-400 font-semibold hover:underline flex items-center gap-1 pt-1"
                >
                  Start a Project <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider font-heading">
              Legal &amp; Privacy
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/privacy-policy" className="hover:text-cyan-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-cyan-400 transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li className="pt-2 text-xs text-gray-400">
                <span className="block font-medium text-gray-300">Response Promise:</span>
                Within {siteConfig.contact.responseTime}
              </li>
              <li className="text-xs text-gray-400">
                <span className="block font-medium text-gray-300">Target Markets:</span>
                Pakistan, Gulf (UAE, KSA), UK &amp; US
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Entity */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {currentYear} {siteConfig.name}. All rights reserved.</p>
          <p className="text-gray-400">
            {siteConfig.legalName} · Built with Next.js &amp; TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}
