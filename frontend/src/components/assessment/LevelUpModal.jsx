import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Award, Sparkles, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export const LevelUpModal = ({ isOpen, onClose, newLevel, levelTitle, badgesUnlocked = ['Budget Master'], }) => {
    const navigate = useNavigate();
    return (<AnimatePresence>
      {isOpen && (<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div initial={{ scale: 0.7, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.7, opacity: 0, y: 30 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }} className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-6 text-center space-y-5 text-zinc-100 shadow-2xl relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"/>

            <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 transition-colors">
              <X className="w-4 h-4"/>
            </button>

            {/* Level Badge Icon */}
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 flex items-center justify-center text-zinc-950 shadow-xl shadow-amber-500/30">
              <Trophy className="w-10 h-10 fill-zinc-950"/>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                LEVEL UP UNLOCKED!
              </span>
              <h2 className="text-3xl font-black text-white mt-2">Level {newLevel}</h2>
              <p className="text-sm font-extrabold text-amber-300">{levelTitle}</p>
            </div>

            {/* Unlocked Badges */}
            {badgesUnlocked.length > 0 && (<div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                <div className="text-[10px] font-extrabold uppercase text-zinc-400 flex items-center justify-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400"/>
                  <span>New Badges Unlocked</span>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {badgesUnlocked.map((badge, i) => (<span key={i} className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5"/> {badge}
                    </span>))}
                </div>
              </div>)}

            <button onClick={() => {
                onClose();
                navigate('/dashboard/learning/badges');
            }} className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-zinc-950 font-black text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all hover:scale-102 cursor-pointer">
              <span>View Badges & Rewards</span>
              <ArrowRight className="w-4 h-4"/>
            </button>
          </motion.div>
        </div>)}
    </AnimatePresence>);
};
