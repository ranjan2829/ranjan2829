import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Ranjan — Lead AI Infrastructure & Full-Stack Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated at build time so links shared to LinkedIn, X or Slack get a real
// preview card: the name and the stakes on the left, the site's black hole on the right.
export default async function Image() {
  const poster = await readFile(join(process.cwd(), "public/blackhole-poster.jpg"));
  const posterSrc = `data:image/jpeg;base64,${poster.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#000" }}>
        <img
          src={posterSrc}
          alt=""
          width={1008}
          height={625}
          style={{ position: "absolute", right: -120, top: 4, width: 1008, height: 625, objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background: "linear-gradient(90deg, #000 0%, rgba(0,0,0,0.92) 38%, rgba(0,0,0,0.35) 66%, rgba(0,0,0,0) 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 72px",
            width: 860,
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              alignSelf: "flex-start",
              padding: "10px 18px",
              borderRadius: 999,
              border: "1px solid #2c2c30",
              background: "rgba(13,13,15,0.85)",
              color: "#d2d2d7",
              fontSize: 20,
            }}
          >
            <div style={{ width: 9, height: 9, borderRadius: 999, background: "#30d158" }} />
            Open to AI infrastructure roles · Dubai, Remote
          </div>

          <div style={{ marginTop: 30, fontSize: 124, fontWeight: 700, letterSpacing: -6, color: "#f5f5f7", lineHeight: 1 }}>
            Ranjan
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 22,
              fontSize: 40,
              fontWeight: 600,
              letterSpacing: -1,
              color: "#f5f5f7",
              lineHeight: 1.15,
            }}
          >
            <div>Lead AI Infrastructure &amp;</div>
            <div>Full-Stack Engineer</div>
          </div>

          <div style={{ marginTop: 18, fontSize: 26, color: "#a1a1a6", lineHeight: 1.35, maxWidth: 640 }}>
            Building the AI layer of a FINRA-regulated firm managing $5B in client assets.
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginTop: 34 }}>
            {["Model Context Protocol", "Agent safety", "On-chain execution"].map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: 42,
                  lineHeight: 1,
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                  padding: "0 16px",
                  borderRadius: 999,
                  border: "1px solid #2c2c30",
                  color: "#2997ff",
                  fontSize: 19,
                }}
              >
                {label}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 40, fontSize: 22, color: "#86868b" }}>ranjan2829.vercel.app</div>
        </div>
      </div>
    ),
    size
  );
}
