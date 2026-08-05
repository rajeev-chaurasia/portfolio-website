'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
  FaCode,
  FaServer,
  FaBrain,
  FaCloud,
  FaLaptopCode,
  FaToolbox,
  FaProjectDiagram,
} from 'react-icons/fa';
import type { SkillGroup } from '@/lib/keystatic';
import type { SkillCategoryValue } from '@/lib/skill-categories';

// Icons stay presentation-side; the typed record keeps this map in
// lockstep with SKILL_CATEGORIES.
const CATEGORY_ICONS: Record<SkillCategoryValue, IconType> = {
  languages: FaCode,
  'ai-llm': FaBrain,
  devinfra: FaProjectDiagram,
  backend: FaServer,
  cloud: FaCloud,
  fullstack: FaLaptopCode,
  foundations: FaToolbox,
};

export default function SkillsExplorer({ groups }: { groups: SkillGroup[] }) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = groups[activeIndex] ?? groups[0];

  if (!groups.length) return null;

  // Roving-tabindex arrow-key navigation for the tablist.
  const onKeyDown = (event: React.KeyboardEvent) => {
    const last = groups.length - 1;
    let next: number | null = null;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      next = activeIndex === last ? 0 : activeIndex + 1;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      next = activeIndex === 0 ? last : activeIndex - 1;
    } else if (event.key === 'Home') {
      next = 0;
    } else if (event.key === 'End') {
      next = last;
    }
    if (next !== null) {
      event.preventDefault();
      setActiveIndex(next);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <div className="md:grid md:grid-cols-[300px_1fr] md:gap-12">
      <div
        role="tablist"
        aria-label="Skill categories"
        onKeyDown={onKeyDown}
        className="flex flex-wrap gap-2.5 md:flex-col md:gap-2"
      >
        {groups.map((group, i) => {
          const Icon =
            CATEGORY_ICONS[group.category as SkillCategoryValue] ?? FaCode;
          const selected = i === activeIndex;
          return (
            <button
              key={group.category}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`skills-tab-${group.category}`}
              aria-selected={selected}
              aria-controls="skills-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveIndex(i)}
              className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-left text-sm transition-colors duration-200 md:w-full md:rounded-lg md:px-4 md:py-3 ${
                selected
                  ? 'border-accent/60 bg-accent/10 text-accent'
                  : 'border-border text-muted hover:border-subtle hover:text-foreground'
              }`}
            >
              <Icon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
              <span className="md:flex-1">{group.label}</span>
              <span
                className={`rounded-full px-1.5 font-mono text-xs ${
                  selected ? 'bg-accent/15' : 'bg-surface text-subtle'
                }`}
              >
                {group.skills.length}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="skills-panel"
        role="tabpanel"
        aria-labelledby={`skills-tab-${active.category}`}
        className="mt-8 min-h-[8rem] md:mt-0"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={active.category}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="flex flex-wrap gap-2.5"
          >
            {active.skills.map((skill, i) => (
              <motion.li
                key={skill}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.2,
                  delay: reduceMotion ? 0 : Math.min(i * 0.03, 0.35),
                  ease: 'easeOut',
                }}
                className="rounded-lg border border-border bg-surface px-3.5 py-2 text-sm text-foreground"
              >
                {skill}
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  );
}
