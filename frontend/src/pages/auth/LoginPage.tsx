import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import {
  TrendingUp, Eye, EyeOff, ArrowRight,
  AlertCircle, Sparkles, ShieldCheck, Bot, Activity, ArrowUpRight
} from 'lucide-react';

/* ── Left Brand Panel: Midnight Financial OS Command Center ─── */
const BrandPanel: React.FC = () => (
  <div className="hidden lg:flex flex-col justify-between bg-slate-950 p-16 relative overflow-hidden border-r border-slate-800 text-white">
    {/* Subtle radial ambient cobalt glow and grid */}
    <div
      className="absolute inset-0 pointer-events-none opacity-20"
      style={{
        backgroundImage: 'linear-gradient(#1e293b 1px,transparent 1px),linear-gradient(90deg,#1e293b 1px,transparent 1px)',
        backgroundSize: '40px 40px'
      }}
    />
    <div
      className="absolute right-0 top-1/4 w-[480px] h-[480px] pointer-events-none rounded-full blur-3xl opacity-30"
      style={{ background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)' }}
    />

    {/* Top Brand Logo */}
    <div className="relative z-10 flex items-center gap-3.5">
      <div className="w-11 h-11 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/30">
        <TrendingUp className="w-6 h-6 text-white" strokeWidth={2.5} />
      </div>
      <div>
        <span className="text-2xl font-black text-white tracking-tight leading-none block">FinMentor</span>
        <span className="text-[11px] font-bold text-blue-400 tracking-widest uppercase">AI Financial OS</span>
      </div>
    </div>

    {/* Main Headline & Interactive Fintech Preview Cards */}
    <div className="relative z-10 space-y-8 my-auto py-8">
      <div>
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[12px] font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" /> Next-Gen Wealth Management
        </span>
        <h2 className="text-4xl sm:text-5xl font-black text-white leading-[1.12] tracking-tight">
          Intelligent Financial <br />
          <span className="text-blue-500">Command Center.</span>
        </h2>
        <p className="text-[15.5px] text-slate-400 mt-3 leading-relaxed max-w-md">
          Autonomous spend analytics, real-time 50/30/20 budget guardrails, and personalized Google Gemini AI guidance.
        </p>
      </div>

      {/* Stack of 2 Glass Fintech Intelligence Cards */}
      <div className="space-y-4 max-w-md">
        {/* Card 1: Live Net Worth & Asset Engine */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl transition-all hover:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" />
              <span className="text-[12px] font-bold text-slate-300 uppercase tracking-wider">Net Wealth Portfolio</span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active Sync
            </span>
          </div>
          <div className="flex items-baseline justify-between mb-4">
            <span className="text-3xl font-black tracking-tight text-white">₹14,28,500</span>
            <span className="text-[13px] font-extrabold text-emerald-400 flex items-center">
              +24.8% YoY <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </span>
          </div>
          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>50% Needs</span>
              <span>30% Wants</span>
              <span>20% Savings</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex gap-0.5">
              <div className="h-full bg-blue-500 rounded-l-full" style={{ width: '50%' }} />
              <div className="h-full bg-indigo-400" style={{ width: '30%' }} />
              <div className="h-full bg-emerald-400 rounded-r-full" style={{ width: '20%' }} />
            </div>
          </div>
        </div>

        {/* Card 2: AI Mentor Live Insight */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-2xl backdrop-blur-xl flex items-start gap-4 transition-all hover:border-slate-700">
          <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
            <Bot className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[13px] font-bold text-white">Gemini AI Mentor</span>
              <span className="text-[10px] text-blue-400 font-mono">JUST NOW</span>
            </div>
            <p className="text-[13px] text-slate-300 leading-relaxed">
              "Categorized 42 transactions this month. You're on track to reach your ₹3L emergency fund milestone 2 weeks ahead of schedule."
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Footer Trust Bar */}
    <div className="relative z-10 flex items-center justify-between pt-6 border-t border-slate-800/80 text-[13px] text-slate-400 font-medium">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-blue-400" />
        <span>Bank-Grade 256-Bit Encryption</span>
      </div>
      <span>Deterministic Engine + Gemini AI</span>
    </div>
  </div>
);

/* ── LoginPage ───────────────────────────────────────── */
export const LoginPage: React.FC = () => {
  const { login, loginWithGoogle, quickDemoLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]   = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const e: { email?: string; password?: string } = {};
    if (!email.includes('@')) e.email = 'Enter a valid email address';
    if (!password)            e.password = 'Password is required';
    setFieldErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch {
      setError('Incorrect email or password. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = async () => {
    setLoading(true);
    await quickDemoLogin();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white grid lg:grid-cols-2">
      <BrandPanel />

      {/* Form side */}
      <div className="flex flex-col items-center justify-center px-8 sm:px-14 py-16 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full max-w-lg"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-black text-slate-900">FinMentor</span>
          </div>

          <div className="mb-10">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Welcome back</h1>
            <p className="text-[16px] text-slate-500 mt-2.5">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-600 font-bold hover:underline">Create one free →</Link>
            </p>
          </div>

          {/* GOOGLE LOGIN */}
          <div className="mb-6 flex justify-center">
            <button
              type="button"
              onClick={async () => {
                setLoading(true);
                try {
                  await loginWithGoogle();
                  navigate('/dashboard');
                } catch {
                  setError('Failed to login with Google.');
                } finally {
                  setLoading(false);
                }
              }}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-300 rounded-full text-slate-700 hover:bg-slate-50 transition-colors font-medium shadow-sm"
              disabled={loading}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-[12.5px] text-slate-400 font-bold uppercase tracking-wider">or sign in with email</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="block text-[13px] font-black text-slate-700 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className={`w-full px-5 py-4 text-[16px] text-slate-900 border rounded-2xl focus:outline-none focus:ring-2 transition-all ${
                  fieldErrors.email
                    ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100'
                    : 'border-gray-200 bg-white focus:border-blue-500 focus:ring-blue-100 shadow-sm'
                }`}
              />
              {fieldErrors.email && (
                <p className="flex items-center gap-1.5 text-[13.5px] text-red-500 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />{fieldErrors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[13px] font-black text-slate-700 uppercase tracking-wider">Password</label>
                <a href="#" className="text-[13.5px] text-blue-600 font-bold hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className={`w-full px-5 py-4 pr-14 text-[16px] text-slate-900 border rounded-2xl focus:outline-none focus:ring-2 transition-all ${
                    fieldErrors.password
                      ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100'
                      : 'border-gray-200 bg-white focus:border-blue-500 focus:ring-blue-100 shadow-sm'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="flex items-center gap-1.5 text-[13.5px] text-red-500 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />{fieldErrors.password}
                </p>
              )}
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <div
                onClick={() => setRemember(!remember)}
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${remember ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-white'}`}
              >
                {remember && <span className="text-[11px] text-white font-black">✓</span>}
              </div>
              <span className="text-[14.5px] text-slate-600 font-medium">Remember me for 7 days</span>
            </label>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl text-[14.5px] text-red-600 font-medium">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 py-4 text-[16px] font-black text-white bg-blue-600 hover:bg-blue-700 rounded-2xl transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-60"
            >
              {loading
                ? <><div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />Signing in...</>
                : <>Sign In <ArrowRight className="w-5 h-5" /></>
              }
            </button>
          </form>

          <div className="mt-7 space-y-5">
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-[12.5px] text-slate-400 font-bold uppercase tracking-wider">or try a demo</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <button
              onClick={handleDemo}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 py-4 text-[15px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200/80 rounded-2xl transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              Explore Instant Demo — No sign-up required
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
