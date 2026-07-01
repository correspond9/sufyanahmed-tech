import { ImageResponse } from "next/og";

export const alt = "Sufyan Ahmed Ansari";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "80px",
        background: "linear-gradient(135deg, #0A0F1F 0%, #111827 100%)",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 8,
          background: "linear-gradient(135deg, #4F8CFF 0%, #6D5DF6 100%)",
          marginBottom: 32,
        }}
      />
      <div
        style={{
          fontSize: 64,
          fontWeight: 700,
          color: "#FFFFFF",
          lineHeight: 1.1,
          marginBottom: 16,
        }}
      >
        Sufyan Ahmed Ansari
      </div>
      <div style={{ fontSize: 28, color: "#9CA3AF" }}>
        Building Products That Scale.
      </div>
    </div>,
    { ...size },
  );
}
