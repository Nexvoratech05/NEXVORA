"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { siteConfig } from "@/content/site";
import { trackEvent } from "@/lib/analytics";

const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name cannot exceed 80 characters")
    .transform((v) => v.trim()),
  email: z
    .string()
    .email("Please provide a valid corporate or personal email")
    .max(120, "Email cannot exceed 120 characters"),
  phone: z
    .string()
    .max(20, "Phone number too long")
    .optional()
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const digitsOnly = val.replace(/[^0-9]/g, "");
      return digitsOnly.length >= 7 && digitsOnly.length <= 15;
    }, "Please provide a valid phone number (7 to 15 digits)"),
  subject: z.enum(["General inquiry", "Partnership", "Support", "Other"], {
    errorMap: () => ({ message: "Please select a subject" }),
  }),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(2000, "Message cannot exceed 2000 characters"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must accept the Privacy Policy to proceed" }),
  }),
  honeypot: z.string().max(0, "Bot submission rejected"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: undefined,
      message: "",
      consent: false as unknown as true,
      honeypot: "",
    },
  });

  const messageValue = watch("message", "");

  const onSubmit = async (data: ContactFormData) => {
    setServerError(null);
    trackEvent("form_submit", { form: "contact_page" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Failed to submit message. Please try again.");
      }

      setIsSuccess(true);
      reset();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Network error. Your details have been preserved. Please try again.";
      setServerError(msg);
    }
  };

  const errorCount = Object.keys(errors).length;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-sm relative">
      {/* Live accessibility summary of errors */}
      {errorCount > 0 && (
        <div aria-live="assertive" className="sr-only">
          The contact form has {errorCount} validation error{errorCount > 1 ? "s" : ""}. Please review the highlighted fields.
        </div>
      )}

      {isSuccess ? (
        <div className="p-8 text-center space-y-4 bg-gray-50 border border-success/40 rounded-xl animate-in fade-in">
          <CheckCircle2 className="w-12 h-12 text-success mx-auto" />
          <h3 className="text-xl font-bold font-heading text-navy-950">
            Thank You — Message Received
          </h3>
          <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
            Your inquiry has been routed directly to founders Muhammad Azhar and Owais Ahmad. We will review your message and reply within {siteConfig.contact.responseTime}.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setIsSuccess(false)}
              className="text-xs text-blue-600 font-semibold hover:underline"
            >
              Send an additional inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          {/* Honeypot hidden input */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="contact_hp">Leave this empty</label>
            <input
              id="contact_hp"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("honeypot")}
            />
          </div>

          {serverError && (
            <div
              role="alert"
              className="bg-red-50 border border-error text-error rounded-lg p-4 text-sm flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Unable to dispatch message</p>
                <p className="text-xs mt-0.5 text-red-700">{serverError}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label htmlFor="cf_name" className="block text-xs font-semibold uppercase tracking-wider text-navy-950 mb-1.5 font-heading">
                Full Name <span className="text-blue-600">*</span>
              </label>
              <input
                id="cf_name"
                type="text"
                autoComplete="name"
                disabled={isSubmitting}
                {...register("fullName")}
                className={`w-full h-12 px-4 rounded-input border bg-white text-sm text-navy-950 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors ${
                  errors.fullName ? "border-error bg-red-50/20" : "border-gray-200 hover:border-gray-400"
                }`}
                placeholder="e.g. Tariq Mansoor"
                aria-describedby={errors.fullName ? "cf_name_error" : undefined}
                aria-invalid={!!errors.fullName}
              />
              {errors.fullName && (
                <p id="cf_name_error" className="text-xs text-error mt-1.5 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="cf_email" className="block text-xs font-semibold uppercase tracking-wider text-navy-950 mb-1.5 font-heading">
                Work Email <span className="text-blue-600">*</span>
              </label>
              <input
                id="cf_email"
                type="email"
                autoComplete="email"
                disabled={isSubmitting}
                {...register("email")}
                className={`w-full h-12 px-4 rounded-input border bg-white text-sm text-navy-950 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors ${
                  errors.email ? "border-error bg-red-50/20" : "border-gray-200 hover:border-gray-400"
                }`}
                placeholder="name@company.com"
                aria-describedby={errors.email ? "cf_email_error" : undefined}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p id="cf_email_error" className="text-xs text-error mt-1.5 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Phone (Optional) */}
            <div>
              <label htmlFor="cf_phone" className="block text-xs font-semibold uppercase tracking-wider text-navy-950 mb-1.5 font-heading">
                Phone Number <span className="text-xs font-normal text-gray-500 lowercase">(optional)</span>
              </label>
              <input
                id="cf_phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                disabled={isSubmitting}
                {...register("phone")}
                className={`w-full h-12 px-4 rounded-input border bg-white text-sm text-navy-950 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors ${
                  errors.phone ? "border-error bg-red-50/20" : "border-gray-200 hover:border-gray-400"
                }`}
                placeholder="+92 300 1234567"
                aria-describedby={errors.phone ? "cf_phone_error" : undefined}
                aria-invalid={!!errors.phone}
              />
              {errors.phone && (
                <p id="cf_phone_error" className="text-xs text-error mt-1.5 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.phone.message}
                </p>
              )}
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="cf_subject" className="block text-xs font-semibold uppercase tracking-wider text-navy-950 mb-1.5 font-heading">
                Subject <span className="text-blue-600">*</span>
              </label>
              <select
                id="cf_subject"
                disabled={isSubmitting}
                {...register("subject")}
                className={`w-full h-12 px-4 rounded-input border bg-white text-sm text-navy-950 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors ${
                  errors.subject ? "border-error bg-red-50/20" : "border-gray-200 hover:border-gray-400"
                }`}
                aria-describedby={errors.subject ? "cf_subject_error" : undefined}
                aria-invalid={!!errors.subject}
              >
                <option value="">Select an inquiry topic...</option>
                <option value="General inquiry">General Inquiry</option>
                <option value="Partnership">Partnership / Subcontracting</option>
                <option value="Support">Engineering Support / SLA</option>
                <option value="Other">Other Request</option>
              </select>
              {errors.subject && (
                <p id="cf_subject_error" className="text-xs text-error mt-1.5 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.subject.message}
                </p>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="cf_message" className="text-xs font-semibold uppercase tracking-wider text-navy-950 font-heading">
                Message <span className="text-blue-600">*</span>
              </label>
              <span className="text-[11px] text-gray-400 font-mono">
                {messageValue.length}/2000 characters
              </span>
            </div>
            <textarea
              id="cf_message"
              rows={5}
              disabled={isSubmitting}
              {...register("message")}
              className={`w-full p-4 rounded-input border bg-white text-sm text-navy-950 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors ${
                errors.message ? "border-error bg-red-50/20" : "border-gray-200 hover:border-gray-400"
              }`}
              placeholder="Tell us about your project, current architecture, questions, or timeline constraints..."
              aria-describedby={errors.message ? "cf_message_error" : undefined}
              aria-invalid={!!errors.message}
            />
            {errors.message && (
              <p id="cf_message_error" className="text-xs text-error mt-1.5 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.message.message}
              </p>
            )}
          </div>

          {/* Consent Checkbox */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                disabled={isSubmitting}
                {...register("consent")}
                className="w-4 h-4 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
              <span className="text-xs text-gray-600 leading-relaxed">
                I understand that NEXVORA Technologies will store my contact details solely to respond to this request in accordance with the{" "}
                <Link href="/privacy-policy" className="text-blue-600 underline font-medium">
                  Privacy Policy
                </Link>.
              </span>
            </label>
            {errors.consent && (
              <p className="text-xs text-error mt-1.5 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.consent.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-12 px-8 rounded-btn font-semibold text-sm bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white shadow flex items-center justify-center gap-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting inquiry...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

