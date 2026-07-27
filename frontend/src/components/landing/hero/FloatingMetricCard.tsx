import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck, Sparkles,
  CheckCircle2, PieChart, ArrowUpRight
} from 'lucide-react';

/* ── Tiny Animated SVG Line Chart ── */
const MiniLineChart: React.FC = () => (
  <div className="w-20 h-7 relative">
    <svg className="w-full h-full overflow-visible" viewBox="0 0 80 28" fill="none">
      <defs>
        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M 0 22 Q 15 18 25 12 T 50 14 T 80 4 L 80 28 L 0 28 Z"
        fill="url(#chartFill)"
      />
      <motion.path
        d="M 0 22 Q 15 18 25 12 T 50 14 T 80 4"
        stroke="#2563eb"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
      />
    </svg>
  </div>
);

export type MetricType =
  | 'score'
  | 'budget'
  | 'savings'
  | 'investment'
  | 'expenses'
  | 'insights';

interface FloatingMetricCardProps {
  type: MetricType;
  className?: string;
  style?: React.CSSProperties;
  floatDelay?: number;
  floatDuration?: number;
}

export const FloatingMetricCard: React.FC<FloatingMetricCardProps> = ({
  type,
  className = '',
  style = {},
  floatDelay = 0,
  floatDuration = 4.5,
}) => {
  return (
    <motion.div
      style={style}
      animate={{ y: [0, -7, 0] }}
      transition={{
        duration: floatDuration,
        delay: floatDelay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={{ scale: 1.05, y: -4, transition: { duration: 0.2 } }}
      className={`absolute bg-white/95 backdrop-blur-xl border border-slate-100/90 rounded-2xl shadow-xl shadow-slate-200/40 p-3.5 sm:p-4 select-none cursor-pointer z-20 hover:border-blue-200 transition-colors ${className}`}
    >
      {/* 1. FINANCIAL SCORE CARD */}
      {type === 'score' && (
        <div className="flex items-center gap-3 min-w-[170px]">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
            <span className="text-sm font-black text-blue-600">92</span>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-black text-slate-900 uppercase tracking-wider">Financial Score</span>
              <Sparkles className="w-3 h-3 text-amber-500" />
            </div>
            <span className="text-[11px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full inline-block mt-0.5">
              Excellent
            </span>
          </div>
        </div>
      )}

      {/* 2. BUDGET HEALTH CARD */}
      {type === 'budget' && (
        <div className="flex items-center gap-3 min-w-[175px]">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
            <PieChart className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-black text-slate-900 uppercase tracking-wider">Budget Health</span>
              <span className="text-[12px] font-black text-blue-600">88%</span>
            </div>
            <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden mt-1 flex gap-0.5">
              <div className="h-full bg-blue-500 rounded-l-full" style={{ width: '50%' }} />
              <div className="h-full bg-indigo-400" style={{ width: '30%' }} />
              <div className="h-full bg-emerald-400 rounded-r-full" style={{ width: '20%' }} />
            </div>
          </div>
        </div>
      )}

      {/* 3. MONTHLY SAVINGS CARD */}
      {type === 'savings' && (
        <div className="flex items-center justify-between gap-3 min-w-[175px]">
          <div>
            <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block">Monthly Savings</span>
            <span className="text-base font-black text-slate-900 block tracking-tight">₹12,450</span>
          </div>
          <span className="inline-flex items-center text-[11px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-xl">
            +12% <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
          </span>
        </div>
      )}

      {/* 4. INVESTMENT GROWTH CARD */}
      {type === 'investment' && (
        <div className="flex items-center gap-3 min-w-[190px]">
          <div>
            <div className="flex items-center justify-between gap-2 mb-0.5">
              <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider">Investment</span>
              <span className="text-[10px] font-bold text-slate-400">6 Months</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-black text-slate-900">+18.2%</span>
              <span className="text-[10px] font-bold text-blue-600">CAGR</span>
            </div>
          </div>
          <MiniLineChart />
        </div>
      )}

      {/* 5. EXPENSE TRACKER CARD */}
      {type === 'expenses' && (
        <div className="flex items-center gap-3 min-w-[185px]">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <span className="text-[11px] font-black text-slate-900 block leading-tight">Expense Tracker</span>
            <span className="text-[10.5px] font-medium text-slate-400 block mt-0.5">42 Auto-tagged</span>
          </div>
        </div>
      )}

      {/* 6. SMART INSIGHTS CARD */}
      {type === 'insights' && (
        <div className="flex items-center gap-3 min-w-[180px]">
          <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <span className="text-[11px] font-black text-slate-900 block leading-tight">Emergency Fund</span>
            <span className="text-[10.5px] font-bold text-emerald-600 block mt-0.5">₹3L Target On Track</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};
