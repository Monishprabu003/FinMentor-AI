import React from 'react';
import { Trophy } from 'lucide-react';
import { LearningLayout } from '../../components/learning/LearningLayout';
import { AchievementsCard } from '../../components/learning/AchievementsCard';
export const AchievementsHubPage = () => {
    return (<LearningLayout>
      <div className="max-w-5xl mx-auto space-y-6 pb-12">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500 fill-amber-400"/>
            <span>Achievements & Milestone Quests</span>
          </h1>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            Track your financial milestones, streak challenges, and unlocked collectibles.
          </p>
        </div>

        <AchievementsCard />
      </div>
    </LearningLayout>);
};
