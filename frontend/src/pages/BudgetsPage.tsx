import React, { useEffect, useState } from 'react';
import { Plus, PieChart } from 'lucide-react';
import { api } from '../services/api';
import type { Budget } from '../types';

export const BudgetsPage: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Form State
  const [category, setCategory] = useState<string>('Food & Dining');
  const [monthlyLimit, setMonthlyLimit] = useState<string>('400');

  const fetchBudgets = async () => {
    setLoading(true);
    try {
      const res = await api.get('/budgets');
      setBudgets(res.data);
    } catch (err) {
      console.error('Error fetching budgets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const handleCreateBudget = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/budgets', {
        category,
        monthly_limit: parseFloat(monthlyLimit),
        alert_threshold: 0.85
      });
      setShowModal(false);
      fetchBudgets();
    } catch (err) {
      console.error('Error creating budget:', err);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Monthly Category Budgets</h1>
          <p className="text-xs text-slate-400">
            Set spending guardrails. Statuses are computed deterministically by the backend.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-xs shadow-glow-emerald hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Budget Guardrail</span>
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400 text-sm">Loading budget guardrails...</div>
      ) : budgets.length === 0 ? (
        <div className="glass-card p-10 rounded-2xl text-center space-y-3">
          <PieChart className="w-8 h-8 text-slate-500 mx-auto" />
          <div className="text-white font-bold">No category budgets defined yet</div>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Create a budget limit for Housing, Food & Dining, or Entertainment to track your monthly burn rate.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {budgets.map((b) => (
            <div key={b.id} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-base">{b.category}</span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  b.status === 'OVER_BUDGET'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : b.status === 'WARNING'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {b.status === 'OVER_BUDGET' ? 'Over Budget' : b.status === 'WARNING' ? '85%+ Warn' : 'On Track'}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Spent: <span className="text-white font-bold">${b.spent_amount}</span></span>
                  <span>Limit: <span className="text-slate-300 font-bold">${b.monthly_limit}</span></span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 rounded-full ${
                      b.status === 'OVER_BUDGET'
                        ? 'bg-rose-500'
                        : b.status === 'WARNING'
                        ? 'bg-amber-400'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(100, b.percent_used)}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
                <span className="text-slate-400">Remaining Buffer</span>
                <span className="font-bold text-white">${b.remaining_amount}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="glass-panel max-w-sm w-full p-6 rounded-3xl space-y-4">
            <h3 className="text-lg font-bold text-white">Create Budget Guardrail</h3>
            <form onSubmit={handleCreateBudget} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
                >
                  <option value="Housing">Housing</option>
                  <option value="Food & Dining">Food & Dining</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Education & Books">Education & Books</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Monthly Limit ($)</label>
                <input
                  type="number"
                  required
                  value={monthlyLimit}
                  onChange={(e) => setMonthlyLimit(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
                />
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
                  Create Budget
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
