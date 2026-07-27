import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Sparkles, BookOpen, Lightbulb } from 'lucide-react';
export const AIHintPanel = ({ isOpen, onClose, question }) => {
    return (<AnimatePresence>
      {isOpen && (<motion.div initial={{ x: 380, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 380, opacity: 0 }} transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }} className="fixed right-0 top-14 bottom-0 w-96 bg-zinc-950 border-l border-zinc-800 text-zinc-100 shadow-2xl z-50 flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <Bot className="w-4 h-4"/>
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-zinc-100">AI Diagnostic Coach</h3>
                <p className="text-[10.5px] font-semibold text-zinc-400">Non-Spoilative Conceptual Guidance</p>
              </div>
            </div>

            <button onClick={onClose} className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 transition-colors">
              <X className="w-4 h-4"/>
            </button>
          </div>

          {/* Hint Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-950/60 to-indigo-950/60 border border-blue-500/30 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase text-amber-400">
                <Lightbulb className="w-4 h-4 fill-amber-400 text-amber-400"/>
                <span>Conceptual Hint</span>
              </div>
              <p className="text-xs md:text-sm text-zinc-200 font-medium leading-relaxed">
                "{question.hint}"
              </p>
            </div>

            {question.referenceLessonTitle && (<div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase text-blue-400">
                  <BookOpen className="w-4 h-4"/>
                  <span>Reference Academy Lesson</span>
                </div>
                <p className="text-xs font-extrabold text-zinc-100">
                  {question.referenceLessonTitle}
                </p>
                <p className="text-[11px] text-zinc-400 font-semibold">
                  Reviewing this lesson will clarify the underlying financial rule.
                </p>
              </div>)}

            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase text-amber-400">
                <Sparkles className="w-3.5 h-3.5"/>
                <span>Exam Integrity</span>
              </div>
              <p className="text-[11px] text-zinc-400 font-medium leading-relaxed">
                Our AI tutor never reveals the exact answer directly during live assessments to preserve certificate validity.
              </p>
            </div>
          </div>

          <div className="p-4 border-t border-zinc-800 bg-zinc-900/60">
            <button onClick={onClose} className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition-all">
              Back to Exam
            </button>
          </div>
        </motion.div>)}
    </AnimatePresence>);
};
