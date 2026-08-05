import type { NextConfig } from "next";

const SECTION_REDIRECTS = [
  'experience',
  'projects',
  'skills',
  'education',
  'contact',
] as const;

const nextConfig: NextConfig = {
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
