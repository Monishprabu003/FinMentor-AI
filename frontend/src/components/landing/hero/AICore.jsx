import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp } from 'lucide-react';
export const AICore = () => (<div className="relative flex items-center justify-center pointer-events-none select-none z-10">
    {/* Expanding background pulse aura 1 */}
    <motion.div className="absolute w-44 h-44 rounded-full bg-blue-600/20 border border-blue-500/30" animate={{ scale: [1, 1.45, 1], opacity: [0.5, 0.1, 0.5] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}/>

    {/* Expanding background pulse aura 2 */}
    <motion.div className="absolute w-56 h-56 rounded-full bg-indigo-500/15 border border-indigo-400/20" animate={{ scale: [1, 1.35, 1], opacity: [0.4, 0.05, 0.4] }} transition={{ duration: 3.2, delay: 0.8, repeat: Infinity, ease: 'easeInOut' }}/>

    {/* Outer glass ring */}
    <div className="w-36 h-36 rounded-full p-2.5 bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-blue-600/20 backdrop-blur-md border border-blue-300/40 shadow-[0_0_50px_rgba(37,99,235,0.3)] flex items-center justify-center">
      {/* Inner glowing core button */}
      <motion.div className="w-full h-full rounded-full bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 border border-blue-400/50 shadow-xl flex flex-col items-center justify-center text-white relative overflow-hidden" animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}>
        {/* Internal metallic light beam overlay */}
        <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full pointer-events-none opacity-40 blur-xl" style={{ background: 'radial-gradient(circle, #60A5FA 0%, transparent 70%)' }}/>

        <div className="relative z-10 flex flex-col items-center">
          <div className="flex items-center gap-1 mb-0.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-200 animate-pulse"/>
            <TrendingUp className="w-4 h-4 text-white" strokeWidth={2.5}/>
          </div>
          <span className="text-[14px] font-black tracking-tight leading-none text-white block">
            FinMentor
          </span>
          <span className="text-[9.5px] font-extrabold text-blue-200 tracking-widest uppercase block mt-0.5">
            AI CORE
          </span>
        </div>
      </motion.div>
    </div>
  </div>);
