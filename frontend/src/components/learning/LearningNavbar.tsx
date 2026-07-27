import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Flame, Zap, Award, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_USER_STATS } from '../../constants/learningData';

interface LearningNavbarProps {
  onSearch?: (term: string) => void;
}

export const LearningNavbar: React.FC<LearningNavbarProps> = ({ onSearch }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (onSearch) onSearch(val);
  };

  return (
    <div className="h-14 bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 px-4 md:px-6 flex items-center justify-between shadow-xs">
      {/* Left: Back to OS Workspace & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Dashboard OS</span>
        </button>

        <div className="h-4 w-px bg-slate-200 hidden sm:block" />

        <div className="flex items-center gap-2">
          <span className="text-sm font-black text-slate-900 tracking-tight">
            Financial Learning Platform
          </span>
          <span className="hidden lg:inline-block text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            PRO ACADEMY
          </span>
        </div>
      </div>

      {/* Center: Search input */}
      <div className="hidden md:flex flex-1 max-w-xs mx-4">
        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search paths, courses, books..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Right: Gamification Badges (Streak, XP, Level) */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Streak Badge */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-xs font-extrabold shadow-xs"
        >
          <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500 animate-pulse" />
          <span>{MOCK_USER_STATS.streakDays}d Streak</span>
        </motion.div>

        {/* XP Counter Badge */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-extrabold shadow-xs"
        >
          <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>{MOCK_USER_STATS.currentXp.toLocaleString()} XP</span>
        </motion.div>

        {/* Level Badge */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-black shadow-xs"
        >
          <Award className="w-3.5 h-3.5 text-blue-200" />
          <span>Lvl {MOCK_USER_STATS.level}</span>
        </motion.div>
      </div>
    </div>
  );
};
