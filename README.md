# Jonathan Schafer — Portfolio

A single-page developer portfolio with a dedicated case-study page for **Quorum**, built with:

- **Next.js** (App Router, JavaScript)
- **Tailwind CSS** for styling
- **Framer Motion** for restrained scroll reveals and micro-interactions

Dark amber base, a single ember→amber accent treatment, and a Schibsted Grotesk / Inter / JetBrains Mono type system. Fully responsive, keyboard-accessible, and `prefers-reduced-motion` aware. There's also a small "Vibe Setter" theme-song player in the nav.

Live (currently `noindex` — link-only): https://portfolio-two-delta-3nbcvpeok4.vercel.app

---

## Run it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The Quorum case study lives at `/work/quorum`.

> Requires Node.js 18.18+ (20+ recommended).

---

## Where to edit things

**Almost all copy, links, and project entries live in one file: `lib/content.js`.** Edit there first — you rarely need to touch components for content changes.

| What | Where |
| --- | --- |
| Name, email, GitHub/LinkedIn/resume links, meta, `site.url` | `lib/content.js` → `site` |
| Hero copy & CTAs | `lib/content.js` → `hero` |
| About paragraphs | `lib/content.js` → `about` |
| Skill groups | `lib/content.js` → `skillGroups` |
| Featured project blurb | `lib/content.js` → `featuredProject` |
| Other projects grid | `lib/content.js` → `otherProjects` (add/remove entries freely) |
| Contact copy | `lib/content.js` → `contact` |
| Footer colophon | `lib/content.js` → `colophon` |
| Quorum case-study copy | `app/work/quorum/page.jsx` (the written copy lives in the page) |
| Colors & fonts | `tailwind.config.js` + `app/layout.jsx` |

---

## Screenshots

Real Quorum screenshots live in `public/images/` as `quorum-*.jpg` (1440-px-wide phone exports). The case study renders them through a small local `Shot` helper in `app/work/quorum/page.jsx` — all are 1440 wide, so each call just passes the image's real **height** (`h={...}`) to keep the aspect ratio correct.

To swap one:

1. Drop the new file in `public/images/` (overwrite to keep the same name, or add a new one).
2. If it isn't 1440×(its height), update the `h={...}` on that `<Shot />` (and the `width`/`height` on the featured image in `components/FeaturedProject.jsx`).
3. **Dev-server gotcha:** Next caches optimized images by filename. If you overwrite a file but still see the old one, clear `.next/cache/images` and hard-refresh the browser.

---

## Theme song

The nav play button is `components/ThemeSong.jsx`; the actual `<audio>` element and play/pause state live in `components/ThemeSongProvider.jsx`, mounted once in `app/layout.jsx` so playback **survives page navigation**.

To change the track, replace `public/audio/southern-lights.mp3` (or update the `src` and the `aria-label`/caption in those two components).

---

## Deploy (Vercel)

This repo is connected to Vercel and **auto-deploys on every push to `main`**. To set it up from scratch: [vercel.com/new](https://vercel.com/new) → import the repo → **Deploy** (no config — Next.js is auto-detected).

- `site.url` in `lib/content.js` is the deployed URL; it powers the Open Graph / social-preview metadata.
- The site is currently kept out of search results by `robots: { index: false, follow: false }` in `app/layout.jsx`. **Remove that line to make it publicly indexable at launch.**

---

## Project structure

```
app/
  layout.jsx          # fonts, metadata, robots/noindex, skip link, theme-song provider
  page.jsx            # main single-page scroller
  globals.css         # tokens, grain, grid texture, focus & reduced-motion rules
  work/quorum/        # the Quorum case study
components/
  Nav.jsx  Hero.jsx  About.jsx  Skills.jsx
  FeaturedProject.jsx  Projects.jsx  Contact.jsx  Footer.jsx
  Section.jsx         # shared section shell + mono eyebrow
  Reveal.jsx          # scroll-reveal wrapper (reduced-motion aware)
  ThemeSong.jsx       # nav play/pause button ("Vibe Setter")
  ThemeSongProvider.jsx  # persistent <audio> + context (in the root layout)
lib/
  content.js          # ← edit this file for nearly everything
public/
  images/             # quorum-*.jpg screenshots
  audio/              # southern-lights.mp3
  JonathanSchafer_Resume.pdf
```

---

## Accessibility notes (already handled)

- Semantic landmarks (`header`, `main`, `section` with `aria-labelledby`, `footer`) and a skip-to-content link
- Visible keyboard focus states on every interactive element
- All animation respects `prefers-reduced-motion` (CSS **and** Framer Motion's `useReducedMotion`)
- The theme song is user-initiated only (never autoplays) and the toggle is labeled for screen readers
- Color contrast tuned for the dark theme; screenshots carry descriptive `alt` text
```
