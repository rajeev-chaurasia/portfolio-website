import type { NextConfig } from "next";

const SECTION_REDIRECTS = [
  'experience',
  'projects',
  'skills',
  'education',
  'contact',
] as const;

const nextConfig: NextConfig = {
  // The Keystatic admin routes render on demand, and the root layout's
  // metadata reads content/*.yaml at request time — make sure those files
  // are traced into the serverless bundles.
  outputFileTracingIncludes: {
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
