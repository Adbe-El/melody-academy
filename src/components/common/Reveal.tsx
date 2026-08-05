import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  once?: boolean;
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  y = 28,
  x = 0,
  once = true,
  className
}) => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y, x: reduce ? 0 : x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};
