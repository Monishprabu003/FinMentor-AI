import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-10 px-6 text-slate-400 text-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-slate-950" />
          </div>
          <span className="font-bold text-slate-200">FinMentor</span>
          <span className="text-slate-500">| AI-Powered Financial Literacy & Money Platform</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Strict Backend Deterministic Math</span>
          </div>
          <span>© 2026 FinMentor AI</span>
        </div>
      </div>
    </footer>
  );
};
