import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { about } from "@/lib/content";

export default function About() {
  return (
    <Section id="about" eyebrow="About" align="center">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold leading-snug tracking-tight sm:text-4xl">
            I build software end to end, then sweat{" "}
            <span className="accent-text">the details most people skip.</span>
          </h2>
        </Reveal>

        <div className="mx-auto mt-10 max-w-2xl space-y-6 text-base leading-relaxed text-muted">
          {about.paragraphs.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p>{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
