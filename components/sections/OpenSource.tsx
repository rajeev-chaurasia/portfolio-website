import { FaCodeBranch, FaGithub, FaStar } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import type { ContributionEntry, ContributionItem } from '@/lib/keystatic';
import { getRepoStars } from '@/lib/github';
import { sectionIndex } from '@/lib/sections';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import Card from '@/components/ui/Card';
import Tag from '@/components/ui/Tag';

const STATUS_LABEL: Record<ContributionItem['status'], string> = {
  merged: 'Merged',
  open: 'In review',
};

const STATUS_CLASSES: Record<ContributionItem['status'], string> = {
  merged: 'border-accent2/40 bg-accent2/10 text-accent2',
  open: 'border-border bg-surface text-subtle',
};

/** '2 merged · 3 in review', skipping either half when it's empty. */
function contributionSummary(items: ContributionItem[]): string {
  const merged = items.filter((i) => i.status === 'merged').length;
  const open = items.length - merged;
  return [
    merged > 0 ? `${merged} merged` : null,
    open > 0 ? `${open} in review` : null,
  ]
    .filter(Boolean)
    .join(' · ');
}

function PullRequest({ item }: { item: ContributionItem }) {
  return (
    <li className="flex flex-col gap-1.5 sm:flex-row sm:gap-4">
      <span
        className={`inline-flex h-fit w-fit shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-xs sm:w-24 sm:justify-center ${STATUS_CLASSES[item.status]}`}
      >
        {item.status === 'merged' && (
          <FaCodeBranch aria-hidden="true" className="h-3 w-3" />
        )}
        {STATUS_LABEL[item.status]}
      </span>
      <span className="min-w-0">
        {item.url ? (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-baseline gap-1 font-medium text-foreground transition-colors hover:text-accent"
          >
            {item.title}
            <FiArrowUpRight
              aria-hidden="true"
              className="h-3.5 w-3.5 shrink-0 self-center text-subtle transition-colors group-hover:text-accent"
            />
          </a>
        ) : (
          <span className="font-medium text-foreground">{item.title}</span>
        )}
        {item.detail && (
          <span className="mt-1 block text-sm leading-relaxed text-muted">
            {item.detail}
          </span>
        )}
      </span>
    </li>
  );
}

async function ContributionCard({ entry }: { entry: ContributionEntry }) {
  const stars = entry.repo ? await getRepoStars(entry.repo) : null;

  return (
    <Card className="flex flex-col gap-5">
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            {entry.url ? (
              <a
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                {entry.project}
              </a>
            ) : (
              entry.project
            )}
          </h3>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-subtle">
            {entry.org && <span>{entry.org}</span>}
            {stars !== null && (
              <span className="inline-flex items-center gap-1.5">
                <FaStar aria-hidden="true" className="h-3.5 w-3.5" />
                {stars.toLocaleString('en-US')} stars
              </span>
            )}
            {entry.items.length > 0 && (
              <span className="text-accent2">
                {contributionSummary(entry.items)}
              </span>
            )}
          </p>
        </div>
        {entry.url && (
          <a
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${entry.project} on GitHub`}
            className="text-subtle transition-colors hover:text-accent"
          >
            <FaGithub aria-hidden="true" className="h-5 w-5" />
          </a>
        )}
      </div>

      {entry.tagline && (
        <p className="text-sm leading-relaxed text-subtle">{entry.tagline}</p>
      )}
      {entry.summary && (
        <p className="leading-relaxed text-muted">{entry.summary}</p>
      )}

      {entry.techStack.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {entry.techStack.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
      )}

      {entry.items.length > 0 && (
        <ul className="space-y-4 border-t border-border pt-5">
          {entry.items.map((item) => (
            <PullRequest key={item.title} item={item} />
          ))}
        </ul>
      )}

      {entry.prsUrl && (
        <a
          href={entry.prsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-1.5 font-mono text-xs text-accent transition-colors hover:text-accent2"
        >
          Every pull request I&rsquo;ve opened here
          <FiArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
        </a>
      )}
    </Card>
  );
}

export default function OpenSource({ items }: { items: ContributionEntry[] }) {
  if (items.length === 0) return null;

  return (
    <section
      id="open-source"
      aria-labelledby="open-source-heading"
      className="scroll-mt-24 py-16 md:py-28"
    >
      <div className="mx-auto max-w-content px-6 md:px-10">
        <Reveal>
          <SectionHeading
            index={sectionIndex('open-source')}
            title="Open Source"
            id="open-source-heading"
          />
        </Reveal>
        <div className="space-y-4">
          {items.map((entry) => (
            <ContributionCard key={entry.slug} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}
