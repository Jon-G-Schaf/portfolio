/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
      // Surfaces — walnut-forward, never black. Elevation ladder, low → high:
      // espresso (deepest well) < ink (walnut body) < panel (raised) < lift (top-lit).
      espresso: "#1b1008", // deepest well — recesses, screenshot bezels, code insets
      ink: "#2b1707",      // walnut — base surface
      panel: "#3b2414",    // walnut+ — raised panels, chips
      lift: "#4a2e18",     // walnut-lit — hover lift, top-lit edge
      line: "rgba(246, 236, 217, 0.13)",

      // Text
      fog: "#f7eddc",
      muted: "#d0aa81",

      // Accents
      ember: "#ff7a1a",  // deep ember orange
      amber: "#ffc35c",  // warm amber gold
},
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        hand: ["var(--font-hand)", "cursive"],
      },
      maxWidth: {
        page: "72rem",
      },
      letterSpacing: {
        label: "0.18em",
      },
    },
  },
  plugins: [],
};
