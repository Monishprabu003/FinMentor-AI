import React, { useState } from 'react';
import { Sparkles, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AILayout } from '../../components/ai/AILayout';
import { PromptLibraryCard } from '../../components/ai/PromptLibraryCard';
import { MOCK_PROMPT_LIBRARY } from '../../mock/aiData';

export const AIPromptsPage: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const filtered = MOCK_PROMPT_LIBRARY.filter((p) => {
    const matchCat = filter === 'All' || p.category === filter;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <AILayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-500 fill-amber-400" />
              <span>Financial AI Prompt Library</span>
            </h1>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              Curated, high-precision prompts for salary planning, tax analysis, and compounding math.
            </p>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search prompt library..."
              className="pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-2xs"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {['All', 'Budgeting', 'Investing', 'Taxes', 'Calculations'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all shrink-0 ${
                filter === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Prompts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((prompt) => (
            <PromptLibraryCard
              key={prompt.id}
              prompt={prompt}
              onUsePrompt={() => navigate('/dashboard/ai/chat')}
            />
          ))}
        </div>
      </div>
    </AILayout>
  );
};
