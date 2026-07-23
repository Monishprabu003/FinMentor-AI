import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Sparkles,
  PieChart as PieIcon,
  ArrowRight,
  ShieldCheck,
  Zap,
  Bot,
  Activity,
  ArrowUpRight,
  IndianRupee,
  Target,
  BarChart3,
  BookOpen
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { api } from '../services/api';
import type { DashboardSummary, SpendingInsight } from '../types';
import { useNavigate } from 'react-router-dom';

/* ──────────────────────────────────────────────────────────────────────────
   3D Tilt Card (Interactive Perspective Stage - React Bits style)
────────────────────────────────────────────────────────────────────────── */
const Interactive3DTiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 22 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative cursor-pointer select-none ${className}`}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full transition-shadow duration-300"
      >
        {children}
      </motion.div>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────────────────────
   Floating Ambient Background Icons
────────────────────────────────────────────────────────────────────────── */
const FLOAT_ITEMS = [
  { Icon: IndianRupee, x: '4%',  y: '10%', size: 38, delay: 0,   dur: 8,  rotate: 15,  bgColor: 'bg-blue-100',   color: 'text-blue-500' },
  { Icon: PiggyBank,   x: '90%', y: '8%',  size: 34, delay: 1,   dur: 10, rotate: -12, bgColor: 'bg-pink-100',   color: 'text-pink-500' },
  { Icon: Wallet,      x: '93%', y: '60%', size: 30, delay: 0.5, dur: 9,  rotate: 10,  bgColor: 'bg-indigo-100', color: 'text-indigo-500' },
  { Icon: ShieldCheck, x: '2%',  y: '65%', size: 28, delay: 2,   dur: 11, rotate: -8,  bgColor: 'bg-emerald-100',color: 'text-emerald-500' },
  { Icon: Target,      x: '82%', y: '85%', size: 32, delay: 0.8, dur: 8.5,rotate: 20,  bgColor: 'bg-orange-100', color: 'text-orange-500' },
  { Icon: BarChart3,   x: '15%', y: '88%', size: 26, delay: 1.5, dur: 9.5,rotate: -18, bgColor: 'bg-violet-100', color: 'text-violet-500' },
];

const DashboardFloatingBackground: React.FC = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
    {/* Soft radial glow overlays */}
    <div
      className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[850px] h-[850px] rounded-full opacity-[0.12]"
      style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }}
    />
    <div
      className="absolute top-[60%] right-0 w-[550px] h-[550px] rounded-full opacity-[0.08]"
      style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }}
    />

    {/* Floating icons with colored badges */}
    {FLOAT_ITEMS.map((item, i) => {
      const { Icon, x, y, size, delay, dur, rotate, bgColor, color } = item;
      return (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: x, top: y }}
          animate={{
            y: [0, -18, 8, -22, 0],
            x: [0, 12, -6, 14, 0],
            rotate: [0, rotate, -rotate * 0.4, rotate * 0.7, 0],
            scale: [1, 1.08, 0.96, 1.1, 1],
          }}
          transition={{
            duration: dur,
            delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div
            className={`${bgColor} rounded-2xl p-3 shadow-md border border-white/60 flex items-center justify-center`}
            style={{ opacity: 0.55 }}
          >
            <Icon className={`${color}`} style={{ width: size - 12, height: size - 12 }} strokeWidth={2} />
          </div>
        </motion.div>
      );
    })}

    {/* Faint Grid lines */}
    <div
      className="absolute inset-0 opacity-[0.02]"
      style={{
        backgroundImage: 'radial-gradient(circle, #0f172a 1px, transparent 1px)',
        backgroundSize: '32px 32px'
      }}
    />
  </div>
);

/* ──────────────────────────────────────────────────────────────────────────
   Animated Counter
────────────────────────────────────────────────────────────────────────── */
const AnimatedCounter: React.FC<{ value: number; prefix?: string; suffix?: string }> = ({
  value,
  prefix = '',
  suffix = ''
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const stepTime = 16;
    const totalSteps = duration / stepTime;
    const increment = (value - start) / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if ((increment >= 0 && start >= value) || (increment < 0 && start <= value)) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.round(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {prefix}
      {displayValue.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
};

/* ──────────────────────────────────────────────────────────────────────────
   Dashboard Page Component
────────────────────────────────────────────────────────────────────────── */
export const DashboardPage: React.FC = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [insights, setInsights] = useState<SpendingInsight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [dashRes, insRes] = await Promise.all([
          api.get('/analytics/dashboard'),
          api.get('/ai/insights')
        ]);
        setSummary(dashRes.data);
        setInsights(insRes.data.insights || []);
      } catch (err) {
        console.error('Error fetching dashboard summary:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[70vh] relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4 shadow-sm">
          <div className="w-7 h-7 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
        <span className="text-sm font-bold text-slate-600">Calculating financial metrics...</span>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="p-8 text-center text-slate-500 font-medium">
        Unable to load dashboard data. Please try logging in again.
      </div>
    );
  }

  const analyzer = summary.budget_analyzer;

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-slate-50/60 overflow-hidden">
      <DashboardFloatingBackground />

      <div className="relative z-10 p-6 md:p-10 max-w-7xl mx-auto space-y-8">

        {/* ── Header & Quick Actions ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Deterministic OS
              </span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Executive Financial Overview</h1>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              Real-time calculations computed by FinMentor engine
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/transactions')}
              className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 shadow-sm transition-all hover:shadow hover:-translate-y-0.5"
            >
              + Log Transaction
            </button>
            <button
              onClick={() => navigate('/ai')}
              className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 transition-all hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>AI Tutor Studio</span>
            </button>
          </div>
        </div>

        {/* ── 3D Interactive KPI Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Estimated Net Worth */}
          <Interactive3DTiltCard>
            <div className="bg-white/90 backdrop-blur-xl p-6 rounded-[1.75rem] border border-slate-200/80 shadow-xl shadow-slate-200/40 hover:border-blue-300 transition-all">
              <div className="flex items-center justify-between text-slate-500 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Estimated Net Worth</span>
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shadow-xs">
                  <Wallet className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-black text-slate-900 tracking-tight">
                <AnimatedCounter value={summary.estimated_net_worth} prefix="₹" />
              </div>
              <div className="text-[12px] font-bold text-emerald-600 mt-2 flex items-center gap-1">
                <ArrowUpRight className="w-4 h-4" />
                <span>Assets outpace liabilities</span>
              </div>
            </div>
          </Interactive3DTiltCard>

          {/* Card 2: Monthly Income */}
          <Interactive3DTiltCard>
            <div className="bg-white/90 backdrop-blur-xl p-6 rounded-[1.75rem] border border-slate-200/80 shadow-xl shadow-slate-200/40 hover:border-emerald-300 transition-all">
              <div className="flex items-center justify-between text-slate-500 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Monthly Income</span>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-black text-slate-900 tracking-tight">
                <AnimatedCounter value={summary.total_income_this_month} prefix="₹" />
              </div>
              <div className="text-[12px] font-semibold text-slate-400 mt-2">
                Salary & freelance projects
              </div>
            </div>
          </Interactive3DTiltCard>

          {/* Card 3: Monthly Expenses */}
          <Interactive3DTiltCard>
            <div className="bg-white/90 backdrop-blur-xl p-6 rounded-[1.75rem] border border-slate-200/80 shadow-xl shadow-slate-200/40 hover:border-rose-300 transition-all">
              <div className="flex items-center justify-between text-slate-500 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Monthly Expenses</span>
                <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center shadow-xs">
                  <TrendingDown className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-black text-slate-900 tracking-tight">
                <AnimatedCounter value={summary.total_expense_this_month} prefix="₹" />
              </div>
              <div className="text-[12px] font-semibold text-slate-400 mt-2">
                Essential needs & wants
              </div>
            </div>
          </Interactive3DTiltCard>

          {/* Card 4: Monthly Savings Rate */}
          <Interactive3DTiltCard>
            <div className="bg-white/90 backdrop-blur-xl p-6 rounded-[1.75rem] border border-slate-200/80 shadow-xl shadow-slate-200/40 hover:border-indigo-300 transition-all">
              <div className="flex items-center justify-between text-slate-500 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Savings Rate</span>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs">
                  <PiggyBank className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-black text-indigo-600 tracking-tight">
                {summary.savings_rate_percentage}%
              </div>
              <div className="text-[12px] font-semibold text-slate-400 mt-2">
                Target: 20% future wealth rule
              </div>
            </div>
          </Interactive3DTiltCard>
        </div>

        {/* ── AI Spending Insights Banner ── */}
        {insights.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 md:p-8 rounded-[2rem] border border-blue-200/80 bg-gradient-to-br from-blue-50/90 via-indigo-50/50 to-white shadow-xl shadow-blue-600/5 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-600/20">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">FinMentor AI Spending Analysis</h3>
                  <p className="text-xs text-slate-500 font-medium">Real-time coaching based on your financial assessment</p>
                </div>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                Educational Assistant
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {insights.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/90 border border-blue-100 shadow-sm space-y-1.5 hover:shadow-md transition-all"
                >
                  <div className="text-xs font-black text-blue-700 uppercase tracking-wide flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                    {item.title}
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Middle Row: Cash Flow Chart & 50/30/20 Budget Analyzer ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Recharts Area Chart */}
          <div className="lg:col-span-2 bg-white/90 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] border border-slate-200/80 shadow-xl shadow-slate-200/40 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">6-Month Cash Flow Trend</h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">Monthly Income vs. Expenditure</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-bold">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-blue-600" />
                  <span className="text-slate-600">Income</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="text-slate-600">Expense</span>
                </div>
              </div>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={summary.monthly_cash_flow}>
                  <defs>
                    <linearGradient id="incomeColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="expenseColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderColor: '#e2e8f0',
                      borderRadius: '1rem',
                      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: '#0f172a'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="income"
                    stroke="#2563eb"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#incomeColor)"
                    name="Income"
                  />
                  <Area
                    type="monotone"
                    dataKey="expense"
                    stroke="#f43f5e"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#expenseColor)"
                    name="Expense"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 50/30/20 Analyzer Card */}
          <div className="bg-white/90 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] border border-slate-200/80 shadow-xl shadow-slate-200/40 space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                  <PieIcon className="w-5 h-5 text-blue-600" />
                  <span>50/30/20 Analyzer</span>
                </h3>
                <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">Monthly Target</span>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-600 font-bold">Needs (Target 50%)</span>
                    <span className="text-blue-600 font-black">₹{analyzer.needs_spent} / ₹{analyzer.needs_target}</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (analyzer.needs_spent / (analyzer.needs_target || 1)) * 100)}%`
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-600 font-bold">Wants (Target 30%)</span>
                    <span className="text-indigo-600 font-black">₹{analyzer.wants_spent} / ₹{analyzer.wants_target}</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (analyzer.wants_spent / (analyzer.wants_target || 1)) * 100)}%`
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-600 font-bold">Savings & Investing (Target 20%)</span>
                    <span className="text-emerald-600 font-black">₹{analyzer.savings_spent} / ₹{analyzer.savings_target}</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (analyzer.savings_spent / (analyzer.savings_target || 1)) * 100)}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs text-slate-700 space-y-1">
              <div className="text-[11px] font-black text-blue-700 uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                System Recommendation
              </div>
              <p className="text-xs leading-relaxed font-medium text-slate-600">{analyzer.recommendation}</p>
            </div>
          </div>
        </div>

        {/* ── Bottom Row: Category Distribution ── */}
        <div className="bg-white/90 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] border border-slate-200/80 shadow-xl shadow-slate-200/40 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-lg">Expense Distribution by Category</h3>
            <button
              onClick={() => navigate('/budgets')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
            >
              <span>Manage Category Budgets</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {summary.category_breakdown.map((item) => (
              <div
                key={item.category}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-between hover:bg-blue-50/40 hover:border-blue-200 transition-all"
              >
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.category}</div>
                  <div className="text-lg font-black text-slate-900 mt-0.5">₹{item.total_amount.toLocaleString('en-IN')}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-blue-600">{item.percentage}%</div>
                  <div className="text-[10px] font-bold text-slate-400">of spend</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
