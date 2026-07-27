import React from 'react';
import { Clock, Zap, BookOpen } from 'lucide-react';
export const LessonHeader = ({ lesson }) => {
    return (<header className="space-y-4 pb-8 border-b border-zinc-800/80 mb-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
          Lesson {lesson.lessonNumber} of {lesson.totalLessonsInCourse}
        </span>

        <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
          {lesson.difficulty} Level
        </span>

        <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 fill-amber-300"/> +{lesson.xpReward} XP Reward
        </span>
      </div>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-100 tracking-tight leading-tight">
        {lesson.title}
      </h1>

      <p className="text-base md:text-lg text-zinc-400 font-medium leading-relaxed">
        {lesson.subtitle}
      </p>

      <div className="flex items-center gap-4 text-xs font-semibold text-zinc-400 pt-2">
        <span className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-blue-400"/> {lesson.readingTimeMinutes} min read
        </span>
        <span>•</span>
        <span className="flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-indigo-400"/> Interactive Notion Reader
        </span>
      </div>
    </header>);
};
