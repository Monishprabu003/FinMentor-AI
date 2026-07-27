import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../../components/common/Logo';
import {
  Check, ChevronRight, ChevronLeft, Target, Award, ArrowRight,
  Sparkles, User, Briefcase, IndianRupee, PiggyBank,
  ShieldCheck, Wallet, BookOpen, BarChart3, Home, Car, Plane,
  GraduationCap, Rocket, Shield, Brain, Flame, LineChart,
  Lightbulb, RotateCcw, Eye, EyeOff, CheckCircle2, XCircle,
  HelpCircle, ArrowLeft
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   DATA — Preserved exactly
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

const LOADING_STEPS = [
  "Analyzing your financial profile…",
  "Evaluating spending habits…",
  "Calculating financial score…",
  "Generating AI insights…",
  "Determining risk profile…",
];

const STEP_CONTEXT: Record<number, { title: string; description: string; tip: string }> = {
  1: {
    title: "Personal Information",
    description: "We use these details to personalize your financial roadmap and tailor recommendations specifically for your life stage and income bracket.",
    tip: "Your income and expense data helps FinMentor calculate savings potential and suggest the right 50/30/20 allocation.",
  },
  2: {
    title: "Financial Habits",
    description: "Your daily money habits reveal your financial personality. This helps us identify strengths to build on and areas where small changes create big impact.",
    tip: "People who track expenses save on average 15% more per month than those who don't.",
  },
  3: {
    title: "Financial Knowledge",
    description: "Understanding your current financial literacy helps us calibrate learning recommendations and ensure the AI mentor speaks at the right level.",
    tip: "Don't worry about getting every answer right — this helps us personalize your learning path.",
  },
  4: {
    title: "Financial Goals",
    description: "Your goals shape everything — from how we allocate your savings to the investment strategies we recommend. Select all that resonate with you.",
    tip: "Having 2–3 clear financial goals increases the likelihood of achieving them by 40%.",
  },
  5: {
    title: "Risk Profile",
    description: "Understanding how you react to market volatility helps us recommend investment strategies that match your comfort level.",
    tip: "There's no wrong answer here. Your risk tolerance is personal and can evolve over time.",
  },
};

const formatINR = (val: string) => {
  const num = val.replace(/[^0-9]/g, '');
  if (!num) return '';
  return Number(num).toLocaleString('en-IN');
};
const rawNum = (val: string) => val.replace(/[^0-9]/g, '');

const AnimatedCounter: React.FC<{ target: number }> = ({ target }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const stepTime = 20;
    const steps = duration / stepTime;
    const inc = target / steps;
    const timer = setInterval(() => {
      start += inc;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, stepTime);
    return () => clearInterval(timer);
  }, [target]);
  return <span className="tabular-nums">{count}</span>;
};

