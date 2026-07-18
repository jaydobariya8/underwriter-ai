import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Navy tile with three ascending gold columns — the standalone brand mark.
export default function Icon() {
  const bars = [24, 36, 50];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 5,
          background: "#071B34",
          padding: 12,
        }}
      >
        {bars.map((h) => (
          <div
            key={h}
            style={{ width: 8, height: h, background: "#9B8B62", borderRadius: 1 }}
          />
        ))}
      </div>
    ),
    { ...size },
  );
}
