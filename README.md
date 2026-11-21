# NEXVORA Technologies — Official Corporate Website

> **Tagline:** Build Beyond Limits.  
> **Positioning:** A modern, innovative, reliable technology company delivering digital products, software engineering and intelligent business solutions.

Official corporate web application built strictly to the specifications of the **NEXVORA Technologies Corporate Website PRD (v1.0)**.

---

## Tech Stack & Architecture

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode enabled)
- **Styling & Tokens:** Tailwind CSS with custom design tokens from PRD Section 10
- **Primitives:** Radix UI accessible headless primitives
- **Forms & Validation:** React Hook Form + Zod
- **Icons:** Lucide Stroke Icons (1.5 px stroke)
- **Typography:** Self-hosted via `next/font/google` (Sora for headings, Inter for body/UI, JetBrains Mono for code/tech labels)
- **SEO & Structured Data:** JSON-LD schema (Organization, WebSite, Person, Service, FAQPage, CreativeWork, BreadcrumbList), Open Graph, automated `sitemap.xml` and `robots.txt`
- **Security:** Content Security Policy (CSP), Strict-Transport-Security (HSTS), X-Frame-Options (DENY), X-Content-Type-Options (nosniff), Referrer-Policy, Cloudflare Turnstile bot verification hook, in-memory sliding-window rate limiting, and honeypot spam protection.

---

## Getting Started

### 1. Installation

Ensure Node.js 18+ is installed.

```bash
# Install dependencies
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Key environment variables:
- `RESEND_API_KEY`: API key from [Resend](https://resend.com) for sending transactional lead notifications and client receipts. (If omitted, simulated console dispatch runs automatically).
- `CONTACT_RECEIVER_EMAIL`: Recipient mailbox for incoming quote and contact submissions.
- `TURNSTILE_SECRET_KEY` & `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: Cloudflare Turnstile keys for invisible bot challenge. (If omitted, skips gracefully in local dev).

### 3. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build & Type-Check

```bash
# Type-check TypeScript
npm run type-check

# Run production build
npm run build

# Start production server
npm run start
```

---

## Content Management (CMS-Ready Single Source of Truth)

All corporate content, founder profiles, service deliverables, FAQs, and case studies are managed in a single, typed configuration file:

👉 `src/content/site.ts`

### How to Edit Company Settings & Contact Information
Open `src/content/site.ts` and update `siteConfig`:
```typescript
export const siteConfig = {
  name: "NEXVORA Technologies",
  legalName: "Your Registered Legal Entity",
  url: "https://nexvora.com",
  contact: {
    email: "contact@nexvora.com",
    phone: "+92 300 XXXXXXX",
    whatsappNumber: "92300XXXXXXX", // digits only for wa.me
    address: "Your Office Address, City, Country",
    responseTime: "24 business hours",
  },
  // ...
};
```

### How to Edit Services & FAQs
In `src/content/site.ts`, edit the `services` array. Each service includes:
- `slug`: URL slug (e.g., `custom-software`, `cloud-infrastructure`)
- `title` & `shortTitle`: Display titles
- `heroHeadline` & `heroOutcome`: Impact statement
- `problemSolved`: 3 concrete operational challenges
- `deliverables`: 4–6 deliverable items
- `processSteps`: 5-stage mini-process
- `technologies`: Array of tech badges
- `faqs`: Question & answer pairs (automatically feeds `FAQPage` schema)

### How to Add a New Project / Case Study
To add a new project to the filterable portfolio:
1. Open `src/content/site.ts` and add an object to `projectsData`:
```typescript
{
  id: "proj-4",
  slug: "your-project-slug",
  title: "Full Title of the Case Study",
  client: "Client Name or Confidential Client",
  isConfidential: true,
  isCapabilityDemonstration: false,
  summary: "One-line outcome summary",
  serviceSlug: "cloud-infrastructure",
  serviceName: "Cloud & Infrastructure",
  industry: "Fintech",
  challenge: "The operational bottleneck...",
  solution: "The engineering architecture...",
  technologies: ["AWS", "Terraform", "Docker"],
  outcome: "Verified measured outcome...",
  images: ["/images/projects/your-diagram.svg"],
}
```
2. Place the vector architecture diagram or screenshot in `/public/images/projects/`.

---

## Design System Tokens

Colors from PRD Section 10:
- **Midnight Navy (`--navy-950`):** `#071426` (Header, hero, footer, primary text on light)
- **Dark Surface (`--navy-900`):** `#0C1F38` (Elevated dark surfaces)
- **Borders on Dark (`--navy-700`):** `#1B3558` (Borders and cards on dark)
- **Electric Blue (`--blue-600`):** `#087BCE` (Primary buttons, action links)
- **Hover Primary (`--blue-700`):** `#0668AE` (Button hover)
- **Cyan Accent (`--cyan-400`):** `#55B9FF` (Accents, highlights, focus rings on dark)
- **White (`--white`):** `#FFFFFF` (Page background, text on dark)
- **Light Gray (`--gray-50`):** `#F4F7FB` (Alternate section backgrounds)
- **Borders on Light (`--gray-200`):** `#DCE4EE` (Card borders)
- **Muted Text (`--gray-600`):** `#4A5B73` (Secondary text)
- **Success (`--success`):** `#1F9D6B`
- **Error (`--error`):** `#D64545`

---

## Founder Assets & Photo Processing

The raw portrait files (`208175.jpg` and `208202.jpg`) included baked-in checkerboard artifacts.
Using our automated image processing pipeline (`scripts/process-images.js` powered by `sharp`), both portraits were:
1. Segmented with color-space edge detection to eliminate checkerboard pixels.
2. Re-composited against an authentic studio navy backdrop (`#172D4D` radial gradient to `#071426`).
3. Cropped to the standard 4:5 executive portrait ratio and compressed as WebP (`/public/images/founders/`).
4. Recreated the brand mark and wordmarks as clean inline vector SVGs for light, dark, and icon variants.
