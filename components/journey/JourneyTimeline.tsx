'use client';

import { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaChevronDown } from 'react-icons/fa';
import Tag from '@/components/ui/Tag';
import { CountryFlag } from '@/components/visual/Flags';
import type { Country } from '@/lib/location';

export type JourneyItem = {
  key: string;
  kind: 'work' | 'education';
  title: string;
  org: string;
  dateRange: string;
  current: boolean;
  location: string;
  country: Country;
  meta?: string;
  bullets: string[];
  coursework?: string[];
  logo?: string | null;
};

const KIND_ICON = {
  work: FaBriefcase,
  education: FaGraduationCap,
} as const;

function TimelineEntry({
  item,
  expanded,
  onToggle,
}: {
  item: JourneyItem;
  expanded: boolean;
  onToggle: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const Icon = KIND_ICON[item.kind];
  const panelId = `${item.key}-panel`;
  const hasDetails =
    item.bullets.length > 0 || (item.coursework?.length ?? 0) > 0;

  return (
    <div className="relative pl-12 md:pl-16">
      {/* node marker on the rail: org logo when available, kind icon otherwise */}
      <span
        aria-hidden="true"
        className={`absolute left-0 top-4 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border md:left-2 ${
          item.current
            ? 'border-accent/60 bg-accent/10 text-accent'
            : 'border-border bg-surface text-subtle'
        }`}
      >
        {item.logo ? (
          // eslint-disable-next-line @next/next/no-img-element -- tiny fixed-size local asset; optimizer adds nothing (and chokes on SVG)
          <img
            src={item.logo}
            alt=""
            className="h-full w-full rounded-full bg-white object-contain p-1"
          />
        ) : (
          <Icon className="h-3.5 w-3.5" />
        )}
      </span>

      <div
        className={`rounded-lg border transition-colors duration-200 ${
          expanded
            ? 'border-border bg-surface'
            : 'border-transparent hover:border-border hover:bg-surface/60'
        }`}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          aria-controls={panelId}
          disabled={!hasDetails}
          className="flex w-full items-start justify-between gap-4 rounded-lg px-4 py-4 text-left md:px-5"
        >
          <span>
            <span className="flex flex-wrap items-baseline gap-x-2">
              <span className="font-display font-semibold text-foreground">
                {item.title}
              </span>
              <span aria-hidden="true" className="text-subtle">
                &middot;
              </span>
              <span className="font-medium text-accent">{item.org}</span>
            </span>
            <span className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-wide text-subtle">
              <span>{item.dateRange}</span>
              <span className="inline-flex items-center gap-1.5 normal-case tracking-normal">
                <CountryFlag country={item.country} className="h-3 w-4" />
                {item.location}
              </span>
              {item.meta && (
                <span className="text-accent2">{item.meta}</span>
              )}
              {item.current && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2 py-0.5 normal-case tracking-normal text-accent">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent"
                  />
                  Current
                </span>
              )}
            </span>
          </span>
          {hasDetails && (
            <FaChevronDown
              aria-hidden="true"
              className={`mt-1.5 h-3.5 w-3.5 shrink-0 text-subtle transition-transform duration-200 ${
                expanded ? 'rotate-180' : ''
              }`}
            />
          )}
        </button>

        <AnimatePresence initial={false}>
          {expanded && hasDetails && (
            <motion.div
              id={panelId}
              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-5 md:px-5">
                {item.bullets.length > 0 && (
                  <ul className="space-y-2.5 border-t border-border pt-4 text-sm leading-relaxed text-muted">
                    {item.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
                {item.coursework && item.coursework.length > 0 && (
                  <div className="border-t border-border pt-4">
                    <p className="mb-2.5 font-mono text-xs uppercase tracking-widest text-subtle">
                      Coursework
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.coursework.map((course) => (
                        <Tag key={course}>{course}</Tag>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const RAIL_CLASSES =
  'absolute bottom-4 left-[15px] top-4 w-px origin-top bg-gradient-to-b from-accent via-accent2 to-aurora-c md:left-[23px]';

/** Owns the scroll-linked spring so reduced-motion users pay nothing for it. */
function AnimatedRail({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.75', 'end 0.55'],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleY: lineScale }}
      className={RAIL_CLASSES}
    />
  );
}

export default function JourneyTimeline({ items }: { items: JourneyItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(
    () => new Set(items.length ? [items[0].key] : [])
  );

  const toggle = (key: string) =>
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });

  return (
    <div ref={containerRef} className="relative">
      <div
        aria-hidden="true"
        className="absolute bottom-4 left-[15px] top-4 w-px bg-border md:left-[23px]"
      />
      {reduceMotion ? (
        <div aria-hidden="true" className={RAIL_CLASSES} />
      ) : (
        <AnimatedRail containerRef={containerRef} />
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <TimelineEntry
            key={item.key}
            item={item}
            expanded={expandedKeys.has(item.key)}
            onToggle={() => toggle(item.key)}
          />
        ))}
      </div>
    </div>
  );
}
