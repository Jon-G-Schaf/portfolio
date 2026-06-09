# Jonathan Schafer — Portfolio

A single-page portfolio with a dedicated case-study page for **Quorum**, built with:

- **Next.js** (App Router, JavaScript)
- **Tailwind CSS** for styling
- **Framer Motion** for restrained scroll reveals and micro-interactions

Dark slate base, one violet→cyan accent treatment, Schibsted Grotesk / Inter / JetBrains Mono type system. Fully responsive, keyboard-accessible, and `prefers-reduced-motion` aware.

---

## Run it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The case study lives at `/work/quorum`.

> Requires Node.js 18.18+ (20+ recommended).

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo, and click **Deploy**. No configuration needed — Vercel detects Next.js automatically.
3. After deploying, copy your live URL into `site.url` in `lib/content.js` (it powers the Open Graph / social-preview metadata) and push again.

Alternatively, from the project folder: `npx vercel`.

---

## Where to edit things

**Almost all copy, links, and project entries live in one file: `lib/content.js`.** Edit there first — you rarely need to touch components for content changes.

| What | Where |
| --- | --- |
| Name, email, GitHub/LinkedIn/resume links, meta tags | `lib/content.js` → `site` |
| Hero copy & CTAs | `lib/content.js` → `hero` |
| About paragraphs | `lib/content.js` → `about` |
| Skill groups | `lib/content.js` → `skillGroups` |
| Featured project blurb | `lib/content.js` → `featuredProject` |
| Other projects grid | `lib/content.js` → `otherProjects` (add/remove entries freely) |
| Contact copy | `lib/content.js` → `contact` |
| Footer colophon | `lib/content.js` → `colophon` |
| Quorum case-study copy | `app/work/quorum/page.jsx` (written copy lives in the page) |
| Colors & fonts | `tailwind.config.js` + `app/layout.jsx` |

## Placeholder checklist — replace everything in [BRACKETS]

- [ ] `lib/content.js` → your **last name** (appears in `site`, `hero`)
- [ ] `lib/content.js` → **email**, **GitHub**, **LinkedIn** URLs
- [ ] **Resume**: drop `resume.pdf` into `/public/` and set `site.links.resume` to `"/resume.pdf"`
- [ ] `lib/content.js` → `site.url` after your first deploy
- [ ] `lib/content.js` → the three `otherProjects` entries (or delete the ones you don't need)
- [ ] `app/work/quorum/page.jsx` → timeline, team size/scope, interview count, screen counts, the "hardest problem" paragraph, and the three outcome metrics
- [ ] Screenshots (see below)

## Adding real screenshots

Placeholders are clearly marked dashed boxes (`<ImagePlaceholder />`) plus a coded mock of the Quorum heatmap (`<QuorumMock />`) that stands in until you have assets.

1. Drop images into `public/images/` (e.g. `public/images/quorum-cover.png`).
2. Replace a placeholder with `next/image`:

```jsx
import Image from "next/image";

<Image
  src="/images/quorum-cover.png"
  alt="Quorum's availability heatmap screen"  // write real alt text
  width={1600}
  height={1000}
  className="rounded-2xl border border-line"
/>
```

3. Swap instances in `components/FeaturedProject.jsx` and `app/work/quorum/page.jsx`. You can keep `<QuorumMock />` in the case study's first design decision even after adding screenshots — it reads as an illustration.

## Project structure

```
app/
  layout.jsx          # fonts, metadata, skip link
  page.jsx            # main single-page scroller
  globals.css         # tokens, grain, grid texture, focus & reduced-motion rules
  work/quorum/        # the Quorum case study
components/
  Nav.jsx  Hero.jsx  About.jsx  Skills.jsx
  FeaturedProject.jsx  Projects.jsx  Contact.jsx  Footer.jsx
  Section.jsx         # shared section shell + mono eyebrow
  Reveal.jsx          # scroll-reveal wrapper (reduced-motion aware)
  QuorumMock.jsx      # coded stand-in visual for Quorum
  ImagePlaceholder.jsx
lib/
  content.js          # ← edit this file for nearly everything
```

## Accessibility notes (already handled)

- Semantic landmarks (`header`, `main`, `section` with `aria-labelledby`, `footer`) and a skip-to-content link
- Visible keyboard focus states on every interactive element
- All animation respects `prefers-reduced-motion` (CSS **and** Framer Motion's `useReducedMotion`)
- Color contrast tuned for the dark theme; remember to write real `alt` text when you add screenshots
