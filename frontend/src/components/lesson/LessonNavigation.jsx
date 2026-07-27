import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export const LessonNavigation = ({ courseId, currentLessonNumber, onCompleteLesson, isCompleted, }) => {
    const navigate = useNavigate();
    return (<div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 my-8">
      {/* Previous Lesson Button */}
      <button disabled={currentLessonNumber <= 1} onClick={() => navigate(`/dashboard/learning/course/${courseId}`)} className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed text-zinc-300 font-extrabold text-xs flex items-center justify-center gap-2 transition-all">
        <ArrowLeft className="w-4 h-4"/>
        <span>Previous Lesson</span>
      </button>

      {/* Complete & Claim XP CTA */}
      <button onClick={onCompleteLesson} className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-black text-sm shadow-xl flex items-center justify-center gap-2.5 transition-all hover:scale-102 cursor-pointer">
        <CheckCircle2 className="w-5 h-5 text-emerald-300"/>
        <span>{isCompleted ? 'Review Completed Lesson' : 'Complete Lesson & Claim +75 XP'}</span>
      </button>

      {/* Next Lesson Button */}
      <button onClick={() => navigate(`/dashboard/learning/course/${courseId}`)} className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-extrabold text-xs flex items-center justify-center gap-2 transition-all">
        <span>Next Lesson</span>
        <ArrowRight className="w-4 h-4"/>
      </button>
    </div>);
};
