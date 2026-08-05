import React from 'react';

interface AffiliationTickerProps {
  items: string[];
  className?: string;
}

export const AffiliationTicker: React.FC<AffiliationTickerProps> = ({ items, className = '' }) => {
  const doubled = [...items, ...items];

  return (
    <div className={`overflow-hidden marquee-pause ${className}`} aria-hidden="true">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-8 px-8">
            <span className="text-base sm:text-lg font-serif italic text-academy-muted/80 tracking-wide">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-academy-gold/70" />
          </span>
        ))}
      </div>
    </div>
  );
};
