"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Maximize2, X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface ArchitectureModalViewerProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  classification: string;
  deliverables?: string[];
}

export function ArchitectureModalViewer({
  imageSrc,
  imageAlt,
  title,
  classification,
  deliverables,
}: ArchitectureModalViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        setZoomLevel(1);
      }
    },
    [isOpen]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <>
      {/* Click-to-expand preview button overlay */}
      <div className="relative group w-full">
        <div className="aspect-[16/10] bg-navy-950 relative overflow-hidden rounded-xl border border-navy-700/80 flex items-center justify-center p-4">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={900}
            height={560}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-102"
          />
          <span className="absolute top-3 left-3 bg-navy-950/90 text-cyan-300 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md border border-navy-700 backdrop-blur-sm">
            {classification}
          </span>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label={`Expand architecture blueprint for ${title}`}
            className="absolute bottom-3 right-3 bg-navy-900/90 hover:bg-blue-600 text-white p-2 rounded-lg border border-navy-700 hover:border-blue-500 transition-all shadow-lg flex items-center gap-1.5 text-xs font-mono"
          >
            <Maximize2 className="w-3.5 h-3.5 text-cyan-400 group-hover:text-white" />
            <span className="hidden sm:inline">Inspect Blueprint</span>
          </button>
        </div>
      </div>

      {/* Full-Screen Architecture Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Architecture Blueprint: ${title}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/90 backdrop-blur-md p-4 sm:p-6"
        >
          {/* Backdrop dismiss */}
          <div
            className="absolute inset-0"
            onClick={() => {
              setIsOpen(false);
              setZoomLevel(1);
            }}
          />

          {/* Modal Card */}
          <div className="relative z-10 w-full max-w-6xl max-h-[90vh] bg-navy-900 border border-navy-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-navy-700/80 flex items-center justify-between bg-navy-950">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/80 px-2 py-0.5 rounded">
                    {classification}
                  </span>
                  <span className="text-xs font-mono text-gray-400">Verified System Topology</span>
                </div>
                <h3 className="text-lg font-bold font-heading text-white">{title}</h3>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center bg-navy-900 border border-navy-700 rounded-lg p-1 gap-1 text-gray-300">
                  <button
                    onClick={handleZoomIn}
                    aria-label="Zoom In"
                    className="p-1 hover:text-white hover:bg-navy-800 rounded transition-colors"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleZoomOut}
                    aria-label="Zoom Out"
                    className="p-1 hover:text-white hover:bg-navy-800 rounded transition-colors"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleResetZoom}
                    aria-label="Reset Zoom"
                    className="p-1 hover:text-white hover:bg-navy-800 rounded transition-colors text-xs font-mono px-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    setZoomLevel(1);
                  }}
                  aria-label="Close Architecture Viewer"
                  className="p-2 rounded-lg bg-navy-800 hover:bg-red-950 text-gray-300 hover:text-white border border-navy-700 hover:border-red-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Canvas */}
            <div className="flex-1 overflow-auto p-6 flex items-center justify-center bg-navy-950/60">
              <div
                style={{
                  transform: `scale(${zoomLevel})`,
                  transition: "transform 0.15s ease-out",
                }}
                className="max-w-full max-h-full flex items-center justify-center"
              >
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  width={1400}
                  height={880}
                  className="max-h-[65vh] w-auto object-contain drop-shadow-2xl rounded-lg"
                />
              </div>
            </div>

            {/* Modal Footer with Deliverables if available */}
            {deliverables && deliverables.length > 0 && (
              <div className="px-6 py-3 border-t border-navy-700/80 bg-navy-950 text-xs font-mono text-gray-300 flex flex-wrap items-center gap-2">
                <span className="text-gray-400 font-semibold uppercase">Deliverables:</span>
                {deliverables.map((d, i) => (
                  <span
                    key={i}
                    className="bg-navy-900 border border-navy-700 px-2 py-0.5 rounded text-cyan-300"
                  >
                    {d}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
