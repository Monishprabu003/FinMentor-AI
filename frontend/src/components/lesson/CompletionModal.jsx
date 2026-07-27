import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Zap, ArrowRight, CheckCircle2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export const CompletionModal = ({ isOpen, onClose, xpEarned, courseId, lessonTitle, }) => {
    const navigate = useNavigate();
    return (<AnimatePresence>
      {isOpen && (<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div initial={{ scale: 0.8, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: 20 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }} className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-6 text-center space-y-5 text-zinc-100 shadow-2xl relative overflow-hidden">
            {/* Background Light Glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"/>

            {/* Close button */}
            <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 transition-colors">
              <X className="w-4 h-4"/>
            </button>

            {/* Trophy Icon */}
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-zinc-950 shadow-xl shadow-amber-500/20">
              <Trophy className="w-10 h-10 fill-zinc-950"/>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                Lesson Completed!
              </span>
              <h2 className="text-2xl font-black tracking-tight text-white mt-2">{lessonTitle}</h2>
              <p className="text-xs text-zinc-400 font-medium">You are 1 step closer to financial independence!</p>
            </div>

            {/* Rewards Card */}
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-center">
                <div className="text-[10px] font-extrabold uppercase text-amber-400">XP Reward</div>
                <div className="text-xl font-black text-amber-300 flex items-center justify-center gap-1 mt-0.5">
                  <Zap className="w-4 h-4 fill-amber-400 text-amber-400"/>
                  <span>+{xpEarned} XP</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/30 text-center">
                <div className="text-[10px] font-extrabold uppercase text-blue-400">Streak Status</div>
                <div className="text-xl font-black text-blue-300 flex items-center justify-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400"/>
                  <span>Active 🔥</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button onClick={() => {
                onClose();
                navigate(`/dashboard/learning/course/${courseId}`);
            }} className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition-all hover:scale-102">
                <span>Continue Course Roadmap</span>
                <ArrowRight className="w-4 h-4"/>
              </button>

              <button onClick={onClose} className="w-full py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 text-xs font-bold transition-all">
                Stay on Lesson Page
              </button>
            </div>
          </motion.div>
        </div>)}
    </AnimatePresence>);
};
