import { ImageResponse } from "next/og";

export const size = { width: 128, height: 128 };
export const contentType = "image/png";

/** Favicon, drawn in code: a lowercase "c" closed by the chartreuse square. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: 28,
          background: "#08080A",
          borderRadius: 28,
        }}
      >
        <div style={{ display: "flex", fontSize: 100, fontWeight: 700, lineHeight: 1, color: "#F2F1EC", letterSpacing: -6 }}>c</div>
        <div style={{ display: "flex", width: 20, height: 20, marginLeft: 4, marginBottom: 6, background: "#D4FF3F" }} />
      </div>
    ),
    size,
  );
}
