import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Target, Zap, ArrowRight, ChevronRight, Sparkles, BookOpen, Bot, TrendingUp, } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
/* ── Score Ring ────────────────────────────────────────────── */
const ScoreRing = ({ score }) => {
    const size = 80;
    const radius = 32;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (score / 100) * circumference;
    const color = score >= 71 ? '#10b981' : score >= 41 ? '#3b82f6' : '#f59e0b';
    const label = score >= 71 ? 'Advanced' : score >= 41 ? 'Intermediate' : 'Beginner';
    return (<div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e2e8f0" strokeWidth="5"/>
          <motion.circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset: offset }} transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}/>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-black text-slate-900">{score}</span>
          <span className="text-[9px] font-bold text-slate-400 -mt-0.5">/ 100</span>
        </div>
      </div>
      <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color }}>{label}</span>
    </div>);
};
/* ── Quick Action ──────────────────────────────────────────── */
const QuickAction = ({ icon: Icon, label, onClick, iconColor = 'text-slate-500' }) => (<motion.button whileHover={{ x: 2 }} whileTap={{ scale: 0.97 }} onClick={onClick} className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 transition-all duration-200 group">
    <div className="flex items-center gap-2.5">
      <Icon className={`w-4 h-4 ${iconColor} shrink-0`}/>
      <span className="text-[13px] font-semibold text-slate-600 group-hover:text-blue-700 transition-colors">{label}</span>
    </div>
    <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-400 transition-colors"/>
  </motion.button>);
/* ── AI Tips ───────────────────────────────────────────────── */
const AI_TIPS = [
    "Track every expense this week — even small ones. Awareness is the first step to control.",
    "The 50/30/20 rule: 50% needs, 30% wants, 20% savings. Where are you today?",
    "Compound interest rewards patience. Start small but start now.",
    "An emergency fund of 3–6 months expenses is your financial safety net.",
    "Review your subscriptions monthly — hidden leaks drain your wealth silently.",
];
/* ── AI Widget (Light) ─────────────────────────────────────── */
export const AIWidget = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [streak] = useState(7);
    const score = user?.financial_score ?? 65;
    const tipIndex = new Date().getDate() % AI_TIPS.length;
    const todayTip = AI_TIPS[tipIndex];
    return (<div className="space-y-4">

      {/* ── Financial Score ── */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }} className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Financial Score</p>
            <p className="text-[13px] font-semibold text-slate-500 mt-0.5">Based on your assessment</p>
          </div>
          <Brain className="w-5 h-5 text-slate-300"/>
        </div>
        <div className="flex items-center justify-between">
          <ScoreRing score={score}/>
          <div className="text-right space-y-3">
            <div>
              <p className="text-[11px] text-slate-400 font-semibold">Knowledge</p>
              <p className="text-[13px] font-bold text-slate-700">{user?.knowledge_level ?? 'Intermediate'}</p>
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-semibold">Persona</p>
              <p className="text-[13px] font-bold text-slate-700">{user?.financial_persona ?? 'Cautious Saver'}</p>
            </div>
          </div>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate('/assessment')} className="mt-4 w-full py-2 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-[12px] font-bold text-slate-500 hover:text-blue-600 transition-all duration-200 flex items-center justify-center gap-1.5">
          <span>View Assessment</span>
          <ArrowRight className="w-3.5 h-3.5"/>
        </motion.button>
      </motion.div>

      {/* ── Streak ── */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Current Streak</p>
            <div className="flex items-end gap-1 mt-1.5">
              <span className="text-3xl font-black text-slate-900">{streak}</span>
              <span className="text-sm font-bold text-slate-400 mb-0.5">days</span>
            </div>
            <p className="text-[12px] font-medium text-slate-400 mt-0.5">Keep it up! 3 more to unlock a badge.</p>
          </div>
          <motion.div animate={{ rotate: [0, -10, 10, -10, 10, 0] }} transition={{ duration: 1, repeat: Infinity, repeatDelay: 4 }} className="text-3xl">
            🔥
          </motion.div>
        </div>
        <div className="flex gap-1 mt-3">
          {Array.from({ length: 10 }).map((_, i) => (<div key={i} className={`flex-1 h-1.5 rounded-full transition-all ${i < streak ? 'bg-orange-400' : 'bg-slate-100'}`}/>))}
        </div>
      </motion.div>

      {/* ── Today's AI Tip ── */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-blue-600"/>
          </div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-blue-600">Today's AI Insight</p>
        </div>
        <p className="text-[13px] font-medium text-slate-600 leading-relaxed">{todayTip}</p>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate('/ai')} className="mt-3 flex items-center gap-1.5 text-[12px] font-bold text-blue-600 hover:text-blue-700 transition-colors">
          <span>Ask AI Mentor</span>
          <ArrowRight className="w-3.5 h-3.5"/>
        </motion.button>
      </motion.div>

      {/* ── Quick Actions ── */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }} className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5">
        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">Quick Actions</p>
        <div className="space-y-1.5">
          <QuickAction icon={Zap} label="Log a Transaction" onClick={() => navigate('/transactions')} iconColor="text-amber-500"/>
          <QuickAction icon={BookOpen} label="Open Finance Library" onClick={() => navigate('/books')} iconColor="text-emerald-500"/>
          <QuickAction icon={Bot} label="Chat with AI Tutor" onClick={() => navigate('/ai')} iconColor="text-blue-500"/>
          <QuickAction icon={TrendingUp} label="Check Budget Status" onClick={() => navigate('/budgets')} iconColor="text-indigo-500"/>
        </div>
      </motion.div>

      {/* ── Upcoming Goal ── */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }} className="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-4 h-4 text-emerald-600"/>
          <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-600">Upcoming Goal</p>
        </div>
        <p className="text-[14px] font-bold text-slate-800">Emergency Fund</p>
        <p className="text-[12px] text-slate-500 font-medium mt-0.5">3 months expenses · ₹90,000 target</p>
        <div className="mt-3 space-y-1">
          <div className="flex justify-between text-[11px] font-bold">
            <span className="text-slate-500">Progress</span>
            <span className="text-emerald-600">40%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" initial={{ width: 0 }} animate={{ width: '40%' }} transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}/>
          </div>
        </div>
      </motion.div>

    </div>);
};
