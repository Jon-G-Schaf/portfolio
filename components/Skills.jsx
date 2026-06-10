import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { skillGroups } from "@/lib/content";

export default function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" className="border-t border-line">
      <div className="space-y-0">
        {skillGroups.map((group, i) => (
          <Reveal key={group.label} delay={i * 0.06}>
            <div className="grid gap-4 border-b border-line py-10 first:border-t md:grid-cols-12 md:items-baseline">
              <div className="md:col-span-4">
                <h3 className="font-display text-xl font-medium tracking-tight">
                  {group.label}
                </h3>
                <p className="mt-1 font-mono text-xs text-muted">{group.note}</p>
              </div>
              <ul className="flex flex-wrap gap-2 md:col-span-8" role="list">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 font-mono text-xs text-fog/90 transition-colors hover:border-ember/50"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
