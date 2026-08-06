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
  },
});
