import React from "react";
import Link from "next/link";
import { ArrowRight, Home, Compass, Mail } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full min-h-[75vh] flex items-center justify-center py-20 bg-gray-50">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center space-y-8">
        <div className="space-y-3">
          <span className="text-6xl sm:text-7xl font-extrabold font-mono text-blue-600 block">
            404
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-navy-950">
            Page Not Found
          </h1>
          <p className="text-base text-gray-600 max-w-md mx-auto leading-relaxed">
            The page you requested does not exist or has been relocated within our architecture.
          </p>
        </div>

        {/* Helpful links */}
        <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm text-left space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block font-heading">
            Recommended Navigation:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/"
              className="p-3 rounded-xl border border-gray-200 hover:border-blue-600 hover:bg-blue-50/20 text-xs font-semibold text-navy-950 flex items-center gap-2 transition-colors"
            >
              <Home className="w-4 h-4 text-blue-600" />
              <span>Home Page</span>
            </Link>
            <Link
              href="/services"
              className="p-3 rounded-xl border border-gray-200 hover:border-blue-600 hover:bg-blue-50/20 text-xs font-semibold text-navy-950 flex items-center gap-2 transition-colors"
            >
              <Compass className="w-4 h-4 text-blue-600" />
              <span>All Services</span>
            </Link>
            <Link
              href="/contact"
              className="p-3 rounded-xl border border-gray-200 hover:border-blue-600 hover:bg-blue-50/20 text-xs font-semibold text-navy-950 flex items-center gap-2 transition-colors"
            >
              <Mail className="w-4 h-4 text-blue-600" />
              <span>Contact Us</span>
            </Link>
          </div>
        </div>

        <div className="pt-2">
          <Link
            href="/start-a-project"
            className="inline-flex items-center gap-2 h-12 px-7 rounded-btn font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow transition-colors"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
