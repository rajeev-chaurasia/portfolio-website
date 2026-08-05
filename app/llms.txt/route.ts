import { getSite } from '@/lib/keystatic';
import { resumeHref, SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

export async function GET() {
  const site = await getSite();
  const resume = resumeHref(site);
  const resumeLink = resume.startsWith('http') ? resume : `${SITE_URL}${resume}`;
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.tagline}. ${site.bio}`,
    '',
    '## Profile',
    '',
    `- [Portfolio](${SITE_URL}/): About, experience, projects, skills, education, and contact`,
    `- [Resume (PDF)](${resumeLink}): Full resume`,
    '',
    '## Optional',
    '',
    ...(site.github ? [`- [GitHub](${site.github}): Open-source projects`] : []),
    ...(site.linkedin ? [`- [LinkedIn](${site.linkedin}): Professional profile`] : []),
    '',
  ];
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
