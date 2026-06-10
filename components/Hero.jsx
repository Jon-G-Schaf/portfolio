"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { hero, site } from "@/lib/content";

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
      className="relative overflow-hidden border-b border-line"
    >
      {/* Texture: faint blueprint grid that dissolves toward the content. */}
      <div aria-hidden="true" className="grid-lines absolute inset-0" />

      {/* Depth: one soft glow, anchored off-center so the layout stays editorial. */}
      <div
        aria-hidden="true"
        className="absolute -top-40 right-[-10%] h-[34rem] w-[34rem] rounded-full bg-ember/15 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[-30%] left-[-5%] h-[26rem] w-[26rem] rounded-full bg-amber/10 blur-[140px]"
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative mx-auto w-full max-w-page px-6 pb-28 pt-28 text-center sm:px-10 md:pb-40 md:pt-40"
      >
        <motion.p
          variants={item}
          className="mb-8 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-label text-muted"
        >
          <span aria-hidden="true" className="accent-bar h-px w-8" />
          {hero.eyebrow}
        </motion.p>

        <motion.h1
          variants={item}
          className="mx-auto max-w-4xl font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl"
        >
          {hero.headline}
          <span className="accent-text mt-3 block pb-1 text-3xl font-medium leading-[1.2] sm:text-5xl">
            {hero.positioning}
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted"
        >
          {hero.intro}
        </motion.p>

        <motion.div variants={item} className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/#work"
            className="accent-bar rounded-full px-6 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            View work
          </Link>
          <a
            href={site.links.resume}
            className="rounded-full border border-line px-6 py-3 text-sm text-fog transition-colors hover:border-amber/60"
          >
            Resume
          </a>
          <Link href="/#contact" className="link-quiet text-sm text-muted hover:text-fog">
            Contact →
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
