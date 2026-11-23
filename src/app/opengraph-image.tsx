import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "NEXVORA Technologies — Engineering Intelligence. Building What's Next.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#071426",
          padding: "70px 80px",
          fontFamily: "sans-serif",
          position: "relative",
          border: "4px solid #1B3558",
        }}
      >
        {/* Subtle decorative background glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0, 102, 255, 0.25) 0%, rgba(7, 20, 38, 0) 70%)",
          }}
        />

        {/* Top Header / Brand Name */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #0066FF 0%, #00D2FF 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: "26px",
              fontWeight: 900,
            }}
          >
            N
          </div>
          <span
            style={{
              color: "#FFFFFF",
              fontSize: "32px",
              fontWeight: 800,
              letterSpacing: "0.08em",
            }}
          >
            NEXVORA
          </span>
          <span
            style={{
              color: "#00D2FF",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              marginLeft: "6px",
              paddingTop: "6px",
            }}
          >
            TECHNOLOGIES
          </span>
        </div>

        {/* Center Tagline and Mission */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "980px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(0, 210, 255, 0.12)",
              border: "1px solid rgba(0, 210, 255, 0.4)",
              padding: "6px 16px",
              borderRadius: "999px",
              color: "#00D2FF",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              width: "fit-content",
            }}
          >
            Engineering Intelligence. Building What&apos;s Next.
          </div>

          <h1
            style={{
              fontSize: "52px",
              fontWeight: 900,
              color: "#FFFFFF",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            AI, Data Engineering &amp; Cloud Infrastructure Solutions
          </h1>
          <p
            style={{
              fontSize: "22px",
              color: "#94A3B8",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            Production-grade Lakehouses, Computer Vision, Multi-Agent RAG &amp; Enterprise Automation.
          </p>
        </div>

        {/* Bottom Feature Pillars */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid #1B3558",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "20px", color: "#00D2FF", fontSize: "14px", fontWeight: 600 }}>
            <span>Data Lakehouses</span>
            <span>·</span>
            <span>AI &amp; Vision</span>
            <span>·</span>
            <span>Generative AI</span>
            <span>·</span>
            <span>Cloud &amp; DevOps</span>
            <span>·</span>
            <span>FastAPI &amp; Next.js</span>
          </div>

          <span style={{ color: "#64748B", fontSize: "14px", fontFamily: "monospace" }}>
            nexvora-gray.vercel.app
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

