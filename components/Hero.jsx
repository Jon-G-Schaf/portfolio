"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { hero, site } from "@/lib/content";
import SandSurface from "@/components/SandSurface";
import SandGrains from "@/components/SandGrains";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const stagger = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.12 },
    },
  };

  const item = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.21, 0.6, 0.35, 1] },
    },
  };

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-[90svh] flex-col justify-center overflow-hidden"
    >
      {/* The whole sand stack, masked to fade out at the bottom so the section
          dissolves into the continuous page background — no seam, no hard line. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 68%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, #000 68%, transparent 100%)",
        }}
      >
        {/* Warm sand fallback, in case WebGL is unavailable. */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,#7a3f17_0%,#3a1f0d_60%,#1b1008_100%)]" />
        {/* Lower layer: lit sand, the sun glint pooled under the cursor. */}
        <SandSurface
          reduceMotion={!!reduceMotion}
          className="absolute inset-0 block h-full w-full"
        />
        {/* Upper layer: loose grains the cursor brushes aside and pools. */}
        <SandGrains
          reduceMotion={!!reduceMotion}
          className="absolute inset-0 block h-full w-full"
        />
      </div>

      {/* Legibility scrim behind the centered copy. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_62%_52%_at_50%_44%,rgba(12,7,3,0.5),transparent_72%)]"
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-page px-6 py-24 text-center sm:px-10"
      >
        <motion.p variants={item} className="mb-10 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/60 px-4 py-2 font-mono text-xs uppercase tracking-label text-fog/80 backdrop-blur-sm">
            <svg
              aria-hidden="true"
              width="11"
              height="14"
              viewBox="0 0 11 14"
              fill="none"
              className="shrink-0 text-amber"
            >
              <path
                d="M5.5 13C5.5 13 10 8.86 10 5.5a4.5 4.5 0 1 0-9 0C1 8.86 5.5 13 5.5 13Z"
                fill="currentColor"
                fillOpacity="0.18"
                stroke="currentColor"
                strokeWidth="1.1"
                strokeLinejoin="round"
              />
              <circle cx="5.5" cy="5.5" r="1.6" fill="currentColor" />
            </svg>
            {hero.eyebrow}
          </span>
        </motion.p>

        <motion.h1
          variants={item}
          className="mx-auto max-w-5xl font-display text-6xl font-semibold leading-[1.02] tracking-tight text-fog drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)] sm:text-7xl md:text-8xl"
        >
          {hero.headline}
          <span className="accent-text-flow mt-4 block pb-1 text-3xl font-medium leading-[1.2] sm:text-5xl">
            {hero.positioning}
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-8 max-w-2xl text-left text-lg leading-relaxed text-fog/85"
        >
          {hero.intro}
        </motion.p>

        <motion.div variants={item} className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/#work"
            className="accent-bar rounded-full px-6 py-3 text-sm font-medium text-ink shadow-[0_0_28px_-6px_rgba(255,122,26,0.45)] transition hover:scale-[1.03] hover:shadow-[0_0_38px_-6px_rgba(255,122,26,0.65)] active:scale-[0.98]"
          >
            View work
          </Link>
          <a
            href={site.links.resume}
            className="rounded-full border border-line bg-panel/30 px-6 py-3 text-sm text-fog backdrop-blur-sm transition-colors hover:border-amber/60"
          >
            Resume
          </a>
          <Link href="/#contact" className="link-quiet text-sm text-fog/80 hover:text-fog">
            Contact &rarr;
          </Link>
        </motion.div>
      </motion.div>

      {/* A note to self, in the margin — a quiet nod for anyone who lingers. */}
      {hero.note && (
        <motion.p
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: reduceMotion ? 0 : 6,
            duration: reduceMotion ? 0 : 1.4,
            ease: "easeOut",
          }}
          className="pointer-events-none absolute bottom-6 left-6 z-10 hidden max-w-[15rem] -rotate-2 font-hand text-lg leading-snug text-amber/60 sm:block md:bottom-9 md:left-10 md:text-xl"
        >
          {hero.note}
        </motion.p>
      )}
    </section>
  );
}
