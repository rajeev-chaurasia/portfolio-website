import { config, collection, singleton, fields } from '@keystatic/core';
import { SKILL_CATEGORIES } from './lib/skill-categories';

export default config({
  storage:
    process.env.NODE_ENV === 'development'
      ? { kind: 'local' }
      : { kind: 'github', repo: 'rajeev-chaurasia/portfolio-website' },

  ui: {
    brand: { name: 'Portfolio CMS' },
  },

  singletons: {
    site: singleton({
      label: 'Site Settings',
      path: 'content/site',
      format: { data: 'yaml' },
      schema: {
        name: fields.text({
          label: 'Full name',
          validation: { isRequired: true },
        }),
        tagline: fields.text({ label: 'Headline / role' }),
        bio: fields.text({ label: 'Bio', multiline: true }),
        email: fields.text({ label: 'Contact email' }),
        github: fields.url({ label: 'GitHub URL' }),
        linkedin: fields.url({ label: 'LinkedIn URL' }),
        profileImage: fields.image({
          label: 'Profile photo',
          directory: 'public/images',
          publicPath: '/images/',
        }),
        resume: fields.file({
          label: 'Resume (PDF upload)',
          directory: 'public/files',
          publicPath: '/files/',
        }),
        resumeUrl: fields.url({
          label: 'Resume URL',
          description:
            'Optional external link (e.g. Google Drive). Takes precedence over the uploaded PDF — handy for swapping the resume without a deploy.',
        }),
      },
    }),
  },

  collections: {
    projects: collection({
      label: 'Project Overrides',
      slugField: 'repo',
      path: 'content/projects/*',
      format: { data: 'yaml' },
      schema: {
        repo: fields.slug({
          name: {
            label: 'GitHub repo name',
            description:
              'Must match the repository name exactly to enrich a GitHub-sourced project. Entries that match no repo become standalone projects (set their GitHub URL below).',
          },
        }),
        title: fields.text({
          label: 'Display title',
          description: 'Optional — defaults to the prettified repo name.',
        }),
        bullets: fields.array(
          fields.text({ label: 'Bullet', multiline: true }),
          {
            label: 'Description bullets',
            itemLabel: (props) => props.value ?? '',
          }
        ),
        techStack: fields.array(fields.text({ label: 'Technology' }), {
          label: 'Tech stack',
          itemLabel: (props) => props.value ?? '',
        }),
        github: fields.url({
          label: 'GitHub URL',
          description: 'Only needed for standalone projects hosted outside your account.',
        }),
        demo: fields.url({ label: 'Demo URL' }),
        hideDemo: fields.checkbox({
          label: 'Hide demo link',
          description:
            "Suppresses the repo's GitHub homepage — use when that deploy is dead.",
          defaultValue: false,
        }),
        order: fields.integer({ label: 'Display order', defaultValue: 99 }),
        featured: fields.checkbox({
          label: 'Featured (full-width card)',
          defaultValue: false,
        }),
      },
    }),

    experience: collection({
      label: 'Experience',
      slugField: 'company',
      path: 'content/experience/*',
      format: { data: 'yaml' },
      schema: {
        company: fields.slug({ name: { label: 'Company' } }),
        role: fields.text({
          label: 'Role',
          validation: { isRequired: true },
        }),
        location: fields.text({ label: 'Location' }),
        startDate: fields.date({
          label: 'Start date',
          validation: { isRequired: true },
        }),
        endDate: fields.date({
          label: 'End date',
          description: 'Leave empty for “Present”.',
        }),
        description: fields.array(
          fields.text({ label: 'Bullet', multiline: true }),
          {
            label: 'Highlights',
            itemLabel: (props) => props.value ?? '',
          }
        ),
        logo: fields.image({
          label: 'Company logo',
          directory: 'public/images/logos',
          publicPath: '/images/logos/',
        }),
      },
    }),

    education: collection({
      label: 'Education',
      slugField: 'institution',
      path: 'content/education/*',
      format: { data: 'yaml' },
      schema: {
        institution: fields.slug({ name: { label: 'Institution' } }),
        degree: fields.text({
          label: 'Degree',
          validation: { isRequired: true },
        }),
        location: fields.text({ label: 'Location' }),
        startDate: fields.date({
          label: 'Start date',
          validation: { isRequired: true },
        }),
        endDate: fields.date({
          label: 'End date',
          description: 'Leave empty for “Present”.',
        }),
        grade: fields.text({ label: 'CGPA / Grade' }),
        coursework: fields.array(fields.text({ label: 'Course' }), {
          label: 'Relevant coursework',
          itemLabel: (props) => props.value ?? '',
        }),
        logo: fields.image({
          label: 'Institution logo',
          directory: 'public/images/logos',
          publicPath: '/images/logos/',
        }),
      },
    }),

    skills: collection({
      label: 'Skills',
      slugField: 'name',
      path: 'content/skills/*',
      format: { data: 'yaml' },
      schema: {
        name: fields.slug({ name: { label: 'Skill' } }),
        category: fields.select({
          label: 'Category',
          options: SKILL_CATEGORIES.map(({ label, value }) => ({ label, value })),
          defaultValue: 'languages',
        }),
        order: fields.integer({
          label: 'Order within category',
          defaultValue: 99,
        }),
      },
    }),

    contributions: collection({
      label: 'Open Source Contributions',
      slugField: 'project',
      path: 'content/contributions/*',
      format: { data: 'yaml' },
      schema: {
        project: fields.slug({ name: { label: 'Project' } }),
        org: fields.text({ label: 'Owning org / company' }),
        repo: fields.text({
          label: 'GitHub repo (owner/name)',
          description:
            'Used to pull the live star count. Leave empty to hide stars.',
        }),
        url: fields.url({ label: 'Project URL' }),
        tagline: fields.text({ label: 'What the project is', multiline: true }),
        summary: fields.text({ label: 'What I contributed', multiline: true }),
        techStack: fields.array(fields.text({ label: 'Technology' }), {
          label: 'Tech stack',
          itemLabel: (props) => props.value ?? '',
        }),
        prsUrl: fields.url({ label: 'Link to all my PRs' }),
        items: fields.array(
          fields.object({
            title: fields.text({
              label: 'Title',
              validation: { isRequired: true },
            }),
            url: fields.url({ label: 'Pull request URL' }),
            status: fields.select({
              label: 'Status (fallback)',
              description:
                'The live state is read from GitHub hourly and wins. This only shows if the API is unreachable.',
              options: [
                { label: 'Merged', value: 'merged' },
                { label: 'In review', value: 'open' },
              ],
              defaultValue: 'open',
            }),
            detail: fields.text({ label: 'What it does', multiline: true }),
          }),
          {
            label: 'Pull requests',
            itemLabel: (props) => props.fields.title.value,
          }
        ),
        order: fields.integer({ label: 'Display order', defaultValue: 99 }),
      },
    }),

    credentials: collection({
      label: 'Certifications & Awards',
      slugField: 'title',
      path: 'content/credentials/*',
      format: { data: 'yaml' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        kind: fields.select({
          label: 'Kind',
          options: [
            { label: 'Certification', value: 'certification' },
            { label: 'Award', value: 'award' },
          ],
          defaultValue: 'certification',
        }),
        issuer: fields.text({
          label: 'Issuer / event',
          description: 'e.g. “NVIDIA” or “SJHacks 2025”.',
        }),
        issuedDate: fields.date({ label: 'Issued' }),
        expiryDate: fields.date({
          label: 'Expires',
          description: 'Leave empty if it does not expire.',
        }),
        summary: fields.text({ label: 'Summary', multiline: true }),
        url: fields.url({ label: 'Verification / project URL' }),
        skills: fields.array(fields.text({ label: 'Skill' }), {
          label: 'Validated skills',
          itemLabel: (props) => props.value ?? '',
        }),
        order: fields.integer({ label: 'Display order', defaultValue: 99 }),
      },
    }),
  },
});
