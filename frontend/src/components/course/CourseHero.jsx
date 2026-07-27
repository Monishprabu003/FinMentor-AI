import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Bookmark, Share2, Star, Clock, BookOpen, Zap, Award, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export const CourseHero = ({ course }) => {
    const navigate = useNavigate();
    const [isBookmarked, setIsBookmarked] = useState(course.bookmarked);
    const [copied, setCopied] = useState(false);
    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    const firstLessonId = course.modules[0]?.lessons[0]?.id || 'l1';
    return (<div className={`relative rounded-3xl bg-gradient-to-br ${course.thumbnailGradient} text-white p-6 md:p-10 shadow-xl overflow-hidden mb-8`}>
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"/>
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"/>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        {/* Left 2 Cols: Main Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20">
              {course.category}
            </span>
            <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/30">
              {course.difficulty} Level
            </span>
            {course.hasCertificate && (<span className="text-[11px] font-bold text-amber-300 bg-amber-400/20 border border-amber-400/30 px-3 py-1 rounded-full flex items-center gap-1">
                <Award className="w-3.5 h-3.5"/> Verified Certificate
              </span>)}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            {course.title}
          </h1>

          <p className="text-sm md:text-base text-slate-200 font-medium leading-relaxed max-w-2xl">
            {course.subtitle}
          </p>

          {/* KPI Strip */}
          <div className="flex flex-wrap items-center gap-5 text-xs font-extrabold text-slate-200 pt-2 border-t border-white/15">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-300 fill-amber-300"/>
              <span>{course.rating} ({course.ratingCount.toLocaleString()} ratings)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-300"/>
              <span>{course.durationHours} Hours</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-300"/>
              <span>{course.lessonsCount} Lessons</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-300">
              <Zap className="w-4 h-4 fill-amber-300 text-amber-300"/>
              <span>+{course.xpReward} XP</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button onClick={() => navigate(`/dashboard/learning/course/${course.id}/lesson/${firstLessonId}`)} className="px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-black text-sm shadow-xl flex items-center gap-2.5 transition-all hover:scale-[1.02]">
              <PlayCircle className="w-5 h-5 text-blue-600 fill-blue-600"/>
              <span>{course.progressPercentage > 0 ? 'Resume Course' : 'Start Course Now'}</span>
            </button>

            <button onClick={() => setIsBookmarked((v) => !v)} className={`p-3.5 rounded-2xl border transition-all ${isBookmarked
            ? 'bg-amber-400/20 border-amber-300 text-amber-300'
            : 'bg-black/30 backdrop-blur-md border-white/20 text-white hover:bg-black/40'}`} title="Bookmark Course">
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-amber-300' : ''}`}/>
            </button>

            <button onClick={handleShare} className="p-3.5 rounded-2xl bg-black/30 backdrop-blur-md border border-white/20 text-white hover:bg-black/40 transition-all relative" title="Share Course">
              <Share2 className="w-5 h-5"/>
              {copied && (<span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-extrabold bg-black text-white px-2 py-0.5 rounded shadow">
                  Link Copied!
                </span>)}
            </button>
          </div>
        </div>

        {/* Right Col: Animated Progress Ring Card */}
        <div className="p-6 rounded-3xl bg-black/30 border border-white/15 backdrop-blur-md flex flex-col items-center justify-center text-center space-y-4">
          <div className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
            Course Completion
          </div>

          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-slate-800" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
              <motion.path className="text-blue-400" strokeWidth="3.5" strokeDasharray={`${course.progressPercentage}, 100`} strokeLinecap="round" stroke="currentColor" fill="none" initial={{ strokeDasharray: '0, 100' }} animate={{ strokeDasharray: `${course.progressPercentage}, 100` }} transition={{ duration: 1.5, ease: 'easeOut' }} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-white">{course.progressPercentage}%</span>
              <span className="text-[10px] text-slate-300 font-semibold">Completed</span>
            </div>
          </div>

          <div className="text-xs text-slate-300 font-medium">
            {course.progressPercentage === 100 ? (<span className="text-emerald-300 font-extrabold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4"/> Course Mastered!
              </span>) : (<span>2 of 8 lessons completed</span>)}
          </div>
        </div>
      </div>
    </div>);
};
