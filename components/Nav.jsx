"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/content";
import ThemeSong from "@/components/ThemeSong";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#work", label: "Work" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    // The before: bleed paints the strip above the header so page content
    // can't show through the iOS Safari status-bar gap (sticky elements pin
    // below the notch while the page scrolls edge-to-edge behind it).
    <header className="nav-glass sticky top-0 z-40 border-b border-line bg-espresso/80 backdrop-blur-md before:pointer-events-none before:absolute before:inset-x-0 before:bottom-full before:h-28 before:bg-espresso">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-page items-center justify-between px-6 sm:px-10"
      >
        <div className="flex items-center gap-3">
          <ThemeSong />
          <Link
            href="/"
            aria-label={`g//${site.shortName.toLowerCase()}`}
            className="flex items-center font-mono text-sm text-fog transition-colors hover:text-white"
            onClick={() => setOpen(false)}
          >
            {/* Signature G — Jon's handwritten mark, ember→amber stroke. */}
            <svg
              viewBox="326.5 83 297 297"
              aria-hidden="true"
              className="h-[1.5em] w-[1.5em] -translate-y-[0.06em]"
            >
              <defs>
                <linearGradient id="wordmark-g" x1="0" y1="0" x2="1" y2="0.17">
                  <stop offset="0" stopColor="#ff7a1a" />
                  <stop offset="1" stopColor="#ffc35c" />
                </linearGradient>
              </defs>
              <path
                fill="none"
                stroke="url(#wordmark-g)"
                strokeWidth="13"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M458.64,155.85c-1.31-4.59-38.98,3.93-69.77,40.62s-11.14,59.95,29.81,56.02c40.95-3.93,90.3-32.39,108.1-53.72c20.37-24.42,5.57-48.48-44.88-26.21s-98.78,74.6-92.7,109.1c6.11,34.67,65.51,33.07,112.69,11.12c47.17-21.95,45.29-46.22,3.28-42.91c-39.84,3.13-70.1,23.26-60.6,20.96s153.96-22.28,129.06-15.72"
              />
            </svg>
            {"//"}
            {site.shortName.toLowerCase()}
          </Link>
        </div>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="link-quiet text-sm text-muted transition-colors hover:text-fog"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={site.links.resume}
            className="rounded-full border border-line px-4 py-1.5 font-mono text-xs uppercase tracking-label text-fog transition-colors hover:border-amber/60"
          >
            Resume
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="font-mono text-sm text-fog md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "close" : "menu"}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-2 text-sm text-muted transition-colors hover:text-fog"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={site.links.resume}
                className="py-2 font-mono text-xs uppercase tracking-label text-fog"
                onClick={() => setOpen(false)}
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
