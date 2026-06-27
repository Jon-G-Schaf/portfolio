import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { skillGroups } from "@/lib/content";

export default function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" className="border-t border-line">
      {/* Recessed espresso well: the skill rows sink below the walnut page,
          with the chips reading as raised pills floating in the recess. */}
      <div className="space-y-0 rounded-2xl border border-line bg-espresso px-6 shadow-[inset_0_2px_14px_rgba(0,0,0,0.35)] sm:px-10">
        {skillGroups.map((group, i) => (
          <Reveal key={group.label} delay={i * 0.06}>
            <div className="grid gap-4 border-b border-line py-10 last:border-b-0 md:grid-cols-12 md:items-baseline">
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
                    className="rounded-full border border-line bg-panel px-3.5 py-1.5 font-mono text-xs text-fog/90 transition-colors hover:border-ember/50 hover:bg-lift"
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
