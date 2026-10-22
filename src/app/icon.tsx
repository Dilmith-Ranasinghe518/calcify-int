import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
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
          paddingBottom: 14,
          background: "#08080A",
          borderRadius: 14,
        }}
      >
        <div style={{ display: "flex", fontSize: 50, fontWeight: 700, lineHeight: 1, color: "#F2F1EC", letterSpacing: -3 }}>c</div>
        <div style={{ display: "flex", width: 10, height: 10, marginLeft: 2, marginBottom: 3, background: "#D4FF3F" }} />
      </div>
    ),
    size,
  );
}
