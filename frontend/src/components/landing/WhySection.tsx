import React from 'react';
import { motion } from 'framer-motion';
import { Receipt, PieChart, BookOpen, Bot, TrendingUp } from 'lucide-react';

const steps = [
  {
    n: '01', icon: Receipt, title: 'Track Every Rupee',
    desc: 'Log income and expenses in seconds. Automatic categorisation lets you see your financial baseline clearly—the first step to actually changing it.',
    mockup: (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-4">Recent Transactions</p>
        {[
          { name: 'Swiggy Order', cat: 'Food', amt: '-₹340', c: 'text-red-500 bg-red-50' },
          { name: 'Salary Credit', cat: 'Income', amt: '+₹45,000', c: 'text-blue-600 bg-blue-50' },
          { name: 'Netflix', cat: 'Entertainment', amt: '-₹649', c: 'text-red-500 bg-red-50' },
          { name: 'SIP — Nifty 50', cat: 'Investing', amt: '-₹5,000', c: 'text-indigo-600 bg-indigo-50' },
        ].map((tx) => (
          <div key={tx.name} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
            <div>
              <p className="text-[13px] font-bold text-slate-800">{tx.name}</p>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tx.c}`}>{tx.cat}</span>
            </div>
            <p className={`text-[13px] font-black ${tx.c.split(' ')[0]}`}>{tx.amt}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    n: '02', icon: PieChart, title: 'Create Smart Budgets',
    desc: 'Apply the 50/30/20 budgeting framework with one click. Set per-category limits and get proactive alerts before you overspend.',
    mockup: (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-4">Monthly Budget Health</p>
        {[
          { label: 'Needs (50%)', pct: 62, c: 'bg-blue-500' },
          { label: 'Wants (30%)', pct: 88, c: 'bg-indigo-400' },
          { label: 'Savings (20%)', pct: 100, c: 'bg-blue-600' },
        ].map((b) => (
          <div key={b.label} className="mb-4 last:mb-0">
            <div className="flex justify-between mb-1.5">
              <p className="text-[12px] font-bold text-slate-700">{b.label}</p>
              <span className={`text-[11px] font-black ${b.pct >= 90 ? 'text-red-500' : b.pct >= 75 ? 'text-amber-500' : 'text-blue-600'}`}>{b.pct}%</span>
            </div>
            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div className={`h-full ${b.c} rounded-full transition-all`} style={{ width: `${b.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    n: '03', icon: BookOpen, title: 'Understand Investing',
    desc: 'Learn SIPs, index funds, ETFs and Nifty 50 through bite-sized lessons. Progress from complete beginner to confident investor—no degree required.',
    mockup: (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-4">Your Progress</p>
        {[
          { t: 'Budgeting 101', pct: 100 },
          { t: 'Emergency Fund', pct: 100 },
          { t: 'Index Funds & ETFs', pct: 55 },
          { t: 'Tax Saving (80C)', pct: 20 },
        ].map((m) => (
          <div key={m.t} className="flex items-center gap-3 mb-3 last:mb-0">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[9px] font-bold ${m.pct === 100 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
              {m.pct === 100 ? '✓' : `${m.pct}%`}
            </div>
            <div className="flex-1">
              <p className="text-[12px] font-semibold text-slate-700 mb-1">{m.t}</p>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${m.pct}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    n: '04', icon: Bot, title: 'Learn with AI',
    desc: 'Your AI mentor explains complex finance using your own numbers. Always teaches—never executes transactions or gives investment advice.',
    mockup: (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-slate-50 border-b border-gray-100 px-4 py-3 flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center">
            <Bot className="w-3 h-3 text-white" />
          </div>
          <span className="text-[12px] font-bold text-slate-800">FinMentor AI</span>
          <span className="ml-auto text-[10px] text-blue-500 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />Active
          </span>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex justify-end">
            <div className="bg-blue-600 text-white text-[12px] rounded-2xl rounded-tr-sm px-3.5 py-2 max-w-[80%]">What is an expense ratio?</div>
          </div>
          <div className="flex gap-2 items-start">
            <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
              <Bot className="w-3 h-3 text-blue-600" />
            </div>
            <div className="bg-slate-50 border border-gray-100 text-[12px] rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-slate-700 leading-relaxed max-w-[85%]">
              It's the annual fee a fund charges you. 1% on ₹1L = ₹1,000/yr. Index funds charge ~0.1%—10× cheaper than active funds!
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    n: '05', icon: TrendingUp, title: 'Reach Financial Freedom',
    desc: 'From your first salary to your first crore. FinMentor maps your complete financial roadmap with long-term goals and weekly progress nudges.',
    mockup: (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-4">Your Roadmap</p>
        {[
          { l: '3-Month Emergency Fund', s: 'Achieved', c: 'text-blue-600 bg-blue-50 border-blue-100' },
          { l: 'Clear Credit Card Debt', s: 'Achieved', c: 'text-blue-600 bg-blue-50 border-blue-100' },
          { l: 'Start SIP — ₹5,000/mo', s: 'In Progress', c: 'text-amber-600 bg-amber-50 border-amber-100' },
          { l: 'Build ₹10L Portfolio', s: 'Upcoming', c: 'text-slate-400 bg-slate-50 border-slate-200' },
        ].map((step) => (
          <div key={step.l} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
            <p className="text-[12px] font-semibold text-slate-700">{step.l}</p>
            <span className={`text-[10px] font-black border px-2 py-0.5 rounded-full ${step.c}`}>{step.s}</span>
          </div>
        ))}
      </div>
    ),
  },
];

export const WhySection: React.FC = () => (
  <section id="why" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <p className="text-[11px] font-black text-blue-600 uppercase tracking-[0.2em] mb-3">Why FinMentor</p>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Your complete financial journey—one platform.</h2>
      </motion.div>

      <div className="space-y-28">
        {steps.map((step, i) => (
          <motion.div
            key={step.n}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-center ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
          >
            <div className={`space-y-5 ${i % 2 === 1 ? 'lg:col-start-2' : ''}`}>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-blue-600" strokeWidth={1.8} />
                </div>
                <span className="text-5xl font-black text-slate-100">{step.n}</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">{step.title}</h3>
              <p className="text-[15px] text-slate-500 leading-relaxed">{step.desc}</p>
            </div>
            <div className={i % 2 === 1 ? 'lg:col-start-1' : ''}>{step.mockup}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
