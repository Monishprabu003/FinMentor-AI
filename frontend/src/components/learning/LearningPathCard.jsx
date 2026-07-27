import React from 'react';
import { motion } from 'framer-motion';
import { Clock, BookOpen, Lock, CheckCircle2, ChevronRight, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export const LearningPathCard = ({ path }) => {
    const navigate = useNavigate();
    return (<motion.div whileHover={{ y: -4 }} onClick={() => {
            if (path.unlocked)
                navigate(`/dashboard/learning/path/${path.id}`);
        }} className={`relative p-5 rounded-2xl border transition-all duration-200 shadow-2xs flex flex-col justify-between ${path.unlocked
            ? 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md cursor-pointer'
            : 'bg-slate-50 border-slate-200/60 opacity-70 cursor-not-allowed'}`}>
      <div>
        {/* Header row */}
        <div className="flex items-center justify-between mb-3">
          <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${path.difficulty === 'Beginner'
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
            : path.difficulty === 'Intermediate'
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-purple-50 text-purple-700 border-purple-200'}`}>
            {path.difficulty}
          </span>

          <div className="flex items-center gap-1.5">
            {path.hasCertificate && (<span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Award className="w-3 h-3 text-amber-500"/> Certificate
              </span>)}
            {!path.unlocked && <Lock className="w-3.5 h-3.5 text-slate-400"/>}
            {path.completionPercentage === 100 && (<CheckCircle2 className="w-4 h-4 text-emerald-500"/>)}
          </div>
        </div>

        <h3 className="text-base font-black text-slate-900 leading-snug mb-1">
          {path.title}
        </h3>
        <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4 line-clamp-2">
          {path.description}
        </p>
      </div>

      {/* Footer details & progress */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5"/> {path.durationHours} hrs
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5"/> {path.lessonsCount} lessons
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-[11px] font-extrabold">
            <span className="text-slate-500">Roadmap Progress</span>
            <span className={path.completionPercentage === 100 ? 'text-emerald-600' : 'text-blue-600'}>
              {path.completionPercentage}%
            </span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-500 ${path.completionPercentage === 100 ? 'bg-emerald-500' : 'bg-blue-600'}`} style={{ width: `${path.completionPercentage}%` }}/>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-extrabold pt-1">
          <span className="text-slate-600">
            {path.unlocked ? (path.completionPercentage === 100 ? 'Review Path' : 'Continue Path') : 'Locked'}
          </span>
          <ChevronRight className="w-4 h-4 text-blue-600"/>
        </div>
      </div>
    </motion.div>);
};
