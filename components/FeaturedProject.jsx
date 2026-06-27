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

          <div className="mt-10 flex flex-wrap items-center gap-7">
            {featuredProject.liveHref && (
              <a
                href={featuredProject.liveHref}
                target="_blank"
                rel="noopener noreferrer"
                className="accent-bar rounded-full px-6 py-3 text-sm font-medium text-ink shadow-[0_0_28px_-6px_rgba(255,122,26,0.45)] transition hover:scale-[1.03] hover:shadow-[0_0_38px_-6px_rgba(255,122,26,0.65)] active:scale-[0.98]"
              >
                {featuredProject.liveLabel ?? "Open the live app"}
              </a>
            )}
            <Link
              href={featuredProject.caseStudyHref}
              className="group inline-flex items-center gap-2 text-sm font-medium text-fog"
            >
              <span className="link-quiet">Read the case study</span>
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </Link>
          </div>
        </Reveal>

        {/* Visual - the live map, in a slim browser frame. The whole frame
            links out to the running product. */}
        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 scale-90 rounded-full bg-ember/10 blur-[100px]"
            />
            <a
              href={featuredProject.liveHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open the live Crosstown map in a new tab"
              className="group block"
            >
              <div className="overflow-hidden rounded-2xl border border-line bg-espresso shadow-2xl transition-transform duration-500 group-hover:scale-[1.015]">
                <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
                  <span aria-hidden="true" className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-line" />
                    <span className="h-2.5 w-2.5 rounded-full bg-line" />
                    <span className="h-2.5 w-2.5 rounded-full bg-line" />
                  </span>
                  <span className="ml-2 font-mono text-xs text-muted">
                    crosstown.jongschaf.com
                  </span>
                </div>
                <Image
                  src="/images/crosstown-map.jpg"
                  alt="Crosstown's live map: every COTA bus in Columbus as a glowing marker on a dark map of the city, with route strands and a stats panel showing buses on the road and today's on-time percentage"
                  width={1440}
                  height={900}
                  priority
                  className="w-full"
                />
              </div>
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
