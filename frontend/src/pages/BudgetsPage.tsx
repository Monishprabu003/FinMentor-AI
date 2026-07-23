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
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Monthly Category Budgets</h1>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            Set spending guardrails. Statuses are computed deterministically by the backend.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Budget Guardrail</span>
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-500 font-semibold text-sm">Loading budget guardrails...</div>
      ) : budgets.length === 0 ? (
        <div className="bg-white/90 backdrop-blur-xl p-12 rounded-[2rem] border border-slate-200/80 shadow-xl shadow-slate-200/40 text-center space-y-3">
          <PieChart className="w-10 h-10 text-slate-300 mx-auto" />
          <div className="text-slate-900 font-black text-lg">No category budgets defined yet</div>
          <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">
            Create a budget limit for Housing, Food & Dining, or Entertainment to track your monthly burn rate.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {budgets.map((b) => (
            <div key={b.id} className="bg-white/90 backdrop-blur-xl p-6 sm:p-7 rounded-[2rem] border border-slate-200/80 shadow-xl shadow-slate-200/40 space-y-4 hover:border-blue-300 transition-all">
              <div className="flex items-center justify-between">
                <span className="font-black text-slate-900 text-lg tracking-tight">{b.category}</span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  b.status === 'OVER_BUDGET'
                    ? 'bg-rose-50 text-rose-600 border border-rose-200'
                    : b.status === 'WARNING'
                    ? 'bg-amber-50 text-amber-600 border border-amber-200'
                    : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                }`}>
                  {b.status === 'OVER_BUDGET' ? 'Over Budget' : b.status === 'WARNING' ? '85%+ Warn' : 'On Track'}
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-500 font-medium">
                  <span>Spent: <span className="text-slate-900 font-bold">₹{b.spent_amount.toLocaleString('en-IN')}</span></span>
                  <span>Limit: <span className="text-slate-700 font-bold">₹{b.monthly_limit.toLocaleString('en-IN')}</span></span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      b.status === 'OVER_BUDGET'
                        ? 'bg-rose-500'
                        : b.status === 'WARNING'
                        ? 'bg-amber-500'
                        : 'bg-blue-600'
                    }`}
                    style={{ width: `${Math.min(100, b.percent_used)}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100 font-medium">
                <span className="text-slate-400 font-bold uppercase tracking-wider">Remaining Buffer</span>
                <span className="font-black text-slate-900">₹{b.remaining_amount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white max-w-sm w-full p-8 rounded-[2rem] shadow-2xl border border-slate-100 space-y-5">
            <h3 className="text-xl font-black text-slate-900">Create Budget Guardrail</h3>
            <form onSubmit={handleCreateBudget} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500 transition-all"
                >
                  <option value="Housing">Housing</option>
                  <option value="Food & Dining">Food & Dining</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Education & Books">Education & Books</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Monthly Limit (₹)</label>
                <input
                  type="number"
                  required
                  value={monthlyLimit}
                  onChange={(e) => setMonthlyLimit(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
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
