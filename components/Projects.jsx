import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { otherProjects } from "@/lib/content";

export default function Projects() {
  return (
    <Section id="projects" eyebrow="Other work" className="border-t border-line">
      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-[0_24px_70px_-32px_rgba(0,0,0,0.6)] md:grid-cols-2">
        {otherProjects.map((project, i) => (
          <Reveal key={`${project.name}-${i}`} delay={i * 0.06} className="bg-ink">
            <a
              href={project.href}
              target={project.href?.startsWith("http") ? "_blank" : undefined}
              rel={project.href?.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex h-full flex-col p-8 transition-colors hover:bg-panel"
            >
              <p className="flex items-center justify-between font-mono text-xs text-muted">
                <span className="uppercase tracking-label">{project.type}</span>
                <span>{project.year}</span>
              </p>
              <h3 className="mt-5 font-display text-2xl font-medium tracking-tight">
                <span className="link-quiet">{project.name}</span>
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {project.description}
              </p>
              <p className="mt-6 flex items-center justify-between">
                <span className="font-mono text-xs text-muted">
                  {project.tags.join(" \u00b7 ")}
                </span>
                <span
                  aria-hidden="true"
                  className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-amber"
                >
                  &rarr;
                </span>
              </p>
            </a>
          </Reveal>
        ))}

        {/* Quietly fills the grid when the project count is odd. */}
        {otherProjects.length % 2 === 1 && (
          <div aria-hidden="true" className="hidden bg-ink p-8 md:block">
            <p className="font-mono text-xs text-muted/60">
              [More on the way. This slot is yours.]
            </p>
          </div>
        )}
      </div>
    </Section>
  );
}
