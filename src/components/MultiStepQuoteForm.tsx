"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  AlertCircle,
  Loader2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { services } from "@/content/site";
import { trackEvent } from "@/lib/analytics";

interface QuoteFormData {
  services: string[];
  projectName: string;
  projectDescription: string;
  mainGoal: string;
  existingUrl: string;
  timeline: string;
  budgetRange: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  contactMethod: "Email" | "WhatsApp" | "Video Call";
  consent: boolean;
  honeypot: string;
}

const initialData: QuoteFormData = {
  services: [],
  projectName: "",
  projectDescription: "",
  mainGoal: "",
  existingUrl: "",
  timeline: "",
  budgetRange: "",
  fullName: "",
  email: "",
  phone: "",
  company: "",
  country: "",
  contactMethod: "Email",
  consent: false,
  honeypot: "",
};

export function MultiStepQuoteForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preSelectedService = searchParams.get("service");

  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<QuoteFormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Load from sessionStorage or pre-fill query service
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("nexvora_quote_draft");
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData(parsed);
      } else if (preSelectedService) {
        const matched = services.find((s) => s.slug === preSelectedService);
        if (matched) {
          setFormData((prev) => ({
            ...prev,
            services: [matched.title],
          }));
        }
      }
    } catch {
      // fallback
    }
  }, [preSelectedService]);

  // Persist form state to sessionStorage
  const updateFormData = (updates: Partial<QuoteFormData>) => {
    setFormData((prev) => {
      const next = { ...prev, ...updates };
      try {
        sessionStorage.setItem("nexvora_quote_draft", JSON.stringify(next));
      } catch {
        // quota ignore
      }
      return next;
    });
  };

  const toggleService = (title: string) => {
    let current = [...formData.services];
    if (current.includes(title)) {
      current = current.filter((s) => s !== title);
    } else {
      current.push(title);
    }
    updateFormData({ services: current });
    if (errors.services) {
      setErrors((prev) => {
        const n = { ...prev };
        delete n.services;
        return n;
      });
    }
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (formData.services.length === 0) {
      errs.services = "Please select at least one service category or 'Not sure'";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!formData.projectDescription || formData.projectDescription.trim().length < 50) {
      errs.projectDescription = "Please provide at least 50 characters describing your project";
    }
    if (!formData.mainGoal) {
      errs.mainGoal = "Please select the primary goal for this engagement";
    }
    if (formData.existingUrl && formData.existingUrl.trim() !== "") {
      try {
        new URL(formData.existingUrl.startsWith("http") ? formData.existingUrl : `https://${formData.existingUrl}`);
      } catch {
        errs.existingUrl = "Please provide a valid website or repository URL";
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 3 Validation
  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (!formData.timeline) {
      errs.timeline = "Please select an estimated project timeline";
    }
    if (!formData.budgetRange) {
      errs.budgetRange = "Please select a budget range or 'Prefer to discuss'";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 4 Validation
  const validateStep4 = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName || formData.fullName.trim().length < 2) {
      errs.fullName = "Please enter your full name (minimum 2 characters)";
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid work email address";
    }
    const phoneDigits = formData.phone ? formData.phone.replace(/[^0-9]/g, "") : "";
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      errs.phone = "Please provide a valid phone or WhatsApp number (7-15 digits)";
    }
    if (!formData.country || formData.country.trim().length < 2) {
      errs.country = "Please enter your country or operating region";
    }
    if (!formData.consent) {
      errs.consent = "You must accept the Privacy Policy to submit your request";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      trackEvent("form_start", { step: 1 });
      setStep(2);
      window.scrollTo({ top: 200, behavior: "smooth" });
    } else if (step === 2 && validateStep2()) {
      setStep(3);
      window.scrollTo({ top: 200, behavior: "smooth" });
    } else if (step === 3 && validateStep3()) {
      setStep(4);
      window.scrollTo({ top: 200, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setErrors({});
    setServerError(null);
    setStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep4()) return;

    setIsSubmitting(true);
    setServerError(null);
    trackEvent("form_submit", { form: "quote_multi_step" });

    try {
      const payload = {
        ...formData,
      };

      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Unable to process quote submission.");
      }

      // Clear session storage upon success
      sessionStorage.removeItem("nexvora_quote_draft");

      // Redirect to thank-you page
      router.push("/thank-you");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Network error. Your details have been preserved.";
      setServerError(msg);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Progress Bar & Steps Indicator */}
      <div className="bg-navy-950 p-6 sm:p-8 text-white border-b border-navy-700">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono text-cyan-400 font-semibold tracking-wider">
            STEP 0{step} OF 04
          </span>
          <span className="text-xs text-gray-400">
            {step === 1 && "Select Services"}
            {step === 2 && "Project Description & Goals"}
            {step === 3 && "Timeline & Budget"}
            {step === 4 && "Contact Details & Review"}
          </span>
        </div>

        {/* Step progress pills */}
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i <= step ? "bg-cyan-400" : "bg-navy-700"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-10">
        {serverError && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-error text-error text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Submission Interrupted</p>
              <p className="text-xs mt-0.5 text-red-700">{serverError}</p>
            </div>
          </div>
        )}

        {/* STEP 1: SERVICE TYPE */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-navy-950">
                1. What services are you looking for?
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Select all disciplines that apply to your engagement.
              </p>
            </div>

            {errors.services && (
              <p className="text-xs text-error font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.services}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((svc) => {
                const isSelected = formData.services.includes(svc.title);
                return (
                  <button
                    key={svc.slug}
                    type="button"
                    onClick={() => toggleService(svc.title)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      isSelected
                        ? "border-blue-600 bg-blue-50/40 ring-1 ring-blue-600"
                        : "border-gray-200 hover:border-gray-400 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-sm text-navy-950 font-heading">
                        {svc.shortTitle}
                      </span>
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center text-xs ${
                          isSelected
                            ? "bg-blue-600 text-white"
                            : "border border-gray-300"
                        }`}
                      >
                        {isSelected && "✓"}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {svc.heroOutcome}
                    </p>
                  </button>
                );
              })}

              {/* "Not sure" Option */}
              <button
                type="button"
                onClick={() => toggleService("Not sure / Discovery Consultation")}
                className={`p-4 rounded-xl border text-left transition-all sm:col-span-2 ${
                  formData.services.includes("Not sure / Discovery Consultation")
                    ? "border-blue-600 bg-blue-50/40 ring-1 ring-blue-600"
                    : "border-gray-200 hover:border-gray-400 bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-navy-950 font-heading">
                    Not sure / Need Architectural Consultation
                  </span>
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center text-xs ${
                      formData.services.includes("Not sure / Discovery Consultation")
                        ? "bg-blue-600 text-white"
                        : "border border-gray-300"
                    }`}
                  >
                    {formData.services.includes("Not sure / Discovery Consultation") && "✓"}
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Select this if you need our team to audit your current workflow and recommend the optimal stack and approach.
                </p>
              </button>
            </div>

            <div className="pt-6 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="h-12 px-8 rounded-btn font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow flex items-center gap-2"
              >
                <span>Continue to Project Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PROJECT DESCRIPTION & GOALS */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-navy-950">
                2. Project Description &amp; Objectives
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Help us understand what you are building and what success looks like.
              </p>
            </div>

            {/* Project Name (Optional) */}
            <div>
              <label htmlFor="qp_name" className="block text-xs font-semibold uppercase tracking-wider text-navy-950 mb-1.5 font-heading">
                Project Name <span className="text-xs font-normal text-gray-500 lowercase">(optional)</span>
              </label>
              <input
                id="qp_name"
                type="text"
                value={formData.projectName}
                onChange={(e) => updateFormData({ projectName: e.target.value })}
                className="w-full h-12 px-4 rounded-input border border-gray-200 bg-white text-sm text-navy-950 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="e.g. Sales Pipeline Modernization"
              />
            </div>

            {/* Main Goal (Required Select) */}
            <div>
              <label htmlFor="qp_goal" className="block text-xs font-semibold uppercase tracking-wider text-navy-950 mb-1.5 font-heading">
                Primary Goal <span className="text-blue-600">*</span>
              </label>
              <select
                id="qp_goal"
                value={formData.mainGoal}
                onChange={(e) => updateFormData({ mainGoal: e.target.value })}
                className={`w-full h-12 px-4 rounded-input border bg-white text-sm text-navy-950 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  errors.mainGoal ? "border-error bg-red-50/20" : "border-gray-200"
                }`}
              >
                <option value="">Select the primary objective...</option>
                <option value="Build new digital product from scratch">Build new digital product from scratch</option>
                <option value="Modernize / refactor legacy system">Modernize / refactor legacy system</option>
                <option value="Fix cloud scalability & infrastructure downtime">Fix cloud scalability &amp; infrastructure downtime</option>
                <option value="Clean data pipelines & deduplicate CRM records">Clean data pipelines &amp; deduplicate CRM records</option>
                <option value="Automate manual back-office tasks with AI">Automate manual back-office tasks with AI</option>
                <option value="Re-engineer corporate website & design system">Re-engineer corporate website &amp; design system</option>
                <option value="Other">Other Strategic Goal</option>
              </select>
              {errors.mainGoal && (
                <p className="text-xs text-error mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.mainGoal}
                </p>
              )}
            </div>

            {/* Existing System URL (Optional) */}
            <div>
              <label htmlFor="qp_url" className="block text-xs font-semibold uppercase tracking-wider text-navy-950 mb-1.5 font-heading">
                Existing Website or Repository URL <span className="text-xs font-normal text-gray-500 lowercase">(optional)</span>
              </label>
              <input
                id="qp_url"
                type="url"
                value={formData.existingUrl}
                onChange={(e) => updateFormData({ existingUrl: e.target.value })}
                className={`w-full h-12 px-4 rounded-input border bg-white text-sm text-navy-950 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  errors.existingUrl ? "border-error bg-red-50/20" : "border-gray-200"
                }`}
                placeholder="https://example.com or GitHub repo"
              />
              {errors.existingUrl && (
                <p className="text-xs text-error mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.existingUrl}
                </p>
              )}
            </div>

            {/* Project Description (Required 50-3000 chars) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="qp_desc" className="text-xs font-semibold uppercase tracking-wider text-navy-950 font-heading">
                  Detailed Project Description <span className="text-blue-600">*</span>
                </label>
                <span className="text-[11px] text-gray-400 font-mono">
                  {formData.projectDescription.length}/3000 chars (min 50)
                </span>
              </div>
              <textarea
                id="qp_desc"
                rows={5}
                value={formData.projectDescription}
                onChange={(e) => updateFormData({ projectDescription: e.target.value })}
                className={`w-full p-4 rounded-input border bg-white text-sm text-navy-950 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  errors.projectDescription ? "border-error bg-red-50/20" : "border-gray-200"
                }`}
                placeholder="Describe your current bottleneck, target features, user roles, integrations required, and any technical constraints..."
              />
              {errors.projectDescription && (
                <p className="text-xs text-error mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.projectDescription}
                </p>
              )}
            </div>

            <div className="pt-6 flex items-center justify-between border-t border-gray-100">
              <button
                type="button"
                onClick={handleBack}
                className="h-12 px-6 rounded-btn font-semibold text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="h-12 px-8 rounded-btn font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow flex items-center gap-2"
              >
                <span>Continue to Scope &amp; Budget</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SCOPE, TIMELINE & BUDGET */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-navy-950">
                3. Timeline, Budget &amp; Documentation
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Help us align expectations and allocate engineering capacity.
              </p>
            </div>

            {/* Timeline */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-navy-950 mb-2 font-heading">
                Estimated Delivery Timeline <span className="text-blue-600">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {["ASAP (Urgent)", "1–3 Months", "3–6 Months", "Flexible / Roadmapped"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => updateFormData({ timeline: t })}
                    className={`h-12 px-3 rounded-xl border text-xs font-semibold transition-all ${
                      formData.timeline === t
                        ? "border-blue-600 bg-blue-50/50 text-blue-700 ring-1 ring-blue-600"
                        : "border-gray-200 text-gray-700 hover:border-gray-400 bg-white"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {errors.timeline && (
                <p className="text-xs text-error mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.timeline}
                </p>
              )}
            </div>

            {/* Budget Range [PLACEHOLDER currency and brackets to be confirmed by founders] */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="qp_budget" className="text-xs font-semibold uppercase tracking-wider text-navy-950 font-heading">
                  Anticipated Budget Range <span className="text-blue-600">*</span>
                </label>
                <span className="text-[11px] text-gray-400 font-mono">
                  USD ($)
                </span>
              </div>
              <select
                id="qp_budget"
                value={formData.budgetRange}
                onChange={(e) => updateFormData({ budgetRange: e.target.value })}
                className={`w-full h-12 px-4 rounded-input border bg-white text-sm text-navy-950 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  errors.budgetRange ? "border-error bg-red-50/20" : "border-gray-200"
                }`}
              >
                <option value="">Select budget range...</option>
                <option value="$3,000 – $7,500">$3,000 – $7,500 (MVP / Focused Integration)</option>
                <option value="$7,500 – $15,000">$7,500 – $15,000 (Standard Product Build / Migration)</option>
                <option value="$15,000 – $30,000">$15,000 – $30,000 (Full Platform / Enterprise Systems)</option>
                <option value="$30,000+">$30,000+ (Multi-Region / Dedicated Engineering Retainer)</option>
                <option value="Prefer to discuss">Prefer to discuss during technical discovery</option>
              </select>
              {errors.budgetRange && (
                <p className="text-xs text-error mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.budgetRange}
                </p>
              )}
            </div>

            {/* Architecture Documents & Briefs Advisory Notice */}
            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-navy-950 font-heading block">
                Architecture Documents &amp; RFP Briefs
              </span>
              <p className="text-xs text-gray-600 leading-relaxed">
                To maintain confidentiality and prevent exposure of unencrypted assets, please share system architecture diagrams, PRDs, or RFP specifications directly via email or during discovery following this scope submission.
              </p>
            </div>

            <div className="pt-6 flex items-center justify-between border-t border-gray-100">
              <button
                type="button"
                onClick={handleBack}
                className="h-12 px-6 rounded-btn font-semibold text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="h-12 px-8 rounded-btn font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow flex items-center gap-2"
              >
                <span>Continue to Contact &amp; Review</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CONTACT DETAILS & REVIEW SUMMARY */}
        {step === 4 && (
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-navy-950">
                4. Contact Details &amp; Summary Review
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Provide your details so founders Muhammad Azhar and Owais Ahmad can reach you.
              </p>
            </div>

            {/* Honeypot hidden input */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="qp_hp">Leave empty</label>
              <input
                id="qp_hp"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={formData.honeypot}
                onChange={(e) => updateFormData({ honeypot: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label htmlFor="qp_fullname" className="block text-xs font-semibold uppercase tracking-wider text-navy-950 mb-1 font-heading">
                  Full Name <span className="text-blue-600">*</span>
                </label>
                <input
                  id="qp_fullname"
                  type="text"
                  autoComplete="name"
                  value={formData.fullName}
                  onChange={(e) => updateFormData({ fullName: e.target.value })}
                  className={`w-full h-11 px-3.5 rounded-input border bg-white text-sm text-navy-950 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    errors.fullName ? "border-error bg-red-50/20" : "border-gray-200"
                  }`}
                  placeholder="Jane Smith"
                />
                {errors.fullName && (
                  <p className="text-xs text-error mt-1 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
                  </p>
                )}
              </div>

              {/* Work Email */}
              <div>
                <label htmlFor="qp_email" className="block text-xs font-semibold uppercase tracking-wider text-navy-950 mb-1 font-heading">
                  Work Email <span className="text-blue-600">*</span>
                </label>
                <input
                  id="qp_email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => updateFormData({ email: e.target.value })}
                  className={`w-full h-11 px-3.5 rounded-input border bg-white text-sm text-navy-950 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    errors.email ? "border-error bg-red-50/20" : "border-gray-200"
                  }`}
                  placeholder="jane@company.com"
                />
                {errors.email && (
                  <p className="text-xs text-error mt-1 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Phone / WhatsApp */}
              <div>
                <label htmlFor="qp_phone" className="block text-xs font-semibold uppercase tracking-wider text-navy-950 mb-1 font-heading">
                  Phone / WhatsApp <span className="text-blue-600">*</span>
                </label>
                <input
                  id="qp_phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData({ phone: e.target.value })}
                  className={`w-full h-11 px-3.5 rounded-input border bg-white text-sm text-navy-950 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    errors.phone ? "border-error bg-red-50/20" : "border-gray-200"
                  }`}
                  placeholder="+92 300 1234567"
                />
                {errors.phone && (
                  <p className="text-xs text-error mt-1 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                  </p>
                )}
              </div>

              {/* Company (Optional) */}
              <div>
                <label htmlFor="qp_company" className="block text-xs font-semibold uppercase tracking-wider text-navy-950 mb-1 font-heading">
                  Company Name <span className="text-xs font-normal text-gray-500 lowercase">(optional)</span>
                </label>
                <input
                  id="qp_company"
                  type="text"
                  autoComplete="organization"
                  value={formData.company}
                  onChange={(e) => updateFormData({ company: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-input border border-gray-200 bg-white text-sm text-navy-950 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Acme Corp"
                />
              </div>

              {/* Country */}
              <div>
                <label htmlFor="qp_country" className="block text-xs font-semibold uppercase tracking-wider text-navy-950 mb-1 font-heading">
                  Country / Region <span className="text-blue-600">*</span>
                </label>
                <input
                  id="qp_country"
                  type="text"
                  autoComplete="country-name"
                  value={formData.country}
                  onChange={(e) => updateFormData({ country: e.target.value })}
                  className={`w-full h-11 px-3.5 rounded-input border bg-white text-sm text-navy-950 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    errors.country ? "border-error bg-red-50/20" : "border-gray-200"
                  }`}
                  placeholder="Pakistan, UAE, USA..."
                />
                {errors.country && (
                  <p className="text-xs text-error mt-1 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.country}
                  </p>
                )}
              </div>
            </div>

            {/* Preferred Contact Method */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-navy-950 mb-2 font-heading">
                Preferred Mode of Response
              </label>
              <div className="flex flex-wrap gap-4">
                {(["Email", "WhatsApp", "Video Call"] as const).map((method) => (
                  <label key={method} className="flex items-center gap-2 cursor-pointer text-xs font-medium text-navy-950">
                    <input
                      type="radio"
                      name="contactMethod"
                      value={method}
                      checked={formData.contactMethod === method}
                      onChange={() => updateFormData({ contactMethod: method })}
                      className="text-blue-600 focus:ring-blue-600"
                    />
                    <span>{method}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Review Summary Card */}
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <span className="font-bold text-navy-950 uppercase tracking-wider font-heading">
                  Submission Summary
                </span>
                <span className="text-gray-400 font-mono">Review prior to dispatch</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                <div>
                  <span className="text-gray-400 block mb-0.5">Selected Services:</span>
                  <span className="font-semibold text-navy-950">
                    {formData.services.length > 0 ? formData.services.join(", ") : "None selected"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">Primary Objective:</span>
                  <span className="font-semibold text-navy-950">{formData.mainGoal || "Not specified"}</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">Timeline:</span>
                  <span className="font-semibold text-navy-950">{formData.timeline || "Not selected"}</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">Budget Range:</span>
                  <span className="font-semibold text-navy-950">{formData.budgetRange || "Not selected"}</span>
                </div>
              </div>
            </div>

            {/* Consent Checkbox */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => updateFormData({ consent: e.target.checked })}
                  className="w-4 h-4 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                />
                <span className="text-xs text-gray-600 leading-relaxed">
                  I agree to allow NEXVORA Technologies to process this project request under the terms of the{" "}
                  <Link href="/privacy-policy" className="text-blue-600 underline font-medium">
                    Privacy Policy
                  </Link>. We enforce zero spam and no third-party marketing sharing.
                </span>
              </label>
              {errors.consent && (
                <p className="text-xs text-error mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.consent}
                </p>
              )}
            </div>

            {/* Final Action Buttons */}
            <div className="pt-6 flex items-center justify-between border-t border-gray-100">
              <button
                type="button"
                onClick={handleBack}
                disabled={isSubmitting}
                className="h-12 px-6 rounded-btn font-semibold text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="h-12 px-8 rounded-btn font-semibold text-sm bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white shadow-md flex items-center gap-2 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting quote request...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Project Scope</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
