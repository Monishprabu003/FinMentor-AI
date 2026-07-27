import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Clock, CheckCircle2, Flame, Award } from 'lucide-react';
import { MOCK_USER_STATS } from '../../constants/learningData';

export const LearningAnalytics: React.FC = () => {
  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <span>Learning Analytics & Activity Heatmap</span>
          </h3>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">
            Visualize your consistent study habits over the last 90 days.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs font-bold">
          <span className="flex items-center gap-1 text-slate-600">
            <Clock className="w-4 h-4 text-blue-600" /> {MOCK_USER_STATS.hoursLearned} Total Hours
          </span>
          <span className="flex items-center gap-1 text-emerald-600">
            <CheckCircle2 className="w-4 h-4" /> {MOCK_USER_STATS.quizAccuracyPercentage}% Quiz Accuracy
          </span>
        </div>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
          <div className="text-[11px] font-bold text-blue-700 uppercase">Current Level</div>
          <div className="text-xl font-black text-blue-900 mt-1">Lvl {MOCK_USER_STATS.level}</div>
          <div className="text-[11px] text-blue-600 font-semibold mt-0.5">{MOCK_USER_STATS.levelTitle}</div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100">
          <div className="text-[11px] font-bold text-amber-700 uppercase">Active Streak</div>
          <div className="text-xl font-black text-amber-900 mt-1 flex items-center gap-1">
            <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
            <span>{MOCK_USER_STATS.streakDays} Days</span>
          </div>
          <div className="text-[11px] text-amber-600 font-semibold mt-0.5">Top 5% Learner</div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
          <div className="text-[11px] font-bold text-emerald-700 uppercase">Certificates Earned</div>
          <div className="text-xl font-black text-emerald-900 mt-1 flex items-center gap-1">
            <Award className="w-5 h-5 text-emerald-600" />
            <span>{MOCK_USER_STATS.certificatesEarned} Issued</span>
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">Verified Credentials</div>
        </div>

        <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100">
          <div className="text-[11px] font-bold text-purple-700 uppercase">Quiz Accuracy</div>
          <div className="text-xl font-black text-purple-900 mt-1">{MOCK_USER_STATS.quizAccuracyPercentage}%</div>
          <div className="text-[11px] text-purple-600 font-semibold mt-0.5">High Performance</div>
        </div>
      </div>

      {/* 90-Day Learning Heatmap Grid */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600">
          <span>90-Day Study Consistency Grid</span>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
            <span>Less</span>
            <span className="w-2.5 h-2.5 rounded-xs bg-slate-100 border border-slate-200" />
            <span className="w-2.5 h-2.5 rounded-xs bg-blue-200" />
            <span className="w-2.5 h-2.5 rounded-xs bg-blue-400" />
            <span className="w-2.5 h-2.5 rounded-xs bg-blue-600" />
            <span className="w-2.5 h-2.5 rounded-xs bg-blue-800" />
            <span>More</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
          {MOCK_USER_STATS.heatmap.map((day, idx) => {
            const bgClass =
              day.intensity === 4
                ? 'bg-blue-800'
                : day.intensity === 3
                ? 'bg-blue-600'
                : day.intensity === 2
                ? 'bg-blue-400'
                : day.intensity === 1
                ? 'bg-blue-200'
                : 'bg-slate-200/60';

            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.3 }}
                title={`${day.date}: ${day.count} lessons completed`}
                className={`w-3.5 h-3.5 rounded-xs ${bgClass} transition-all cursor-pointer`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
