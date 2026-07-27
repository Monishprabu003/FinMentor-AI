import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
export const HeroContent = ({ onGetStarted }) => {
    return (<div className="max-w-xl space-y-8 relative z-10">
      {/* AI Badge */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="inline-flex items-center gap-2.5 bg-white border border-blue-100/90 shadow-sm rounded-2xl px-4 py-2">
        <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-white"/>
        </div>
        <span className="text-[11.5px] font-black text-blue-600 uppercase tracking-widest">
          AI Financial OS
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
        <span className="text-[11.5px] text-slate-500 font-semibold">Gemini 1.5 Powered</span>
      </motion.div>

      {/* Main Headline */}
      <div className="space-y-1">
        {[
            { text: 'Track.', color: 'text-slate-900', delay: 0.08 },
            { text: 'Invest.', color: 'bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent', delay: 0.16 },
            { text: 'Succeed.', color: 'text-slate-900', delay: 0.24 },
        ].map(({ text, color, delay }) => (<motion.h1 key={text} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay, ease: 'easeOut' }} className={`text-[64px] sm:text-[76px] xl:text-[84px] font-black leading-[0.94] tracking-tight ${color}`}>
            {text}
          </motion.h1>))}
      </div>

      {/* Subtitle */}
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.35 }} className="text-[16.5px] text-slate-500 leading-relaxed font-normal">
        The premium AI-powered financial operating system. Track expenses, automate your 50/30/20 budget guardrails, simulate SIP wealth growth, and receive personalized AI guidance.
      </motion.p>

      {/* Blue Pill Button matching Landing Page */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.43 }} className="pt-1 flex items-center">
        <button onClick={onGetStarted} className="flex items-center gap-2.5 px-8 py-4 text-[16px] font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 active:scale-[0.98] cursor-pointer">
          <span>Start your financial journey</span>
          <ArrowRight className="w-4.5 h-4.5"/>
        </button>
      </motion.div>
    </div>);
};
