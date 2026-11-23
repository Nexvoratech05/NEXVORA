import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { siteConfig } from "@/content/site";
import { ConsentBanner } from "@/components/ConsentBanner";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "NEXVORA Technologies | AI, Data Engineering & Cloud Solutions",
    template: "%s | NEXVORA Technologies",
  },
  description: siteConfig.description,
  applicationName: "NEXVORA Technologies",
  authors: [
    { name: "Muhammad Azhar", url: "https://nexvora-gray.vercel.app/team" },
    { name: "Owais Ahmad", url: "https://nexvora-gray.vercel.app/team" },
  ],
  creator: "NEXVORA Technologies",
  publisher: "NEXVORA Technologies",
  keywords: [
    "Data Engineering Company",
    "AI Development Company",
    "Artificial Intelligence Solutions",
    "Machine Learning Development Services",
    "Generative AI Development Company",
    "Cloud Engineering Services",
    "Software Development Company",
    "Enterprise Software Development",
    "DevOps Engineering Services",
    "Business Automation Solutions",
    "Databricks Consulting",
    "Apache Spark Development",
    "Data Lakehouse Architecture",
    "Agentic AI Development",
    "RAG Chatbot Development",
    "FastAPI Development",
    "Next.js Development",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/logo-icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/logo-icon.svg",
    shortcut: "/favicon.svg",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "NEXVORA Technologies | AI, Data Engineering & Cloud Solutions",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "NEXVORA Technologies",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NEXVORA Technologies — Engineering Intelligence. Building What's Next.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXVORA Technologies | AI, Data Engineering & Cloud Solutions",
    description: siteConfig.description,
    creator: "@NexvoraTech",
    images: ["/og-image.png"],
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-navy-950 font-sans antialiased selection:bg-blue-600 selection:text-white">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <StickyMobileBar />
        <ConsentBanner />
      </body>
    </html>
  );
}
