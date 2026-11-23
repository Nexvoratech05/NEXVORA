"use client";

import React from "react";

export function HeroGraphic() {
  return (
    <div
      className="relative w-full aspect-[4/3] max-w-xl mx-auto flex items-center justify-center select-none"
      aria-label="Representative NEXVORA Engineering Architecture Schematic"
    >
      {/* Background subtle radial ambient glow */}
      <div className="absolute inset-0 bg-blue-600/15 blur-3xl rounded-full transform -translate-y-2 pointer-events-none" />

      {/* SVG 5-Stage Engineering Pipeline Schematic */}
      <svg
        viewBox="0 0 620 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-2xl"
        role="img"
      >
        <title>NEXVORA End-to-End Engineering Architecture Flow</title>
        <desc>
          A representative schematic showcasing data ingestion, Delta Lakehouse medallion processing,
          cloud serverless runtime, AI inference, and consumer-facing enterprise APIs.
        </desc>

        <defs>
          <linearGradient id="heroGradientBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#087BCE" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#55B9FF" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="heroCardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0C1F38" stopOpacity="0.96" />
            <stop offset="100%" stopColor="#071426" stopOpacity="0.96" />
          </linearGradient>

          <linearGradient id="medallionGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C47D3B" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#8A9BA8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.3" />
          </linearGradient>

          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <style>
            {`
              @keyframes dataFlow {
                0% { stroke-dashoffset: 40; }
                100% { stroke-dashoffset: 0; }
              }
              @keyframes pulseDot {
                0%, 100% { opacity: 0.2; transform: scale(0.9); }
                50% { opacity: 1; transform: scale(1.15); }
              }
              .pulse-stream {
                stroke-dasharray: 6 6;
                animation: dataFlow 2.5s linear infinite;
              }
              .pulse-node {
                animation: pulseDot 2.2s ease-in-out infinite;
                transform-origin: center;
              }
              @media (prefers-reduced-motion: reduce) {
                .pulse-stream, .pulse-node {
                  animation: none !important;
                }
              }
            `}
          </style>
        </defs>

        {/* Technical Coordinate Blueprint Grid */}
        <g opacity="0.10" stroke="#55B9FF" strokeWidth="0.5">
          <line x1="30" y1="35" x2="590" y2="35" strokeDasharray="3 3" />
          <line x1="30" y1="115" x2="590" y2="115" strokeDasharray="3 3" />
          <line x1="30" y1="210" x2="590" y2="210" strokeDasharray="3 3" />
          <line x1="30" y1="305" x2="590" y2="305" strokeDasharray="3 3" />
          <line x1="30" y1="385" x2="590" y2="385" strokeDasharray="3 3" />
          <line x1="60" y1="35" x2="60" y2="385" strokeDasharray="3 3" />
          <line x1="190" y1="35" x2="190" y2="385" strokeDasharray="3 3" />
          <line x1="310" y1="35" x2="310" y2="385" strokeDasharray="3 3" />
          <line x1="430" y1="35" x2="430" y2="385" strokeDasharray="3 3" />
          <line x1="560" y1="35" x2="560" y2="385" strokeDasharray="3 3" />
        </g>

        {/* Dynamic Architectural Interconnects (Data Streams) */}
        {/* Stream 1: Ingestion -> Medallion */}
        <path
          d="M170 95 L225 155"
          stroke="#087BCE"
          strokeWidth="1.75"
          className="pulse-stream"
          opacity="0.85"
        />
        {/* Stream 2: Medallion -> Cloud Serverless */}
        <path
          d="M275 220 L310 220"
          stroke="url(#heroGradientBlue)"
          strokeWidth="2.5"
          filter="url(#glowEffect)"
        />
        {/* Stream 3: Cloud -> AI Inference */}
        <path
          d="M395 185 L445 125"
          stroke="#55B9FF"
          strokeWidth="1.75"
          className="pulse-stream"
          opacity="0.85"
        />
        {/* Stream 4: Cloud -> Enterprise APIs */}
        <path
          d="M395 245 L445 295"
          stroke="#087BCE"
          strokeWidth="1.75"
          className="pulse-stream"
          opacity="0.85"
        />
        {/* Stream 5: AI Inference -> Enterprise APIs */}
        <path
          d="M515 160 L515 260"
          stroke="#55B9FF"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          opacity="0.6"
        />

        {/* STAGE 1: Data Ingestion & Sources (Top-Left) */}
        <g transform="translate(30, 60)">
          <rect width="150" height="72" rx="10" fill="url(#heroCardGrad)" stroke="#1B3558" strokeWidth="1.5" />
          <circle cx="22" cy="36" r="10" fill="#071426" stroke="#087BCE" strokeWidth="1.5" />
          <path d="M17 33 L27 33 M17 36 L27 36 M17 39 L27 39" stroke="#55B9FF" strokeWidth="1.5" strokeLinecap="round" />
          <text x="40" y="29" fill="#FFFFFF" fontFamily="var(--font-heading)" fontSize="11" fontWeight="700">01. INGESTION</text>
          <text x="40" y="44" fill="#94A3B8" fontFamily="var(--font-mono)" fontSize="9">IoT · APIs · Streams</text>
          <text x="40" y="56" fill="#087BCE" fontFamily="var(--font-mono)" fontSize="8">Kafka · MQTT · CDC</text>
          <circle cx="150" cy="36" r="3" fill="#55B9FF" className="pulse-node" />
        </g>

        {/* STAGE 2: Medallion Lakehouse Architecture (Center-Left) */}
        <g transform="translate(180, 160)">
          <rect width="135" height="115" rx="10" fill="url(#heroCardGrad)" stroke="#1B3558" strokeWidth="1.5" />
          <rect x="10" y="28" width="115" height="22" rx="5" fill="#C47D3B" fillOpacity="0.2" stroke="#C47D3B" strokeWidth="1" />
          <text x="18" y="43" fill="#E2A66C" fontFamily="var(--font-mono)" fontSize="9" fontWeight="600">Bronze: Raw Ingest</text>

          <rect x="10" y="54" width="115" height="22" rx="5" fill="#8A9BA8" fillOpacity="0.2" stroke="#8A9BA8" strokeWidth="1" />
          <text x="18" y="69" fill="#CAD5E0" fontFamily="var(--font-mono)" fontSize="9" fontWeight="600">Silver: Cleaned Delta</text>

          <rect x="10" y="80" width="115" height="22" rx="5" fill="#D4AF37" fillOpacity="0.2" stroke="#D4AF37" strokeWidth="1" />
          <text x="18" y="95" fill="#F4D35E" fontFamily="var(--font-mono)" fontSize="9" fontWeight="600">Gold: Unity Catalog</text>

          <text x="12" y="20" fill="#FFFFFF" fontFamily="var(--font-heading)" fontSize="10" fontWeight="700">02. LAKEHOUSE</text>
        </g>

        {/* STAGE 3: Cloud Infrastructure & Serverless Runtime (Center Core) */}
        <g transform="translate(325, 170)">
          <rect width="90" height="95" rx="12" fill="#071426" stroke="#55B9FF" strokeWidth="1.75" />
          <circle cx="45" cy="40" r="22" fill="#0C1F38" stroke="#087BCE" strokeWidth="1" />
          <circle cx="45" cy="40" r="10" fill="url(#heroGradientBlue)" className="pulse-node" />
          <text x="12" y="75" fill="#FFFFFF" fontFamily="var(--font-heading)" fontSize="9" fontWeight="700" textAnchor="start">03. RUNTIME</text>
          <text x="12" y="87" fill="#94A3B8" fontFamily="var(--font-mono)" fontSize="8">AWS · Docker</text>
        </g>

        {/* STAGE 4: AI & Computer Vision Inference (Top-Right) */}
        <g transform="translate(435, 60)">
          <rect width="155" height="72" rx="10" fill="url(#heroCardGrad)" stroke="#1B3558" strokeWidth="1.5" />
          <circle cx="22" cy="36" r="10" fill="#071426" stroke="#55B9FF" strokeWidth="1.5" />
          <circle cx="22" cy="36" r="4" fill="#55B9FF" />
          <text x="40" y="29" fill="#FFFFFF" fontFamily="var(--font-heading)" fontSize="11" fontWeight="700">04. AI INFERENCE</text>
          <text x="40" y="44" fill="#94A3B8" fontFamily="var(--font-mono)" fontSize="9">PyTorch · ViT · RAG</text>
          <text x="40" y="56" fill="#55B9FF" fontFamily="var(--font-mono)" fontSize="8">LLMs · Grad-CAM</text>
          <circle cx="0" cy="36" r="3" fill="#55B9FF" className="pulse-node" />
        </g>

        {/* STAGE 5: Enterprise APIs & Interfaces (Bottom-Right) */}
        <g transform="translate(435, 260)">
          <rect width="155" height="72" rx="10" fill="url(#heroCardGrad)" stroke="#1B3558" strokeWidth="1.5" />
          <circle cx="22" cy="36" r="10" fill="#071426" stroke="#087BCE" strokeWidth="1.5" />
          <path d="M19 32 L15 36 L19 40 M25 32 L29 36 L25 40" stroke="#55B9FF" strokeWidth="1.5" strokeLinecap="round" />
          <text x="40" y="29" fill="#FFFFFF" fontFamily="var(--font-heading)" fontSize="11" fontWeight="700">05. APPLICATIONS</text>
          <text x="40" y="44" fill="#94A3B8" fontFamily="var(--font-mono)" fontSize="9">FastAPI · Next.js</text>
          <text x="40" y="56" fill="#087BCE" fontFamily="var(--font-mono)" fontSize="8">Enterprise UI / ERP</text>
          <circle cx="0" cy="36" r="3" fill="#087BCE" className="pulse-node" />
        </g>

        {/* Architecture Badges & Status Pill (Bottom) */}
        <g transform="translate(140, 395)">
          <rect width="340" height="28" rx="14" fill="#071426" stroke="#1B3558" strokeWidth="1" />
          <circle cx="20" cy="14" r="4" fill="#1F9D6B" className="pulse-node" />
          <text x="34" y="18" fill="#94A3B8" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="0.5">
            REPRESENTATIVE ARCHITECTURAL PIPELINE · ZERO FABRICATION
          </text>
        </g>
      </svg>
    </div>
  );
}
