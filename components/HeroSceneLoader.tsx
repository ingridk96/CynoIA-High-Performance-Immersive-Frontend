'use client';

import dynamic from 'next/dynamic';

function GoldenLoader() {
  return (
    <div
      className="fixed inset-0 -z-10 flex items-end justify-center pb-8 pointer-events-none"
      aria-hidden="true"
    >
      {/* Dark bg matching the scene */}
      <div className="absolute inset-0" style={{ background: '#050A18' }} />

      {/* Centered subtle orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(138,43,226,0.18) 0%, rgba(138,43,226,0.06) 50%, transparent 70%)',
          animation: 'pulse-glow 2s ease-in-out infinite',
        }}
      />

      {/* Golden progress bar at the bottom */}
      <div className="relative w-48 h-[2px] rounded-full overflow-hidden"
           style={{ background: 'rgba(212,175,55,0.15)' }}>
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: 'linear-gradient(90deg, #8A2BE2, #D4AF37, #B44FFF)',
            animation: 'golden-load 1.6s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  );
}

const HeroScene = dynamic(() => import('@/components/HeroScene'), {
  ssr: false,
  loading: () => <GoldenLoader />,
});

export default function HeroSceneLoader() {
  return <HeroScene />;
}
