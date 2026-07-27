import React, { useEffect, useState } from 'react';
import { Plus, Search, Trash2, ArrowUpRight, ArrowDownRight, Receipt } from 'lucide-react';
import { api } from '../services/api';
export const TransactionsPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState('All');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [showModal, setShowModal] = useState(false);
    // Form State
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('EXPENSE');
    const [category, setCategory] = useState('Food & Dining');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [notes, setNotes] = useState('');
    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (typeFilter !== 'All')
                params.append('type', typeFilter);
            if (categoryFilter !== 'All')
                params.append('category', categoryFilter);
            if (searchQuery)
                params.append('search', searchQuery);
            const res = await api.get(`/transactions?${params.toString()}`);
            setTransactions(res.data);
        }
        catch (err) {
            console.error('Error fetching transactions:', err);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchTransactions();
    }, [typeFilter, categoryFilter, searchQuery]);
    const handleCreateTransaction = async (e) => {
        e.preventDefault();
        if (!title || !amount)
            return;
        try {
            await api.post('/transactions', {
                title,
                amount: parseFloat(amount),
                type,
                category,
                date,
                notes
            });
            setShowModal(false);
            setTitle('');
            setAmount('');
            fetchTransactions();
        }
        catch (err) {
            console.error('Error creating transaction:', err);
        }
    };
    const handleDeleteTransaction = async (id) => {
        try {
            await api.delete(`/transactions/${id}`);
            setTransactions((prev) => prev.filter((tx) => tx.id !== id));
        }
        catch (err) {
            console.error('Error deleting transaction:', err);
        }
    };
    const categories = [
        'All',
        'Salary',
        'Freelance',
        'Housing',
        'Food & Dining',
        'Transportation',
        'Education & Books',
        'Entertainment',
        'Savings & Investments'
    ];
    return (<div className="p-6 md:p-10 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Income & Expense Ledger</h1>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            All logs immediately update deterministic net cash flow and budget health
          </p>
        </div>
        <button onClick={() => setShowModal(true)} className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 transition-all flex items-center gap-2">
          <Plus className="w-4 h-4"/>
          <span>Add Transaction</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white/90 backdrop-blur-xl p-4 sm:p-5 rounded-[1.75rem] border border-slate-200/80 shadow-xl shadow-slate-200/40 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2"/>
          <input type="text" placeholder="Search by merchant or description..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"/>
        </div>

        <div className="flex items-center gap-3">
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500 transition-all">
            <option value="All">All Types</option>
            <option value="INCOME">Income</option>
            <option value="EXPENSE">Expense</option>
          </select>

          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500 transition-all">
            {categories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] border border-slate-200/80 shadow-xl shadow-slate-200/40 overflow-hidden">
        {loading ? (<div className="p-12 text-center text-slate-500 font-semibold text-sm">Loading transactions...</div>) : transactions.length === 0 ? (<div className="p-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Receipt className="w-6 h-6"/>
            </div>
            <div className="text-slate-600 font-bold text-base">No transactions found</div>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">Try clearing your search query or filters to view your ledger history.</p>
          </div>) : (<div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Transaction</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.map((tx) => (<tr key={tx.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3.5">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${tx.type === 'INCOME'
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                    : 'bg-rose-50 text-rose-600 border border-rose-200'}`}>
                          {tx.type === 'INCOME' ? (<ArrowDownRight className="w-4 h-4"/>) : (<ArrowUpRight className="w-4 h-4"/>)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{tx.title}</div>
                          {tx.notes && <div className="text-xs text-slate-400 font-medium">{tx.notes}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-slate-700 text-xs font-bold">
                        {tx.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs font-medium">
                      {tx.date}
                    </td>
                    <td className={`px-6 py-4 text-right font-black text-base ${tx.type === 'INCOME' ? 'text-emerald-600' : 'text-slate-900'}`}>
                      {tx.type === 'INCOME' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDeleteTransaction(tx.id)} className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors" title="Delete Transaction">
                        <Trash2 className="w-4 h-4"/>
                      </button>
                    </td>
                  </tr>))}
              </tbody>
            </table>
          </div>)}
      </div>

      {/* Add Transaction Modal */}
      {showModal && (<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white max-w-md w-full p-8 rounded-[2rem] shadow-2xl border border-slate-100 space-y-5">
            <h3 className="text-xl font-black text-slate-900">Log New Transaction</h3>
            <form onSubmit={handleCreateTransaction} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Title / Description</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Weekly Groceries or Freelance Payout" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"/>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Amount (₹)</label>
                  <input type="number" step="0.01" required value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"/>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Type</label>
                  <select value={type} onChange={(e) => setType(e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500 transition-all">
                    <option value="EXPENSE">Expense</option>
                    <option value="INCOME">Income</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500 transition-all">
                    {categories.filter(c => c !== 'All').map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Date</label>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-500 transition-all"/>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Notes (Optional)</label>
                <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. Monthly recurring payment" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"/>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/20 transition-all">
                  Save Transaction
                </button>
              </div>
            </form>
          </div>
        </div>)}
    </div>);
};
