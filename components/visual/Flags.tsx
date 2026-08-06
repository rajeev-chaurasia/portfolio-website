import type { Country } from '@/lib/location';

/**
 * Inline SVG country flags (emoji flags don't render on Windows browsers).
 * Simplified marks, sized for inline use next to text.
 */

function IndiaFlag({ className = 'h-3.5 w-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 30 20"
      className={`${className} shrink-0 rounded-[2px]`}
      role="img"
      aria-label="India"
    >
      <rect width="30" height="20" fill="#F93" />
      <rect y="6.67" width="30" height="6.67" fill="#fff" />
      <rect y="13.33" width="30" height="6.67" fill="#128807" />
      <circle cx="15" cy="10" r="2.8" fill="none" stroke="#008" strokeWidth="0.7" />
      <circle cx="15" cy="10" r="0.7" fill="#008" />
    </svg>
  );
}

function USAFlag({ className = 'h-3.5 w-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 30 20"
      className={`${className} shrink-0 rounded-[2px]`}
      role="img"
      aria-label="United States"
    >
      <rect width="30" height="20" fill="#B22234" />
      {[1, 3, 5, 7, 9].map((i) => (
        <rect key={i} y={(i * 20) / 13} width="30" height={20 / 13} fill="#fff" />
      ))}
      <rect width="12" height={(20 / 13) * 7} fill="#3C3B6E" />
      {[2, 4, 6, 8, 10].map((x) =>
        [2, 5, 8].map((y) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="0.65" fill="#fff" />
        ))
      )}
    </svg>
  );
}

export function CountryFlag({
  country,
  className,
}: {
  country: Country;
  className?: string;
}) {
  if (country === 'india') return <IndiaFlag className={className} />;
  if (country === 'usa') return <USAFlag className={className} />;
  return null;
}
