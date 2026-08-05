import React from 'react';

interface WaveformProps {
  bars?: number;
  dark?: boolean;
  className?: string;
}

const BAR_DELAYS = [0, 0.3, 0.6, 0.15, 0.45, 0.75, 0.2, 0.5, 0.8, 0.1, 0.4, 0.7, 0.25, 0.55, 0.85, 0.05, 0.35, 0.65];

export const Waveform: React.FC<WaveformProps> = ({ bars = 18, dark = false, className = '' }) => {
  return (
    <div className={`flex items-end gap-[3px] h-10 ${className}`} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className={`w-[3px] rounded-full eq-bar ${dark ? 'bg-academy-gold' : 'bg-academy-emerald'}`}
          style={{
            height: `${25 + ((i * 37) % 75)}%`,
            animationDelay: `${BAR_DELAYS[i % BAR_DELAYS.length]}s`
          }}
        />
      ))}
    </div>
  );
};
