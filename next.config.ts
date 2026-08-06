import type { NextConfig } from "next";

const SECTION_REDIRECTS = [
  'experience',
  'projects',
  'skills',
  'education',
  'contact',
] as const;

const nextConfig: NextConfig = {
  // The Keystatic reader loads content/*.yaml with dynamic fs reads that
  // static tracing can't see, and every server-rendered route needs them
  // (the home page re-renders on ISR revalidation and cache-bypassing
  // crawls, not just at build). Trace them into all route bundles.
  outputFileTracingIncludes: {
    '/**': ['./content/**/*'],
    '/': ['./content/**/*'],
    '/keystatic/[[...params]]': ['./content/**/*'],
    '/api/keystatic/[...params]': ['./content/**/*'],
  },
  async redirects() {
    return [
      ...SECTION_REDIRECTS.map((id) => ({
        source: `/${id}`,
        destination: `/#${id}`,
        permanent: true,
      })),
      {
        source: '/resume',
        destination: '/files/resume.pdf',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
