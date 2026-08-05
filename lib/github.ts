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

/** 'sj-hopes' → 'Sj Hopes' */
function prettifyRepoName(name: string): string {
  return name
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/** Overrides that match no fetched repo become standalone projects. */
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
  const tags =
    override && override.techStack.length > 0
      ? override.techStack
      : [
          ...new Set(
            [...topics, repo.language].filter((t): t is string => Boolean(t))
          ),
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
      fetch(REPOS_URL, {
        headers: {
          Accept: 'application/vnd.github+json',
          ...(process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {}),
        },
        next: { revalidate: 3600 },
      }),
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

    const standalone = overrides
      .filter((o) => !matchedSlugs.has(o.slug))
      .map((o) => ({ project: projectFromOverride(o), pushedAt: '' }));

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
