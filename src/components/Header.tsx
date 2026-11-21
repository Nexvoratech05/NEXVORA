"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { NexvoraLogo } from "./NexvoraLogo";
import { services } from "@/content/site";
import { trackEvent } from "@/lib/analytics";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);

  // Monitor scroll for transparency switch
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 24) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile overlay is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      closeBtnRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (servicesDropdownOpen) {
          setServicesDropdownOpen(false);
          triggerRef.current?.focus();
        }
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
          hamburgerRef.current?.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [servicesDropdownOpen, mobileMenuOpen]);

  // Outside click for services dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => {
      setServicesDropdownOpen(true);
    }, 150);
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 150);
  };

  const isServicesActive = pathname.startsWith("/services");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        isScrolled
          ? "bg-navy-950/95 backdrop-blur-md border-b border-navy-700 shadow-lg shadow-navy-950/20"
          : "bg-navy-950 border-b border-navy-700/50"
      }`}
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[72px] flex items-center justify-between">
        {/* Logo Left */}
        <div className="flex-shrink-0">
          <NexvoraLogo variant="dark" className="h-8 sm:h-9" />
        </div>

        {/* Center / Right Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
          {/* Services Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              ref={triggerRef}
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              aria-expanded={servicesDropdownOpen}
              aria-haspopup="true"
              aria-controls="services-menu"
              className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium transition-colors relative rounded-md text-white/90 hover:text-white ${
                isServicesActive ? "text-white" : ""
              }`}
            >
              Services
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  servicesDropdownOpen ? "rotate-180 text-cyan-400" : "text-white/60"
                }`}
                aria-hidden="true"
              />
              {isServicesActive && (
                <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-cyan-400 rounded-full" />
              )}
            </button>

            {/* Accessible Dropdown Menu */}
            {servicesDropdownOpen && (
              <div
                id="services-menu"
                role="menu"
                aria-label="Services dropdown"
                className="absolute top-full left-0 mt-1 w-80 bg-navy-900 border border-navy-700 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="px-3 py-2 border-b border-navy-700/60 mb-1">
                  <Link
                    href="/services"
                    className="text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center justify-between hover:underline"
                    onClick={() => setServicesDropdownOpen(false)}
                  >
                    All Services Overview <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
                <div className="space-y-1">
                  {services.map((svc) => (
                    <Link
                      key={svc.slug}
                      href={`/services/${svc.slug}`}
                      role="menuitem"
                      onClick={() => setServicesDropdownOpen(false)}
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                        pathname === `/services/${svc.slug}`
                          ? "bg-navy-700 text-cyan-400 font-medium"
                          : "text-white/80 hover:bg-navy-700/60 hover:text-white"
                      }`}
                    >
                      <div className="font-medium text-white">{svc.shortTitle}</div>
                      <div className="text-xs text-gray-400 line-clamp-1">{svc.title}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Regular Nav Links */}
          <Link
            href="/projects"
            className={`px-3.5 py-2 text-sm font-medium transition-colors relative rounded-md text-white/90 hover:text-white ${
              pathname.startsWith("/projects") ? "text-white" : ""
            }`}
          >
            Projects
            {pathname.startsWith("/projects") && (
              <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-cyan-400 rounded-full" />
            )}
          </Link>

          <Link
            href="/about"
            className={`px-3.5 py-2 text-sm font-medium transition-colors relative rounded-md text-white/90 hover:text-white ${
              pathname === "/about" ? "text-white" : ""
            }`}
          >
            About
            {pathname === "/about" && (
              <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-cyan-400 rounded-full" />
            )}
          </Link>

          <Link
            href="/team"
            className={`px-3.5 py-2 text-sm font-medium transition-colors relative rounded-md text-white/90 hover:text-white ${
              pathname === "/team" ? "text-white" : ""
            }`}
          >
            Team
            {pathname === "/team" && (
              <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-cyan-400 rounded-full" />
            )}
          </Link>

          <Link
            href="/contact"
            className={`px-3.5 py-2 text-sm font-medium transition-colors relative rounded-md text-white/90 hover:text-white ${
              pathname === "/contact" ? "text-white" : ""
            }`}
          >
            Contact
            {pathname === "/contact" && (
              <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-cyan-400 rounded-full" />
            )}
          </Link>
        </nav>

        {/* Primary Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/start-a-project"
            onClick={() => trackEvent("cta_click", { location: "header_desktop" })}
            className="inline-flex items-center justify-center h-12 px-6 rounded-btn font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
          >
            Start a Project
          </Link>
        </div>

        {/* Mobile Hamburger Trigger */}
        <div className="flex items-center lg:hidden">
          <button
            ref={hamburgerRef}
            onClick={() => setMobileMenuOpen(true)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-overlay-menu"
            aria-label="Open navigation menu"
            className="p-2 text-white hover:text-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Full-Screen Mobile Overlay Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-overlay-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 bg-navy-950 flex flex-col justify-between overflow-y-auto"
        >
          {/* Header row in mobile overlay */}
          <div className="px-4 py-4 border-b border-navy-700 flex items-center justify-between">
            <NexvoraLogo variant="dark" className="h-8" />
            <button
              ref={closeBtnRef}
              onClick={() => {
                setMobileMenuOpen(false);
                hamburgerRef.current?.focus();
              }}
              aria-label="Close navigation menu"
              className="p-2 text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links with Accordion for Services */}
          <div className="px-6 py-6 space-y-4 flex-1">
            {/* Services Accordion */}
            <div>
              <button
                onClick={() => setMobileServicesExpanded(!mobileServicesExpanded)}
                aria-expanded={mobileServicesExpanded}
                className="w-full flex items-center justify-between py-2 text-lg font-semibold text-white border-b border-navy-700/50"
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-5 h-5 text-cyan-400 transition-transform ${
                    mobileServicesExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileServicesExpanded && (
                <div className="pl-4 py-3 space-y-2.5 border-l border-navy-700 mt-2">
                  <Link
                    href="/services"
                    className="block text-sm font-semibold text-cyan-400 hover:underline"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Overview of all services →
                  </Link>
                  {services.map((svc) => (
                    <Link
                      key={svc.slug}
                      href={`/services/${svc.slug}`}
                      className="block text-sm text-white/80 hover:text-white py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {svc.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/projects"
              className="block py-2 text-lg font-semibold text-white border-b border-navy-700/50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Projects
            </Link>

            <Link
              href="/about"
              className="block py-2 text-lg font-semibold text-white border-b border-navy-700/50"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>

            <Link
              href="/team"
              className="block py-2 text-lg font-semibold text-white border-b border-navy-700/50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Team
            </Link>

            <Link
              href="/contact"
              className="block py-2 text-lg font-semibold text-white border-b border-navy-700/50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>

          {/* Pinned Start a Project CTA at bottom of overlay */}
          <div className="p-6 border-t border-navy-700 bg-navy-900">
            <Link
              href="/start-a-project"
              onClick={() => {
                setMobileMenuOpen(false);
                trackEvent("cta_click", { location: "header_mobile_overlay" });
              }}
              className="w-full h-12 flex items-center justify-center font-semibold text-base bg-blue-600 hover:bg-blue-700 text-white rounded-btn shadow transition-colors"
            >
              Start a Project
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
