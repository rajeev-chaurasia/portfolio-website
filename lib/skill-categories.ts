// Leaf module: imported by both keystatic.config.ts and lib/keystatic.ts,
// so it must stay free of React and Keystatic imports.
export const SKILL_CATEGORIES = [
  { value: 'languages', label: 'Languages' },
  { value: 'ai-llm', label: 'AI & LLM Engineering' },
  { value: 'devinfra', label: 'Developer Infrastructure & CI/CD' },
  { value: 'backend', label: 'Backend & Distributed Systems' },
  { value: 'cloud', label: 'Cloud & Databases' },
  { value: 'fullstack', label: 'Full-Stack & Integrations' },
  { value: 'foundations', label: 'Foundations & Practices' },
] as const;

export type SkillCategoryValue = (typeof SKILL_CATEGORIES)[number]['value'];
