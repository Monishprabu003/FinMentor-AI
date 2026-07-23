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
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Foundational Finance Book Library</h1>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            Curated summaries and practical action checklists from personal finance classics
          </p>
        </div>
        <button
          onClick={() => navigate('/ai')}
          className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 transition-all flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span>Ask AI to Summarize a Book</span>
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-500 font-semibold text-sm">Loading book library...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {books.map((b) => (
            <div
              key={b.id}
              className="bg-white/90 backdrop-blur-xl p-7 sm:p-8 rounded-[2rem] border border-slate-200/80 shadow-xl shadow-slate-200/40 space-y-6 flex flex-col justify-between hover:border-blue-300 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-black px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 uppercase tracking-wider">
                      {b.difficulty}
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-3">{b.title}</h3>
                    <div className="text-xs font-bold text-slate-400 mt-0.5">by {b.author}</div>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-xs">
                    <BookOpen className="w-6 h-6" />
                  </div>
                </div>

                <p className="text-sm font-bold text-blue-600 italic">"{b.tagline}"</p>

                <p className="text-sm text-slate-600 font-medium leading-relaxed">{b.summary}</p>

                {/* Key Takeaways */}
                <div className="space-y-2.5 pt-2">
                  <div className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    Core Insights
                  </div>
                  <ul className="space-y-2">
                    {b.key_takeaways.map((takeaway, i) => (
                      <li key={i} className="text-xs text-slate-600 font-medium flex items-start gap-2.5">
                        <span className="text-blue-600 font-bold shrink-0">•</span>
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Checklist */}
              <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-3">
                <div className="text-xs font-black text-blue-700 uppercase tracking-wider">
                  Young Professional Action Checklist
                </div>
                <ul className="space-y-2">
                  {b.action_checklist.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
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
