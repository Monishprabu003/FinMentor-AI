import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Zap, Award, BookOpen, Target, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { MOCK_USER_STATS } from '../../constants/learningData';

export const LearningHero: React.FC = () => {
  const { user } = useAuth();
  const name = user?.full_name?.split(' ')[0] || 'Monish';

  const goalPercentage = Math.min(
    100,
    Math.round((MOCK_USER_STATS.todayCompletedMinutes / MOCK_USER_STATS.todayGoalMinutes) * 100)
  );

  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 md:p-8 shadow-xl overflow-hidden mb-8">
      {/* Background Glow Overlay */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* Left Column: Greeting & Status */}
        <div className="lg:col-span-2 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Financial Mastery Journey</span>
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
            Welcome back, <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-pink-300 bg-clip-text text-transparent">{name}</span> 👋
          </h1>
          <p className="text-sm md:text-base text-slate-300 font-medium leading-relaxed max-w-xl">
            Become financially smarter every day. Continue building your path toward true financial independence and wealth creation.
          </p>

          {/* KPI Pills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Level</div>
              <div className="text-lg font-black text-white flex items-center gap-1 mt-0.5">
                <Award className="w-4 h-4 text-blue-400" />
                <span>Lvl {MOCK_USER_STATS.level}</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Total XP</div>
              <div className="text-lg font-black text-amber-300 flex items-center gap-1 mt-0.5">
                <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>{MOCK_USER_STATS.currentXp}</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Streak</div>
              <div className="text-lg font-black text-orange-400 flex items-center gap-1 mt-0.5">
                <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
                <span>{MOCK_USER_STATS.streakDays} Days</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Completed</div>
              <div className="text-lg font-black text-emerald-400 flex items-center gap-1 mt-0.5">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>{MOCK_USER_STATS.coursesCompleted} Courses</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Animated Today's Goal Ring Card */}
        <div className="p-6 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md text-center space-y-3 flex flex-col items-center justify-center">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-300">
            <Target className="w-4 h-4 text-blue-400" />
            <span>Today's Goal Tracker</span>
          </div>

          {/* SVG Progress Circle */}
          <div className="relative w-28 h-28 my-1 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <motion.path
                className="text-blue-400"
                strokeWidth="3.5"
                strokeDasharray={`${goalPercentage}, 100`}
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                initial={{ strokeDasharray: '0, 100' }}
                animate={{ strokeDasharray: `${goalPercentage}, 100` }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-black text-white">{goalPercentage}%</span>
              <span className="text-[10px] text-slate-300 font-semibold">
                {MOCK_USER_STATS.todayCompletedMinutes}/{MOCK_USER_STATS.todayGoalMinutes} min
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-300 font-medium">
            10 mins remaining to hit today's 30-min goal!
          </p>
        </div>
      </div>
    </div>
  );
};
