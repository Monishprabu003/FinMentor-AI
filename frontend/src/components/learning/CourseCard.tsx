import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Star, Bookmark, PlayCircle, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Course } from '../../types/learning';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(course.bookmarked);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked((prev) => !prev);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={() => navigate(`/dashboard/learning/course/${course.id}`)}
      className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Thumbnail gradient banner */}
        <div
          className={`h-28 rounded-xl bg-gradient-to-br ${course.thumbnailGradient} p-3 text-white flex flex-col justify-between mb-4 shadow-inner relative overflow-hidden`}
        >
          <div className="flex items-center justify-between z-10">
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/30 backdrop-blur-md border border-white/20">
              {course.category}
            </span>
            <button
              onClick={toggleBookmark}
              className="p-1.5 rounded-lg bg-black/30 backdrop-blur-md hover:bg-black/50 transition-colors text-white"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-100 z-10">
            <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>{course.rating}</span>
            <span className="text-white/60 font-medium">({course.studentsEnrolled.toLocaleString()} students)</span>
          </div>
        </div>

        <div className="space-y-1.5 mb-4">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
            <span className="uppercase tracking-wider">{course.difficulty}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {course.durationHours} hrs
            </span>
          </div>
          <h3 className="text-base font-black text-slate-900 leading-snug">
            {course.title}
          </h3>
          <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">
            {course.description}
          </p>
        </div>
      </div>

      <div className="space-y-3 pt-2 border-t border-slate-100">
        {course.progressPercentage > 0 ? (
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-extrabold">
              <span className="text-slate-500">Progress</span>
              <span className="text-blue-600">{course.progressPercentage}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${course.progressPercentage}%` }}
              />
            </div>
          </div>
        ) : null}

        <button
          className={`w-full py-2.5 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all ${
            course.progressPercentage > 0
              ? 'bg-blue-600 text-white shadow-xs hover:bg-blue-700'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          {course.progressPercentage === 100 ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Completed</span>
            </>
          ) : course.progressPercentage > 0 ? (
            <>
              <PlayCircle className="w-4 h-4" />
              <span>Resume Course</span>
            </>
          ) : (
            <>
              <PlayCircle className="w-4 h-4" />
              <span>Start Course</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};
