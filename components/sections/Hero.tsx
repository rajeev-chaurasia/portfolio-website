import type { Site } from '@/lib/keystatic';
import { splitSentences } from '@/lib/format';
import { RESUME_FALLBACK } from '@/lib/site';
import Button from '@/components/ui/Button';
import SocialLinks from '@/components/ui/SocialLinks';
import Reveal from '@/components/motion/Reveal';
import Aurora from '@/components/visual/Aurora';

export default function Hero({ site }: { site: Site }) {
  return (
    <section className="relative overflow-hidden pt-16">
      <Aurora />
      {/* Fade the aurora out at the section edge instead of a hard cutoff. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background"
      />
      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] max-w-content items-center px-6 md:px-10">
        <div>
          <Reveal>
            <p className="font-mono text-sm tracking-widest text-accent">
              Hi, my name is
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-gradient mt-5 font-display text-5xl font-bold tracking-tight md:text-7xl">
              {site.name}
            </h1>
            <p className="mt-3 font-display text-3xl font-bold tracking-tight text-muted md:text-5xl">
              {site.tagline}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl leading-relaxed text-muted">
              {splitSentences(site.bio)[0] ?? site.bio}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="#projects">View my work</Button>
              <Button
                variant="secondary"
                href={site.resume ?? RESUME_FALLBACK}
                download
              >
                Download resume
              </Button>
            </div>
            <SocialLinks
              github={site.github}
              linkedin={site.linkedin}
              email={site.email}
              className="mt-10"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
