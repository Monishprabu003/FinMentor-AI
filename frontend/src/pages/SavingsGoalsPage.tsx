import React, { useEffect, useState } from 'react';
import { Target, Plus, Calendar, TrendingUp } from 'lucide-react';
import { api } from '../services/api';
import type { SavingsGoal } from '../types';

export const SavingsGoalsPage: React.FC = () => {
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Form state
  const [name, setName] = useState<string>('');
  const [targetAmount, setTargetAmount] = useState<string>('3000');
  const [currentAmount, setCurrentAmount] = useState<string>('500');
  const [targetDate, setTargetDate] = useState<string>('');
  const [category, setCategory] = useState<string>('Emergency Fund');

  const fetchGoals = async () => {
    setLoading(true);
    try {
      const res = await api.get('/savings');
      setGoals(res.data);
    } catch (err) {
      console.error('Error fetching savings goals:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleCreateGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !targetAmount) return;
    try {
      await api.post('/savings', {
        name,
        target_amount: parseFloat(targetAmount),
        current_amount: parseFloat(currentAmount || '0'),
        target_date: targetDate || null,
        category
      });
      setShowModal(false);
      setName('');
      fetchGoals();
    } catch (err) {
      console.error('Error creating savings goal:', err);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Savings & Investment Goals</h1>
          <p className="text-xs text-slate-400">
            Track milestones. Backend calculates monthly contribution required to reach deadline.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-xs shadow-glow-emerald hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Goal</span>
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400 text-sm">Loading savings milestones...</div>
      ) : goals.length === 0 ? (
        <div className="glass-card p-10 rounded-2xl text-center space-y-3">
          <Target className="w-8 h-8 text-slate-500 mx-auto" />
          <div className="text-white font-bold">No active savings goals yet</div>
          <p className="text-xs text-slate-400">Create your first 3-Month Emergency Fund or Roth IRA starter milestone.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {goals.map((g) => (
            <div key={g.id} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-1 rounded-full bg-slate-800 text-emerald-400 text-xs font-semibold">
                    {g.category}
                  </span>
                  <span className="text-xs font-bold text-slate-300">
                    {g.progress_percentage}% Saved
                  </span>
                </div>

                <h3 className="font-bold text-white text-lg">{g.name}</h3>

                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Saved: <span className="text-white font-bold">${g.current_amount}</span></span>
                    <span>Target: <span className="text-emerald-400 font-bold">${g.target_amount}</span></span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, g.progress_percentage)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 space-y-1">
                {g.monthly_savings_required ? (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      Monthly Contribution Required
                    </span>
                    <span className="font-bold text-cyan-400">${g.monthly_savings_required}/mo</span>
                  </div>
                ) : (
                  <div className="text-xs text-slate-400 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    Consistent savings momentum
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="glass-panel max-w-sm w-full p-6 rounded-3xl space-y-4">
            <h3 className="text-lg font-bold text-white">Create Savings Goal</h3>
            <form onSubmit={handleCreateGoal} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Goal Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. 3-Month Emergency Fund"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Target ($)</label>
                  <input
                    type="number"
                    required
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Currently Saved ($)</label>
                  <input
                    type="number"
                    value={currentAmount}
                    onChange={(e) => setCurrentAmount(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
                  >
                    <option value="Emergency Fund">Emergency Fund</option>
                    <option value="Investing">Investing</option>
                    <option value="Debt Payoff">Debt Payoff</option>
                    <option value="Education">Education</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Target Date</label>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-xs"
                >
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
