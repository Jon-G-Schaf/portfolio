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
    <header className="sticky top-0 z-40 border-b border-line bg-ink/80 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-page items-center justify-between px-6 sm:px-10"
      >
        <div className="flex items-center gap-3">
          <ThemeSong />
          <Link
            href="/"
            className="font-mono text-sm text-fog transition-colors hover:text-white"
            onClick={() => setOpen(false)}
          >
            <span className="accent-text font-semibold">g</span>
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
