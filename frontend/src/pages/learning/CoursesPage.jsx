import React, { useState } from 'react';
import { GraduationCap, Search } from 'lucide-react';
import { LearningLayout } from '../../components/learning/LearningLayout';
import { CourseCard } from '../../components/learning/CourseCard';
import { POPULAR_COURSES } from '../../constants/learningData';
export const CoursesPage = () => {
    const [category, setCategory] = useState('All');
    const [search, setSearch] = useState('');
    const categories = [
        'All',
        'Budgeting',
        'Saving',
        'Investing',
        'Taxes',
        'Insurance',
        'Mutual Funds',
        'Stock Market',
    ];
    const filteredCourses = POPULAR_COURSES.filter((c) => {
        const matchCat = category === 'All' || c.category === category;
        const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
            c.description.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });
    return (<LearningLayout>
      <div className="max-w-6xl mx-auto space-y-6 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-indigo-600"/>
              <span>Interactive Course Catalog</span>
            </h1>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              Master specific financial skills with hands-on modules, spreadsheets, and quizzes.
            </p>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"/>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search courses..." className="pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-2xs"/>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (<button key={cat} onClick={() => setCategory(cat)} className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all shrink-0 ${category === cat
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>
              {cat}
            </button>))}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map((course) => (<CourseCard key={course.id} course={course}/>))}
        </div>
      </div>
    </LearningLayout>);
};
