import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import {
  Check, ChevronRight, ChevronLeft, Target, Award, ArrowRight,
  TrendingUp, Sparkles, User, Briefcase, IndianRupee, PiggyBank,
  ShieldCheck, Wallet, BookOpen, BarChart3, Home, Car, Plane,
  GraduationCap, Rocket, Shield, Brain, Flame, LineChart
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */
const KNOWLEDGE_QUESTIONS = [
  { q: "What is the 50/30/20 budgeting rule?", options: ["50% Needs, 30% Wants, 20% Savings", "50% Savings, 30% Needs, 20% Wants", "50% Wants, 30% Savings, 20% Needs", "50% Fixed, 30% Flexible, 20% Cash"], correct: 0 },
  { q: "What is Compound Interest?", options: ["Interest on principal only", "Interest on principal plus previously earned interest", "A flat fee charged by banks", "Interest that decreases over time"], correct: 1 },
  { q: "How does inflation affect your money?", options: ["It increases purchasing power", "It decreases purchasing power", "It has no effect on cash", "It only affects stocks"], correct: 1 },
  { q: "What is a Mutual Fund?", options: ["A pool of money managed by professionals", "A single stock", "A government bond", "A type of insurance"], correct: 0 },
  { q: "What does buying a stock mean?", options: ["Loaning money to a company", "Buying a piece of ownership in a company", "Opening a savings account", "Buying a physical product"], correct: 1 },
  { q: "How much should ideally be in an emergency fund?", options: ["1 month of expenses", "3 to 6 months of expenses", "1 year of income", "10% of your net worth"], correct: 1 },
  { q: "What affects your credit score the most?", options: ["Closing old accounts", "Payment history", "Checking your score", "Your income level"], correct: 1 },
  { q: "What is the primary purpose of Term Life Insurance?", options: ["To save for retirement", "To provide financial protection for dependents", "To invest in the stock market", "To pay off medical bills"], correct: 1 },
  { q: "What is a standard deduction in taxes?", options: ["A flat amount reducing taxable income", "A tax penalty", "A refund given by the government", "A business expense"], correct: 0 },
  { q: "Why is diversification important in investing?", options: ["It guarantees high returns", "It reduces overall risk", "It eliminates taxes", "It is required by law"], correct: 1 },
];

const GOALS_DATA: { label: string; icon: React.FC<any>; desc: string }[] = [
  { label: "Build Emergency Fund", icon: Shield, desc: "3–6 months safety net" },
  { label: "Save for Higher Studies", icon: GraduationCap, desc: "Invest in education" },
  { label: "Buy a Car", icon: Car, desc: "Personal vehicle fund" },
  { label: "Buy a House", icon: Home, desc: "Real estate dream" },
  { label: "Travel", icon: Plane, desc: "Explore the world" },
  { label: "Retirement", icon: PiggyBank, desc: "Long-term security" },
  { label: "Wealth Creation", icon: LineChart, desc: "Grow your portfolio" },
  { label: "Start a Business", icon: Rocket, desc: "Entrepreneurship" },
];

const RISK_DATA = [
  { value: "Sell everything to protect capital (Low Risk)", level: "Conservative", color: "emerald" as const, icon: Shield, desc: "You prefer safety. Capital preservation is your priority.", tag: "Low Risk" },
  { value: "Hold and wait for recovery (Medium Risk)", level: "Balanced", color: "blue" as const, icon: BarChart3, desc: "You stay calm during volatility and trust the long-term trend.", tag: "Medium Risk" },
  { value: "Buy more at a discount (High Risk)", level: "Aggressive", color: "amber" as const, icon: Flame, desc: "You see dips as opportunities. Higher risk for higher rewards.", tag: "High Risk" },
];

const STEP_META = [
  { num: 1, title: "Personal", icon: User },
  { num: 2, title: "Habits", icon: Wallet },
  { num: 3, title: "Knowledge", icon: BookOpen },
  { num: 4, title: "Goals", icon: Target },
  { num: 5, title: "Risk", icon: ShieldCheck },
];

const LOADING_STEPS = [
  "Analyzing your financial profile…",
  "Evaluating spending habits…",
  "Calculating financial score…",
  "Generating AI insights…",
  "Determining risk profile…",
];

/* ═══════════════════════════════════════════════════════════════
   FORMATTERS
   ═══════════════════════════════════════════════════════════════ */
const formatINR = (val: string) => {
  const num = val.replace(/[^0-9]/g, '');
  if (!num) return '';
  return Number(num).toLocaleString('en-IN');
};
const rawNum = (val: string) => val.replace(/[^0-9]/g, '');

/* ═══════════════════════════════════════════════════════════════
   ANIMATED NUMBER COUNTER
   ═══════════════════════════════════════════════════════════════ */
const AnimatedCounter: React.FC<{ target: number }> = ({ target }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 120));
    const id = setInterval(() => {
      cur += step;
      if (cur >= target) { setCount(target); clearInterval(id); }
      else setCount(cur);
    }, 16);
    return () => clearInterval(id);
  }, [target]);
  return <>{count}</>;
};

