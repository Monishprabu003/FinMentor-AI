import React, { useState } from 'react';
import { Save, Check, User } from 'lucide-react';
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
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">User Profile & Platform Settings</h1>
        <p className="text-xs font-semibold text-slate-500 mt-1">
          Customize your financial experience level and AI explanation tone
        </p>
      </div>

      <div className="bg-white/90 backdrop-blur-xl p-8 sm:p-10 rounded-[2rem] border border-slate-200/80 shadow-xl shadow-slate-200/40 space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center font-black text-2xl shadow-xs">
            {user?.full_name ? user.full_name.charAt(0) : 'U'}
          </div>
          <div>
            <div className="font-black text-slate-900 text-xl tracking-tight">{user?.full_name}</div>
            <div className="text-xs font-semibold text-slate-400">{user?.email}</div>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Email Address (Read-only)</label>
              <input
                type="text"
                disabled
                value={user?.email || ''}
                className="w-full px-4 py-3 rounded-2xl bg-slate-100/70 border border-slate-200 text-sm font-medium text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Financial Experience Level</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500 transition-all"
              >
                <option value="student">Student (Focus on Budgeting & First Job)</option>
                <option value="graduate">Fresh Graduate (Focus on Emergency Funds & 401k)</option>
                <option value="professional">Young Professional (Focus on ETFs & Tax Optimization)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Monthly Income Benchmark (₹)</label>
              <input
                type="number"
                value={incomeTarget}
                onChange={(e) => setIncomeTarget(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            {saved ? (
              <span className="text-xs text-emerald-600 font-bold flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                Profile updated successfully!
              </span>
            ) : (
              <span />
            )}
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 transition-all flex items-center gap-2"
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
