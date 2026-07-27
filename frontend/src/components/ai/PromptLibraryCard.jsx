import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
export const PromptLibraryCard = ({ prompt, onUsePrompt }) => {
    return (<motion.div whileHover={{ y: -3 }} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            {prompt.category}
          </span>
          <span className="text-[10px] font-bold text-slate-400">
            🔥 Used {prompt.popularCount.toLocaleString()} times
          </span>
        </div>

        <h3 className="text-sm font-black text-slate-900 leading-snug">{prompt.title}</h3>
        <p className="text-xs text-slate-500 font-medium leading-relaxed">{prompt.description}</p>
      </div>

      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
        <button onClick={() => onUsePrompt(prompt.promptText)} className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300"/>
          <span>Ask AI This Prompt</span>
        </button>
      </div>
    </motion.div>);
};
