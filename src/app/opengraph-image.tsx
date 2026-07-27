import { ImageResponse } from "next/og";

export const alt =
  "Calcify International — Engineering Tomorrow's Digital Infrastructure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card, generated at build time — no binary asset to maintain,
 * and it stays in sync with the brand tokens automatically.
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
          background: "#04050A",
          padding: 72,
          position: "relative",
        }}
      >
        {/* Crystal motif — matches the WebGL prism and the logo mark */}
        <div
          style={{
            position: "absolute",
            right: -60,
            top: -40,
            display: "flex",
            opacity: 0.55,
          }}
        >
          <svg width="620" height="620" viewBox="0 0 32 32" fill="none">
            <polygon points="16,2 28,9 22,17" fill="#7C5CFF" opacity="0.55" />
            <polygon points="16,2 22,17 10,17" fill="#FF4FD8" opacity="0.4" />
            <polygon points="16,2 10,17 4,9" fill="#7C5CFF" opacity="0.3" />
            <polygon points="4,9 10,17 7,25" fill="#22E4E0" opacity="0.28" />
            <polygon points="28,9 22,17 25,25" fill="#22E4E0" opacity="0.35" />
            <polygon points="10,17 22,17 16,30" fill="#7C5CFF" opacity="0.45" />
            <g stroke="#B9AEFF" strokeWidth="0.28" strokeOpacity="0.7" fill="none">
              <polygon points="16,2 28,9 25,25 16,30 7,25 4,9" />
              <path d="M16 2 16 30M4 9 22 17M28 9 10 17M10 17 22 17" />
            </g>
          </svg>
        </div>

        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="44" height="44" viewBox="0 0 32 32" fill="none">
            <polygon points="16,2 28,9 22,17" fill="#7C5CFF" />
            <polygon points="16,2 22,17 10,17" fill="#FF4FD8" opacity="0.8" />
            <polygon points="16,2 10,17 4,9" fill="#7C5CFF" opacity="0.6" />
            <polygon points="10,17 22,17 16,30" fill="#22E4E0" opacity="0.75" />
          </svg>
          <div style={{ display: "flex", fontSize: 30, color: "#F4F5FC" }}>
            Calcify International
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 82,
              lineHeight: 0.95,
              color: "#F4F5FC",
              letterSpacing: -3.2,
              maxWidth: 820,
            }}
          >
            Engineering Tomorrow&apos;s Digital Infrastructure
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 26,
              color: "#8E93AE",
              maxWidth: 820,
            }}
          >
            Enterprise ERP, AI, cloud, and cybersecurity — delivered at global
            scale.
          </div>
        </div>

        {/* Footer rule */}
        <div
          style={{
            display: "flex",
            borderTop: "1px solid #1B1F33",
            paddingTop: 24,
            fontSize: 22,
            color: "#8E93AE",
          }}
        >
          500+ projects delivered · 50+ countries · 200+ engineers
        </div>
      </div>
    ),
    size
  );
}
