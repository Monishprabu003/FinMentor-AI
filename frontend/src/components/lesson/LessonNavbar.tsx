import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bot, FileText, Bookmark, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LessonNavbarProps {
  courseId: string;
  courseTitle: string;
  moduleTitle: string;
  progressPercentage: number;
  onToggleAITutor: () => void;
  onToggleNotes: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export const LessonNavbar: React.FC<LessonNavbarProps> = ({
  courseId,
  courseTitle,
  moduleTitle,
  progressPercentage,
  onToggleAITutor,
  onToggleNotes,
  isBookmarked,
  onToggleBookmark,
}) => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-40 bg-[#09090b]/90 backdrop-blur-xl border-b border-zinc-800/80 text-zinc-100">
      {/* Reading Progress Line Bar */}
      <div className="w-full h-1 bg-zinc-900 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400"
          style={{ width: `${progressPercentage}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 h-13 flex items-center justify-between gap-4">
        {/* Left: Back button & Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/dashboard/learning/course/${courseId}`)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-bold transition-all border border-zinc-800"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exit Reader</span>
          </button>

          <div className="h-4 w-px bg-zinc-800 hidden sm:block" />

          <div className="hidden md:block">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider truncate max-w-[200px]">
              {moduleTitle}
            </p>
            <p className="text-xs font-extrabold text-zinc-300 truncate max-w-[250px]">
              {courseTitle}
            </p>
          </div>
        </div>

        {/* Center: Progress Indicator Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-400">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>{progressPercentage}% Completed</span>
        </div>

        {/* Right: Reader Toolbar (AI Tutor, Notes, Bookmark, Share) */}
        <div className="flex items-center gap-2">
          {/* Notes Toggle Drawer */}
          <button
            onClick={onToggleNotes}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-bold text-zinc-300 hover:text-white transition-all"
            title="Personal Notes"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden lg:inline">Notes</span>
          </button>

          {/* AI Tutor Toggle Drawer */}
          <button
            onClick={onToggleAITutor}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-xs font-black text-blue-400 hover:text-blue-300 transition-all shadow-xs"
            title="AI Tutor Coach"
          >
            <Bot className="w-3.5 h-3.5 text-blue-400" />
            <span>AI Tutor</span>
          </button>

          {/* Bookmark Button */}
          <button
            onClick={onToggleBookmark}
            className={`p-2 rounded-xl border transition-all ${
              isBookmarked
                ? 'bg-amber-400/20 border-amber-400/40 text-amber-400'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
            title="Bookmark Lesson"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
