import React from 'react';
import { motion } from 'framer-motion';
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: `${6 + Math.random() * 88}%`,
    y: `${6 + Math.random() * 88}%`,
    size: 2.5 + Math.random() * 3.5,
    duration: 4 + Math.random() * 6,
    delay: Math.random() * 4,
    opacity: 0.2 + Math.random() * 0.35,
}));
export const ParticleLayer = () => (<div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
    {PARTICLES.map((p) => (<motion.div key={p.id} className="absolute rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
        }} animate={{
            y: [0, -25, 0],
            opacity: [0, p.opacity, 0],
            scale: [0.8, 1.3, 0.8],
        }} transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
        }}/>))}
  </div>);
