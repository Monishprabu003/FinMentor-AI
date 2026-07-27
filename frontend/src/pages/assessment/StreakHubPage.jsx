import React from 'react';
import { Flame } from 'lucide-react';
import { LearningLayout } from '../../components/learning/LearningLayout';
import { MOCK_USER_STATS } from '../../constants/learningData';
export const StreakHubPage = () => {
    return (<LearningLayout>
      <div className="max-w-4xl mx-auto space-y-6 pb-12">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 text-white shadow-xl text-center space-y-4 relative overflow-hidden">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg">
            <Flame className="w-12 h-12 text-white fill-white animate-bounce"/>
          </div>

          <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-black/20 backdrop-blur-md">
            DAILY STREAK TRACKER
          </span>

          <h1 className="text-3xl sm:text-4xl font-black">{MOCK_USER_STATS.streakDays}-Day Learning Streak!</h1>
          <p className="text-sm font-medium text-amber-100 max-w-md mx-auto">
            You're on fire! Complete 1 lesson or assessment every day to keep your streak multiplier active and earn bonus XP.
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto pt-2">
            <div className="p-3.5 rounded-2xl bg-black/20 border border-white/20 text-center">
              <div className="text-[10px] font-extrabold uppercase text-amber-200">Current Streak</div>
              <div className="text-2xl font-black text-white">{MOCK_USER_STATS.streakDays} Days</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/20 border border-white/20 text-center">
              <div className="text-[10px] font-extrabold uppercase text-amber-200">Longest Streak</div>
              <div className="text-2xl font-black text-white">21 Days</div>
            </div>
          </div>
        </div>

        {/* Weekly Streak Tracker */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-black text-slate-900 tracking-tight">This Week's Activity</h3>
          <div className="grid grid-cols-7 gap-2 text-center">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (<div key={day} className="p-3 rounded-2xl bg-orange-50 border border-orange-200 space-y-1">
                <span className="text-[10px] font-extrabold uppercase text-orange-600">{day}</span>
                <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center mx-auto shadow-xs">
                  🔥
                </div>
              </div>))}
          </div>
        </div>
      </div>
    </LearningLayout>);
};
