import React, { useEffect, useState } from 'react';
import { BookOpen, CheckCircle2, Sparkles } from 'lucide-react';
import { api } from '../services/api';
import type { FinanceBook } from '../types';
import { useNavigate } from 'react-router-dom';

export const BooksLibraryPage: React.FC = () => {
  const [books, setBooks] = useState<FinanceBook[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get('/learn/books');
        setBooks(res.data);
      } catch (err) {
        console.error('Error fetching finance books:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Foundational Finance Book Library</h1>
          <p className="text-xs text-slate-400">
            Curated summaries and practical action checklists from personal finance classics
          </p>
        </div>
        <button
          onClick={() => navigate('/ai')}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-xs shadow-glow-emerald hover:opacity-90 transition-opacity flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ask AI to Summarize a Book</span>
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400 text-sm">Loading book library...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {books.map((b) => (
            <div
              key={b.id}
              className="glass-card p-6 sm:p-7 rounded-3xl border border-slate-800 space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-emerald-400 border border-slate-700">
                      {b.difficulty}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-2">{b.title}</h3>
                    <div className="text-xs text-slate-400">by {b.author}</div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                </div>

                <p className="text-xs text-emerald-300 italic">"{b.tagline}"</p>

                <p className="text-xs text-slate-300 leading-relaxed">{b.summary}</p>

                {/* Key Takeaways */}
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                    Core Insights
                  </div>
                  <ul className="space-y-1.5">
                    {b.key_takeaways.map((takeaway, i) => (
                      <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Checklist */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/90 space-y-2.5">
                <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                  Young Professional Action Checklist
                </div>
                <ul className="space-y-2">
                  {b.action_checklist.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
