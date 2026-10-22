import { ImageResponse } from "next/og";

export const alt = "Calcify International — Engineering software, AI and cloud at scale";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#F2F1EC";
const ACCENT = "#D4FF3F";
const MUTED = "#9A9AA2";

/**
 * Social share card, generated at build time — no binary asset to maintain,
 * and it uses the same mark and palette as the site.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08080A",
          padding: 72,
          position: "relative",
        }}
      >
        {/* Lockup — the text wordmark */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
          <div style={{ display: "flex", fontSize: 54, fontWeight: 600, letterSpacing: -3.5, color: INK, lineHeight: 1 }}>
            calcify
          </div>
          <div style={{ display: "flex", width: 12, height: 12, marginBottom: 9, background: ACCENT }} />
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 96,
              lineHeight: 0.92,
              color: INK,
              letterSpacing: -5,
            }}
          >
            <div style={{ display: "flex" }}>Engineering</div>
            <div style={{ display: "flex", color: ACCENT }}>software</div>
            <div style={{ display: "flex" }}>at scale.</div>
          </div>
        </div>

        {/* Footer rule */}
        <div
          style={{
            display: "flex",
            borderTop: "1px solid #222227",
            paddingTop: 24,
            fontSize: 22,
            letterSpacing: 2,
            color: MUTED,
          }}
        >
          ERP · AI · CLOUD · MOBILE · WEB · SECURITY · DATA · QA
        </div>
      </div>
    ),
    size,
  );
}
