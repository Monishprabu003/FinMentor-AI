import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Clock, PieChart, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { POPULAR_COURSES } from '../../constants/learningData';
export const ContinueLearningCard = () => {
    const navigate = useNavigate();
    const currentCourse = POPULAR_COURSES[0]; // 50/30/20 Budgeting Masterclass
    return (<motion.div whileHover={{ y: -2 }} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"/>
          <span className="text-xs font-black uppercase tracking-wider text-emerald-700">
            Resume Active Course
          </span>
        </div>
        <span className="text-xs font-bold text-slate-400">
          Last active: 2 hours ago
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shrink-0">
            <PieChart className="w-7 h-7"/>
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 leading-tight">
              {currentCourse.title}
            </h3>
            <p className="text-xs font-semibold text-slate-500 mt-1 flex items-center gap-3">
              <span>Next: Module 1 · Lesson 3 (Setting Up Your Bank Buckets)</span>
              <span className="flex items-center gap-1 text-slate-400">
                <Clock className="w-3.5 h-3.5"/> 18 mins
              </span>
            </p>
          </div>
        </div>

        <button onClick={() => navigate(`/dashboard/learning/course/${currentCourse.id}`)} className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shrink-0">
          <PlayCircle className="w-4 h-4 fill-white text-blue-600"/>
          <span>Continue Lesson 3</span>
          <ArrowRight className="w-4 h-4"/>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5 pt-2">
        <div className="flex justify-between text-xs font-bold text-slate-600">
          <span>Overall Course Progress</span>
          <span className="text-blue-600">{currentCourse.progressPercentage}% Completed</span>
        </div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" initial={{ width: 0 }} animate={{ width: `${currentCourse.progressPercentage}%` }} transition={{ duration: 1, ease: 'easeOut' }}/>
        </div>
      </div>
    </motion.div>);
};
