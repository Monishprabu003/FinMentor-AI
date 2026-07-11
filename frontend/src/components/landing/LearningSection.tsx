import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, PiggyBank, TrendingUp, BarChart2, Receipt, Landmark, ShieldCheck, LifeBuoy } from 'lucide-react';

const categories = [
  { icon: BookOpen, label: 'Budgeting', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
  { icon: PiggyBank, label: 'Saving', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
  { icon: TrendingUp, label: 'Investing', color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-100' },
  { icon: BarChart2, label: 'Mutual Funds', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
  { icon: Receipt, label: 'Stocks', color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100' },
  { icon: Landmark, label: 'Taxes', color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-100' },
  { icon: ShieldCheck, label: 'Insurance', color: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-100' },
  { icon: LifeBuoy, label: 'Emergency Fund', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' },
];

export const LearningSection: React.FC = () => (
  <section id="learn" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-14"
      >
        <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Learning Platform</p>
        <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
          Learn finance the way it should be taught.
        </h2>
        <p className="text-[15px] text-gray-500 mt-4 leading-relaxed">
          Bite-sized lessons across every financial topic. Structured paths from total beginner to confident investor.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            whileHover={{ y: -3 }}
            className={`flex flex-col items-center gap-3 p-6 rounded-2xl border ${cat.border} ${cat.bg} cursor-pointer transition-all duration-200`}
          >
            <div className={`w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center`}>
              <cat.icon className={`w-6 h-6 ${cat.color}`} strokeWidth={1.7} />
            </div>
            <p className={`text-[13px] font-semibold ${cat.color}`}>{cat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
