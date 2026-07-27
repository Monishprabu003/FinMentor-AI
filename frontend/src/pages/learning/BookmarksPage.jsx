import React from 'react';
import { Bookmark } from 'lucide-react';
import { LearningLayout } from '../../components/learning/LearningLayout';
import { CourseCard } from '../../components/learning/CourseCard';
import { BookCard } from '../../components/learning/BookCard';
import { POPULAR_COURSES, LIBRARY_RESOURCES } from '../../constants/learningData';
export const BookmarksPage = () => {
    const bookmarkedCourses = POPULAR_COURSES.filter((c) => c.bookmarked);
    const bookmarkedResources = LIBRARY_RESOURCES.filter((r) => r.bookmarked);
    return (<LearningLayout>
      <div className="max-w-6xl mx-auto space-y-6 pb-12">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-blue-600 fill-blue-600"/>
            <span>Your Saved Bookmarks</span>
          </h1>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            Saved courses, book summaries, and guides for quick reference.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-base font-black text-slate-800 mb-3">Bookmarked Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookmarkedCourses.map((c) => (<CourseCard key={c.id} course={c}/>))}
            </div>
          </div>

          <div>
            <h2 className="text-base font-black text-slate-800 mb-3">Saved Library Resources</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookmarkedResources.map((r) => (<BookCard key={r.id} item={r}/>))}
            </div>
          </div>
        </div>
      </div>
    </LearningLayout>);
};
