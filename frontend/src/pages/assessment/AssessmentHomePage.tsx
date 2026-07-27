import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Clock, Zap, CheckCircle2, PlayCircle, Trophy, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LearningLayout } from '../../components/learning/LearningLayout';
import { MOCK_ASSESSMENTS, MOCK_LEVEL_INFO } from '../../mock/assessmentData';

export const AssessmentHomePage: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>('All');

  const filteredAssessments = MOCK_ASSESSMENTS.filter((asm) => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return (asm.userBestScorePercentage || 0) > 0;
    return asm.difficulty === filter;
  });

  return (
    <LearningLayout>
      <div className="max-w-6xl mx-auto space-y-8 pb-12">
        {/* Assessment Hero Banner */}
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl space-y-4 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Assessment & Certification Hub
              </div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight">
                Validate Your Financial Literacy
              </h1>
              <p className="text-xs md:text-sm text-slate-300 font-medium max-w-xl">
                Take interactive exams, earn verified credentials, unlock level titles, and boost your financial score.
              </p>
            </div>

            {/* Level & XP Box */}
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex items-center gap-4 shrink-0">
              <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">Current Level</span>
                <p className="text-sm font-black text-white">Lvl {MOCK_LEVEL_INFO.level} · {MOCK_LEVEL_INFO.title}</p>
                <p className="text-[11px] font-bold text-amber-300">{MOCK_LEVEL_INFO.currentXp} / {MOCK_LEVEL_INFO.nextLevelXp} XP</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {['All', 'Completed', 'Beginner', 'Intermediate', 'Advanced'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all shrink-0 ${
                  filter === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Available Assessments Grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <span>Interactive Financial Exams</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAssessments.map((asm) => (
              <motion.div
                key={asm.id}
                whileHover={{ y: -3 }}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      {asm.category}
                    </span>

                    <div className="flex items-center gap-2">
                      {asm.userBestScorePercentage ? (
                        <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Best: {asm.userBestScorePercentage}%
                        </span>
                      ) : null}
                      <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-500" /> +{asm.xpReward} XP
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 leading-snug">{asm.title}</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{asm.description}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {asm.durationMinutes} mins
                    </span>
                    <span className="flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5" /> {asm.totalQuestions} Questions
                    </span>
                  </div>

                  <button
                    onClick={() => navigate(`/dashboard/learning/assessment/${asm.id}`)}
                    className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-600/20 flex items-center gap-1.5 transition-all hover:scale-102"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>{asm.userBestScorePercentage ? 'Retake Exam' : 'Start Exam'}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </LearningLayout>
  );
};
