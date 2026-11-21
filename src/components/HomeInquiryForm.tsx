"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react";
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
    .email("Please provide a valid email address")
    .max(120, "Email cannot exceed 120 characters"),
  projectType: z.string().min(1, "Please select a project type"),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(2000, "Message cannot exceed 2000 characters"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must accept the privacy policy" }),
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
      projectType: "",
      message: "",
      consent: false as unknown as true,
      honeypot: "",
    },
  });

  const messageValue = watch("message", "");

  const onSubmit = async (data: InquiryFormData) => {
    setServerError(null);
    trackEvent("form_submit", { form: "home_inquiry" });

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
        throw new Error(json.error || "Failed to send inquiry. Please try again.");
      }

      setIsSuccess(true);
      reset();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Network error. Please try again or reach out directly.";
      setServerError(msg);
    }
  };

  return (
    <div className="bg-navy-900 border border-navy-700 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl relative">
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
          Send a Quick Inquiry
        </h3>
        <p className="text-sm text-gray-300 mt-1">
          Direct to founders Muhammad Azhar &amp; Owais Ahmad. Response within {siteConfig.contact.responseTime}.
        </p>
      </div>

      {isSuccess ? (
        <div className="bg-navy-950 border border-success/40 rounded-xl p-6 text-center space-y-3 animate-in fade-in">
          <CheckCircle2 className="w-10 h-10 text-success mx-auto" />
          <h4 className="text-lg font-bold text-white">Inquiry Received</h4>
          <p className="text-sm text-gray-300">
            Thank you! Your project details have been safely received by the founders. We will review your requirements and respond within {siteConfig.contact.responseTime}.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="text-xs text-cyan-400 underline pt-2 hover:text-white"
          >
            Send another message
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
              className="bg-red-950/50 border border-error/50 rounded-lg p-3 text-sm text-red-200 flex items-start gap-2"
            >
              <AlertCircle className="w-4 h-4 text-error mt-0.5 flex-shrink-0" />
              <span>{serverError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label htmlFor="home-fullName" className="block text-xs font-medium text-gray-200 mb-1">
                Your Name <span className="text-cyan-400">*</span>
              </label>
              <input
                id="home-fullName"
                type="text"
                autoComplete="name"
                disabled={isSubmitting}
                {...register("fullName")}
                className={`w-full h-11 px-3.5 rounded-input bg-navy-950 border text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors ${
                  errors.fullName ? "border-error" : "border-navy-700 hover:border-gray-500"
                }`}
                placeholder="Jane Doe"
              />
              {errors.fullName && (
                <p className="text-xs text-error mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="home-email" className="block text-xs font-medium text-gray-200 mb-1">
                Work Email <span className="text-cyan-400">*</span>
              </label>
              <input
                id="home-email"
                type="email"
                autoComplete="email"
                disabled={isSubmitting}
                {...register("email")}
                className={`w-full h-11 px-3.5 rounded-input bg-navy-950 border text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors ${
                  errors.email ? "border-error" : "border-navy-700 hover:border-gray-500"
                }`}
                placeholder="jane@company.com"
              />
              {errors.email && (
                <p className="text-xs text-error mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Project Type */}
          <div>
            <label htmlFor="home-projectType" className="block text-xs font-medium text-gray-200 mb-1">
              Project Type <span className="text-cyan-400">*</span>
            </label>
            <select
              id="home-projectType"
              disabled={isSubmitting}
              {...register("projectType")}
              className={`w-full h-11 px-3.5 rounded-input bg-navy-950 border text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors ${
                errors.projectType ? "border-error" : "border-navy-700 hover:border-gray-500"
              }`}
            >
              <option value="" disabled>Select service domain...</option>
              <option value="Custom Software">Custom Software &amp; Web Apps</option>
              <option value="Cloud Infrastructure">Cloud &amp; IT Infrastructure</option>
              <option value="Data Engineering">Data Engineering &amp; Analytics</option>
              <option value="CRM Solutions">CRM Solutions &amp; Integration</option>
              <option value="AI & Automation">AI Solutions &amp; Automation</option>
              <option value="Web & UI/UX">Website &amp; UI/UX Design</option>
              <option value="Consulting">Technical Architecture Consulting</option>
            </select>
            {errors.projectType && (
              <p className="text-xs text-error mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.projectType.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="home-message" className="text-xs font-medium text-gray-200">
                Project Overview <span className="text-cyan-400">*</span>
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
                errors.message ? "border-error" : "border-navy-700 hover:border-gray-500"
              }`}
              placeholder="Briefly describe what you need to build or solve..."
            />
            {errors.message && (
              <p className="text-xs text-error mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.message.message}
              </p>
            )}
          </div>

          {/* Consent Checkbox */}
          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                disabled={isSubmitting}
                {...register("consent")}
                className="w-4 h-4 mt-0.5 rounded border-navy-700 bg-navy-950 text-blue-600 focus:ring-cyan-400 focus:ring-offset-navy-950"
              />
              <span className="text-xs text-gray-300">
                I agree to allow NEXVORA to process my details to respond to this inquiry per the{" "}
                <Link href="/privacy-policy" className="text-cyan-400 underline hover:text-white">
                  Privacy Policy
                </Link>.
              </span>
            </label>
            {errors.consent && (
              <p className="text-xs text-error mt-1 flex items-center gap-1">
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
                  <span>Sending inquiry...</span>
                </>
              ) : (
                <>
                  <span>Send Inquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Alternative Shortcuts Footer */}
      <div className="mt-6 pt-6 border-t border-navy-700/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-300">
        <span>Need a comprehensive scope &amp; budget?</span>
        <Link
          href="/start-a-project"
          className="text-cyan-400 font-semibold hover:underline inline-flex items-center gap-1"
        >
          Open 4-step quote calculator <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

