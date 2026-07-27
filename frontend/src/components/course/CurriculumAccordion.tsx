import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, PlayCircle, CheckCircle2, Calculator, HelpCircle, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { CourseModuleItem } from '../../types/course';

interface CurriculumAccordionProps {
  courseId: string;
  modules: CourseModuleItem[];
}

export const CurriculumAccordion: React.FC<CurriculumAccordionProps> = ({ courseId, modules }) => {
  const navigate = useNavigate();
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({ 'mod-1': true });

  const toggleModule = (id: string) => {
    setOpenModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <span>Course Curriculum & Syllabus</span>
          </h3>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">
            {modules.length} modules · {modules.reduce((acc, m) => acc + m.lessons.length, 0)} interactive lessons & quizzes
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {modules.map((mod) => {
          const isOpen = !!openModules[mod.id];
          const completedCount = mod.lessons.filter((l) => l.completed).length;

          return (
            <div key={mod.id} className="rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
              {/* Module Header */}
              <button
                onClick={() => toggleModule(mod.id)}
                className="w-full p-4 bg-slate-50 hover:bg-slate-100/80 transition-colors flex items-center justify-between text-left"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                      Module {mod.moduleNumber}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      {completedCount}/{mod.lessons.length} Completed
                    </span>
                  </div>
                  <h4 className="text-sm font-black text-slate-900 mt-1">{mod.title}</h4>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Lessons List Accordion Content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-3 space-y-1.5 bg-white border-t border-slate-100"
                  >
                    {mod.lessons.map((les) => (
                      <div
                        key={les.id}
                        onClick={() => navigate(`/dashboard/learning/course/${courseId}/lesson/${les.id}`)}
                        className="p-3 rounded-xl hover:bg-blue-50/60 transition-colors flex items-center justify-between cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          {les.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          ) : les.type === 'calculator' ? (
                            <Calculator className="w-4 h-4 text-indigo-600 shrink-0" />
                          ) : les.type === 'quiz' ? (
                            <HelpCircle className="w-4 h-4 text-amber-500 shrink-0" />
                          ) : (
                            <PlayCircle className="w-4 h-4 text-blue-600 shrink-0 group-hover:scale-110 transition-transform" />
                          )}
                          <span className="text-xs font-extrabold text-slate-800 group-hover:text-blue-700 transition-colors">
                            {les.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold text-slate-400">
                            {les.durationMinutes} min
                          </span>
                          <span className="text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                            →
                          </span>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
