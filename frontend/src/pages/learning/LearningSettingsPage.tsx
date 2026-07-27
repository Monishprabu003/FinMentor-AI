import React, { useState } from 'react';
import { Settings, Target, Bell, Check } from 'lucide-react';
import { LearningLayout } from '../../components/learning/LearningLayout';

export const LearningSettingsPage: React.FC = () => {
  const [dailyGoal, setDailyGoal] = useState<number>(30);
  const [reminders, setReminders] = useState<boolean>(true);
  const [saved, setSaved] = useState<boolean>(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <LearningLayout>
      <div className="max-w-3xl mx-auto space-y-6 pb-12">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Settings className="w-6 h-6 text-slate-700" />
            <span>Learning Preferences & Goals</span>
          </h1>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            Customize daily study targets, streak reminders, and notification schedules.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          {/* Daily Goal Setting */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase text-slate-700 tracking-wider flex items-center gap-1.5">
              <Target className="w-4 h-4 text-blue-600" /> Daily Study Target
            </label>
            <div className="grid grid-cols-4 gap-3">
              {[15, 30, 45, 60].map((mins) => (
                <button
                  key={mins}
                  onClick={() => setDailyGoal(mins)}
                  className={`p-3 rounded-2xl border text-xs font-extrabold transition-all ${
                    dailyGoal === mins
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {mins} Mins/Day
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Bell className="w-4 h-4 text-amber-500" /> Daily Streak Protection Reminders
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Receive a nudge at 8:00 PM if you haven't completed today's lesson.
                </p>
              </div>
              <input
                type="checkbox"
                checked={reminders}
                onChange={(e) => setReminders(e.target.checked)}
                className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            {saved && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <Check className="w-4 h-4" /> Preferences saved!
              </span>
            )}
            <button
              onClick={handleSave}
              className="ml-auto px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-md shadow-blue-600/20 transition-all hover:scale-102"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </LearningLayout>
  );
};
