import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "NEXVORA Technologies — Build Beyond Limits";
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
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
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
            background: "radial-gradient(circle, rgba(8, 123, 206, 0.25) 0%, rgba(7, 20, 38, 0) 70%)",
          }}
        />

        {/* Top Header / Brand Name */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #087BCE 0%, #55B9FF 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: "24px",
              fontWeight: 800,
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
              color: "#55B9FF",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              marginLeft: "8px",
              paddingTop: "6px",
            }}
          >
            TECHNOLOGIES
          </span>
        </div>

        {/* Center Tagline and Mission */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "950px" }}>
          <h1
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Build Beyond Limits.
          </h1>
          <p
            style={{
              fontSize: "24px",
              color: "#93C5FD",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            Software, Cloud &amp; Data Engineering for Growing Businesses.
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
          <div style={{ display: "flex", gap: "32px", color: "#55B9FF", fontSize: "16px", fontWeight: 600 }}>
            <span>Cloud Infrastructure</span>
            <span>·</span>
            <span>Data Pipelines</span>
            <span>·</span>
            <span>Custom Software</span>
            <span>·</span>
            <span>CRM &amp; AI</span>
          </div>

          <span style={{ color: "#4A5B73", fontSize: "15px", fontFamily: "monospace" }}>
            nexvora.com
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