/* ═══════════════════════════════════════════════════════════════
   SVG CIRCULAR PROGRESS
   ═══════════════════════════════════════════════════════════════ */
const CircularScore: React.FC<{ value: number; max?: number }> = ({ value, max = 100 }) => {
  const size = 172;
  const stroke = 14;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - Math.min(value / max, 1));
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f1f5f9" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="url(#scoreGrad)" strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 2, ease: [0.2, 0.65, 0.3, 0.9], delay: 0.4 }}
        />
        <defs>
          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-black text-slate-900 tabular-nums leading-none">
          <AnimatedCounter target={value} />
        </span>
        <span className="text-sm font-bold text-slate-400 mt-1">/ {max}</span>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   FLOATING BACKGROUND — Visible Finance Icons + Shapes
   ═══════════════════════════════════════════════════════════════ */
const FLOAT_ITEMS: {
  Icon: React.FC<any>; x: string; y: string; iconSize: number; bgSize: number;
  delay: number; dur: number; rotate: number; color: string; bgColor: string;
}[] = [
  { Icon: IndianRupee, x: '6%',  y: '12%', iconSize: 24, bgSize: 52, delay: 0,   dur: 8,  rotate: 15,  color: 'text-blue-500',    bgColor: 'bg-blue-100' },
  { Icon: PiggyBank,   x: '88%', y: '8%',  iconSize: 22, bgSize: 48, delay: 1,   dur: 10, rotate: -12, color: 'text-pink-500',    bgColor: 'bg-pink-50' },
  { Icon: LineChart,   x: '92%', y: '52%', iconSize: 20, bgSize: 44, delay: 0.5, dur: 9,  rotate: 10,  color: 'text-indigo-500',  bgColor: 'bg-indigo-50' },
  { Icon: Shield,      x: '3%',  y: '58%', iconSize: 20, bgSize: 44, delay: 2,   dur: 11, rotate: -8,  color: 'text-emerald-500', bgColor: 'bg-emerald-50' },
  { Icon: Target,      x: '78%', y: '80%', iconSize: 22, bgSize: 48, delay: 0.8, dur: 8.5,rotate: 20,  color: 'text-orange-500',  bgColor: 'bg-orange-50' },
  { Icon: Wallet,      x: '12%', y: '82%', iconSize: 18, bgSize: 40, delay: 1.5, dur: 9.5,rotate: -18, color: 'text-blue-600',    bgColor: 'bg-blue-50' },
  { Icon: BarChart3,   x: '52%', y: '4%',  iconSize: 18, bgSize: 40, delay: 2.5, dur: 10, rotate: 12,  color: 'text-violet-500',  bgColor: 'bg-violet-50' },
  { Icon: BookOpen,    x: '38%', y: '88%', iconSize: 18, bgSize: 40, delay: 3,   dur: 12, rotate: -6,  color: 'text-cyan-500',    bgColor: 'bg-cyan-50' },
  { Icon: Sparkles,    x: '72%', y: '28%', iconSize: 16, bgSize: 36, delay: 1,   dur: 8,  rotate: 25,  color: 'text-amber-500',   bgColor: 'bg-amber-50' },
  { Icon: TrendingUp,  x: '22%', y: '38%', iconSize: 18, bgSize: 40, delay: 3.5, dur: 11, rotate: -15, color: 'text-green-500',   bgColor: 'bg-green-50' },
];

const FloatingBackground: React.FC = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
    {/* Radial glows — visible ambient light */}
    <div
      className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-[0.14]"
      style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }}
    />
    <div
      className="absolute -bottom-[10%] -right-[5%] w-[600px] h-[600px] rounded-full opacity-[0.10]"
      style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }}
    />
    <div
      className="absolute top-[60%] -left-[5%] w-[400px] h-[400px] rounded-full opacity-[0.08]"
      style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }}
    />

    {/* Floating icons with colored circular backgrounds */}
    {FLOAT_ITEMS.map((item, i) => {
      const { Icon, x, y, iconSize, bgSize, delay, dur, rotate, color, bgColor } = item;
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
            className={`${bgColor} rounded-2xl flex items-center justify-center shadow-lg`}
            style={{
              width: bgSize,
              height: bgSize,
              opacity: 0.55,
              boxShadow: '0 8px 32px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <Icon
              className={color}
              style={{ width: iconSize, height: iconSize }}
              strokeWidth={1.8}
            />
          </div>
        </motion.div>
      );
    })}

    {/* Floating geometric shapes — more visible */}
    <motion.div
      className="absolute w-20 h-20 rounded-3xl border-[2.5px] border-blue-300/30"
      style={{ left: '62%', top: '18%' }}
      animate={{ rotate: [0, 90, 180, 270, 360], y: [-12, 12, -12] }}
      transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
    />
    <motion.div
      className="absolute w-14 h-14 rounded-full border-[2.5px] border-indigo-300/25"
      style={{ left: '28%', top: '22%' }}
      animate={{ scale: [1, 1.4, 1], y: [0, -25, 0] }}
      transition={{ duration: 9, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute w-12 h-12 rounded-xl border-[2.5px] border-emerald-300/20 rotate-45"
      style={{ left: '82%', top: '68%' }}
      animate={{ rotate: [45, 135, 225, 315, 405] }}
      transition={{ duration: 14, delay: 2, repeat: Infinity, ease: 'linear' }}
    />
    <motion.div
      className="absolute w-10 h-10 rounded-full bg-blue-200/15"
      style={{ left: '45%', top: '48%' }}
      animate={{ scale: [1, 2.8, 1] }}
      transition={{ duration: 7, delay: 3, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute w-6 h-6 rounded-full bg-indigo-300/12"
      style={{ left: '18%', top: '70%' }}
      animate={{ scale: [1, 3, 1], y: [-5, 5, -5] }}
      transition={{ duration: 5, delay: 0.5, repeat: Infinity, ease: 'easeInOut' }}
    />

    {/* Subtle dot grid pattern */}
    <div
      className="absolute inset-0 opacity-[0.025]"
      style={{
        backgroundImage: 'radial-gradient(circle, #64748b 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    />
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   FRAMER MOTION PRESETS
   ═══════════════════════════════════════════════════════════════ */
const pageVariants = {
  initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit:    { opacity: 0, y: -20, filter: 'blur(4px)' },
};
const pageTrans = { duration: 0.4, ease: [0.22, 0.68, 0.36, 1] };

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export const AssessmentPage: React.FC = () => {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [loadingIdx, setLoadingIdx] = useState(0);
  const [summary, setSummary] = useState<any>(null);

  // Form State
  const [personal, setPersonal] = useState({ age: '', occupation: '', income: '', expenses: '' });
  const [habits, setHabits] = useState({ track: '', emergency: '', save: '', budget: '' });
  const [knowledge, setKnowledge] = useState<number[]>(Array(10).fill(-1));
  const [quizIdx, setQuizIdx] = useState(0);
  const [goals, setGoals] = useState<string[]>([]);
  const [risk, setRisk] = useState('');

  /* ── Scoring ── */
  const calculateScore = useCallback(() => {
    let s = 0;
    knowledge.forEach((a, i) => { if (a === KNOWLEDGE_QUESTIONS[i].correct) s += 10; });
    return s;
  }, [knowledge]);

  const determineRisk = useCallback(() => {
    if (risk.includes('capital')) return "Low";
    if (risk.includes('recovery') || risk.includes('Hold')) return "Medium";
    return "High";
  }, [risk]);

  /* ── Submit ── */
  const handleSubmit = async () => {
    setSubmitting(true);
    const finalScore = calculateScore();
    const finalRisk = determineRisk();

    // Animated loading sequence
    for (let i = 0; i < LOADING_STEPS.length; i++) {
      setLoadingIdx(i);
      await new Promise(r => setTimeout(r, 850));
    }

    try {
      const res = await api.post('/assessment/submit', {
        monthly_income: Number(rawNum(personal.income)),
        monthly_expenses: Number(rawNum(personal.expenses)),
        financial_goals: goals,
        assessment_answers: { habits, knowledge, risk },
        financial_score: finalScore,
        risk_profile: finalRisk,
      });
      setSummary(res.data);
      await refreshUser();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
    else handleSubmit();
  };

  const canProceed = useCallback(() => {
    if (step === 1) return personal.age && personal.occupation && rawNum(personal.income) && rawNum(personal.expenses);
    if (step === 2) return habits.track && habits.emergency && habits.save && habits.budget;
    if (step === 3) return !knowledge.includes(-1);
    if (step === 4) return goals.length > 0;
    if (step === 5) return risk !== '';
    return true;
  }, [step, personal, habits, knowledge, goals, risk]);

  /* ── Keyboard: Enter to continue ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && canProceed() && !submitting) handleNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  const progressPct = (step / 5) * 100;

  /* ════════════════════════════════════════════════════════════════
     LOADING SCREEN
     ════════════════════════════════════════════════════════════ */
  if (submitting) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
        <FloatingBackground />
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="max-w-sm w-full text-center">
          {/* Spinner */}
          <div className="relative w-20 h-20 mx-auto mb-10">
            <div className="absolute inset-0 rounded-full border-[3px] border-slate-100" />
            <motion.div
              className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-blue-600"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Brain className="w-7 h-7 text-blue-600" />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={loadingIdx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="text-[17px] font-semibold text-slate-700 mb-8"
            >
              {LOADING_STEPS[loadingIdx]}
            </motion.p>
          </AnimatePresence>

          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full"
              animate={{ width: `${((loadingIdx + 1) / LOADING_STEPS.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <p className="text-[13px] text-slate-400 mt-3 font-medium tabular-nums">
            {Math.round(((loadingIdx + 1) / LOADING_STEPS.length) * 100)}% complete
          </p>
        </motion.div>
      </div>
    );
  }

  /* ════════════════════════════════════════════════════════════════
     RESULT SCREEN
     ════════════════════════════════════════════════════════════ */
  if (summary) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-slate-50/60 to-white flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden">
        <FloatingBackground />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 0.68, 0.36, 1] }}
          className="max-w-2xl w-full bg-white rounded-[2rem] p-10 md:p-14 shadow-xl shadow-slate-200/50 border border-slate-100 text-center"
        >
          {/* Badge */}
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.15 }} className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center">
              <Award className="w-10 h-10 text-blue-600" />
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
            Assessment Complete
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
            className="text-slate-500 text-[16px] mb-10">
            Your personalized financial profile is ready.
          </motion.p>

          {/* Circular Score */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.55 }} className="flex justify-center mb-10">
            <CircularScore value={summary.financial_score} />
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
            {[
              { label: "Knowledge Level", value: summary.knowledge_level, color: "text-slate-800" },
              { label: "Persona", value: summary.financial_persona, color: "text-blue-600" },
              { label: "Risk Profile", value: summary.risk_profile || "Balanced", color: "text-emerald-600" },
            ].map(s => (
              <div key={s.label} className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <span className="block text-[11px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">{s.label}</span>
                <span className={`text-xl font-black ${s.color}`}>{s.value}</span>
              </div>
            ))}
          </motion.div>

          {/* AI Summary */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95 }}
            className="text-left bg-gradient-to-br from-blue-50/70 to-indigo-50/30 rounded-2xl p-6 border border-blue-100/70 mb-10">
            <h3 className="text-[15px] font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" /> AI-Powered Insights
            </h3>
            <p className="text-[14.5px] text-slate-600 leading-relaxed mb-4">
              "You're off to a strong start. Building a consistent emergency fund and improving your investment knowledge could significantly increase your financial health score."
            </p>
            <ul className="space-y-2.5">
              {["Optimize your emergency fund allocation", "Learn tax-saving fundamentals (Section 80C)", "Automate your monthly investments"].map((t, i) => (
                <li key={i} className="flex items-center gap-2.5 text-[14px] text-slate-600 font-medium">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-emerald-600" />
                  </div>
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CTA */}
          <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
            onClick={() => navigate('/dashboard')}
            className="w-full flex items-center justify-center gap-2.5 py-4 text-[16px] font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-2xl transition-all shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/25 active:scale-[0.98]">
            Continue to FinMentor <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    );
  }

  /* ════════════════════════════════════════════════════════════════
     MAIN ASSESSMENT FLOW
     ════════════════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50/40 to-white text-slate-900 flex flex-col relative overflow-hidden">
      <FloatingBackground />

      {/* ── Navbar ── */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-slate-100 px-5 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-600/20">
            <TrendingUp className="w-[18px] h-[18px] text-white" strokeWidth={2.5} />
          </div>
          <div className="leading-none">
            <span className="text-lg font-black text-slate-900 tracking-tight block">FinMentor</span>
            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Financial Assessment</span>
          </div>
        </div>

        {/* Step pills — Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {STEP_META.map(s => {
            const Icon = s.icon;
            const active = step === s.num;
            const done = step > s.num;
            return (
              <button
                key={s.num}
                onClick={() => { if (done) setStep(s.num); }}
                disabled={!done}
                aria-label={`Step ${s.num}: ${s.title}`}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold transition-all duration-200 ${
                  active ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' :
                  done   ? 'bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer' :
                           'bg-slate-100 text-slate-400'
                }`}
              >
                {done ? <Check className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
                <span className="hidden lg:inline">{s.title}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile counter */}
        <div className="md:hidden flex items-center gap-2 bg-slate-50 px-3.5 py-2 rounded-full border border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Step</span>
          <span className="text-[13px] font-black text-blue-600">{step}/5</span>
        </div>
      </nav>

      {/* ── Continuous Progress Bar ── */}
      <div className="w-full h-[3px] bg-slate-100">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 to-indigo-500"
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.5, ease: [0.22, 0.68, 0.36, 1] }}
        />
      </div>

      {/* ── Main Content ── */}
      <main className="flex-1 flex flex-col items-center px-4 sm:px-6 py-10 sm:py-14">
        <div className="w-full max-w-[900px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={pageVariants}
              initial="initial" animate="animate" exit="exit"
              transition={pageTrans}
            >
              {/* ─── STEP 1: Personal Info ─── */}
              {step === 1 && (
                <div>
                  <StepHeader icon={User} tag="Step 1 of 5" title="Personal Information" subtitle="Let's personalize your financial journey with some basics." />
                  <div className="bg-white rounded-[1.75rem] shadow-lg shadow-slate-200/40 border border-slate-100 p-7 sm:p-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <PremiumInput icon={User} label="Age" type="number" value={personal.age} onChange={v => setPersonal({ ...personal, age: v })} placeholder="e.g. 28" />
                      <PremiumInput icon={Briefcase} label="Occupation" type="text" value={personal.occupation} onChange={v => setPersonal({ ...personal, occupation: v })} placeholder="e.g. Software Engineer" />
                      <PremiumInput icon={IndianRupee} label="Monthly Income" type="text" value={formatINR(personal.income)} onChange={v => setPersonal({ ...personal, income: rawNum(v) })} placeholder="e.g. 80,000" prefix="₹" />
                      <PremiumInput icon={Wallet} label="Monthly Expenses" type="text" value={formatINR(personal.expenses)} onChange={v => setPersonal({ ...personal, expenses: rawNum(v) })} placeholder="e.g. 45,000" prefix="₹" />
                    </div>
                  </div>
                </div>
              )}

              {/* ─── STEP 2: Financial Habits ─── */}
              {step === 2 && (
                <div>
                  <StepHeader icon={Wallet} tag="Step 2 of 5" title="Financial Habits" subtitle="How do you currently manage your money?" />
                  <div className="space-y-5">
                    <HabitCard label="Do you track your expenses?" val={habits.track} onChange={v => setHabits({ ...habits, track: v })} opts={["Yes, every penny", "Roughly, in my head", "Rarely", "Never"]} />
                    <HabitCard label="Do you have an emergency fund?" val={habits.emergency} onChange={v => setHabits({ ...habits, emergency: v })} opts={["Yes, 6+ months", "Yes, 1-3 months", "Working on it", "No"]} />
                    <HabitCard label="How often do you save money?" val={habits.save} onChange={v => setHabits({ ...habits, save: v })} opts={["Automatically every month", "Whatever is left over", "Occasionally", "I struggle to save"]} />
                    <HabitCard label="Do you follow a monthly budget?" val={habits.budget} onChange={v => setHabits({ ...habits, budget: v })} opts={["Strictly", "Loosely", "I tried but failed", "Never"]} />
                  </div>
                </div>
              )}

              {/* ─── STEP 3: Knowledge — Duolingo-style ─── */}
              {step === 3 && (
                <div>
                  <StepHeader icon={BookOpen} tag="Step 3 of 5" title="Financial Knowledge" subtitle="Let's assess your current financial literacy." />
                  {/* Mini quiz progress */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-blue-600 rounded-full"
                        animate={{ width: `${((quizIdx + 1) / KNOWLEDGE_QUESTIONS.length) * 100}%` }}
                        transition={{ duration: 0.35 }}
                      />
                    </div>
                    <span className="text-[13px] font-bold text-slate-400 tabular-nums whitespace-nowrap">
                      {quizIdx + 1} / {KNOWLEDGE_QUESTIONS.length}
                    </span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={quizIdx}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.28 }}
                      className="bg-white rounded-[1.75rem] shadow-lg shadow-slate-200/40 border border-slate-100 p-7 sm:p-10"
                    >
                      <div className="flex items-start gap-4 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                          <span className="text-[15px] font-black text-blue-600">{quizIdx + 1}</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 leading-snug pt-1.5">
                          {KNOWLEDGE_QUESTIONS[quizIdx].q}
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {KNOWLEDGE_QUESTIONS[quizIdx].options.map((opt, oIdx) => {
                          const sel = knowledge[quizIdx] === oIdx;
                          return (
                            <motion.button
                              key={oIdx}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => {
                                const nk = [...knowledge]; nk[quizIdx] = oIdx; setKnowledge(nk);
                                if (quizIdx < KNOWLEDGE_QUESTIONS.length - 1) setTimeout(() => setQuizIdx(qi => qi + 1), 380);
                              }}
                              aria-pressed={sel}
                              className={`w-full p-4 sm:p-5 rounded-2xl text-left text-[15px] font-medium transition-all duration-200 border-2 ${
                                sel
                                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/15 border-blue-600'
                                  : 'bg-slate-50 text-slate-700 border-slate-100 hover:border-blue-300 hover:bg-blue-50/40'
                              }`}
                            >
                              <span className="flex items-center gap-3">
                                <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-[12px] font-black shrink-0 ${
                                  sel ? 'bg-white/20 text-white' : 'bg-white text-slate-500 border border-slate-200'
                                }`}>
                                  {String.fromCharCode(65 + oIdx)}
                                </span>
                                {opt}
                              </span>
                            </motion.button>
                          );
                        })}
                      </div>
                      {/* Internal quiz nav */}
                      <div className="flex justify-between mt-8">
                        <button onClick={() => setQuizIdx(i => Math.max(0, i - 1))} disabled={quizIdx === 0}
                          className="text-sm font-bold text-slate-400 hover:text-slate-700 disabled:opacity-0 transition-all px-3 py-2 rounded-lg">
                          ← Previous
                        </button>
                        <button onClick={() => setQuizIdx(i => Math.min(KNOWLEDGE_QUESTIONS.length - 1, i + 1))}
                          disabled={quizIdx === KNOWLEDGE_QUESTIONS.length - 1 || knowledge[quizIdx] === -1}
                          className="text-sm font-bold text-blue-600 hover:text-blue-700 disabled:opacity-30 transition-all px-3 py-2 rounded-lg">
                          Next →
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}

              {/* ─── STEP 4: Financial Goals ─── */}
              {step === 4 && (
                <div>
                  <StepHeader icon={Target} tag="Step 4 of 5" title="Financial Goals" subtitle="What are you working towards? Select all that apply." />
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {GOALS_DATA.map((g, idx) => {
                      const Icon = g.icon;
                      const sel = goals.includes(g.label);
                      return (
                        <motion.button
                          key={g.label}
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.04 }}
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => sel ? setGoals(goals.filter(x => x !== g.label)) : setGoals([...goals, g.label])}
                          aria-pressed={sel}
                          className={`relative p-5 sm:p-6 rounded-2xl flex flex-col items-center text-center gap-3 transition-all duration-200 border-2 ${
                            sel
                              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/15 border-blue-600'
                              : 'bg-white text-slate-600 border-slate-100 hover:border-blue-300 hover:shadow-md shadow-sm'
                          }`}
                        >
                          {sel && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                              className="absolute top-2.5 right-2.5 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow">
                              <Check className="w-3 h-3 text-blue-600" />
                            </motion.div>
                          )}
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${sel ? 'bg-white/20' : 'bg-slate-50 border border-slate-100'}`}>
                            <Icon className={`w-6 h-6 ${sel ? 'text-white' : 'text-blue-500'}`} />
                          </div>
                          <div>
                            <span className="text-[13px] font-bold block">{g.label}</span>
                            <span className={`text-[11px] mt-0.5 block ${sel ? 'text-blue-100' : 'text-slate-400'}`}>{g.desc}</span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                  {goals.length > 0 && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="text-center text-[13px] text-slate-400 font-medium mt-5">
                      {goals.length} goal{goals.length > 1 ? 's' : ''} selected
                    </motion.p>
                  )}
                </div>
              )}

              {/* ─── STEP 5: Risk Profile ─── */}
              {step === 5 && (
                <div>
                  <StepHeader icon={ShieldCheck} tag="Step 5 of 5" title="Risk Profile" subtitle="If the stock market drops 20% in a month, what would you do?" />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {RISK_DATA.map((r, idx) => {
                      const Icon = r.icon;
                      const sel = risk === r.value;
                      const colors = {
                        emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', iconBg: 'bg-emerald-100', tag: 'bg-emerald-100 text-emerald-700' },
                        blue:    { bg: 'bg-blue-50',    border: 'border-blue-200',    text: 'text-blue-600',    iconBg: 'bg-blue-100',    tag: 'bg-blue-100 text-blue-700' },
                        amber:   { bg: 'bg-amber-50',   border: 'border-amber-200',   text: 'text-amber-600',   iconBg: 'bg-amber-100',   tag: 'bg-amber-100 text-amber-700' },
                      }[r.color];

                      return (
                        <motion.button
                          key={r.value}
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.08 }}
                          whileHover={{ y: -4 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setRisk(r.value)}
                          aria-pressed={sel}
                          className={`relative p-6 sm:p-8 rounded-2xl text-left transition-all duration-200 border-2 ${
                            sel ? `${colors.bg} ${colors.border} shadow-lg` : 'bg-white border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md'
                          }`}
                        >
                          {sel && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                              className={`absolute top-3 right-3 w-6 h-6 rounded-full ${colors.iconBg} flex items-center justify-center`}>
                              <Check className={`w-3.5 h-3.5 ${colors.text}`} />
                            </motion.div>
                          )}
                          <div className={`w-12 h-12 rounded-xl ${sel ? colors.iconBg : 'bg-slate-50'} flex items-center justify-center mb-4`}>
                            <Icon className={`w-6 h-6 ${sel ? colors.text : 'text-slate-400'}`} />
                          </div>
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold mb-3 ${sel ? colors.tag : 'bg-slate-100 text-slate-500'}`}>
                            {r.tag}
                          </span>
                          <h3 className={`text-lg font-bold mb-2 ${sel ? colors.text : 'text-slate-800'}`}>{r.level}</h3>
                          <p className={`text-[13px] leading-relaxed ${sel ? 'text-slate-600' : 'text-slate-400'}`}>{r.desc}</p>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* ── Bottom Actions ── */}
          <div className="mt-10 flex justify-between items-center">
            <motion.button
              whileHover={{ x: -2 }}
              onClick={() => { if (step === 3 && quizIdx > 0) setQuizIdx(0); setStep(s => s - 1); }}
              disabled={step === 1}
              className="flex items-center gap-1.5 px-5 py-3 rounded-xl font-bold text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all disabled:opacity-0"
              aria-label="Go back"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-7 py-3.5 bg-blue-600 text-white text-[15px] font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/25 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
              aria-label={step === 5 ? 'Complete assessment' : 'Continue'}
            >
              {step === 5
                ? <><span>Complete Assessment</span> <Sparkles className="w-4 h-4" /></>
                : <><span>Continue</span> <ChevronRight className="w-4 h-4" /></>}
            </motion.button>
          </div>

          {/* Keyboard hint */}
          <p className="text-center text-[12px] text-slate-300 font-medium mt-4 select-none">
            Press <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-[11px] text-slate-400 font-mono border border-slate-200">Enter ↵</kbd> to continue
          </p>
        </div>
      </main>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   SHARED SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

const StepHeader: React.FC<{ icon: React.FC<any>; tag: string; title: string; subtitle: string }> = ({ icon: Icon, tag, title, subtitle }) => (
  <div className="mb-8">
    <div className="flex items-center gap-2 mb-3">
      <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
        <Icon className="w-3.5 h-3.5 text-blue-600" />
      </div>
      <span className="text-[12px] font-bold text-blue-600 uppercase tracking-wider">{tag}</span>
    </div>
    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">{title}</h2>
    <p className="text-[16px] text-slate-500">{subtitle}</p>
  </div>
);

const PremiumInput: React.FC<{
  icon: React.FC<any>; label: string; type: string; value: string;
  onChange: (v: string) => void; placeholder: string; prefix?: string;
}> = ({ icon: Icon, label, type, value, onChange, placeholder, prefix }) => (
  <div className="group">
    <label className="block text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">{label}</label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors">
        <Icon className="w-[18px] h-[18px]" />
      </div>
      {prefix && <span className="absolute left-11 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-[15px]">{prefix}</span>}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={label}
        className={`w-full ${prefix ? 'pl-14' : 'pl-11'} pr-5 py-4 text-[15px] text-slate-900 font-medium bg-slate-50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-300`}
      />
    </div>
  </div>
);

const HabitCard: React.FC<{ label: string; val: string; onChange: (v: string) => void; opts: string[] }> = ({ label, val, onChange, opts }) => (
  <div className="bg-white rounded-[1.75rem] shadow-sm border border-slate-100 p-6 sm:p-7">
    <h3 className="text-[15px] font-bold text-slate-800 mb-4">{label}</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      {opts.map(o => {
        const sel = val === o;
        return (
          <motion.button
            key={o}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onChange(o)}
            aria-pressed={sel}
            className={`p-3.5 rounded-xl text-[13.5px] font-medium text-left transition-all duration-200 border-2 ${
              sel
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/12 border-blue-600'
                : 'bg-slate-50 text-slate-600 border-slate-100 hover:border-blue-300 hover:bg-blue-50/40'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <span className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                sel ? 'bg-white/20' : 'border-2 border-slate-200'
              }`}>
                {sel && <Check className="w-3 h-3 text-white" />}
              </span>
              {o}
            </span>
          </motion.button>
        );
      })}
    </div>
  </div>
);
