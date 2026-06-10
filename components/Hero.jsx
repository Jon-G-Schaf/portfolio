"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { hero, site } from "@/lib/content";
import SandField from "@/components/SandField";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const glowRef = useRef(null);

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

  // Ember glow that trails the cursor. Writes styles directly (no re-render);
  // the overlay only exists for fine pointers and sits under the content.
  function handleMouseMove(e) {
    if (reduceMotion) return;
    const el = glowRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.background = `radial-gradient(540px circle at ${x}px ${y}px, rgba(255, 122, 26, 0.09), transparent 70%)`;
  }

  function handleMouseLeave() {
    const el = glowRef.current;
    if (el) el.style.background = "transparent";
  }

  return (
    <section
      id="top"
      aria-label="Introduction"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden border-b border-line"
    >
      {/* Texture: drifting sand that dissolves toward the content. */}
      <SandField />

      {/* Depth: one soft glow, anchored off-center so the layout stays editorial. */}
      <div
        aria-hidden="true"
        className="absolute -top-40 right-[-10%] h-[34rem] w-[34rem] rounded-full bg-ember/15 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[-30%] left-[-5%] h-[26rem] w-[26rem] rounded-full bg-amber/10 blur-[140px]"
      />

      {/* Interactive: ember glow that follows the cursor (desktop only). */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden [@media(pointer:fine)]:block"
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative mx-auto w-full max-w-page px-6 pb-28 pt-28 text-center sm:px-10 md:pb-40 md:pt-40"
      >
        <motion.p variants={item} className="mb-10 flex justify-center">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-panel/70 px-4 py-2 font-mono text-xs uppercase tracking-label text-muted backdrop-blur-sm">
            <span aria-hidden="true" className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
            </span>
            {hero.eyebrow}
          </span>
        </motion.p>

        <motion.h1
          variants={item}
          className="mx-auto max-w-5xl font-display text-6xl font-semibold leading-[1.02] tracking-tight sm:text-7xl md:text-8xl"
        >
          {hero.headline}
          <span className="accent-text-flow mt-4 block pb-1 text-3xl font-medium leading-[1.2] sm:text-5xl">
            {hero.positioning}
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-8 max-w-2xl text-left text-lg leading-relaxed text-muted"
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
