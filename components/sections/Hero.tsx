import type { Site } from '@/lib/keystatic';
import { splitSentences } from '@/lib/format';
import { resumeHref } from '@/lib/site';
import Button from '@/components/ui/Button';
import SocialLinks from '@/components/ui/SocialLinks';
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
        {/* Pure-CSS entrance (animation-fill-mode: both) that never depends
            on JS, so the hero paints even if hydration is slow or fails. */}
        <div>
          <div className="animate-rise">
            <p className="font-mono text-sm tracking-widest text-accent">
              Hi, my name is
            </p>
          </div>
          <div className="animate-rise" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-gradient mt-5 font-display text-5xl font-bold tracking-tight md:text-7xl">
              {site.name}
            </h1>
            <p className="mt-3 font-display text-3xl font-bold tracking-tight text-muted md:text-5xl">
              {site.tagline}
            </p>
          </div>
          <div className="animate-rise" style={{ animationDelay: '0.2s' }}>
            <p className="mt-6 max-w-xl leading-relaxed text-muted">
              {splitSentences(site.bio)[0] ?? site.bio}
            </p>
          </div>
          <div className="animate-rise" style={{ animationDelay: '0.3s' }}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="#projects">View my work</Button>
              <Button variant="secondary" href={resumeHref(site)} download>
                Download resume
              </Button>
            </div>
            <SocialLinks
              github={site.github}
              linkedin={site.linkedin}
              email={site.email}
              className="mt-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
