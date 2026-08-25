import type { CredentialEntry, EducationEntry } from '@/lib/keystatic';
import { formatDateRange } from '@/lib/format';
import { countryFromLocation } from '@/lib/location';
import { sectionIndex } from '@/lib/sections';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import JourneyTimeline, { type JourneyItem } from '@/components/journey/JourneyTimeline';
import Credentials from '@/components/sections/Credentials';

export default function Education({
  items,
  credentials,
}: {
  items: EducationEntry[];
  credentials: CredentialEntry[];
}) {
  const timelineItems: JourneyItem[] = items.map((e) => ({
    key: `edu-${e.slug}`,
    kind: 'education' as const,
    title: e.degree,
    org: e.institution,
    dateRange: formatDateRange(e.startDate, e.endDate),
    current: e.endDate === null,
    location: e.location,
    country: countryFromLocation(e.location),
    meta: e.grade ? `GPA ${e.grade}` : undefined,
    bullets: [],
    coursework: e.coursework,
    logo: e.logo,
  }));

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="scroll-mt-24 py-16 md:py-28"
    >
      <div className="mx-auto max-w-content px-6 md:px-10">
        <Reveal>
          <SectionHeading
            index={sectionIndex('education')}
            title="Education & Credentials"
            id="education-heading"
          />
        </Reveal>
        <JourneyTimeline items={timelineItems} />
        <Reveal>
          <Credentials items={credentials} />
        </Reveal>
      </div>
    </section>
  );
}
