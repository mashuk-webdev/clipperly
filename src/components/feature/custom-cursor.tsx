
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Use modern method to detect touch devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(isTouch);

    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsHovering(
        !!target.closest(
          'a, button, [role="button"], input, textarea, select, [data-interactive]'
        )
      );
    };
    
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (isTouchDevice) {
    return null; // Don't render the custom cursor on touch devices
  }

  const cursorVariants = {
    default: {
      height: 32,
      width: 32,
      borderWidth: '2px',
      borderColor: '#ffffff', // Use white for blend mode
      backgroundColor: 'transparent',
      x: position.x - 16,
      y: position.y - 16,
      scale: 1,
    },
    hovering: {
      height: 60,
      width: 60,
      borderWidth: '0px',
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Use semi-transparent white for blend mode
      x: position.x - 30,
      y: position.y - 30,
    },
    clicking: {
      height: 50,
      width: 50,
      borderWidth: '0px',
      backgroundColor: 'rgba(255, 255, 255, 1)', // Use solid white for blend mode
      x: position.x - 25,
      y: position.y - 25,
      scale: 0.9,
    },
  };

  const dotTransition = { type: 'spring', stiffness: 700, damping: 30 };
  const circleTransition = { type: 'spring', stiffness: 300, damping: 20 };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-white pointer-events-none mix-blend-difference"
        style={{ x: position.x - 4, y: position.y - 4 }}
        transition={dotTransition}
        animate={{ scale: isHovering || isClicking ? 0 : 1, opacity: isHovering || isClicking ? 0 : 1 }}
      />
      <motion.div
        className="fixed top-0 left-0 z-[9999] rounded-full pointer-events-none mix-blend-difference"
        variants={cursorVariants}
        animate={isClicking ? 'clicking' : isHovering ? 'hovering' : 'default'}
        transition={circleTransition}
      />
    </>
  );
}
