import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, ArrowLeft, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AssessmentHeaderProps {
  title: string;
  currentQuestionIndex: number;
  totalQuestions: number;
  timeLeftSeconds: number;
  xpReward: number;
  onToggleAIHint: () => void;
}

export const AssessmentHeader: React.FC<AssessmentHeaderProps> = ({
  title,
  currentQuestionIndex,
  totalQuestions,
  timeLeftSeconds,
  xpReward,
  onToggleAIHint,
}) => {
  const navigate = useNavigate();

  const minutes = Math.floor(timeLeftSeconds / 60);
  const seconds = timeLeftSeconds % 60;
  const timeStr = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  const progressPercentage = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  return (
    <div className="sticky top-0 z-40 bg-[#09090b]/90 backdrop-blur-xl border-b border-zinc-800 text-zinc-100 shadow-md">
      {/* Top Progress Line Bar */}
      <div className="w-full h-1 bg-zinc-900 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-400"
          style={{ width: `${progressPercentage}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between gap-4">
        {/* Left: Exit Exam & Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard/learning/assessment')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-bold transition-all border border-zinc-800"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exit Exam</span>
          </button>

          <div className="h-4 w-px bg-zinc-800 hidden sm:block" />

          <div>
            <h2 className="text-xs font-black text-zinc-100 truncate max-w-[220px] md:max-w-[350px]">
              {title}
            </h2>
            <p className="text-[10px] text-zinc-500 font-semibold">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </p>
          </div>
        </div>

        {/* Center: Live Countdown Timer */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-black text-amber-400 shadow-2xs">
          <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>{timeStr}</span>
        </div>

        {/* Right: XP Reward Badge & AI Hint Button */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:flex items-center gap-1 text-xs font-extrabold text-amber-300 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full">
            <Zap className="w-3.5 h-3.5 fill-amber-300" /> +{xpReward} XP
          </span>

          <button
            onClick={onToggleAIHint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-xs font-black text-blue-400 transition-all"
            title="Non-spoilative AI Hint"
          >
            <Bot className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">AI Hint</span>
          </button>
        </div>
      </div>
    </div>
  );
};
