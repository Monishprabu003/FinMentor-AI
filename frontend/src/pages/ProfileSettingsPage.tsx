import React, { useState } from 'react';
import { Save, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export const ProfileSettingsPage: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const [fullName, setFullName] = useState<string>(user?.full_name || '');
  const [experienceLevel, setExperienceLevel] = useState<string>(user?.experience_level || 'graduate');
  const [incomeTarget, setIncomeTarget] = useState<string>(
    user?.monthly_income_target ? String(user.monthly_income_target) : '3400'
  );
  const [saved, setSaved] = useState<boolean>(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put('/auth/me', {
        full_name: fullName,
        experience_level: experienceLevel,
        monthly_income_target: parseFloat(incomeTarget)
      });
      await refreshUser();
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">User Profile & Platform Settings</h1>
        <p className="text-xs text-slate-400">
          Customize your financial experience level and AI explanation tone
        </p>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-800">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xl">
            {user?.full_name ? user.full_name.charAt(0) : 'U'}
          </div>
          <div>
            <div className="font-bold text-white text-lg">{user?.full_name}</div>
            <div className="text-xs text-slate-400">{user?.email}</div>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Email Address (Read-only)</label>
              <input
                type="text"
                disabled
                value={user?.email || ''}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Financial Experience Level</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
              >
                <option value="student">Student (Focus on Budgeting & First Job)</option>
                <option value="graduate">Fresh Graduate (Focus on Emergency Funds & 401k)</option>
                <option value="professional">Young Professional (Focus on ETFs & Tax Optimization)</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Monthly Income Benchmark ($)</label>
              <input
                type="number"
                value={incomeTarget}
                onChange={(e) => setIncomeTarget(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            {saved ? (
              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                Profile updated successfully!
              </span>
            ) : (
              <span />
            )}
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-xs shadow-glow-emerald hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
