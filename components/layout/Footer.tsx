import type { Site } from '@/lib/keystatic';

export default function Footer({ site }: { site: Site }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-content items-center justify-center px-6 md:px-10">
        <p className="font-mono text-xs text-subtle">
          &copy;&nbsp;{year} {site.name}
        </p>
      </div>
    </footer>
  );
}
