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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 26,
              color: "#d0aa81",
            }}
          >
            {/* Signature G — handwritten mark, ember→amber stroke. */}
            <svg width={42} height={42} viewBox="326.5 83 297 297" style={{ marginTop: -2 }}>
              <defs>
                <linearGradient id="og-g" x1="0" y1="0" x2="1" y2="0.17">
                  <stop offset="0" stopColor="#ff7a1a" />
                  <stop offset="1" stopColor="#ffc35c" />
                </linearGradient>
              </defs>
              <path
                fill="none"
                stroke="url(#og-g)"
                strokeWidth="13"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M458.64,155.85c-1.31-4.59-38.98,3.93-69.77,40.62s-11.14,59.95,29.81,56.02c40.95-3.93,90.3-32.39,108.1-53.72c20.37-24.42,5.57-48.48-44.88-26.21s-98.78,74.6-92.7,109.1c6.11,34.67,65.51,33.07,112.69,11.12c47.17-21.95,45.29-46.22,3.28-42.91c-39.84,3.13-70.1,23.26-60.6,20.96s153.96-22.28,129.06-15.72"
              />
            </svg>
            //jonathan
          </div>
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
