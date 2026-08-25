import { FaCodeBranch, FaGithub, FaStar } from 'react-icons/fa';
import { FiArrowUpRight, FiChevronDown } from 'react-icons/fi';
import type {
  ContributionEntry,
  ContributionItem,
  ContributionStatus,
} from '@/lib/keystatic';
import { getPullRequestState, getRepoStars } from '@/lib/github';
import { sectionIndex } from '@/lib/sections';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import Card from '@/components/ui/Card';
import Tag from '@/components/ui/Tag';

const STATUS_LABEL: Record<ContributionStatus, string> = {
  merged: 'Merged',
  open: 'In review',
  closed: 'Closed',
};

const STATUS_NOUN: Record<ContributionStatus, string> = {
  merged: 'merged',
  open: 'in review',
  closed: 'closed',
};

const STATUS_CLASSES: Record<ContributionStatus, string> = {
  merged: 'border-accent2/40 bg-accent2/10 text-accent2',
  open: 'border-border bg-surface text-subtle',
  closed: 'border-border bg-surface text-subtle',
};

const STATUS_ORDER: ContributionStatus[] = ['merged', 'open', 'closed'];

/** '2 merged · 3 in review', naming only the states actually present. */
function contributionSummary(items: ContributionItem[]): string {
  return STATUS_ORDER.map((status) => {
    const count = items.filter((i) => i.status === status).length;
    return count > 0 ? `${count} ${STATUS_NOUN[status]}` : null;
  })
    .filter(Boolean)
    .join(' · ');
}

/** '…/pull/2063' → '#2063', for the collapsed row. */
function pullRequestNumber(url: string): string {
  const match = url.match(/\/pull\/(\d+)/);
  return match ? `#${match[1]}` : '';
}

/**
 * Native <details> rather than a JS accordion: five write-ups is a wall of text
 * collapsed by default, and this keeps the whole section server-rendered.
 * The link lives inside the panel because an anchor nested in <summary> would
 * toggle the disclosure as well as follow the href.
 */
function PullRequest({ item }: { item: ContributionItem }) {
  const number = pullRequestNumber(item.url);

  return (
    <li>
      <details className="group">
        <summary className="flex cursor-pointer list-none items-center gap-3 rounded-md py-1.5 text-left [&::-webkit-details-marker]:hidden">
          <span
            className={`inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-xs sm:w-24 ${STATUS_CLASSES[item.status]}`}
          >
            {item.status === 'merged' && (
              <FaCodeBranch aria-hidden="true" className="h-3 w-3" />
            )}
            {STATUS_LABEL[item.status]}
          </span>
          <span className="min-w-0 flex-1 font-medium text-foreground transition-colors group-hover:text-accent">
            {item.title}
          </span>
          {number && (
            <span className="shrink-0 font-mono text-xs text-subtle">
              {number}
            </span>
          )}
          <FiChevronDown
            aria-hidden="true"
            className="h-4 w-4 shrink-0 text-subtle transition-transform duration-200 group-open:rotate-180"
          />
        </summary>
        <div className="pb-2 pl-0 pt-2 sm:pl-[7.75rem]">
          {item.detail && (
            <p className="text-sm leading-relaxed text-muted">{item.detail}</p>
          )}
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2.5 inline-flex items-center gap-1.5 font-mono text-xs text-accent transition-colors hover:text-accent2"
            >
              Read the pull request
              <FiArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </details>
    </li>
  );
}

async function ContributionCard({ entry }: { entry: ContributionEntry }) {
  // GitHub is the source of truth for whether a PR has merged since it was
  // written up; the authored status is the fallback when the API is unreachable.
  const [stars, liveStates] = await Promise.all([
    entry.repo ? getRepoStars(entry.repo) : null,
    Promise.all(
      entry.items.map((item) =>
        item.url ? getPullRequestState(item.url) : null
      )
    ),
  ]);
  const items = entry.items.map((item, i) => ({
    ...item,
    status: liveStates[i] ?? item.status,
  }));

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
            {items.length > 0 && (
              <span className="text-accent2">
                {contributionSummary(items)}
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

      {items.length > 0 && (
        <ul className="divide-y divide-border border-t border-border">
          {items.map((item) => (
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
