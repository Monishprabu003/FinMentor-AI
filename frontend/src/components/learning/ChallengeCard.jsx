import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Coins, CheckCircle2, Clock } from 'lucide-react';
export const ChallengeCard = ({ challenge }) => {
    const [completed, setCompleted] = useState(challenge.completed);
    const handleClaim = () => {
        setCompleted(true);
    };
    return (<motion.div whileHover={{ y: -2 }} className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${completed
            ? 'bg-emerald-50/50 border-emerald-200'
            : 'bg-white border-slate-200 shadow-2xs hover:border-blue-300 hover:shadow-md'}`}>
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            {challenge.category} Quest
          </span>
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3"/> Resets in {challenge.expiresInHours}h
          </span>
        </div>

        <h3 className="text-base font-black text-slate-900 leading-snug mb-1">
          {challenge.title}
        </h3>
        <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4">
          {challenge.description}
        </p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-xs font-extrabold text-amber-600">
            <Zap className="w-4 h-4 fill-amber-400 text-amber-500"/> +{challenge.xpReward} XP
          </span>
          <span className="flex items-center gap-1 text-xs font-extrabold text-amber-700">
            <Coins className="w-4 h-4 text-amber-500"/> +{challenge.coinReward} Coins
          </span>
        </div>

        {completed ? (<span className="flex items-center gap-1 text-xs font-extrabold text-emerald-600 bg-emerald-100 px-3 py-1.5 rounded-xl">
            <CheckCircle2 className="w-4 h-4"/> Claimed!
          </span>) : (<button onClick={handleClaim} className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-xs transition-all hover:scale-[1.03]">
            Complete Quest
          </button>)}
      </div>
    </motion.div>);
};
