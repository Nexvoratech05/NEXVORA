"use client";

import React from "react";

export function HeroGraphic() {
  return (
    <div className="relative w-full aspect-[4/3] max-w-lg mx-auto flex items-center justify-center select-none" aria-hidden="true">
      {/* Background subtle glow */}
      <div className="absolute inset-0 bg-blue-600/10 blur-3xl rounded-full transform -translate-y-4" />

      {/* SVG Structured Momentum Architectural Graphic */}
      <svg
        viewBox="0 0 500 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10"
      >
        <defs>
          <linearGradient id="heroRibbonGrad1" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#087BCE" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#087BCE" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#55B9FF" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="heroRibbonGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#071426" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0C1F38" stopOpacity="0.7" />
          </linearGradient>

          <linearGradient id="heroAccent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#55B9FF" />
            <stop offset="100%" stopColor="#087BCE" />
          </linearGradient>
        </defs>

        {/* Technical Coordinate Grid */}
        <g opacity="0.15" stroke="#55B9FF" strokeWidth="0.5">
          <line x1="50" y1="50" x2="450" y2="50" strokeDasharray="3 3" />
          <line x1="50" y1="150" x2="450" y2="150" strokeDasharray="3 3" />
          <line x1="50" y1="250" x2="450" y2="250" strokeDasharray="3 3" />
          <line x1="50" y1="350" x2="450" y2="350" strokeDasharray="3 3" />
          <line x1="100" y1="50" x2="100" y2="350" strokeDasharray="3 3" />
          <line x1="200" y1="50" x2="200" y2="350" strokeDasharray="3 3" />
          <line x1="300" y1="50" x2="300" y2="350" strokeDasharray="3 3" />
          <line x1="400" y1="50" x2="400" y2="350" strokeDasharray="3 3" />
        </g>

        {/* Underlying geometric planar ribbons */}
        <polygon
          points="80,260 180,140 250,220 150,340"
          fill="url(#heroRibbonGrad2)"
          stroke="#1B3558"
          strokeWidth="1.5"
        />

        <polygon
          points="180,140 280,240 370,130 270,30"
          fill="url(#heroRibbonGrad2)"
          stroke="#1B3558"
          strokeWidth="1.5"
        />

        {/* Angular Ribbon Motif from NEXVORA Logo with stroke draw */}
        {/* Left ascending ribbon */}
        <path
          d="M70 280 L160 170 L210 230 L120 340 Z"
          fill="#087BCE"
          fillOpacity="0.25"
          stroke="#087BCE"
          strokeWidth="1.5"
        />

        {/* Central dynamic chevron ribbon */}
        <path
          d="M160 170 L240 70 L340 190 L260 290 Z"
          fill="#0C1F38"
          stroke="#55B9FF"
          strokeWidth="2"
          className="animate-draw-slow"
        />

        {/* Top-right forward arrow break out */}
        <path
          d="M260 190 L360 70 L400 110 L300 230 Z"
          fill="url(#heroRibbonGrad1)"
          stroke="#55B9FF"
          strokeWidth="2"
        />

        {/* Glowing cyan arrow termination */}
        <polygon
          points="360,70 430,40 400,110 385,85"
          fill="url(#heroAccent)"
          stroke="#55B9FF"
          strokeWidth="2"
        />

        {/* Structural node markers */}
        <circle cx="240" cy="70" r="4" fill="#55B9FF" />
        <circle cx="430" cy="40" r="5" fill="#69C8FF" />
        <circle cx="70" cy="280" r="4" fill="#087BCE" />
        <circle cx="260" cy="290" r="4" fill="#087BCE" />
        <circle cx="340" cy="190" r="4" fill="#55B9FF" />

        {/* Architecture flow lines with low contrast */}
        <path
          d="M120 340 L260 290 L340 190 L430 40"
          stroke="#55B9FF"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          opacity="0.8"
        />

        {/* Tech metric labels */}
        <g opacity="0.85">
          <rect x="70" y="80" width="105" height="32" rx="6" fill="#071426" stroke="#1B3558" />
          <text x="80" y="100" fill="#93C5FD" fontFamily="var(--font-mono)" fontSize="10">Cloud · DevOps</text>

          <rect x="290" y="310" width="115" height="32" rx="6" fill="#071426" stroke="#1B3558" />
          <text x="300" y="330" fill="#55B9FF" fontFamily="var(--font-mono)" fontSize="10">Data &amp; Pipelines</text>

          <rect x="280" y="20" width="125" height="32" rx="6" fill="#071426" stroke="#087BCE" />
          <text x="290" y="40" fill="#FFFFFF" fontFamily="var(--font-mono)" fontSize="10">Custom Software</text>
        </g>
      </svg>
    </div>
  );
}

