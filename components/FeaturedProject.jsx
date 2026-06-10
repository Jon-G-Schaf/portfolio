import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { featuredProject } from "@/lib/content";

export default function FeaturedProject() {
  return (
    <Section id="work" eyebrow={featuredProject.marker} className="border-t border-line">
      <div className="grid items-center gap-14 lg:grid-cols-12">
        {/* Copy */}
        <Reveal className="lg:col-span-5">
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {featuredProject.name}
          </h2>
          <p className="mt-4 text-xl leading-snug text-fog/90">
            {featuredProject.tagline}
          </p>
          <p className="mt-5 text-base leading-relaxed text-muted">
            {featuredProject.description}
          </p>

          <ul className="mt-7 flex flex-wrap gap-2" role="list" aria-label="Tech stack">
            {featuredProject.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-line px-3.5 py-1.5 font-mono text-xs text-fog/90"
              >
                {tech}
              </li>
            ))}
          </ul>

          <Link
            href={featuredProject.caseStudyHref}
            className="group mt-10 inline-flex items-center gap-2 text-sm font-medium text-fog"
          >
            <span className="link-quiet">Read the case study</span>
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </Reveal>

        {/* Visual — the real Quorum "Discover" screen (Figma export). */}
        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="relative flex justify-center">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 scale-90 rounded-full bg-ember/10 blur-[100px]"
            />
            <Image
              src="/images/quorum-discover-dark.jpg"
              alt="Quorum's Discover screen: a feed of nearby events showing category, date and time, distance, and a Join button"
              width={1440}
              height={3023}
              priority
              className="w-full max-w-[260px] rounded-[2rem] border border-line shadow-2xl"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
