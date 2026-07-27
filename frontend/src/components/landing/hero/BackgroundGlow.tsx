import React from 'react';

export const BackgroundGlow: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
    {/* Grid pattern */}
    <div
      className="absolute inset-0 opacity-[0.35]"
      style={{
        backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    />

    {/* Center radial glow */}
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-40 blur-3xl pointer-events-none"
      style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.25) 0%, rgba(59,130,246,0.1) 50%, transparent 70%)' }}
    />

    {/* Secondary ambient light beams */}
    <div
      className="absolute top-1/4 right-10 w-[400px] h-[400px] rounded-full opacity-25 blur-3xl pointer-events-none"
      style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)' }}
    />
    <div
      className="absolute bottom-10 left-10 w-[350px] h-[350px] rounded-full opacity-20 blur-3xl pointer-events-none"
      style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)' }}
    />

    {/* Vignette overlay */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse 85% 75% at 50% 50%, transparent 40%, rgba(255,255,255,0.85) 100%)' }}
    />
  </div>
);
