import React from 'react';
import { Bot, Sparkles, ArrowRight, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MOCK_USER_STATS } from '../../constants/learningData';
export const AIHero = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const name = user?.full_name?.split(' ')[0] || 'Monish';
    return (<div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 md:p-8 shadow-xl overflow-hidden mb-6">
      {/* Glow animations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"/>
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"/>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-black uppercase tracking-wider">
            <Bot className="w-4 h-4 text-blue-400"/>
            <span>FINMENTOR AI PERSONAL LEARNING COACH</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">
            Good day, <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-pink-300 bg-clip-text text-transparent">{name}</span> 👋
          </h1>

          <p className="text-xs md:text-sm text-slate-300 font-medium leading-relaxed">
            You've completed 72% of your <strong>Investing Path</strong>. Today I recommend reviewing <em>Risk Management & Asset Rebalancing</em> before taking tomorrow's assessment.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button onClick={() => navigate('/dashboard/ai/chat')} className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-all hover:scale-102 cursor-pointer">
              <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300"/>
              <span>Ask AI Tutor Anything</span>
            </button>

            <button onClick={() => navigate('/dashboard/learning/course/course-1/lesson/l4')} className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-extrabold text-xs flex items-center gap-1.5 transition-all">
              <span>Review Weak Topics</span>
              <ArrowRight className="w-4 h-4"/>
            </button>
          </div>
        </div>

        {/* Intelligence Status Card */}
        <div className="p-5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md text-slate-200 space-y-3 shrink-0 w-full md:w-64">
          <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-300">
            <span className="flex items-center gap-1">
              <Brain className="w-4 h-4 text-blue-400"/> Personal Memory
            </span>
            <span className="text-emerald-400">ACTIVE</span>
          </div>

          <div className="space-y-1.5 text-xs font-medium">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Learner Level:</span>
              <span className="font-bold text-white">Lvl {MOCK_USER_STATS.level}</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Quiz Accuracy:</span>
              <span className="font-bold text-emerald-400">{MOCK_USER_STATS.quizAccuracyPercentage}%</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Active Streak:</span>
              <span className="font-bold text-orange-400">🔥 {MOCK_USER_STATS.streakDays} Days</span>
            </div>
          </div>
        </div>
      </div>
    </div>);
};
