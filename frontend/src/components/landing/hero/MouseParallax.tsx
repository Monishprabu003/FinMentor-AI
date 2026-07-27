import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const MouseParallax: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Fluid spring physics
  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 22 });

  // Use numbers instead of strings for Framer Motion rotate properties
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex items-center justify-center cursor-pointer select-none ${className}`}
      style={{ perspective: 1100 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {children}
      </motion.div>
    </div>
  );
};
