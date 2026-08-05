export const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];

/** '01' … '06', derived from SECTIONS order so nav and headings never drift. */
export function sectionIndex(id: SectionId): string {
  return String(SECTIONS.findIndex((s) => s.id === id) + 1).padStart(2, '0');
}
