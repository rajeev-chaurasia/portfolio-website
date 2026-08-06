export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rajeev-chaurasia.vercel.app';

export const RESUME_FALLBACK = '/files/resume.pdf';

/** External URL wins, then the CMS-uploaded PDF, then the repo fallback. */
export function resumeHref(site: {
  resumeUrl: string;
  resume: string | null;
}): string {
  return site.resumeUrl || site.resume || RESUME_FALLBACK;
}

export const GITHUB_USERNAME = 'rajeev-chaurasia';
