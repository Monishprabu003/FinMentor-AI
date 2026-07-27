import React from 'react';
import { motion } from 'framer-motion';
export const OrbitRing = ({ radius, duration = 30, reverse = false, nodes = [], borderDash = 'none', opacity = 0.35, }) => {
    const size = radius * 2;
    return (<div className="absolute top-1/2 left-1/2 pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/30" style={{
            width: size,
            height: size,
            borderStyle: borderDash === 'dashed' ? 'dashed' : 'solid',
            opacity,
        }}>
      {/* Rotating node ring wrapper */}
      <motion.div className="absolute inset-0 w-full h-full rounded-full" animate={{ rotate: reverse ? -360 : 360 }} transition={{ duration, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: 'center center' }}>
        {nodes.map((node, i) => {
            const rad = (node.angle * Math.PI) / 180;
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;
            const color = node.color || '#3b82f6';
            return (<div key={i} className="absolute" style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                }}>
              {/* Glowing node */}
              <div className="relative flex items-center justify-center">
                <span className="w-3 h-3 rounded-full shadow-lg animate-pulse" style={{
                    backgroundColor: color,
                    boxShadow: `0 0 12px ${color}, 0 0 20px ${color}`,
                }}/>
                {/* Micro aura */}
                <span className="absolute w-5 h-5 rounded-full opacity-40 animate-ping" style={{ backgroundColor: color }}/>
              </div>
            </div>);
        })}
      </motion.div>
    </div>);
};
