import React, { useMemo } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Calendar, Target, Sparkles, Flame } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function getFormattedDate(): string {
  return new Date().toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
}

function getFirstName(fullName?: string): string {
  if (!fullName) return 'there';
  return fullName.split(' ')[0];
}

const FOCUS_ITEMS = [
  { icon: Target, label: 'Finish "Budgeting Basics"', color: 'text-blue-500' },
  { icon: Flame, label: "Complete today's challenge", color: 'text-orange-500' },
  { icon: Sparkles, label: 'Review AI recommendation', color: 'text-violet-500' },
];

export const WorkspaceHeader: React.FC = () => {
  const { user } = useAuth();
  const greeting = useMemo(getGreeting, []);
  const firstName = useMemo(() => getFirstName(user?.full_name), [user?.full_name]);
  const dateStr = useMemo(getFormattedDate, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
      {/* Date */}
      <motion.div variants={itemVariants} className="flex items-center gap-2">
        <Calendar className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-xs font-semibold text-slate-400 tracking-wide">{dateStr}</span>
      </motion.div>

      {/* Greeting */}
      <motion.div variants={itemVariants} className="space-y-1">
        <p className="text-sm font-semibold text-slate-500">{greeting} 👋</p>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
          Welcome back,{' '}
          <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-pink-500 bg-clip-text text-transparent">
            {firstName}
          </span>
        </h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Continue building your financial future. Your workspace is ready.
        </p>
      </motion.div>

      {/* Focus pills */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-2 pt-1">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest self-center mr-1">
          Today's Focus
        </span>
        {FOCUS_ITEMS.map(({ icon: Icon, label, color }) => (
          <motion.button
            key={label}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 shadow-sm transition-all duration-200 cursor-default"
          >
            <Icon className={`w-3 h-3 ${color}`} />
            <span className="text-[12px] font-semibold text-slate-600">{label}</span>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
};
