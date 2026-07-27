import React, { useState } from 'react';
import { Trophy, Flame, Zap } from 'lucide-react';
import { LearningLayout } from '../../components/learning/LearningLayout';
import { LEADERBOARD_USERS } from '../../constants/learningData';

export const LeaderboardHubPage: React.FC = () => {
  const [tab, setTab] = useState<string>('Global');

  return (
    <LearningLayout>
      <div className="max-w-4xl mx-auto space-y-6 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Trophy className="w-6 h-6 text-amber-500 fill-amber-400" />
              <span>Leaderboards & Learner Rankings</span>
            </h1>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              Compete with financial learners nationwide on streaks, XP, and badges.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {['Global', 'Weekly', 'Friends'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all ${
                  tab === t
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs font-black uppercase text-slate-400">
            <span>Rank & Learner</span>
            <div className="flex items-center gap-8">
              <span>Streak</span>
              <span>Total XP</span>
            </div>
          </div>

          <div className="space-y-2">
            {LEADERBOARD_USERS.map((user) => (
              <div
                key={user.id}
                className={`p-4 rounded-2xl border flex items-center justify-between text-xs font-bold transition-all ${
                  user.isCurrentUser
                    ? 'bg-blue-50 border-blue-300 shadow-xs'
                    : 'bg-white border-slate-100 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs ${
                      user.rank === 1
                        ? 'bg-amber-400 text-slate-900 shadow-xs'
                        : user.rank === 2
                        ? 'bg-slate-300 text-slate-900'
                        : user.rank === 3
                        ? 'bg-amber-700 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    #{user.rank}
                  </span>
                  <div>
                    <p className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <span>{user.name}</span>
                      {user.isCurrentUser && (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-600 text-white">
                          YOU
                        </span>
                      )}
                    </p>
                    <p className="text-[11px] text-slate-400 font-semibold">{user.badgesCount} Badges Unlocked</p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <span className="flex items-center gap-1 text-orange-600 font-black">
                    <Flame className="w-3.5 h-3.5 fill-orange-500" /> {user.streak}d
                  </span>
                  <span className="flex items-center gap-1 text-amber-700 font-black">
                    <Zap className="w-3.5 h-3.5 fill-amber-500" /> {user.xp.toLocaleString()} XP
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LearningLayout>
  );
};
