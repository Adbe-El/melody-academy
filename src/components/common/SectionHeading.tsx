import React from 'react';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: 'center' | 'left';
  dark?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  dark = false,
  className = ''
}) => {
  const alignCls = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <Reveal className={`flex flex-col gap-4 ${alignCls} ${className}`}>
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.18em] ${
            dark
              ? 'bg-white/10 text-academy-gold border border-white/15'
              : 'bg-academy-sage text-academy-emerald'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${dark ? 'bg-academy-gold' : 'bg-academy-emerald'}`} />
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-serif text-3xl sm:text-4xl xl:text-5xl font-bold tracking-tight leading-[1.15] ${
          dark ? 'text-white' : 'text-academy-charcoal'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base sm:text-lg leading-relaxed max-w-2xl ${dark ? 'text-gray-300' : 'text-academy-muted'}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
};
