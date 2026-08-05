import React from 'react';

interface BrandArtworkProps {
  className?: string;
}

export const BrandArtwork: React.FC<BrandArtworkProps> = ({ className = '' }) => {
  return (
    <div
      className={`relative w-full h-full bg-academy-emerald-dark overflow-hidden ${className}`}
      role="img"
      aria-label="Matt-Agba Music Consult emblem — concentric sound waves, staff lines and the MA monogram"
    >
      {/* Staff lines */}
      <div className="absolute inset-0 staff-lines opacity-70" aria-hidden="true" />

      {/* Warm gold glow */}
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-academy-gold/25 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-20 -left-16 w-72 h-72 rounded-full bg-academy-emerald/60 blur-3xl" aria-hidden="true" />

      {/* Grain */}
      <div className="absolute inset-0 grain-overlay" aria-hidden="true" />

      {/* Concentric waveform rings */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        {[40, 72, 104, 136].map((r, i) => (
          <circle
            key={r}
            cx="200"
            cy="250"
            r={r}
            fill="none"
            stroke="#D4AF37"
            strokeWidth={i === 3 ? 2.5 : 1}
            strokeOpacity={0.16 + i * 0.09}
            strokeDasharray={i === 2 ? '6 8' : i === 3 ? '2 6' : undefined}
            className={i === 3 ? 'animate-spin-slow' : ''}
            style={i === 3 ? { transformOrigin: '200px 250px' } : undefined}
          />
        ))}

        {/* Radial ticks */}
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={i}
            x1="200"
            y1="136"
            x2="200"
            y2="128"
            stroke="#D4AF37"
            strokeOpacity="0.35"
            strokeWidth="1.5"
            transform={`rotate(${i * 15} 200 250)`}
          />
        ))}

        {/* Floating notes */}
        <text x="70" y="120" fontSize="26" fill="#D4AF37" fillOpacity="0.7" fontFamily="Georgia, serif">♪</text>
        <text x="300" y="170" fontSize="20" fill="#D4AF37" fillOpacity="0.5" fontFamily="Georgia, serif">♫</text>
        <text x="90" y="360" fontSize="18" fill="#D4AF37" fillOpacity="0.45" fontFamily="Georgia, serif">♩</text>
        <text x="305" y="330" fontSize="24" fill="#D4AF37" fillOpacity="0.6" fontFamily="Georgia, serif">♪</text>
      </svg>

      {/* MA monogram */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center select-none">
          <span className="block font-serif font-bold leading-none text-transparent bg-clip-text bg-gradient-to-br from-academy-gold via-[#e8c766] to-academy-gold-strong text-[8rem] sm:text-[9.5rem]" style={{ WebkitBackgroundClip: 'text' }}>
            MA
          </span>
          <span className="mt-2 block w-16 sm:w-20 h-px mx-auto bg-gradient-to-r from-transparent via-academy-gold to-transparent" aria-hidden="true" />
          <span className="mt-3 block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.34em] text-academy-gold/90">
            Matt-Agba Music Consult
          </span>
        </div>
      </div>

      {/* Bottom fade into page */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-academy-emerald-dark/80 to-transparent" aria-hidden="true" />
    </div>
  );
};
