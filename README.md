# jongschaf.com

My personal portfolio, live at [jongschaf.com](https://jongschaf.com).

Built with Next.js (App Router), Tailwind CSS, and Framer Motion. Type is Schibsted Grotesk, Inter, and JetBrains Mono over a dark amber palette with a single ember-to-amber accent. The drifting sand in the background is layered SVG noise and CSS animation, no canvas or WebGL. The Open Graph image and favicon are generated in code with `next/og`.

## Running locally

```bash
npm install
npm run dev
```

Requires Node.js 18.18+. The Quorum case study is at `/work/quorum`.

## Structure

```
app/
  layout.jsx        fonts, metadata, theme-song provider
  page.jsx          main single-page scroller
  globals.css       tokens, sand layers, scrollbar, motion rules
  work/quorum/      Quorum case study
components/         nav, hero, sections, reveals, theme-song player
lib/content.js      all site copy, links, and project entries
public/             screenshots, audio, resume PDF
```

Site copy lives in `lib/content.js`; components mostly just render it. The resume source is `resume.html` at the repo root, exported to `public/JonathanSchafer_Resume.pdf`.

## Notes

- All animation respects `prefers-reduced-motion`, in CSS and in Framer Motion.
- The theme song ("Southern Lights" by Sliders Club) never autoplays. Playback lives in a provider in the root layout so it survives page navigation.
- Deploys to Vercel automatically on push to `main`.
