import React from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard, PieChart, Target, Bot, BarChart2,
  GraduationCap, Activity, ShieldCheck
} from 'lucide-react';

const features = [
  {
    icon: CreditCard,
    title: 'Expense Tracking',
    desc: 'Log every rupee across categories. Understand where your money goes before you can control it.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: PieChart,
    title: 'Smart Budget Planner',
    desc: 'Set intelligent budgets based on the 50/30/20 rule. Get real-time alerts before you overspend.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: Target,
    title: 'Savings Goals',
    desc: 'Define milestones—emergency funds, vacations, investments—and track your monthly progress.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: Bot,
    title: 'AI Financial Mentor',
    desc: 'Ask anything. Get clear, jargon-free explanations of financial concepts tailored to your situation.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: BarChart2,
    title: 'Investment Simulator',
    desc: 'Simulate SIP, lumpsum, and compound growth scenarios. Learn before you invest real money.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    icon: GraduationCap,
    title: 'Financial Learning Hub',
    desc: 'Structured courses from budgeting basics to advanced portfolio theory. Learn at your pace.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: Activity,
    title: 'Analytics Dashboard',
    desc: 'Rich charts showing income vs. spend trends, category breakdowns, and net worth over time.',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
  },
  {
    icon: ShieldCheck,
    title: 'Financial Health Score',
    desc: 'A single score that reflects your overall financial wellness—updated live as your data changes.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
];

export const FeaturesSection: React.FC = () => (
  <section id="features" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-xl mb-16"
      >
        <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Platform Features</p>
        <h2 className="text-4xl font-bold text-gray-900 tracking-tight leading-tight">
          Everything you need to manage money intelligently.
        </h2>
        <p className="text-gray-500 text-[15px] mt-4 leading-relaxed">
          A complete financial operating system—not just an app. Built for people who want to graduate from surviving to thriving.
        </p>
      </motion.div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.07)' }}
            className="p-6 rounded-2xl border border-gray-100 bg-white cursor-default transition-all duration-200"
          >
            <div className={`w-10 h-10 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}>
              <feature.icon className={`w-5 h-5 ${feature.color}`} strokeWidth={1.8} />
            </div>
            <h3 className="text-[15px] font-semibold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-[13px] text-gray-500 leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
