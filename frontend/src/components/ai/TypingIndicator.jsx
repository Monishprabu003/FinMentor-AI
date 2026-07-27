import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
export const TypingIndicator = () => {
    return (<div className="flex items-center gap-3 max-w-xl mr-auto">
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-xs">
        <Bot className="w-4 h-4"/>
      </div>

      <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 rounded-tl-none flex items-center gap-1.5 shadow-xs">
        <span className="text-xs font-semibold text-zinc-400">FinMentor AI is reasoning</span>
        <div className="flex items-center gap-1 ml-1">
          <motion.div className="w-1.5 h-1.5 rounded-full bg-blue-400" animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}/>
          <motion.div className="w-1.5 h-1.5 rounded-full bg-blue-400" animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}/>
          <motion.div className="w-1.5 h-1.5 rounded-full bg-blue-400" animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}/>
        </div>
      </div>
    </div>);
};
