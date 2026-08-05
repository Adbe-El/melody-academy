import React, { useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 12,
  onClick,
  type = 'button'
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    ref.current.style.transform = `translate(${(x / rect.width) * strength}px, ${(y / rect.height) * strength}px)`;
  };

  const handleLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0, 0)';
  };

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </button>
  );
};
