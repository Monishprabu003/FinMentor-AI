import React, { useState } from 'react';
import { Award, Zap, Lock, CheckCircle2 } from 'lucide-react';
import { LearningLayout } from '../../components/learning/LearningLayout';
import { MOCK_GAMIFICATION_BADGES } from '../../mock/assessmentData';

export const BadgesPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');

  const filteredBadges = MOCK_GAMIFICATION_BADGES.filter((b) => {
    if (filter === 'All') return true;
    if (filter === 'Unlocked') return b.unlocked;
    return b.category === filter;
  });

  return (
    <LearningLayout>
      <div className="max-w-5xl mx-auto space-y-6 pb-12">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-500" />
            <span>Collectible Badges & Honor Roll</span>
          </h1>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            Earn collectible badges by passing exams, hitting streaks, and mastering finance paths.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {['All', 'Unlocked', 'Quiz', 'Streak', 'Special'].map((cat) => (
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

        {/* Badges Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBadges.map((badge) => (
            <div
              key={badge.id}
              className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
                badge.unlocked
                  ? 'bg-white border-amber-200 shadow-sm'
                  : 'bg-slate-50 border-slate-200 opacity-65'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold shadow-sm ${
                      badge.unlocked
                        ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    {badge.unlocked ? <Award className="w-6 h-6" /> : <Lock className="w-5 h-5" />}
                  </div>

                  <span className="text-xs font-extrabold text-amber-600 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 fill-amber-400" /> +{badge.xpBonus} XP Bonus
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-black text-slate-900">{badge.name}</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">
                    {badge.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                <span className="text-slate-400">{badge.requirementText}</span>
                {badge.unlocked ? (
                  <span className="text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Unlocked
                  </span>
                ) : (
                  <span className="text-slate-400">Locked</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </LearningLayout>
  );
};