const CircularScore: React.FC<{ value: number }> = ({ value }) => {
  const radius = 70;
  const stroke = 10;
  const normRad = radius - stroke * 2;
  const circum = normRad * 2 * Math.PI;
  const strokeDashoffset = circum - (value / 100) * circum;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
        <circle stroke="#f1f5f9" fill="transparent" strokeWidth={stroke} r={normRad} cx={radius} cy={radius} />
        <motion.circle
          stroke="#2563eb"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circum} ${circum}`}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normRad} cx={radius} cy={radius}
          initial={{ strokeDashoffset: circum }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.4, ease: [0.22, 0.68, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black text-slate-900 tracking-tight">
          <AnimatedCounter target={value} />
        </span>
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Score</span>
      </div>
    </div>
  );
};

const ContextPanel: React.FC<{ step: number; quizIdx: number }> = ({ step, quizIdx }) => {
  const ctx = STEP_CONTEXT[step];
  const stepIcons = [User, Wallet, BookOpen, Target, ShieldCheck];
  const StepIcon = stepIcons[step - 1];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
          <StepIcon className="w-4.5 h-4.5 text-blue-600" />
        </div>
        <span className="text-[12px] font-bold text-blue-600 uppercase tracking-wider">
          Step {step} of 5
        </span>
      </div>

      <div>
        <h2 className="text-2xl sm:text-[28px] font-black text-slate-900 tracking-tight leading-tight mb-3">
          {ctx.title}
        </h2>
        <p className="text-[15px] text-slate-500 leading-relaxed">
          {ctx.description}
        </p>
      </div>

      {step === 3 && (
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">Quiz Progress</span>
            <span className="text-[13px] font-black text-blue-600 tabular-nums">{quizIdx + 1}/{KNOWLEDGE_QUESTIONS.length}</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-600 rounded-full"
              animate={{ width: `${((quizIdx + 1) / KNOWLEDGE_QUESTIONS.length) * 100}%` }}
              transition={{ duration: 0.35 }}
            />
          </div>
        </div>
      )}

      <div className="bg-blue-50/70 rounded-2xl border border-blue-100/60 p-5">
        <div className="flex items-center gap-2 mb-2.5">
          <Lightbulb className="w-4 h-4 text-blue-600" />
          <span className="text-[12px] font-bold text-blue-700 uppercase tracking-wider">AI Tip</span>
        </div>
        <p className="text-[13.5px] text-blue-800/70 leading-relaxed">
          {ctx.tip}
        </p>
      </div>

      <div className="flex items-center gap-2 text-[12px] text-slate-400 font-medium pt-2">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>Your data is encrypted and private</span>
      </div>
    </div>
  );
};

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
        className={`w-full ${prefix ? 'pl-14' : 'pl-11'} pr-5 py-4 text-[15px] text-slate-900 font-medium bg-white border-2 border-slate-150 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-300`}
      />
    </div>
  </div>
);

const HabitCard: React.FC<{ label: string; val: string; onChange: (v: string) => void; opts: string[] }> = ({ label, val, onChange, opts }) => (
  <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
    <h3 className="text-[15px] font-bold text-slate-800 mb-4">{label}</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      {opts.map(o => {
        const sel = val === o;
        return (
          <motion.button
            key={o}
            whileHover={{ scale: 1.01, y: -1 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onChange(o)}
            aria-pressed={sel}
            className={`p-3.5 rounded-xl text-[13.5px] font-medium text-left transition-all duration-200 border-2 ${
              sel
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/12 border-blue-600'
                : 'bg-slate-50/80 text-slate-600 border-slate-100 hover:border-blue-300 hover:bg-blue-50/40'
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

export const AssessmentPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [loadingIdx, setLoadingIdx] = useState(0);
  const [summary, setSummary] = useState<any>(null);
  const [isReviewing, setIsReviewing] = useState(false);
  const [isRetaking, setIsRetaking] = useState(false);

  const [personal, setPersonal] = useState({ age: '', occupation: '', income: '', expenses: '' });
  const [habits, setHabits] = useState({ track: '', emergency: '', save: '', budget: '' });
  const [knowledge, setKnowledge] = useState<number[]>(Array(10).fill(-1));
  const [quizIdx, setQuizIdx] = useState(0);
  const [goals, setGoals] = useState<string[]>([]);
  const [risk, setRisk] = useState('');

  useEffect(() => {
    if (user?.assessment_completed && !summary && !isRetaking) {
      setSummary({
        financial_score: user.financial_score ?? 0,
        knowledge_level: user.knowledge_level ?? 'Intermediate',
        financial_persona: user.financial_persona ?? 'Smart Saver',
        risk_profile: user.risk_profile ?? 'Medium Risk',
      });
      if (user.assessment_answers) {
        if (Array.isArray(user.assessment_answers.knowledge)) setKnowledge(user.assessment_answers.knowledge);
        if (user.assessment_answers.habits) setHabits(user.assessment_answers.habits);
        if (user.assessment_answers.risk) setRisk(user.assessment_answers.risk);
      }
      if (user.monthly_income) setPersonal(p => ({ ...p, income: String(user.monthly_income) }));
      if (user.monthly_expenses) setPersonal(p => ({ ...p, expenses: String(user.monthly_expenses) }));
      if (user.financial_goals && Array.isArray(user.financial_goals)) setGoals(user.financial_goals);
    }
  }, [user, summary, isRetaking]);

  const calculateScore = useCallback(() => {
    let s = 0;
    knowledge.forEach((a, i) => { if (a === KNOWLEDGE_QUESTIONS[i].correct) s += 10; });
    return s;
  }, [knowledge]);

  const correctCount = knowledge.filter((a, i) => a === KNOWLEDGE_QUESTIONS[i].correct).length;

  const determineRisk = useCallback(() => {
    if (risk.includes('capital')) return "Low";
    if (risk.includes('recovery') || risk.includes('Hold')) return "Medium";
    return "High";
  }, [risk]);

  const handleSubmit = async () => {
    setSubmitting(true);
    const finalScore = calculateScore();
    const finalRisk = determineRisk();

    for (let i = 0; i < LOADING_STEPS.length; i++) {
      setLoadingIdx(i);
      await new Promise(r => setTimeout(r, 650));
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
      setIsRetaking(false);
      await refreshUser();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetake = () => {
    setIsRetaking(true);
    setSummary(null);
    setIsReviewing(false);
    setStep(1);
    setQuizIdx(0);
    setKnowledge(Array(10).fill(-1));
    setPersonal({ age: '', occupation: '', income: '', expenses: '' });
    setHabits({ track: '', emergency: '', save: '', budget: '' });
    setGoals([]);
    setRisk('');
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

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && canProceed() && !submitting && !summary) handleNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  const progressPct = (step / 5) * 100;

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit:    { opacity: 0, x: -20 },
  };
  const pageTrans = { duration: 0.35, ease: [0.22, 0.68, 0.36, 1] as const };

  if (submitting) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
        <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06]"
            style={{ background: 'radial-gradient(circle, #2563eb 0%, transparent 70%)' }} />
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 max-w-sm w-full text-center">
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
            <motion.p key={loadingIdx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="text-[17px] font-semibold text-slate-700 mb-8">
              {LOADING_STEPS[loadingIdx]}
            </motion.p>
          </AnimatePresence>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full" animate={{ width: `${((loadingIdx + 1) / LOADING_STEPS.length) * 100}%` }} transition={{ duration: 0.5, ease: "easeOut" }} />
          </div>
        </motion.div>
      </div>
    );
  }

  if (summary) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-slate-50/40 to-white flex flex-col items-center justify-center px-4 sm:px-6 py-12">
        <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-[0.05]"
            style={{ background: 'radial-gradient(circle, #2563eb 0%, transparent 70%)' }} />
        </div>

        {/* Top Action Header */}
        <div className="w-full max-w-3xl flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-bold shadow-xs transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRetake}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 hover:bg-blue-100 text-sm font-bold shadow-xs transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Assessment</span>
            </button>
            <button
              onClick={() => setIsReviewing(!isReviewing)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-sm font-bold shadow-xs transition-all"
            >
              {isReviewing ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{isReviewing ? 'Finish Review' : 'Review Answers'}</span>
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative z-10 max-w-3xl w-full bg-white rounded-[2rem] p-6 sm:p-12 shadow-xl shadow-slate-200/40 border border-slate-100"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-2xl bg-blue-50 border border-blue-100 mb-4">
              <Award className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
              Financial Assessment Summary
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Review your score, quiz performance breakdown, and personalized recommendations.
            </p>
          </div>

          {/* Circular Score Gauge & Point Tally */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 bg-slate-50/80 rounded-3xl p-6 border border-slate-100 mb-8">
            <CircularScore value={summary.financial_score} />

            <div className="text-center sm:text-left space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-blue-700 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> 1 Point Per Question
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {correctCount} / 10 Points
              </div>
              <p className="text-xs text-slate-500 font-medium">
                You correctly answered {correctCount} out of 10 financial literacy questions ({summary.financial_score}% overall health score).
              </p>
            </div>
          </div>

          {/* Performance Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {[
              { label: "Knowledge Level", value: summary.knowledge_level, color: "text-slate-800" },
              { label: "Persona", value: summary.financial_persona, color: "text-blue-600" },
              { label: "Risk Profile", value: summary.risk_profile || "Balanced", color: "text-emerald-600" },
            ].map(s => (
              <div key={s.label} className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center">
                <span className="block text-[11px] font-bold uppercase text-slate-400 tracking-wider mb-1">{s.label}</span>
                <span className={`text-lg font-black ${s.color}`}>{s.value}</span>
              </div>
            ))}
          </div>

          {/* QUESTION REVIEW ACCORDION / SECTION */}
          {isReviewing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-8 border-t border-slate-200 pt-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-blue-600" /> Knowledge Quiz Answer Review
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Review your answers for all 10 financial questions (1 point per correct answer).
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                  {correctCount} / 10 Correct
                </span>
              </div>

              <div className="space-y-4">
                {KNOWLEDGE_QUESTIONS.map((q, idx) => {
                  const userAns = knowledge[idx];
                  const isCorrect = userAns === q.correct;

                  return (
                    <div
                      key={idx}
                      className={`p-5 rounded-2xl border transition-all text-left ${
                        isCorrect
                          ? 'bg-emerald-50/40 border-emerald-200/70'
                          : 'bg-rose-50/40 border-rose-200/70'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h4 className="text-sm font-bold text-slate-900 flex items-start gap-2">
                          <span className="w-5 h-5 rounded-md bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{q.q}</span>
                        </h4>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shrink-0 ${
                          isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                          {isCorrect ? '+1 Point' : '0 Points'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium pt-2 border-t border-slate-200/60">
                        <div>
                          <span className="text-slate-400 font-semibold block mb-0.5">Your Answer:</span>
                          <span className={isCorrect ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                            {userAns !== undefined && userAns >= 0 ? q.options[userAns] : 'Not answered'}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 font-semibold block mb-0.5">Correct Answer:</span>
                          <span className="text-emerald-700 font-bold">
                            {q.options[q.correct]}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* AI Summary */}
          <div className="text-left bg-blue-50/60 rounded-2xl p-6 border border-blue-100/70 mb-8">
            <h3 className="text-[15px] font-bold text-slate-800 mb-2.5 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" /> AI Recommendations
            </h3>
            <p className="text-[14px] text-slate-600 leading-relaxed mb-4">
              "Building a consistent emergency fund and improving your investment knowledge will significantly boost your financial health."
            </p>
            <ul className="space-y-2">
              {["Optimize your emergency fund allocation", "Learn tax-saving fundamentals (Section 80C)", "Automate your monthly investments"].map((t, i) => (
                <li key={i} className="flex items-center gap-2.5 text-[13.5px] text-slate-600 font-medium">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 text-emerald-600" />
                  </div>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={handleRetake}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-all"
            >
              <RotateCcw className="w-4 h-4" /> Retake Assessment
            </button>
            <button
              onClick={() => setIsReviewing(!isReviewing)}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-all"
            >
              {isReviewing ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {isReviewing ? 'Finish Review' : 'Review Answers'}
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md shadow-blue-600/20"
            >
              <span>{isReviewing ? 'Finish Review' : 'Go to Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ════════════════════════════════════════════════════════════════
     MAIN ASSESSMENT FLOW — Two-Column Rocket Money Layout
     ════════════════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-[#f9fafb] text-slate-900 flex flex-col">
      {/* Subtle ambient gradient background */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #2563eb 0%, transparent 70%)' }} />
        <div className="absolute -bottom-[10%] -right-[5%] w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }} />
      </div>

      {/* ── Sticky Header ── */}
      <nav className="bg-white/90 backdrop-blur-xl border-b border-slate-100 px-5 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-20">
        {/* Left: Logo */}
        <Logo size="md" />

        {/* Right: Step counter + progress */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-[13px]">
            <span className="font-medium text-slate-400">Step {step} of 5</span>
            <span className="text-slate-300">·</span>
            <span className="font-bold text-blue-600 tabular-nums">{Math.round(progressPct)}%</span>
          </div>
          <div className="w-28 sm:w-36 h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-600 rounded-full"
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.5, ease: [0.22, 0.68, 0.36, 1] }}
            />
          </div>
          {/* Mobile step badge */}
          <div className="sm:hidden flex items-center gap-1.5 text-[12px] font-bold text-slate-500">
            <span>{step}/5</span>
          </div>
        </div>
      </nav>

      {/* ── Main Content: Two-Column Layout ── */}
      <main className="flex-1 flex flex-col relative z-10">
        <div className="flex-1 w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-8 sm:py-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

            {/* LEFT — Context Panel (35%) */}
            <div className="lg:w-[320px] xl:w-[360px] shrink-0">
              <div className="lg:sticky lg:top-24">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ContextPanel step={step} quizIdx={quizIdx} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* RIGHT — Form Content (65%) */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  variants={pageVariants}
                  initial="initial" animate="animate" exit="exit"
                  transition={pageTrans}
                >
                  {/* ─── STEP 1: Personal Info ─── */}
                  {step === 1 && (
                    <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/30 border border-slate-100 p-7 sm:p-10">
                      <h3 className="text-xl font-bold text-slate-900 mb-1.5">Tell us about yourself</h3>
                      <p className="text-[14px] text-slate-400 mb-8">This helps us personalize your experience.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <PremiumInput icon={User} label="Age" type="number" value={personal.age} onChange={v => setPersonal({ ...personal, age: v })} placeholder="e.g. 28" />
                        <PremiumInput icon={Briefcase} label="Occupation" type="text" value={personal.occupation} onChange={v => setPersonal({ ...personal, occupation: v })} placeholder="e.g. Software Engineer" />
                        <PremiumInput icon={IndianRupee} label="Monthly Income" type="text" value={formatINR(personal.income)} onChange={v => setPersonal({ ...personal, income: rawNum(v) })} placeholder="e.g. 80,000" prefix="₹" />
                        <PremiumInput icon={Wallet} label="Monthly Expenses" type="text" value={formatINR(personal.expenses)} onChange={v => setPersonal({ ...personal, expenses: rawNum(v) })} placeholder="e.g. 45,000" prefix="₹" />
                      </div>
                    </div>
                  )}

                  {/* ─── STEP 2: Financial Habits ─── */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <HabitCard label="Do you track your expenses?" val={habits.track} onChange={v => setHabits({ ...habits, track: v })} opts={["Yes, every penny", "Roughly, in my head", "Rarely", "Never"]} />
                      <HabitCard label="Do you have an emergency fund?" val={habits.emergency} onChange={v => setHabits({ ...habits, emergency: v })} opts={["Yes, 6+ months", "Yes, 1-3 months", "Working on it", "No"]} />
                      <HabitCard label="How often do you save money?" val={habits.save} onChange={v => setHabits({ ...habits, save: v })} opts={["Automatically every month", "Whatever is left over", "Occasionally", "I struggle to save"]} />
                      <HabitCard label="Do you follow a monthly budget?" val={habits.budget} onChange={v => setHabits({ ...habits, budget: v })} opts={["Strictly", "Loosely", "I tried but failed", "Never"]} />
                    </div>
                  )}

                  {/* ─── STEP 3: Knowledge — Duolingo-style, one at a time ─── */}
                  {step === 3 && (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={quizIdx}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -14 }}
                        transition={{ duration: 0.28 }}
                        className="bg-white rounded-2xl shadow-lg shadow-slate-200/30 border border-slate-100 p-7 sm:p-10"
                      >
                        {/* Question number + text */}
                        <div className="flex items-start gap-4 mb-8">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                            <span className="text-[15px] font-black text-blue-600">{quizIdx + 1}</span>
                          </div>
                          <h3 className="text-xl font-bold text-slate-800 leading-snug pt-1.5">
                            {KNOWLEDGE_QUESTIONS[quizIdx].q}
                          </h3>
                        </div>

                        {/* Answer options */}
                        <div className="grid grid-cols-1 gap-3">
                          {KNOWLEDGE_QUESTIONS[quizIdx].options.map((opt, oIdx) => {
                            const sel = knowledge[quizIdx] === oIdx;
                            return (
                              <motion.button
                                key={oIdx}
                                whileHover={{ scale: 1.01, y: -1 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => {
                                  const nk = [...knowledge]; nk[quizIdx] = oIdx; setKnowledge(nk);
                                  if (quizIdx < KNOWLEDGE_QUESTIONS.length - 1) setTimeout(() => setQuizIdx(qi => qi + 1), 380);
                                }}
                                aria-pressed={sel}
                                className={`w-full p-4 sm:p-5 rounded-2xl text-left text-[15px] font-medium transition-all duration-200 border-2 ${
                                  sel
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/15 border-blue-600'
                                    : 'bg-slate-50/80 text-slate-700 border-slate-100 hover:border-blue-300 hover:bg-blue-50/40'
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
                  )}

                  {/* ─── STEP 4: Financial Goals ─── */}
                  {step === 4 && (
                    <div>
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
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── Fixed Bottom Navigation ── */}
        <div className="sticky bottom-0 z-20 bg-white/90 backdrop-blur-xl border-t border-slate-100 px-5 sm:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto flex justify-between items-center py-4">
            <motion.button
              whileHover={{ x: -2 }}
              onClick={() => { if (step === 3 && quizIdx > 0) setQuizIdx(0); setStep(s => s - 1); }}
              disabled={step === 1}
              className="flex items-center gap-1.5 px-5 py-3 rounded-xl font-bold text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all disabled:opacity-0"
              aria-label="Go back"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </motion.button>

            <div className="flex items-center gap-4">
              <p className="hidden sm:block text-[12px] text-slate-300 font-medium select-none">
                Press <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-[11px] text-slate-400 font-mono border border-slate-200">Enter ↵</kbd> to continue
              </p>
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
          </div>
        </div>
      </main>
    </div>
  );
};
