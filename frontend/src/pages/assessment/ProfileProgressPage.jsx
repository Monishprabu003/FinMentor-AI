import React from 'react';
import { Award, Zap, Flame } from 'lucide-react';
import { LearningLayout } from '../../components/learning/LearningLayout';
import { LearningAnalytics } from '../../components/learning/LearningAnalytics';
import { AchievementsCard } from '../../components/learning/AchievementsCard';
import { MOCK_USER_STATS } from '../../constants/learningData';
import { MOCK_LEVEL_INFO } from '../../mock/assessmentData';
export const ProfileProgressPage = () => {
    return (<LearningLayout>
      <div className="max-w-5xl mx-auto space-y-6 pb-12">
        {/* User Profile Header */}
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-lg border border-white/20">
                Y
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-white">Yashwanth</h1>
                  <span className="text-xs font-bold text-amber-300 bg-amber-400/20 border border-amber-400/30 px-2.5 py-0.5 rounded-full">
                    Lvl {MOCK_LEVEL_INFO.level}
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-semibold mt-0.5">{MOCK_LEVEL_INFO.title}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold text-slate-200">
              <div className="flex items-center gap-1.5 text-amber-300">
                <Zap className="w-4 h-4 fill-amber-300"/>
                <span>{MOCK_USER_STATS.currentXp} XP</span>
              </div>
              <div className="flex items-center gap-1.5 text-orange-400">
                <Flame className="w-4 h-4 fill-orange-400"/>
                <span>{MOCK_USER_STATS.streakDays}d Streak</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Award className="w-4 h-4"/>
                <span>{MOCK_USER_STATS.certificatesEarned} Certificates</span>
              </div>
            </div>
          </div>
        </div>

        {/* 90-Day Analytics & Activity Heatmap */}
        <LearningAnalytics />

        {/* Badges & Achievements */}
        <AchievementsCard />
      </div>
    </LearningLayout>);
};
