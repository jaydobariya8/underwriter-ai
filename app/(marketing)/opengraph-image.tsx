import { ImageResponse } from "next/og";

export const alt = "Underwriter AI — AI credit analyst for leveraged finance";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const bars = [64, 96, 132];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#071B34",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
          {bars.map((h) => (
            <div key={h} style={{ width: 18, height: h, background: "#9B8B62", borderRadius: 2 }} />
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#9B8B62",
            }}
          >
            AI credit analyst for leveraged finance
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 84,
              fontWeight: 300,
              color: "#F7F6F3",
              lineHeight: 1.05,
            }}
          >
            Precision analysis.
          </div>
          <div style={{ fontSize: 84, fontWeight: 300, color: "#F7F6F3", lineHeight: 1.05 }}>
            Institutional trust.
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 30, fontWeight: 500, color: "#F7F6F3" }}>
          Underwriter <span style={{ color: "#9B8B62", marginLeft: 10 }}>AI</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
