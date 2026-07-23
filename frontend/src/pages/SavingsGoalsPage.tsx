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
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Savings & Investment Goals</h1>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            Track milestones. Backend calculates monthly contribution required to reach deadline.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Goal</span>
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-500 font-semibold text-sm">Loading savings milestones...</div>
      ) : goals.length === 0 ? (
        <div className="bg-white/90 backdrop-blur-xl p-12 rounded-[2rem] border border-slate-200/80 shadow-xl shadow-slate-200/40 text-center space-y-3">
          <Target className="w-10 h-10 text-slate-300 mx-auto" />
          <div className="text-slate-900 font-black text-lg">No active savings goals yet</div>
          <p className="text-xs text-slate-500 font-medium">Create your first 3-Month Emergency Fund or Roth IRA starter milestone.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {goals.map((g) => (
            <div key={g.id} className="bg-white/90 backdrop-blur-xl p-6 sm:p-7 rounded-[2rem] border border-slate-200/80 shadow-xl shadow-slate-200/40 space-y-4 flex flex-col justify-between hover:border-blue-300 transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-xs font-bold">
                    {g.category}
                  </span>
                  <span className="text-xs font-black text-slate-900">
                    {g.progress_percentage}% Saved
                  </span>
                </div>

                <h3 className="font-black text-slate-900 text-xl tracking-tight mt-1">{g.name}</h3>

                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-xs text-slate-500 font-medium">
                    <span>Saved: <span className="text-slate-900 font-bold">₹{g.current_amount.toLocaleString('en-IN')}</span></span>
                    <span>Target: <span className="text-blue-600 font-bold">₹{g.target_amount.toLocaleString('en-IN')}</span></span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, g.progress_percentage)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-1">
                {g.monthly_savings_required ? (
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      Monthly Contribution Required
                    </span>
                    <span className="font-black text-blue-600">₹{g.monthly_savings_required.toLocaleString('en-IN')}/mo</span>
                  </div>
                ) : (
                  <div className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    Consistent savings momentum
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white max-w-sm w-full p-8 rounded-[2rem] shadow-2xl border border-slate-100 space-y-5">
            <h3 className="text-xl font-black text-slate-900">Create Savings Goal</h3>
            <form onSubmit={handleCreateGoal} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Goal Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. 3-Month Emergency Fund"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Target (₹)</label>
                  <input
                    type="number"
                    required
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Saved (₹)</label>
                  <input
                    type="number"
                    value={currentAmount}
                    onChange={(e) => setCurrentAmount(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500 transition-all"
                  >
                    <option value="Emergency Fund">Emergency Fund</option>
                    <option value="Investing">Investing</option>
                    <option value="Debt Payoff">Debt Payoff</option>
                    <option value="Education">Education</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Target Date</label>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/20 transition-all"
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
