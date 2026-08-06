import Image from 'next/image';
import type { Site } from '@/lib/keystatic';
import { splitSentences } from '@/lib/format';
import { sectionIndex } from '@/lib/sections';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/motion/Reveal';

/** Split the bio on sentence boundaries into 1–2 paragraphs. */
function splitBio(bio: string): string[] {
  const sentences = splitSentences(bio);
  if (sentences.length < 3) {
    return bio ? [bio] : [];
  }
  const mid = Math.ceil(sentences.length / 2);
  return [
    sentences.slice(0, mid).join(' '),
    sentences.slice(mid).join(' '),
  ].filter(Boolean);
}

export default function About({ site }: { site: Site }) {
  const paragraphs = splitBio(site.bio);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-24 py-16 md:py-28"
    >
      <div className="mx-auto max-w-content px-6 md:px-10">
        <Reveal>
          <SectionHeading
            index={sectionIndex('about')}
            title="About"
            id="about-heading"
          />
          <div
            className={
              site.profileImage
                ? 'grid items-start gap-10 md:grid-cols-[1fr_auto] md:gap-14'
                : ''
            }
          >
            <div className="space-y-4">
              {paragraphs.map((paragraph, i) => (
                <p key={i} className="leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
            {site.profileImage && (
              <div className="mx-auto md:mx-0">
                <Image
                  src={site.profileImage}
                  alt={`Portrait of ${site.name}`}
                  width={280}
                  height={280}
                  className="rounded-lg border border-border object-cover"
                />
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
