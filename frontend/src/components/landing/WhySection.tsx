import React from 'react';
import { motion } from 'framer-motion';
import { Receipt, PieChart, BookOpen, Bot, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: Receipt,
    title: 'Track Every Rupee',
    desc: 'Log income and expenses effortlessly. Automatic categorization means you spend 30 seconds a day, not 30 minutes. Understand your baseline before you can change anything.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    mockup: (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Recent Transactions</p>
        {[
          { name: 'Swiggy Order', cat: 'Food', amount: '-₹340', color: 'text-rose-500' },
          { name: 'Salary Credit', cat: 'Income', amount: '+₹45,000', color: 'text-emerald-600' },
          { name: 'Netflix', cat: 'Entertainment', amount: '-₹649', color: 'text-rose-500' },
          { name: 'SIP — Nifty 50', cat: 'Investing', amount: '-₹5,000', color: 'text-blue-500' },
        ].map((tx) => (
          <div key={tx.name} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
            <div>
              <p className="text-[13px] font-semibold text-gray-700">{tx.name}</p>
              <p className="text-[11px] text-gray-400">{tx.cat}</p>
            </div>
            <p className={`text-[13px] font-bold ${tx.color}`}>{tx.amount}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: PieChart,
    title: 'Create Smart Budgets',
    desc: 'Apply the 50/30/20 budgeting framework automatically. Set per-category limits and receive proactive alerts before you breach them—not after.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    mockup: (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Monthly Budget Health</p>
        {[
          { label: 'Needs (50%)', pct: 62, target: '₹22,500', spent: '₹13,950', color: 'bg-blue-500' },
          { label: 'Wants (30%)', pct: 88, target: '₹13,500', spent: '₹11,880', color: 'bg-amber-400' },
          { label: 'Savings (20%)', pct: 100, target: '₹9,000', spent: '₹9,000', color: 'bg-emerald-500' },
        ].map((b) => (
          <div key={b.label} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-semibold text-gray-600">{b.label}</p>
              <span className={`text-[11px] font-bold ${b.pct >= 85 ? 'text-amber-500' : 'text-emerald-600'}`}>{b.pct}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className={`h-full ${b.color} rounded-full`} style={{ width: `${b.pct}%` }} />
            </div>
            <p className="text-[10px] text-gray-400">{b.spent} of {b.target}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: BookOpen,
    title: 'Understand Investing',
    desc: 'Learn what SIPs, index funds, ETFs and Nifty 50 actually mean—through bite-sized courses designed for beginners. No finance degree required.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    mockup: (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Learning Progress</p>
        {[
          { title: 'Budgeting 101', done: true, pct: 100 },
          { title: 'Emergency Fund', done: true, pct: 100 },
          { title: 'Index Funds & ETFs', done: false, pct: 55 },
          { title: 'Tax Saving (80C)', done: false, pct: 20 },
        ].map((m) => (
          <div key={m.title} className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${m.done ? 'bg-emerald-500' : 'bg-gray-100 border border-gray-200'}`}>
              {m.done && <span className="text-white text-[9px]">✓</span>}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-gray-700 truncate">{m.title}</p>
              <div className="h-1 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${m.pct}%` }} />
              </div>
            </div>
            <span className="text-[10px] text-gray-400 shrink-0">{m.pct}%</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: Bot,
    title: 'Learn with AI',
    desc: 'Ask your AI mentor anything about finance. It explains complex concepts using your own numbers—personalised, clear, and never condescending.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    mockup: (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">AI Mentor</p>
        <div className="flex justify-end">
          <div className="bg-blue-600 text-white text-[12px] rounded-2xl rounded-tr-sm px-3.5 py-2 max-w-[80%]">
            What is an expense ratio?
          </div>
        </div>
        <div className="flex gap-2 items-start">
          <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
            <Bot className="w-3 h-3 text-violet-600" />
          </div>
          <div className="bg-gray-50 border border-gray-100 text-[12px] rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-gray-600 leading-relaxed">
            It's the annual fee a mutual fund charges you. A 1% ratio on ₹1L costs ₹1,000/yr. Index funds typically charge 0.1%—10× cheaper.
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: TrendingUp,
    title: 'Reach Financial Freedom',
    desc: 'From your first salary to your first crore—FinMentor maps the entire journey. Set long-term goals, simulate outcomes, and stay on track with weekly nudges.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    mockup: (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Your Financial Roadmap</p>
        {[
          { label: '3-Month Emergency Fund', status: '✓ Achieved', color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Clear Credit Card Debt', status: '✓ Achieved', color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Start SIP — ₹5,000/mo', status: '→ In Progress', color: 'text-blue-600 bg-blue-50' },
          { label: 'Build ₹10L Portfolio', status: '○ Upcoming', color: 'text-gray-400 bg-gray-50' },
        ].map((step) => (
          <div key={step.label} className="flex items-center justify-between">
            <p className="text-[12px] font-medium text-gray-600">{step.label}</p>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${step.color}`}>
              {step.status}
            </span>
          </div>
        ))}
      </div>
    ),
  },
];

export const WhySection: React.FC = () => (
  <section id="why" className="py-24 bg-gray-50 border-y border-gray-100">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-xl mb-20"
      >
        <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Why FinMentor</p>
        <h2 className="text-4xl font-bold text-gray-900 tracking-tight leading-tight">
          Your complete financial journey—one platform.
        </h2>
      </motion.div>

      <div className="space-y-24">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
              i % 2 === 1 ? 'lg:grid-flow-dense' : ''
            }`}
          >
            {/* Text */}
            <div className={`space-y-5 ${i % 2 === 1 ? 'lg:col-start-2' : ''}`}>
              <div className={`w-11 h-11 rounded-xl ${step.bg} flex items-center justify-center`}>
                <step.icon className={`w-5 h-5 ${step.color}`} strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Step {i + 1}</p>
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{step.title}</h3>
              </div>
              <p className="text-[15px] text-gray-500 leading-relaxed">{step.desc}</p>
            </div>

            {/* Mockup */}
            <div className={i % 2 === 1 ? 'lg:col-start-1' : ''}>
              {step.mockup}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
