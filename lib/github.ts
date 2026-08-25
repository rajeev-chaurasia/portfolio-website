import { getProjectOverrides, type ProjectOverride } from '@/lib/keystatic';
import { GITHUB_USERNAME } from '@/lib/site';

export type MergedProject = {
  name: string;
  description: string[];
  tags: string[];
  stars: number;
  github: string;
  demo: string | null;
  featured: boolean;
  order: number;
};

type GitHubRepo = {
  name: string;
  description: string | null;
  topics?: string[];
  language: string | null;
  stargazers_count: number;
  homepage: string | null;
  html_url: string;
  pushed_at: string;
};

const REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`;

function apiHeaders(): HeadersInit {
  return {
    Accept: 'application/vnd.github+json',
    ...(process.env.GITHUB_TOKEN
      ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
      : {}),
  };
}

function parseRepoUrl(url: string): { owner: string; repo: string } | null {
  const match = url.match(/github\.com\/([^/]+)\/([^/#?]+)/);
  return match
    ? { owner: match[1], repo: match[2].replace(/\.git$/, '') }
    : null;
}

/** Fetch a single repo from any owner/org; null on failure (private, 404, downtime). */
async function fetchRepo(owner: string, repo: string): Promise<GitHubRepo | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: apiHeaders(),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/** Live star count for an 'owner/name' repo; null when it can't be fetched. */
export async function getRepoStars(fullName: string): Promise<number | null> {
  const [owner, repo] = fullName.split('/');
  if (!owner || !repo) return null;
  const found = await fetchRepo(owner, repo);
  return found ? found.stargazers_count : null;
}

export type PullRequestState = 'merged' | 'open' | 'closed';

const PR_URL_PATTERN = /github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/;

/**
 * Live state of a pull request, so an open PR that later merges updates itself
 * on the next revalidation instead of waiting on a content edit. Returns null
 * when the URL isn't a PR or GitHub can't be reached, and the authored status
 * in the content file stands in.
 */
export async function getPullRequestState(
  url: string
): Promise<PullRequestState | null> {
  const match = url.match(PR_URL_PATTERN);
  if (!match) return null;
  const [, owner, repo, number] = match;

  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/pulls/${number}`,
      { headers: apiHeaders(), next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const pr: { state?: string; merged?: boolean } = await res.json();
    if (pr.merged) return 'merged';
    return pr.state === 'closed' ? 'closed' : 'open';
  } catch {
    return null;
  }
}

/** 'sj-hopes' → 'Sj Hopes' */
function prettifyRepoName(name: string): string {
  return name
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/** Fallback for overrides whose repo can't be fetched (private or offline). */
function projectFromOverride(override: ProjectOverride): MergedProject {
  return {
    name: override.title || prettifyRepoName(override.slug),
    description: override.bullets,
    tags: override.techStack,
    stars: 0,
    github: override.github,
    demo: override.demo || null,
    featured: override.featured,
    order: override.order,
  };
}

function mergeRepo(
  repo: GitHubRepo,
  override: ProjectOverride | undefined
): MergedProject {
  const topics = (repo.topics ?? []).filter((t) => t !== 'portfolio');
  // GitHub lowercases topics, so a 'python' topic and a 'Python' language are
  // the same tag spelled two ways — keep the topic and drop the duplicate.
  const seen = new Set(topics.map((t) => t.toLowerCase()));
  const tags =
    override && override.techStack.length > 0
      ? override.techStack
      : [
          ...topics,
          ...(repo.language && !seen.has(repo.language.toLowerCase())
            ? [repo.language]
            : []),
        ];

  return {
    name: override?.title || prettifyRepoName(repo.name),
    description:
      override && override.bullets.length > 0
        ? override.bullets
        : repo.description
          ? [repo.description]
          : [],
    tags,
    stars: repo.stargazers_count,
    github: override?.github || repo.html_url,
    demo: override?.demo || repo.homepage || null,
    featured: override?.featured ?? false,
    order: override ? override.order : 99,
  };
}

function sortProjects(
  entries: { project: MergedProject; pushedAt: string }[]
): MergedProject[] {
  return entries
    .sort((a, b) => {
      if (a.project.featured !== b.project.featured) {
        return a.project.featured ? -1 : 1;
      }
      if (a.project.order !== b.project.order) {
        return a.project.order - b.project.order;
      }
      return b.pushedAt.localeCompare(a.pushedAt);
    })
    .map((entry) => entry.project);
}

export async function getProjects(): Promise<MergedProject[]> {
  const overridesPromise = getProjectOverrides();

  try {
    const [overrides, res] = await Promise.all([
      overridesPromise,
      fetch(REPOS_URL, { headers: apiHeaders(), next: { revalidate: 3600 } }),
    ]);

    if (!res.ok) {
      throw new Error(`GitHub API responded with ${res.status}`);
    }

    const repos: GitHubRepo[] = await res.json();
    const portfolioRepos = repos.filter((repo) =>
      (repo.topics ?? []).includes('portfolio')
    );

    const matchedSlugs = new Set<string>();
    const merged = portfolioRepos.map((repo) => {
      const override = overrides.find((o) => o.slug === repo.name);
      if (override) {
        matchedSlugs.add(override.slug);
      }
      return {
        project: mergeRepo(repo, override),
        pushedAt: repo.pushed_at ?? '',
      };
    });

    // Overrides that match none of the user's repos point at repos in other
    // accounts/orgs — fetch each one directly so they get live data too.
    const standalone = await Promise.all(
      overrides
        .filter((o) => !matchedSlugs.has(o.slug))
        .map(async (o) => {
          const parsed = o.github ? parseRepoUrl(o.github) : null;
          const repo = parsed
            ? await fetchRepo(parsed.owner, parsed.repo)
            : null;
          return repo
            ? { project: mergeRepo(repo, o), pushedAt: repo.pushed_at ?? '' }
            : { project: projectFromOverride(o), pushedAt: '' };
        })
    );

    return sortProjects([...merged, ...standalone]);
  } catch (error) {
    // Never crash the page on GitHub downtime — fall back to override-derived
    // projects only (Next's fetch cache also serves stale data when possible).
    console.error('Failed to fetch projects from GitHub:', error);
    const overrides = await overridesPromise;
    return sortProjects(
      overrides.map((o) => ({ project: projectFromOverride(o), pushedAt: '' }))
    );
  }
}
