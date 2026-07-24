import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'gold' | 'red' | 'gray' | 'green';
  size?: 'sm' | 'md';
}

const variants = {
  emerald: 'bg-academy-sage text-academy-emerald',
  gold: 'bg-amber-50 text-amber-700',
  red: 'bg-red-50 text-red-700',
  gray: 'bg-gray-100 text-gray-600',
  green: 'bg-green-50 text-green-700',
};

const sizes = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-3 py-1 text-xs',
};

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'gray', size = 'sm' }) => {
  return (
    <span className={`inline-flex items-center font-bold uppercase tracking-wider rounded-full ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
};
