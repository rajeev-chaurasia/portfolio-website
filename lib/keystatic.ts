import { cache } from 'react';
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '@/keystatic.config';
import { SKILL_CATEGORIES } from '@/lib/skill-categories';

const reader = createReader(process.cwd(), keystaticConfig);

export type Site = {
  name: string;
  tagline: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  profileImage: string | null;
  resume: string | null;
  resumeUrl: string;
};

export type ExperienceEntry = {
  slug: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string[];
  logo: string | null;
};

export type EducationEntry = {
  slug: string;
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string | null;
  grade: string;
  coursework: string[];
  logo: string | null;
};

export type SkillGroup = {
  category: string;
  label: string;
  skills: string[];
};

export type ProjectOverride = {
  slug: string;
  title: string;
  bullets: string[];
  techStack: string[];
  github: string;
  demo: string;
  order: number;
  featured: boolean;
};

const cleanStrings = (xs: readonly (string | null | undefined)[]): string[] =>
  xs.filter((x): x is string => typeof x === 'string' && x.length > 0);

const byStartDateDesc = (
  a: { startDate: string },
  b: { startDate: string }
): number => b.startDate.localeCompare(a.startDate);

export const getSite = cache(async (): Promise<Site> => {
  const site = await reader.singletons.site.read();
  if (!site) {
    throw new Error('content/site.yaml is missing — the site singleton is required.');
  }
  return {
    name: site.name,
    tagline: site.tagline ?? '',
    bio: site.bio ?? '',
    email: site.email ?? '',
    github: site.github ?? '',
    linkedin: site.linkedin ?? '',
    profileImage: site.profileImage ?? null,
    resume: site.resume ?? null,
    resumeUrl: site.resumeUrl ?? '',
  };
});

export const getExperience = cache(async (): Promise<ExperienceEntry[]> => {
  const entries = await reader.collections.experience.all();
  return entries
    .map(({ slug, entry }) => ({
      slug,
      company: entry.company,
      role: entry.role,
      location: entry.location ?? '',
      startDate: entry.startDate ?? '',
      endDate: entry.endDate ?? null,
      description: cleanStrings(entry.description),
      logo: entry.logo ?? null,
    }))
    .sort(byStartDateDesc);
});

export const getEducation = cache(async (): Promise<EducationEntry[]> => {
  const entries = await reader.collections.education.all();
  return entries
    .map(({ slug, entry }) => ({
      slug,
      institution: entry.institution,
      degree: entry.degree,
      location: entry.location ?? '',
      startDate: entry.startDate ?? '',
      endDate: entry.endDate ?? null,
      grade: entry.grade ?? '',
      coursework: cleanStrings(entry.coursework),
      logo: entry.logo ?? null,
    }))
    .sort(byStartDateDesc);
});

export const getSkills = cache(async (): Promise<SkillGroup[]> => {
  const entries = await reader.collections.skills.all();
  const skills = entries.map(({ entry }) => ({
    name: entry.name,
    category: entry.category,
    order: entry.order ?? 99,
  }));
  return SKILL_CATEGORIES.map(({ value, label }) => ({
    category: value,
    label,
    skills: skills
      .filter((s) => s.category === value)
      .sort((a, b) => a.order - b.order)
      .map((s) => s.name),
  })).filter((group) => group.skills.length > 0);
});

export const getProjectOverrides = cache(
  async (): Promise<ProjectOverride[]> => {
    const entries = await reader.collections.projects.all();
    return entries.map(({ slug, entry }) => ({
      slug,
      title: entry.title ?? '',
      bullets: cleanStrings(entry.bullets),
      techStack: cleanStrings(entry.techStack),
      github: entry.github ?? '',
      demo: entry.demo ?? '',
      order: entry.order ?? 99,
      featured: entry.featured ?? false,
    }));
  }
);
