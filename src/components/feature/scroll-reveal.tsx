
'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  xOffset?: number;
  yOffset?: number;
  once?: boolean;
  amount?: number;
  as?: React.ElementType;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  xOffset = 0,
  yOffset = 20,
  once = true,
  amount = 0.1,
  as = 'div',
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });
  const MotionComponent = motion(as);

  const variants: Variants = {
    hidden: { opacity: 0, y: yOffset, x: xOffset },
    visible: { opacity: 1, y: 0, x: 0 },
  };

  return (
    <MotionComponent
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </MotionComponent>
  );
}
