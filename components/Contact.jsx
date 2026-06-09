"use client";

import { useState } from "react";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { contact, site } from "@/lib/content";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (older browser / permissions) — the mailto
      // link right above still works, so fail silently.
    }
  }

  return (
    <Section id="contact" eyebrow="Contact" align="center" className="border-t border-line">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {contact.heading}
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-6 text-base leading-relaxed text-muted">{contact.body}</p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <a
              href={`mailto:${site.email}`}
              className="link-quiet break-all font-display text-2xl font-medium tracking-tight sm:text-3xl"
            >
              {site.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="rounded-full border border-line px-4 py-1.5 font-mono text-xs uppercase tracking-label text-muted transition-colors hover:border-amber/60 hover:text-fog"
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <ul className="mt-12 flex justify-center gap-8 font-mono text-sm" role="list">
            <li>
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-quiet text-muted hover:text-fog"
              >
                GitHub ↗
              </a>
            </li>
            <li>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link-quiet text-muted hover:text-fog"
              >
                LinkedIn ↗
              </a>
            </li>
            <li>
              <a
                href={site.links.resume}
                className="link-quiet text-muted hover:text-fog"
              >
                Resume ↓
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
