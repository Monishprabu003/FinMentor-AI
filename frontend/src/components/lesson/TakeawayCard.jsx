import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
export const TakeawayCard = ({ takeaways }) => {
    return (<div className="p-6 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 text-zinc-100 space-y-4 my-8 shadow-xl">
      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-400">
        <Sparkles className="w-4 h-4 fill-amber-400 text-amber-400"/>
        <span>Core Lesson Takeaways</span>
      </div>

      <h3 className="text-lg font-black tracking-tight">Remember These Rules</h3>

      <div className="space-y-3">
        {takeaways.map((item, idx) => (<div key={idx} className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"/>
            <span className="text-xs md:text-sm font-semibold text-zinc-200 leading-relaxed">{item}</span>
          </div>))}
      </div>
    </div>);
};
