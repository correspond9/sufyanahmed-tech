import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0A0F1F",
        borderRadius: "6px",
      }}
    >
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: "3px",
          background: "linear-gradient(135deg, #4F8CFF 0%, #6D5DF6 100%)",
        }}
      />
    </div>,
    { ...size },
  );
}
