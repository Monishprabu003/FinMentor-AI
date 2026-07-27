import React, { useState } from 'react';
import { BookOpen, Search } from 'lucide-react';
import { LearningLayout } from '../../components/learning/LearningLayout';
import { BookCard } from '../../components/learning/BookCard';
import { LIBRARY_RESOURCES } from '../../constants/learningData';
export const LibraryPage = () => {
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const filtered = LIBRARY_RESOURCES.filter((item) => {
        const matchFilter = filter === 'All' || item.type === filter;
        const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.authorOrSource.toLowerCase().includes(search.toLowerCase()) ||
            item.summary.toLowerCase().includes(search.toLowerCase());
        return matchFilter && matchSearch;
    });
    return (<LearningLayout>
      <div className="max-w-6xl mx-auto space-y-6 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-emerald-600"/>
              <span>Digital Finance Library</span>
            </h1>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              Curated book summaries, calculators, tax guides, and investment research papers.
            </p>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"/>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search library..." className="pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-2xs"/>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {['All', 'Book', 'Guide', 'Template', 'Calculator'].map((type) => (<button key={type} onClick={() => setFilter(type)} className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all shrink-0 ${filter === type
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>
              {type}
            </button>))}
        </div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (<BookCard key={item.id} item={item}/>))}
        </div>
      </div>
    </LearningLayout>);
};
