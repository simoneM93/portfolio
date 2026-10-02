import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Simone Marano - Full-Stack Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: 'white',
          padding: '60px',
        }}
      >
        <p style={{ fontSize: 28, color: '#888', margin: '0 0 12px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Full-Stack Developer
        </p>
        <h1 style={{ fontSize: 80, fontWeight: 700, margin: '0 0 20px', background: 'linear-gradient(90deg, #e2e8f0, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Simone Marano
        </h1>
        <p style={{ fontSize: 26, color: '#64748b', margin: '0 0 40px', textAlign: 'center' }}>
          Next.js · TypeScript · .NET Core · MuleSoft
        </p>
        <p style={{ fontSize: 20, color: '#475569', letterSpacing: '0.05em' }}>
          portfolio.simonemarano.com
        </p>
      </div>
    ),
    { ...size }
  );
}
