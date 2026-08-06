import type {
  EducationEntry,
  ExperienceEntry,
  Site,
  SkillGroup,
} from '@/lib/keystatic';
import { SITE_URL } from '@/lib/site';

/**
 * ProfilePage wrapping an enriched Person entity, per Google's profile-page
 * structured-data guidance. knowsAbout/worksFor/hasOccupation strengthen
 * entity disambiguation for both Google and AI answer engines.
 */
export function buildProfileJsonLd(
  site: Site,
  education: EducationEntry[],
  experience: ExperienceEntry[],
  skills: SkillGroup[]
): object {
  const currentRole = experience.find((e) => e.endDate === null);
  const nameParts = site.name.split(' ');
  const alternateName =
    nameParts.length > 2
      ? `${nameParts[0]} ${nameParts[nameParts.length - 1]}`
      : undefined;

  const person: Record<string, unknown> = {
    '@type': 'Person',
    name: site.name,
    ...(alternateName ? { alternateName } : {}),
    jobTitle: site.tagline,
    description: site.bio,
    url: SITE_URL,
    email: `mailto:${site.email}`,
    ...(site.profileImage ? { image: `${SITE_URL}${site.profileImage}` } : {}),
    sameAs: [site.github, site.linkedin].filter(Boolean),
    knowsAbout: skills.flatMap((group) => group.skills),
    ...(currentRole
      ? {
          worksFor: {
            '@type': 'Organization',
            name: currentRole.company,
          },
          hasOccupation: {
            '@type': 'Occupation',
            name: currentRole.role,
          },
        }
      : {}),
    alumniOf: education.map((e) => ({
      '@type': 'CollegeOrUniversity',
      name: e.institution,
    })),
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: person,
  };
}
