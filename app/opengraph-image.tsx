import { ImageResponse } from 'next/og';
import { getSite } from '@/lib/keystatic';

// next/og renders off-DOM and cannot read CSS variables, so raw colors are
// intentional here (mirrors the site's dark theme tokens).
export const alt = 'Rajeev Ranjan Chaurasia — Software Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const site = await getSite();
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 96px',
          backgroundColor: '#0B1120',
        }}
      >
        <div
          style={{
            width: 96,
            height: 6,
            backgroundColor: '#5EEAD4',
            borderRadius: 3,
            marginBottom: 40,
          }}
        />
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: '#E2E8F0',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 36,
            color: '#94A3B8',
          }}
        >
          {site.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
