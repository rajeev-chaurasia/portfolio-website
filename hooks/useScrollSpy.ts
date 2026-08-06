'use client';

import { useEffect, useState } from 'react';
import { SECTIONS, type SectionId } from '@/lib/sections';

const SECTION_IDS = SECTIONS.map((s) => s.id);

function isSectionId(value: string): value is SectionId {
  return (SECTION_IDS as readonly string[]).includes(value);
}

/**
 * Tracks which page section is currently in view.
 * Returns the active section id, or null when the viewport is above the
 * first section (e.g. in the hero).
 */
export default function useScrollSpy(): SectionId | null {
  const [active, setActive] = useState<SectionId | null>(null);

  // Update immediately on hash navigation so the highlight doesn't lag
  // behind smooth scrolling.
  useEffect(() => {
    const applyHash = () => {
      const id = window.location.hash.slice(1);
      if (isSectionId(id)) {
        setActive(id);
      }
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  useEffect(() => {
    const elements = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const intersecting = new Set<SectionId>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (!isSectionId(id)) continue;
          if (entry.isIntersecting) {
            intersecting.add(id);
          } else {
            intersecting.delete(id);
          }
        }

        if (intersecting.size > 0) {
          // Highest section (by document order) currently in the band wins.
          const topmost = SECTION_IDS.find((id) => intersecting.has(id));
          if (topmost) setActive(topmost);
        } else {
          // Nothing in the band: clear only when above the first section.
          const first = elements[0];
          if (first.getBoundingClientRect().top > window.innerHeight * 0.3) {
            setActive(null);
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}
