import React from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, Wallet, CreditCard, BarChart3, Coins, DollarSign } from 'lucide-react';

const ICONS = [
  { Icon: IndianRupee, x: '8%',  y: '14%', size: 22, delay: 0,   duration: 8,  rotate: 15 },
  { Icon: Wallet,      x: '86%', y: '12%', size: 20, delay: 1,   duration: 10, rotate: -12 },
  { Icon: CreditCard,  x: '90%', y: '78%', size: 22, delay: 0.5, duration: 9,  rotate: 20 },
  { Icon: BarChart3,   x: '6%',  y: '80%', size: 20, delay: 1.5, duration: 11, rotate: -18 },
  { Icon: Coins,       x: '78%', y: '48%', size: 18, delay: 2,   duration: 8.5,rotate: 10 },
  { Icon: DollarSign,  x: '14%', y: '46%', size: 18, delay: 2.5, duration: 9.5,rotate: -10 },
];

export const FloatingIcon: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
    {ICONS.map((item, i) => {
      const { Icon, x, y, size, delay, duration, rotate } = item;
      return (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: x, top: y }}
          animate={{
            y: [0, -16, 8, -20, 0],
            x: [0, 10, -6, 12, 0],
            rotate: [0, rotate, -rotate * 0.5, rotate * 0.8, 0],
            scale: [1, 1.1, 0.95, 1.12, 1],
          }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="w-10 h-10 rounded-2xl bg-blue-50/60 border border-blue-100/60 flex items-center justify-center shadow-sm opacity-35 backdrop-blur-[2px]">
            <Icon style={{ width: size, height: size }} className="text-blue-600" strokeWidth={1.8} />
          </div>
        </motion.div>
      );
    })}
  </div>
);
