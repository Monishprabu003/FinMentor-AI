import React from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard, PieChart, Target, Bot,
  BarChart2, GraduationCap, Activity, ShieldCheck
} from 'lucide-react';

const features = [
  { icon: CreditCard,    title: 'Expense Tracking',        desc: 'Automatic categorisation of every transaction. Know where your money goes before you try to change it.', accent: 'blue' },
  { icon: PieChart,      title: 'Smart Budget Planner',    desc: 'Set category limits using the 50/30/20 rule. Get real-time alerts before you overspend—not after.', accent: 'indigo' },
  { icon: Target,        title: 'Savings Goals',           desc: 'Emergency fund, travel, investments—define milestones and track monthly progress with deadlines.', accent: 'blue' },
  { icon: Bot,           title: 'AI Financial Mentor',     desc: 'Ask anything. Get jargon-free, personalised explanations based on your own financial numbers.', accent: 'indigo' },
  { icon: BarChart2,     title: 'Investment Simulator',    desc: 'Simulate SIPs, lumpsum, and compound growth scenarios risk-free before you invest real money.', accent: 'blue' },
  { icon: GraduationCap, title: 'Learning Hub',            desc: 'Structured courses from budgeting basics to portfolio theory. Learn at your own pace.', accent: 'indigo' },
  { icon: Activity,      title: 'Analytics Dashboard',     desc: 'Rich charts: income vs spend trends, category breakdowns, and net worth over time.', accent: 'blue' },
  { icon: ShieldCheck,   title: 'Financial Health Score',  desc: 'A single live score reflecting your complete financial wellness. Updated every time your data changes.', accent: 'indigo' },
];

const accentMap = {
  blue:   { bg: 'bg-blue-50',   icon: 'text-blue-600',   ring: 'hover:ring-blue-100' },
  indigo: { bg: 'bg-indigo-50', icon: 'text-indigo-600', ring: 'hover:ring-indigo-100' },
};

export const FeaturesSection: React.FC = () => (
  <section id="features" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-lg"
        >
          <p className="text-[11px] font-black text-blue-600 uppercase tracking-[0.2em] mb-3">Platform Features</p>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Everything to manage money intelligently.
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[15px] text-slate-500 max-w-xs leading-relaxed"
        >
          A complete financial OS—not just another expense tracker.
        </motion.p>
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((f, i) => {
          const c = accentMap[f.accent as keyof typeof accentMap];
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{ y: -5, boxShadow: '0 16px 48px rgba(0,0,0,0.08)' }}
              className={`p-6 rounded-2xl border border-gray-100 bg-white ring-2 ring-transparent ${c.ring} transition-all duration-200 cursor-default`}
            >
              <div className={`w-11 h-11 ${c.bg} rounded-2xl flex items-center justify-center mb-4`}>
                <f.icon className={`w-5 h-5 ${c.icon}`} strokeWidth={1.8} />
              </div>
              <h3 className="text-[14px] font-black text-slate-900 mb-2">{f.title}</h3>
              <p className="text-[12.5px] text-slate-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);
