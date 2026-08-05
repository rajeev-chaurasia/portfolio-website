import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getSite } from '@/lib/keystatic';
import { RESUME_FALLBACK } from '@/lib/site';

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await getSite();
  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-foreground"
      >
        Skip to content
      </a>
      <Header resumeHref={site.resume ?? RESUME_FALLBACK} />
      {children}
      <Footer site={site} />
    </>
  );
}
