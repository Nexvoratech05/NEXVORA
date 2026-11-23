const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgCard = `
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#071426"/>
  
  <!-- Subtle decorative grid -->
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0F243E" stroke-width="0.8"/>
    </pattern>
    <radialGradient id="glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1000 100) rotate(90) scale(450 600)">
      <stop stop-color="#0066FF" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#071426" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="brandGrad" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#0066FF"/>
      <stop offset="1" stop-color="#00D2FF"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="2" y="2" width="1196" height="626" rx="0" fill="none" stroke="#1B3558" stroke-width="4"/>

  <!-- Brand Logo Icon & Wordmark -->
  <g transform="translate(80, 70)">
    <rect width="52" height="52" rx="12" fill="url(#brandGrad)"/>
    <text x="26" y="36" fill="#FFFFFF" font-family="'Inter', -apple-system, BlinkMacSystemFont, sans-serif" font-size="28" font-weight="900" text-anchor="middle">N</text>
    
    <text x="70" y="38" fill="#FFFFFF" font-family="'Inter', -apple-system, BlinkMacSystemFont, sans-serif" font-size="34" font-weight="900" letter-spacing="0.08em">NEXVORA</text>
    <text x="255" y="38" fill="#00D2FF" font-family="'Inter', -apple-system, BlinkMacSystemFont, sans-serif" font-size="16" font-weight="700" letter-spacing="0.25em">TECHNOLOGIES</text>
  </g>

  <!-- Tagline Badge -->
  <g transform="translate(80, 175)">
    <rect width="480" height="40" rx="20" fill="#00D2FF" fill-opacity="0.12" stroke="#00D2FF" stroke-opacity="0.4" stroke-width="1.5"/>
    <circle cx="20" cy="20" r="4" fill="#00D2FF"/>
    <text x="35" y="25" fill="#00D2FF" font-family="'Inter', -apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="700" letter-spacing="0.12em">ENGINEERING INTELLIGENCE. BUILDING WHAT'S NEXT.</text>
  </g>

  <!-- Main Headline -->
  <text x="80" y="290" fill="#FFFFFF" font-family="'Inter', -apple-system, BlinkMacSystemFont, sans-serif" font-size="52" font-weight="900" letter-spacing="-0.02em">
    AI, Data Engineering &amp;
  </text>
  <text x="80" y="355" fill="#FFFFFF" font-family="'Inter', -apple-system, BlinkMacSystemFont, sans-serif" font-size="52" font-weight="900" letter-spacing="-0.02em">
    Cloud Infrastructure Solutions
  </text>

  <!-- Subheadline -->
  <text x="80" y="425" fill="#94A3B8" font-family="'Inter', -apple-system, BlinkMacSystemFont, sans-serif" font-size="22" font-weight="500">
    Production-grade Lakehouses • Computer Vision • Multi-Agent RAG • Enterprise Automation
  </text>

  <!-- Bottom Divider & Badges -->
  <line x1="80" y1="490" x2="1120" y2="490" stroke="#1B3558" stroke-width="1.5"/>

  <g transform="translate(80, 525)">
    <text x="0" y="20" fill="#00D2FF" font-family="'Inter', -apple-system, BlinkMacSystemFont, sans-serif" font-size="15" font-weight="600" letter-spacing="0.05em">
      Databricks • Delta Lake • PySpark • FastAPI • Next.js • AWS &amp; Azure • PostgreSQL
    </text>
    <text x="1040" y="20" fill="#64748B" font-family="'Courier New', monospace" font-size="15" font-weight="600" text-anchor="end">
      nexvora-gray.vercel.app
    </text>
  </g>
</svg>
`;

async function main() {
  const outputPath = path.join(__dirname, '..', 'public', 'og-image.png');
  await sharp(Buffer.from(svgCard))
    .png({ quality: 95 })
    .toFile(outputPath);
  console.log('Successfully generated public/og-image.png (1200x630)');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
