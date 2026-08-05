import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  dark?: boolean;
  autoAdvance?: boolean;
  interval?: number;
  className?: string;
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  dark = false,
  autoAdvance = true,
  interval = 6000,
  className = ''
}) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const next = useCallback(() => {
    setIndex(prev => (prev + 1) % testimonials.length);
    setProgress(0);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
    setProgress(0);
  }, [testimonials.length]);

  useEffect(() => {
    if (!autoAdvance || paused || testimonials.length < 2) return;
    const stepMs = 50;
    const inc = (stepMs / interval) * 100;
    const timer = setInterval(() => {
      setProgress(p => {
        if (p + inc >= 100) {
          next();
          return 0;
        }
        return p + inc;
      });
    }, stepMs);
    return () => clearInterval(timer);
  }, [autoAdvance, paused, interval, next, testimonials.length]);

  if (testimonials.length === 0) return null;

  const t = testimonials[index];

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.figure
          key={index}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          drag={testimonials.length > 1 ? 'x' : undefined}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.4}
          onDragEnd={(_, info) => {
            if (info.offset.x < -80) next();
            else if (info.offset.x > 80) prev();
          }}
          className="cursor-grab active:cursor-grabbing"
        >
          <Quote
            className={`w-10 h-10 mb-5 ${dark ? 'text-academy-gold' : 'text-academy-emerald'}`}
            fill="currentColor"
            aria-hidden="true"
          />
          <blockquote
            className={`font-serif text-xl sm:text-2xl lg:text-[1.7rem] leading-relaxed italic ${
              dark ? 'text-gray-100' : 'text-academy-charcoal'
            }`}
          >
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-4">
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center font-bold ${
                dark ? 'bg-academy-gold text-academy-emerald-dark' : 'bg-academy-sage text-academy-emerald'
              }`}
            >
              {t.name.charAt(0)}
            </div>
            <div className="text-left">
              <p className={`font-bold text-sm ${dark ? 'text-white' : 'text-academy-charcoal'}`}>{t.name}</p>
              <p className={`text-xs ${dark ? 'text-academy-gold' : 'text-academy-emerald'}`}>{t.role}</p>
            </div>
          </figcaption>
        </motion.figure>
      </AnimatePresence>

      {testimonials.length > 1 && (
        <div className="mt-8">
          <div className="flex items-center justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIndex(i);
                  setProgress(0);
                }}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index
                    ? 'bg-academy-gold w-8'
                    : dark
                      ? 'bg-white/25 w-4 hover:bg-white/50'
                      : 'bg-gray-300 w-4 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
          {autoAdvance && testimonials.length > 1 && (
            <div
              className={`mt-4 h-0.5 rounded-full overflow-hidden ${dark ? 'bg-white/15' : 'bg-gray-200'}`}
            >
              <div
                className="h-full bg-academy-gold rounded-full transition-none"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
