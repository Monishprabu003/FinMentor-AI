import React from 'react';
import { Lightbulb, AlertTriangle, Info, Calculator } from 'lucide-react';

interface CalloutBoxProps {
  type: 'tip' | 'warning' | 'info' | 'formula';
  title: string;
  text: string;
  formulaCode?: string;
}

export const CalloutBox: React.FC<CalloutBoxProps> = ({ type, title, text, formulaCode }) => {
  const configs = {
    tip: {
      bg: 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200',
      icon: Lightbulb,
      iconColor: 'text-emerald-400',
      tag: 'Pro Tip',
    },
    warning: {
      bg: 'bg-amber-950/40 border-amber-500/30 text-amber-200',
      icon: AlertTriangle,
      iconColor: 'text-amber-400',
      tag: 'Cautionary Warning',
    },
    info: {
      bg: 'bg-blue-950/40 border-blue-500/30 text-blue-200',
      icon: Info,
      iconColor: 'text-blue-400',
      tag: 'Financial Insight',
    },
    formula: {
      bg: 'bg-indigo-950/40 border-indigo-500/30 text-indigo-200',
      icon: Calculator,
      iconColor: 'text-indigo-400',
      tag: 'Deterministic Formula',
    },
  };

  const cfg = configs[type] || configs.info;
  const IconComponent = cfg.icon;

  return (
    <div className={`p-5 rounded-2xl border ${cfg.bg} space-y-2 my-6 shadow-sm`}>
      <div className="flex items-center gap-2">
        <IconComponent className={`w-4 h-4 ${cfg.iconColor}`} />
        <span className="text-[11px] font-black uppercase tracking-wider">{cfg.tag}</span>
      </div>

      <h4 className="text-sm font-extrabold text-zinc-100">{title}</h4>
      <p className="text-xs md:text-sm font-medium leading-relaxed opacity-90">{text}</p>

      {formulaCode && (
        <div className="mt-3 p-3 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-indigo-300 overflow-x-auto">
          <code>{formulaCode}</code>
        </div>
      )}
    </div>
  );
};
