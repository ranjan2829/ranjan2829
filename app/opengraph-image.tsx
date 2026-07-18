import { ImageResponse } from "next/og";

export const alt = "Ranjan Shitole — AI Engineer & Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated at build time so links shared to LinkedIn/X get a real preview
// card instead of a bare URL. No external image asset to host or break.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #09090b 0%, #14141a 55%, #1a1a2e 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            color: "#4ade80",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: 999, background: "#4ade80" }} />
          Open to opportunities
        </div>

        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: "#fafafa",
            marginTop: 28,
            letterSpacing: -2,
          }}
        >
          Ranjan Shitole
        </div>

        <div style={{ fontSize: 40, color: "#a1a1aa", marginTop: 10 }}>
          AI Engineer · Quantitative Engineer
        </div>

        <div style={{ fontSize: 27, color: "#71717a", marginTop: 34, maxWidth: 900 }}>
          Production-grade AI systems, quantitative trading platforms, and scalable
          backend infrastructure.
        </div>

        <div
          style={{
            display: "flex",
            gap: 30,
            marginTop: 52,
            fontSize: 24,
            color: "#60a5fa",
          }}
        >
          <div>github.com/ranjan2829</div>
          <div style={{ color: "#3f3f46" }}>·</div>
          <div>Dubai · Pune</div>
        </div>
      </div>
    ),
    size
  );
}
