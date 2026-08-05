import type { ExperienceEntry } from '@/lib/keystatic';
import { formatDateRange } from '@/lib/format';
import { countryFromLocation } from '@/lib/location';
import { sectionIndex } from '@/lib/sections';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import JourneyTimeline, { type JourneyItem } from '@/components/journey/JourneyTimeline';

export default function Experience({ items }: { items: ExperienceEntry[] }) {
  const timelineItems: JourneyItem[] = items.map((e) => ({
    key: `work-${e.slug}`,
    kind: 'work' as const,
    title: e.role,
    org: e.company,
    dateRange: formatDateRange(e.startDate, e.endDate),
    current: e.endDate === null,
    location: e.location,
    country: countryFromLocation(e.location),
    bullets: e.description,
    logo: e.logo,
  }));

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-24 py-16 md:py-28"
    >
      <div className="mx-auto max-w-content px-6 md:px-10">
        <Reveal>
          <SectionHeading
            index={sectionIndex('experience')}
            title="Experience"
            id="experience-heading"
          />
        </Reveal>
        <JourneyTimeline items={timelineItems} />
      </div>
    </section>
  );
}
