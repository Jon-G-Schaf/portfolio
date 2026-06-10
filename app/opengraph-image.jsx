import { ImageResponse } from "next/og";

export const alt = "Jonathan Schafer - full-stack developer with a designer's eye";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Pull a TTF of the display face for the card; fall back to the default
// sans if the fetch ever fails so the build never breaks on fonts.
async function loadDisplayFont() {
  try {
    const css = await (
      await fetch(
        "https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@600",
        { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1)" } }
      )
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OgImage() {
  const display = await loadDisplayFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#2b1707",
          backgroundImage:
            "radial-gradient(circle at 85% -10%, #4a2a12 0%, #2b1707 55%, #1b1008 100%)",
          fontFamily: display ? "Schibsted Grotesk" : "sans-serif",
        }}
      >
        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 44,
              height: 3,
              backgroundImage: "linear-gradient(90deg, #ff7a1a, #ffc35c)",
            }}
          />
          <div
            style={{
              fontSize: 24,
              letterSpacing: 6,
              color: "#d0aa81",
              textTransform: "uppercase",
            }}
          >
            Columbus, OH · Portfolio
          </div>
        </div>

        {/* Name + positioning */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 104,
              fontWeight: 600,
              color: "#f7eddc",
              letterSpacing: -3,
              lineHeight: 1.05,
            }}
          >
            Jonathan Schafer
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 46,
              fontWeight: 600,
              backgroundImage: "linear-gradient(100deg, #ff7a1a, #ffc35c)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Full-stack developer with a designer&apos;s eye.
          </div>
        </div>

        {/* Footer: wordmark + token swatches */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: 26, color: "#d0aa81" }}>g//jonathan</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                backgroundColor: "#ff7a1a",
              }}
            />
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                backgroundColor: "#ffc35c",
              }}
            />
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                backgroundColor: "#f7eddc",
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: display
        ? [{ name: "Schibsted Grotesk", data: display, weight: 600, style: "normal" }]
        : undefined,
    }
  );
}
