import React, { useState } from 'react';
import { Compass, Search } from 'lucide-react';
import { LearningLayout } from '../../components/learning/LearningLayout';
import { LearningPathCard } from '../../components/learning/LearningPathCard';
import { LEARNING_PATHS } from '../../constants/learningData';

export const LearningPathsPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const filteredPaths = LEARNING_PATHS.filter((p) => {
    const matchesFilter =
      filter === 'All' ||
      (filter === 'Unlocked' && p.unlocked) ||
      (filter === 'Completed' && p.completionPercentage === 100) ||
      p.difficulty === filter;
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <LearningLayout>
      <div className="max-w-6xl mx-auto space-y-6 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Compass className="w-6 h-6 text-blue-600" />
              <span>15 Financial Learning Roadmaps</span>
            </h1>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              Structured step-by-step paths from zero financial literacy to complete independence.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search 15 roadmaps..."
                className="pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-2xs"
              />
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {['All', 'Unlocked', 'Completed', 'Beginner', 'Intermediate', 'Advanced'].map((cat) => (
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

        {/* Grid of 15 Paths */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPaths.map((path) => (
            <LearningPathCard key={path.id} path={path} />
          ))}
        </div>
      </div>
    </LearningLayout>
  );
};
