import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Flame, CheckCircle2 } from 'lucide-react';
export const InsightCard = ({ insight }) => {
    const isWeak = insight.category === 'Weakness';
    const isStreak = insight.category === 'Streak';
    return (<motion.div whileHover={{ y: -2 }} className={`p-4 rounded-2xl border space-y-2 shadow-2xs transition-all ${isWeak
            ? 'bg-amber-50/60 border-amber-200'
            : isStreak
                ? 'bg-orange-50/60 border-orange-200'
                : 'bg-emerald-50/60 border-emerald-200'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider">
          {isWeak ? (<AlertTriangle className="w-4 h-4 text-amber-600"/>) : isStreak ? (<Flame className="w-4 h-4 text-orange-500 fill-orange-500"/>) : (<CheckCircle2 className="w-4 h-4 text-emerald-600"/>)}
          <span className={isWeak ? 'text-amber-900' : isStreak ? 'text-orange-900' : 'text-emerald-900'}>
            {insight.category}
          </span>
        </div>

        <span className="text-xs font-black text-slate-800">{insight.metric}</span>
      </div>

      <h4 className="text-xs md:text-sm font-black text-slate-900 leading-snug">
        {insight.title}
      </h4>
      <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
        {insight.description}
      </p>
    </motion.div>);
};
