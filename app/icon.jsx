import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Favicon: the brand "g" from the g//jonathan wordmark, gradient on ink.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#2b1707",
          borderRadius: 14,
        }}
      >
        <div
          style={{
            fontSize: 42,
            fontWeight: 700,
            backgroundImage: "linear-gradient(100deg, #ff7a1a, #ffc35c)",
            backgroundClip: "text",
            color: "transparent",
            marginTop: -4,
          }}
        >
          g
        </div>
      </div>
    ),
    size
  );
}
