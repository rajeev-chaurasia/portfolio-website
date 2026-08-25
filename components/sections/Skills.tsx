import type { SkillGroup } from '@/lib/keystatic';
import { sectionIndex } from '@/lib/sections';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import SkillsGrid from '@/components/skills/SkillsGrid';

export default function Skills({ groups }: { groups: SkillGroup[] }) {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="scroll-mt-24 py-16 md:py-28"
    >
      <div className="mx-auto max-w-content px-6 md:px-10">
        <Reveal>
          <SectionHeading
            index={sectionIndex('skills')}
            title="Skills"
            id="skills-heading"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <SkillsGrid groups={groups} />
        </Reveal>
      </div>
    </section>
  );
}
