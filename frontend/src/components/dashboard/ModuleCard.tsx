import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { AppModule } from '../../constants/modules';

/* ── Progress Ring ─────────────────────────────────────────── */
const ProgressRing: React.FC<{ progress: number; size?: number }> = ({ progress, size = 36 }) => {
  const radius = (size - 6) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;
  return (
    <svg width={size} height={size} className="shrink-0 -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e2e8f0" strokeWidth="3" />
      <motion.circle
        cx={size / 2} cy={size / 2} r={radius} fill="none"
        stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
      />
    </svg>
  );
};

/* ── Badge Pill ────────────────────────────────────────────── */
const BadgePill: React.FC<{ label: string }> = ({ label }) => {
  const colorMap: Record<string, string> = {
    AI:     'bg-blue-50 text-blue-600 border-blue-200',
    Course: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    Soon:   'bg-slate-100 text-slate-400 border-slate-200',
    New:    'bg-emerald-50 text-emerald-600 border-emerald-200',
  };
  const cls = colorMap[label] ?? 'bg-slate-100 text-slate-500 border-slate-200';
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${cls}`}>
      {label}
    </span>
  );
};

/* ── Module Card ───────────────────────────────────────────── */
interface ModuleCardProps extends AppModule {
  progress?: number;
  delay?: number;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  title, description, icon: Icon, route, iconBg, badge, activity, progress, delay = 0,
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
      onClick={() => navigate(route)}
      className="group relative cursor-pointer"
    >
      <div
        className={`
          relative rounded-2xl bg-white border border-slate-200
          group-hover:border-blue-300 group-hover:shadow-lg group-hover:shadow-blue-100/60
          transition-all duration-300 overflow-hidden
          shadow-sm
          p-6 flex flex-col h-full min-h-[200px]
        `}
      >
        {/* Subtle top gradient tint */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${iconBg} opacity-[0.07] rounded-bl-full pointer-events-none`} />

        {/* Header row */}
        <div className="flex items-start justify-between mb-4 relative">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${iconBg} flex items-center justify-center shadow-md`}>
            <Icon className="w-6 h-6 text-white" strokeWidth={1.75} />
          </div>
          {badge && <BadgePill label={badge} />}
          {progress !== undefined && !badge && <ProgressRing progress={progress} />}
        </div>

        {/* Content */}
        <div className="flex-1 relative space-y-1.5">
          <h3 className="text-[15px] font-bold text-slate-800 leading-snug">{title}</h3>
          <p className="text-[13px] text-slate-500 leading-relaxed font-medium">{description}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-5 relative">
          {activity && (
            <span className="text-[11px] text-slate-400 font-medium truncate max-w-[75%]">{activity}</span>
          )}
          <motion.div
            className="ml-auto w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-blue-600 flex items-center justify-center transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
