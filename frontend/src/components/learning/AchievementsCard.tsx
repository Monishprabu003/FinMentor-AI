import React from 'react';
import { motion } from 'framer-motion';
import { Award, Flame, PieChart, FileCheck, Zap, Lock } from 'lucide-react';
import { USER_BADGES } from '../../constants/learningData';

const BADGE_ICONS: Record<string, React.FC<{ className?: string }>> = {
  Award,
  Flame,
  PieChart,
  FileCheck,
  Zap,
};

export const AchievementsCard: React.FC = () => {
  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-black text-slate-900 tracking-tight">
            Achievements & Unlocked Badges
          </h3>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">
            Collect badges by hitting streaks, finishing learning paths, and acing quizzes.
          </p>
        </div>
        <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
          3 Unlocked
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {USER_BADGES.map((badge) => {
          const IconComponent = BADGE_ICONS[badge.iconName] || Award;

          return (
            <motion.div
              key={badge.id}
              whileHover={{ y: -3 }}
              className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-between transition-all ${
                badge.unlocked
                  ? 'bg-gradient-to-b from-amber-50/70 to-orange-50/40 border-amber-200 shadow-xs'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2 shadow-xs ${
                  badge.unlocked
                    ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white'
                    : 'bg-slate-200 text-slate-400'
                }`}
              >
                {badge.unlocked ? (
                  <IconComponent className="w-6 h-6" />
                ) : (
                  <Lock className="w-5 h-5" />
                )}
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-black text-slate-900 leading-snug">{badge.name}</h4>
                <p className="text-[10.5px] text-slate-500 font-medium leading-tight line-clamp-2">
                  {badge.description}
                </p>
              </div>

              {badge.unlocked && badge.unlockedDate && (
                <span className="text-[9.5px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full mt-2">
                  {badge.unlockedDate}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
