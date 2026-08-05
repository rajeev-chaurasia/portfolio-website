const formatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

function formatMonth(isoDate: string): string {
  return formatter.format(new Date(`${isoDate}T00:00:00Z`));
}

const SENTENCE_REGEX = /[^.!?]+[.!?]+(?:["')\]]+)?\s*/g;

export function splitSentences(text: string): string[] {
  const matches = text.match(SENTENCE_REGEX);
  if (!matches) {
    return text ? [text] : [];
  }
  const consumed = matches.join('').length;
  if (consumed < text.length) {
    matches.push(text.slice(consumed));
  }
  return matches.map((s) => s.trim()).filter(Boolean);
}

export function formatDateRange(start: string, end: string | null): string {
  // En dash for ranges (typographic convention), not em dash.
  return `${formatMonth(start)} – ${end ? formatMonth(end) : 'Present'}`;
}
