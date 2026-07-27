import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Zap, Coins, CheckCircle2, ArrowRight, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { AssessmentResult } from '../../types/assessment';

interface ResultCardProps {
  result: AssessmentResult;
  onOpenLevelModal?: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onOpenLevelModal }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Hero Score Celebration Card */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-zinc-900 via-indigo-950 to-zinc-900 border border-zinc-800 text-zinc-100 shadow-2xl text-center space-y-6 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-black uppercase tracking-wider">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{result.passed ? 'EXAM PASSED WITH HONORS' : 'ASSESSMENT COMPLETE'}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
          {result.assessmentTitle}
        </h1>

        {/* Big Animated Score Circle */}
        <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-zinc-800"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <motion.path
              className="text-emerald-400"
              strokeWidth="3.5"
              strokeDasharray={`${result.scorePercentage}, 100`}
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              initial={{ strokeDasharray: '0, 100' }}
              animate={{ strokeDasharray: `${result.scorePercentage}, 100` }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-white">{result.scorePercentage}%</span>
            <span className="text-[10px] font-bold text-zinc-400">{result.correctCount}/{result.totalQuestions} Correct</span>
          </div>
        </div>

        {/* XP & Coins Rewards Strip */}
        <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
          <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-center">
            <div className="text-[10px] font-black uppercase tracking-wider text-amber-400">XP Reward</div>
            <div className="text-xl font-black text-amber-300 flex items-center justify-center gap-1 mt-0.5">
              <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>+{result.xpEarned} XP</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-yellow-950/40 border border-yellow-500/30 text-center">
            <div className="text-[10px] font-black uppercase tracking-wider text-yellow-400">Coins Claimed</div>
            <div className="text-xl font-black text-yellow-300 flex items-center justify-center gap-1 mt-0.5">
              <Coins className="w-4 h-4 text-yellow-400" />
              <span>+{result.coinsEarned}</span>
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate(`/dashboard/learning/assessment/${result.assessmentId}/review`)}
            className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-all hover:scale-102"
          >
            <span>Review All Answers</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {onOpenLevelModal && (
            <button
              onClick={onOpenLevelModal}
              className="px-5 py-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-amber-300 font-extrabold text-xs flex items-center gap-1.5 transition-all"
            >
              <Trophy className="w-4 h-4 text-amber-400" /> View Level Up Rewards
            </button>
          )}
        </div>
      </div>

      {/* Diagnostic Topic Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strong Topics */}
        <div className="p-5 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Mastered Concepts</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {result.strongTopics.map((topic, i) => (
              <span key={i} className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                ✓ {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Weak Topics */}
        <div className="p-5 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-400">
            <AlertTriangle className="w-4 h-4" />
            <span>Review Recommended</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {result.weakTopics.map((topic, i) => (
              <span key={i} className="text-xs font-bold px-3 py-1 rounded-full bg-amber-950/60 text-amber-300 border border-amber-500/30">
                ⚠ {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
