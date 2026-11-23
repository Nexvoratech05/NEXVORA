"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { CheckCircle2, AlertCircle, Loader2, ArrowRight, MessageCircle } from "lucide-react";
import { siteConfig } from "@/content/site";
import { trackEvent } from "@/lib/analytics";

const inquirySchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name cannot exceed 80 characters")
    .transform((v) => v.trim()),
  email: z
    .string()
    .email("Please provide a valid business or work email")
    .max(120, "Email cannot exceed 120 characters"),
  phone: z
    .string()
    .max(25, "Phone / WhatsApp number too long")
    .optional()
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const digitsOnly = val.replace(/[^0-9]/g, "");
      return digitsOnly.length >= 7 && digitsOnly.length <= 16;
    }, "Please provide a valid phone or WhatsApp number (7 to 16 digits)"),
  projectType: z.string().min(1, "Please select an engineering division"),
  message: z
    .string()
    .min(20, "Project summary must be at least 20 characters")
    .max(2000, "Project summary cannot exceed 2000 characters"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must accept the privacy policy to proceed" }),
  }),
  honeypot: z.string().max(0, "Invalid submission"),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

export function HomeInquiryForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      projectType: "",
      message: "",
      consent: false as unknown as true,
      honeypot: "",
    },
  });

  const messageValue = watch("message", "");

  const onSubmit = async (data: InquiryFormData) => {
    setServerError(null);
    trackEvent("form_submit", { form: "home_fast_track_inquiry" });

    try {
      const payload = {
        ...data,
        subject: data.projectType,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Failed to submit inquiry. Please try again or reach out directly.");
      }

      setIsSuccess(true);
      reset();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Network error. Please try again or message our team directly.";
      setServerError(msg);
    }
  };

  const encodedGreeting = encodeURIComponent(
    siteConfig.contact.whatsappGreeting || "Hello NEXVORA Technologies, I would like to discuss an engineering project."
  );
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodedGreeting}`;

  return (
    <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl relative">
      <div className="mb-6 space-y-1">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-[11px] font-mono font-medium">
          Fast-Track Consultation
        </div>
        <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
          Direct Engineering Inquiry
        </h3>
        <p className="text-xs sm:text-sm text-gray-300">
          Reviewed directly by technical leads Muhammad Azhar &amp; Owais Ahmad. {siteConfig.contact.responseTime}
        </p>
      </div>

      {/* Direct WhatsApp Quick Contact Button */}
      {siteConfig.contact.hasRealWhatsapp && (
        <div className="mb-6 p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-xs text-emerald-200">
            <MessageCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div>
              <span className="font-semibold block text-white">Need an immediate direct conversation?</span>
              <span className="text-[11px] text-emerald-300/90">Connect directly with engineering leads via WhatsApp.</span>
            </div>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto h-9 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs inline-flex items-center justify-center gap-1.5 transition-colors shadow-sm flex-shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      )}

      {isSuccess ? (
        <div className="bg-navy-950 border border-emerald-500/40 rounded-xl p-6 text-center space-y-3 animate-in fade-in">
          <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
          <h4 className="text-lg font-bold text-white">Inquiry Received</h4>
          <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
            Thank you! Your requirements have been submitted directly to our engineering leads. {siteConfig.contact.responseTime}
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="text-xs text-cyan-400 underline pt-2 hover:text-white"
          >
            Submit an additional inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {/* Honeypot hidden input */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="hp_home">Leave this blank</label>
            <input
              id="hp_home"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("honeypot")}
            />
          </div>

          {serverError && (
            <div
              role="alert"
              className="bg-red-950/60 border border-red-500/60 rounded-lg p-3 text-xs sm:text-sm text-red-200 flex items-start gap-2"
            >
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <span>{serverError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Field 1: Full Name */}
            <div>
              <label htmlFor="home-fullName" className="block text-xs font-medium text-gray-200 mb-1">
                Full Name <span className="text-cyan-400">*</span>
              </label>
              <input
                id="home-fullName"
                type="text"
                autoComplete="name"
                disabled={isSubmitting}
                {...register("fullName")}
                className={`w-full h-11 px-3.5 rounded-input bg-navy-950 border text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors ${
                  errors.fullName ? "border-red-500" : "border-navy-700 hover:border-gray-500"
                }`}
                placeholder="Alex Morgan"
              />
              {errors.fullName && (
                <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Field 2: Business Email */}
            <div>
              <label htmlFor="home-email" className="block text-xs font-medium text-gray-200 mb-1">
                Business / Work Email <span className="text-cyan-400">*</span>
              </label>
              <input
                id="home-email"
                type="email"
                autoComplete="email"
                disabled={isSubmitting}
                {...register("email")}
                className={`w-full h-11 px-3.5 rounded-input bg-navy-950 border text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors ${
                  errors.email ? "border-red-500" : "border-navy-700 hover:border-gray-500"
                }`}
                placeholder="alex@enterprise.com"
              />
              {errors.email && (
                <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Field 3: Phone / WhatsApp Number */}
            <div>
              <label htmlFor="home-phone" className="block text-xs font-medium text-gray-200 mb-1">
                Phone / WhatsApp Number <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                id="home-phone"
                type="tel"
                autoComplete="tel"
                disabled={isSubmitting}
                {...register("phone")}
                className={`w-full h-11 px-3.5 rounded-input bg-navy-950 border text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors ${
                  errors.phone ? "border-red-500" : "border-navy-700 hover:border-gray-500"
                }`}
                placeholder="+1 (555) 019-2834"
              />
              {errors.phone && (
                <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.phone.message}
                </p>
              )}
            </div>

            {/* Field 4: Service Division of Interest */}
            <div>
              <label htmlFor="home-projectType" className="block text-xs font-medium text-gray-200 mb-1">
                Engineering Division of Interest <span className="text-cyan-400">*</span>
              </label>
              <select
                id="home-projectType"
                disabled={isSubmitting}
                {...register("projectType")}
                className={`w-full h-11 px-3.5 rounded-input bg-navy-950 border text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors ${
                  errors.projectType ? "border-red-500" : "border-navy-700 hover:border-gray-500"
                }`}
              >
                <option value="" disabled>Select engineering division...</option>
                <option value="Data Engineering & Lakehouses">Data Engineering &amp; Lakehouses</option>
                <option value="Artificial Intelligence & Vision">Artificial Intelligence &amp; Vision</option>
                <option value="Generative AI & Agentic Systems">Generative AI &amp; Agentic Systems</option>
                <option value="Cloud & DevOps Engineering">Cloud &amp; DevOps Engineering</option>
                <option value="Software & API Engineering">Software &amp; API Engineering</option>
                <option value="Business Automation & Enterprise ERP">Business Automation &amp; Enterprise ERP</option>
                <option value="General Architecture Consultation">General Architecture Consultation</option>
              </select>
              {errors.projectType && (
                <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.projectType.message}
                </p>
              )}
            </div>
          </div>

          {/* Field 5: Project Summary */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="home-message" className="text-xs font-medium text-gray-200">
                Project Summary &amp; Technical Objectives <span className="text-cyan-400">*</span>
              </label>
              <span className="text-[11px] text-gray-400 font-mono">
                {messageValue.length}/2000
              </span>
            </div>
            <textarea
              id="home-message"
              rows={3}
              disabled={isSubmitting}
              {...register("message")}
              className={`w-full p-3 rounded-input bg-navy-950 border text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors ${
                errors.message ? "border-red-500" : "border-navy-700 hover:border-gray-500"
              }`}
              placeholder="Outline your technical goals, target cloud/stack, timeline, or current bottlenecks..."
            />
            {errors.message && (
              <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.message.message}
              </p>
            )}
          </div>

          {/* Field 6: Privacy Consent */}
          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                disabled={isSubmitting}
                {...register("consent")}
                className="w-4 h-4 mt-0.5 rounded border-navy-700 bg-navy-950 text-blue-600 focus:ring-cyan-400 focus:ring-offset-navy-950"
              />
              <span className="text-xs text-gray-300">
                I agree to allow NEXVORA Technologies to process my details to respond to this technical inquiry in accordance with the{" "}
                <Link href="/privacy-policy" className="text-cyan-400 underline hover:text-white">
                  Privacy Policy
                </Link>.
              </span>
            </label>
            {errors.consent && (
              <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.consent.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-btn font-semibold text-sm bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white shadow-md flex items-center justify-center gap-2 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting inquiry...</span>
                </>
              ) : (
                <>
                  <span>Submit Fast-Track Inquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Structured Scope Calculator Alternative Link */}
      <div className="mt-6 pt-6 border-t border-navy-700/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-300">
        <span>Need a comprehensive architectural scope &amp; budget?</span>
        <Link
          href="/start-a-project"
          className="text-cyan-400 font-semibold hover:underline inline-flex items-center gap-1"
        >
          <span>Open 4-step project scoping wizard</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
