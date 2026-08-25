import { FaCertificate, FaTrophy } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import type { CredentialEntry } from '@/lib/keystatic';
import { formatMonthYear } from '@/lib/format';
import Card from '@/components/ui/Card';
import Tag from '@/components/ui/Tag';

const KIND_ICON = {
  certification: FaCertificate,
  award: FaTrophy,
} as const;

/** 'Issued Aug 2026 · Expires Aug 2028', or just the award date. */
function credentialDates(entry: CredentialEntry): string {
  const issued = formatMonthYear(entry.issuedDate);
  if (!issued) return '';
  if (entry.kind === 'award') return issued;
  const expires = entry.expiryDate ? formatMonthYear(entry.expiryDate) : '';
  return expires ? `Issued ${issued} · Expires ${expires}` : `Issued ${issued}`;
}

function CredentialCard({ entry }: { entry: CredentialEntry }) {
  const Icon = KIND_ICON[entry.kind];
  const dates = credentialDates(entry);
  const isCertification = entry.kind === 'certification';

  return (
    <Card
      className={`flex h-full flex-col gap-3 ${
        isCertification
          ? 'border-accent/30 bg-gradient-to-br from-accent/[0.06] to-accent2/[0.06]'
          : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
            isCertification
              ? 'border-accent/40 bg-accent/10 text-accent'
              : 'border-border bg-surface text-accent2'
          }`}
        >
          <Icon className="h-3.5 w-3.5" />
        </span>
        <div className="min-w-0">
          <h4 className="font-display font-semibold leading-snug text-foreground">
            {entry.url ? (
              <a
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-baseline gap-1 transition-colors hover:text-accent"
              >
                {entry.title}
                <FiArrowUpRight
                  aria-hidden="true"
                  className="h-3.5 w-3.5 shrink-0 self-center text-subtle transition-colors group-hover:text-accent"
                />
              </a>
            ) : (
              entry.title
            )}
          </h4>
          <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 font-mono text-xs text-subtle">
            {entry.issuer && <span className="text-accent2">{entry.issuer}</span>}
            {entry.issuer && dates && <span aria-hidden="true">&middot;</span>}
            {dates && <span>{dates}</span>}
          </p>
        </div>
      </div>

      {entry.summary && (
        <p className="text-sm leading-relaxed text-muted">{entry.summary}</p>
      )}

      {entry.skills.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          {entry.skills.map((skill) => (
            <Tag key={skill}>{skill}</Tag>
          ))}
        </div>
      )}
    </Card>
  );
}

/**
 * Rendered inside the Education section rather than as a section of its own:
 * four short entries don't carry a full nav slot, and the nav has no room for
 * an eighth item at the desktop breakpoint.
 */
export default function Credentials({ items }: { items: CredentialEntry[] }) {
  if (items.length === 0) return null;

  const certifications = items.filter((i) => i.kind === 'certification');
  const awards = items.filter((i) => i.kind === 'award');

  return (
    <div id="credentials" className="mt-14 scroll-mt-24 md:mt-20">
      <h3 className="mb-6 flex items-center gap-4 font-display text-lg font-semibold tracking-tight text-foreground md:text-xl">
        Certifications &amp; Awards
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
      </h3>
      <div className="space-y-4">
        {certifications.map((entry) => (
          <CredentialCard key={entry.slug} entry={entry} />
        ))}
        {awards.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            {awards.map((entry) => (
              <CredentialCard key={entry.slug} entry={entry} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
