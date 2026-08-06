import './globals.css';
import type { Metadata } from 'next';
import { DM_Sans, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { Providers } from './providers';
import { getSite } from '@/lib/keystatic';
import { SITE_URL } from '@/lib/site';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  let site;
  try {
    site = await getSite();
  } catch {
    // Never let a content-read failure take down a whole route.
    return {
      metadataBase: new URL(SITE_URL),
      title: 'Rajeev Ranjan Chaurasia',
      robots: { index: true, follow: true },
    };
  }
  const title = `${site.name} — ${site.tagline}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s · ${site.name}`,
    },
    description: site.bio,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: '/',
      siteName: site.name,
      title,
      description: site.bio,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: site.bio,
    },
    robots: { index: true, follow: true },
    alternates: { canonical: '/' },
    verification: {
      google: 'lHs2kvIZBhvzj8Jw6CCIB2i-jLCSPajqIl_jUIDq3-Y',
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans">
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
