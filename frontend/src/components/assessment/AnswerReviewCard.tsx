import React from 'react';
import { CheckCircle2, XCircle, BookOpen, Lightbulb } from 'lucide-react';
import type { AssessmentQuestion } from '../../types/assessment';

interface AnswerReviewCardProps {
  question: AssessmentQuestion;
  selectedOptionId?: string;
}

export const AnswerReviewCard: React.FC<AnswerReviewCardProps> = ({ question, selectedOptionId }) => {
  const correctOption = question.options.find((o) => o.isCorrect);
  const selectedOption = question.options.find((o) => o.id === selectedOptionId);

  const isCorrect = selectedOption?.isCorrect ?? false;

  return (
    <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 text-zinc-100 space-y-4 shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
            Question {question.questionNumber}
          </span>
          <span className="text-xs font-bold text-zinc-400">{question.category}</span>
        </div>

        {isCorrect ? (
          <span className="flex items-center gap-1 text-xs font-black text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" /> Correct (+{question.xpReward} XP)
          </span>
        ) : (
          <span className="flex items-center gap-1 text-xs font-black text-rose-400 bg-rose-950/60 border border-rose-500/30 px-3 py-1 rounded-full">
            <XCircle className="w-3.5 h-3.5" /> Incorrect
          </span>
        )}
      </div>

      <h3 className="text-base font-black text-white leading-snug">{question.question}</h3>

      {/* Options List */}
      <div className="space-y-2">
        {question.options.map((opt) => {
          const isSelectedChoice = opt.id === selectedOptionId;

          let style = 'bg-zinc-950 border-zinc-800 text-zinc-400';
          if (opt.isCorrect) {
            style = 'bg-emerald-950/80 border-emerald-500/60 text-emerald-200 font-bold';
          } else if (isSelectedChoice && !opt.isCorrect) {
            style = 'bg-rose-950/80 border-rose-500/60 text-rose-200 font-bold';
          }

          return (
            <div key={opt.id} className={`p-3.5 rounded-xl border text-xs flex items-center justify-between ${style}`}>
              <div className="flex items-center gap-2">
                <span>{opt.text}</span>
                {isSelectedChoice && <span className="text-[10px] font-extrabold uppercase text-blue-400">(Your Selection)</span>}
              </div>
              {opt.isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
              {isSelectedChoice && !opt.isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
            </div>
          );
        })}
      </div>

      {/* Diagnostic Explanation & Reference */}
      <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase text-blue-400">
          <Lightbulb className="w-3.5 h-3.5 fill-blue-400" />
          <span>Detailed Diagnostic Explanation</span>
        </div>
        <p className="text-xs text-zinc-300 font-medium leading-relaxed">
          {correctOption?.explanation}
        </p>

        {question.referenceLessonTitle && (
          <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between text-xs font-bold text-indigo-300">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" /> Lesson Reference: {question.referenceLessonTitle}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
