import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import type { AssessmentQuestion } from '../../types/assessment';

interface QuestionCardProps {
  question: AssessmentQuestion;
  selectedOptionId?: string;
  onSelectOption: (optionId: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedOptionId,
  onSelectOption,
}) => {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 md:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 text-zinc-100 shadow-xl space-y-6"
    >
      {/* Category & Format Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
            {question.category}
          </span>
          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
            {question.format.toUpperCase()}
          </span>
        </div>
        <span className="text-xs font-black text-amber-400">+{question.xpReward} XP</span>
      </div>

      {/* Scenario Text (if format is scenario or case study) */}
      {question.scenarioText && (
        <div className="p-4 rounded-2xl bg-zinc-950/90 border border-zinc-800/80 space-y-1">
          <div className="text-[10px] font-extrabold uppercase text-amber-400 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> Diagnostic Case Scenario
          </div>
          <p className="text-xs md:text-sm text-zinc-300 font-medium leading-relaxed italic">
            "{question.scenarioText}"
          </p>
        </div>
      )}

      {/* Main Question Text */}
      <div className="space-y-1">
        <h3 className="text-base md:text-lg font-black text-white leading-snug">
          {question.questionNumber}. {question.question}
        </h3>
      </div>

      {/* Options Grid */}
      <div className="space-y-3 pt-2">
        {question.options.map((opt, idx) => {
          const isSelected = selectedOptionId === opt.id;

          return (
            <motion.button
              key={opt.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onSelectOption(opt.id)}
              className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between text-xs md:text-sm font-semibold transition-all ${
                isSelected
                  ? 'bg-blue-600/30 border-blue-500 text-white shadow-md shadow-blue-500/10'
                  : 'bg-zinc-950/80 border-zinc-800 text-zinc-300 hover:bg-zinc-800/80 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-black shrink-0 ${
                    isSelected
                      ? 'bg-blue-500 text-white border-blue-400'
                      : 'bg-zinc-900 border-zinc-700 text-zinc-400'
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="leading-relaxed">{opt.text}</span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};
