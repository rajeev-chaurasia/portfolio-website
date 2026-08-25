import type { IconType } from 'react-icons';
import {
  FaBrain,
  FaCloud,
  FaCode,
  FaLaptopCode,
  FaProjectDiagram,
  FaServer,
  FaToolbox,
  FaVial,
} from 'react-icons/fa';
import type { SkillGroup } from '@/lib/keystatic';
import type { SkillCategoryValue } from '@/lib/skill-categories';

// Icons stay presentation-side; the typed record keeps this map in
// lockstep with SKILL_CATEGORIES.
const CATEGORY_ICONS: Record<SkillCategoryValue, IconType> = {
  languages: FaCode,
  'ai-llm': FaBrain,
  testing: FaVial,
  devinfra: FaProjectDiagram,
  backend: FaServer,
  cloud: FaCloud,
  fullstack: FaLaptopCode,
  foundations: FaToolbox,
};

function SkillCategory({ group }: { group: SkillGroup }) {
  const Icon = CATEGORY_ICONS[group.category as SkillCategoryValue] ?? FaCode;

  return (
    <div className="break-inside-avoid pb-10">
      <h3 className="mb-4 flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent"
        >
          <Icon className="h-3 w-3" />
        </span>
        <span className="font-display text-sm font-semibold tracking-tight text-foreground">
          {group.label}
        </span>
        <span className="font-mono text-xs text-subtle">
          {group.skills.length}
        </span>
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
      </h3>
      <ul className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <li
            key={skill}
            className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-muted transition-colors duration-200 hover:border-accent/40 hover:text-foreground"
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Every category renders at once. The previous tablist hid seven of eight
 * groups behind a click and left the panel shorter than the tab column, so
 * most of the section was empty space. CSS columns balance the groups by
 * height rather than forcing equal-height grid rows.
 *
 * Nothing here is interactive, so it stays a server component and ships no JS.
 */
export default function SkillsGrid({ groups }: { groups: SkillGroup[] }) {
  if (!groups.length) return null;

  return (
    <div className="gap-x-12 md:columns-2">
      {groups.map((group) => (
        <SkillCategory key={group.category} group={group} />
      ))}
    </div>
  );
}
