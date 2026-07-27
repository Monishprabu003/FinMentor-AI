import React from 'react';
import { Zap } from 'lucide-react';
import { LearningLayout } from '../../components/learning/LearningLayout';
import { ChallengeCard } from '../../components/learning/ChallengeCard';
import { DAILY_CHALLENGES } from '../../constants/learningData';

export const ChallengesPage: React.FC = () => {
  return (
    <LearningLayout>
      <div className="max-w-4xl mx-auto space-y-6 pb-12">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Zap className="w-6 h-6 text-amber-500 fill-amber-400" />
            <span>Daily Financial Quests & Challenges</span>
          </h1>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            Complete daily tasks to maintain your learning streak, earn XP, and unlock exclusive rewards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DAILY_CHALLENGES.map((ch) => (
            <ChallengeCard key={ch.id} challenge={ch} />
          ))}
        </div>
      </div>
    </LearningLayout>
  );
};
