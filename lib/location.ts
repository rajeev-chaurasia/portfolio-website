export type Country = 'india' | 'usa' | null;

export function countryFromLocation(location: string): Country {
  const l = location.toLowerCase();
  if (l.includes('india') || l.includes('bengaluru') || l.includes('shillong')) {
    return 'india';
  }
  if (l.includes('usa') || l.includes('united states') || l.includes('san jose')) {
    return 'usa';
  }
  return null;
}
