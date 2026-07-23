import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, PiggyBank, TrendingUp, BarChart2, Receipt, Landmark, ShieldCheck, LifeBuoy } from 'lucide-react';

const cats = [
  { icon: BookOpen,   label: 'Budgeting',       bg: 'bg-blue-50',   ic: 'text-blue-600',   bdr: 'border-blue-100',   hover: 'hover:border-blue-300 hover:bg-blue-100' },
  { icon: PiggyBank,  label: 'Saving',           bg: 'bg-indigo-50', ic: 'text-indigo-600', bdr: 'border-indigo-100', hover: 'hover:border-indigo-300 hover:bg-indigo-100' },
  { icon: TrendingUp, label: 'Investing',        bg: 'bg-blue-50',   ic: 'text-blue-600',   bdr: 'border-blue-100',   hover: 'hover:border-blue-300 hover:bg-blue-100' },
  { icon: BarChart2,  label: 'Mutual Funds',     bg: 'bg-indigo-50', ic: 'text-indigo-600', bdr: 'border-indigo-100', hover: 'hover:border-indigo-300 hover:bg-indigo-100' },
  { icon: Receipt,    label: 'Stocks',           bg: 'bg-blue-50',   ic: 'text-blue-600',   bdr: 'border-blue-100',   hover: 'hover:border-blue-300 hover:bg-blue-100' },
  { icon: Landmark,   label: 'Taxes',            bg: 'bg-indigo-50', ic: 'text-indigo-600', bdr: 'border-indigo-100', hover: 'hover:border-indigo-300 hover:bg-indigo-100' },
  { icon: ShieldCheck,label: 'Insurance',        bg: 'bg-blue-50',   ic: 'text-blue-600',   bdr: 'border-blue-100',   hover: 'hover:border-blue-300 hover:bg-blue-100' },
  { icon: LifeBuoy,   label: 'Emergency Fund',   bg: 'bg-indigo-50', ic: 'text-indigo-600', bdr: 'border-indigo-100', hover: 'hover:border-indigo-300 hover:bg-indigo-100' },
];

export const LearningSection: React.FC = () => (
  <section id="learn" className="py-24 bg-slate-50 border-y border-gray-100">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-xl mx-auto mb-14"
      >
        <p className="text-[11px] font-black text-blue-600 uppercase tracking-[0.2em] mb-3">Learning Platform</p>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Learn finance the right way.</h2>
        <p className="text-[15px] text-slate-500 mt-4 leading-relaxed">
          Structured paths from total beginner to confident investor. Bite-sized lessons you can finish in 5 minutes.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {cats.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.35 }}
            whileHover={{ y: -4 }}
            className={`flex flex-col items-center gap-3.5 p-6 rounded-2xl border ${c.bdr} ${c.bg} ${c.hover} transition-all duration-200 cursor-pointer`}
          >
            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center">
              <c.icon className={`w-7 h-7 ${c.ic}`} strokeWidth={1.6} />
            </div>
            <p className={`text-[13px] font-black ${c.ic}`}>{c.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
