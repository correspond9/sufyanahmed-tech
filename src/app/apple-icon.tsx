import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0A0F1F",
        borderRadius: 32,
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 16,
          background: "linear-gradient(135deg, #4F8CFF 0%, #6D5DF6 100%)",
        }}
      />
    </div>,
    { ...size },
  );
}
