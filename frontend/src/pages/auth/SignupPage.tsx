import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import {
  TrendingUp, Eye, EyeOff, ArrowRight,
  CheckCircle2, AlertCircle, Sparkles, ShieldCheck, Activity, Coins
} from 'lucide-react';

/* ── Password strength ── */
function getStrength(pw: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pw.length >= 8)            score++;
  if (/[A-Z]/.test(pw))         score++;
  if (/[0-9]/.test(pw))         score++;
  if (/[^A-Za-z0-9]/.test(pw))  score++;
  const map = [
    { label: '', color: 'bg-gray-100' },
    { label: 'Weak', color: 'bg-red-400' },
    { label: 'Fair', color: 'bg-amber-400' },
    { label: 'Good', color: 'bg-blue-400' },
    { label: 'Strong', color: 'bg-blue-600' },
  ];
  return { score, ...map[score] };
}

/* ── Left Brand Panel: Midnight Financial OS Command Center ── */
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
      className="absolute right-0 top-1/3 w-[480px] h-[480px] pointer-events-none rounded-full blur-3xl opacity-30"
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
          Your Complete <br />
          <span className="text-blue-500">Financial Ecosystem.</span>
        </h2>
        <p className="text-[15.5px] text-slate-400 mt-3 leading-relaxed max-w-md">
          Join 10,000+ professionals using Google Gemini AI to master their money, automate tax savings, and compound net worth.
        </p>
      </div>

      {/* Stack of 2 Glass Fintech Intelligence Cards */}
      <div className="space-y-4 max-w-md">
        {/* Card 1: SIP & Tax Shield Engine */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl transition-all hover:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span className="text-[12px] font-bold text-slate-300 uppercase tracking-wider">SIP Compound & Tax Shield</span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> 80C Optimized
            </span>
          </div>
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Projected Wealth (15 Yrs)</p>
              <span className="text-3xl font-black tracking-tight text-white">₹1.42 Crore</span>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-slate-400 font-medium">Annual Tax Saved</p>
              <span className="text-[16px] font-extrabold text-emerald-400">+₹46,800/yr</span>
            </div>
          </div>
        </div>

        {/* Card 2: Zero-Latency Expense Sync */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-2xl backdrop-blur-xl flex items-start gap-4 transition-all hover:border-slate-700">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5">
            <Coins className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[13px] font-bold text-white">Zero-Latency Expense Sync</span>
              <span className="text-[10px] text-emerald-400 font-mono">AUTOMATED</span>
            </div>
            <p className="text-[13px] text-slate-300 leading-relaxed">
              Automatic category tagging and smart spend anomalies. Know exactly where every rupee goes without manual spreadsheet entry.
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

/* ── Field component ── */
const Field: React.FC<{
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  suffix?: React.ReactNode;
  autoComplete?: string;
}> = ({ label, type = 'text', value, onChange, placeholder, error, suffix, autoComplete }) => (
  <div className="space-y-2">
    <label className="block text-[13px] font-black text-slate-700 uppercase tracking-wider">{label}</label>
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`w-full px-5 py-4 text-[16px] text-slate-900 border rounded-2xl focus:outline-none focus:ring-2 transition-all ${
          error
            ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100'
            : 'border-gray-200 bg-white focus:border-blue-500 focus:ring-blue-100 shadow-sm'
        } ${suffix ? 'pr-14' : ''}`}
      />
      {suffix && <div className="absolute right-4 top-1/2 -translate-y-1/2">{suffix}</div>}
    </div>
    {error && (
      <p className="flex items-center gap-1.5 text-[13.5px] text-red-500 font-medium">
        <AlertCircle className="w-4 h-4 shrink-0" />{error}
      </p>
    )}
  </div>
);

/* ── SignupPage ── */
export const SignupPage: React.FC = () => {
  const { register, loginWithGoogle, quickDemoLogin } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName]   = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [confirm, setConfirm]     = useState('');
  const [showPw, setShowPw]       = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');
  const [success, setSuccess]     = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const strength = getStrength(password);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!fullName.trim())                     e.fullName = 'Full name is required';
    if (!email.includes('@'))                 e.email    = 'Enter a valid email address';
    if (password.length < 6)                  e.password = 'Password must be at least 6 characters';
    if (password !== confirm)                 e.confirm  = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError('');
    try {
      await register(email, password, fullName, 'graduate');
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1200);
    } catch {
      setError('An account with this email already exists. Try signing in.');
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
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Create your account</h1>
            <p className="text-[16px] text-slate-500 mt-2.5">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 font-bold hover:underline">Sign in</Link>
            </p>
          </div>

          {/* Success state */}
          {success && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mb-8 flex flex-col items-center gap-3.5 p-8 bg-blue-50 border border-blue-100 rounded-3xl text-center"
            >
              <CheckCircle2 className="w-12 h-12 text-blue-600" />
              <p className="text-[18px] font-black text-slate-900">Account created successfully!</p>
              <p className="text-[15px] text-slate-500">Redirecting to your dashboard...</p>
            </motion.div>
          )}

          {!success && (
            <div className="w-full">
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
                      setError('Failed to sign up with Google.');
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
                <span className="text-[12.5px] text-slate-400 font-bold uppercase tracking-wider">or sign up with email</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
              <Field
                label="Full Name"
                value={fullName}
                onChange={setFullName}
                placeholder="Alex Rivera"
                error={errors.fullName}
                autoComplete="name"
              />
              <Field
                label="Email Address"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="you@example.com"
                error={errors.email}
                autoComplete="email"
              />
              <div className="space-y-2">
                <Field
                  label="Password"
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={setPassword}
                  placeholder="Min. 6 characters"
                  error={errors.password}
                  autoComplete="new-password"
                  suffix={
                    <button type="button" onClick={() => setShowPw(!showPw)} className="text-slate-400 hover:text-slate-600 p-1">
                      {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  }
                />
                {/* Strength meter */}
                {password && (
                  <div className="space-y-1.5 pt-1">
                    <div className="flex gap-1.5">
                      {[1,2,3,4].map((n) => (
                        <div key={n} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${strength.score >= n ? strength.color : 'bg-gray-200'}`} />
                      ))}
                    </div>
                    {strength.label && <p className={`text-[12.5px] font-bold ${strength.score <= 1 ? 'text-red-500' : strength.score === 2 ? 'text-amber-500' : 'text-blue-600'}`}>{strength.label} password</p>}
                  </div>
                )}
              </div>
              <Field
                label="Confirm Password"
                type={showPw ? 'text' : 'password'}
                value={confirm}
                onChange={setConfirm}
                placeholder="Re-enter password"
                error={errors.confirm}
                autoComplete="new-password"
              />

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
                  ? <><div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />Creating account...</>
                  : <>Create Account <ArrowRight className="w-5 h-5" /></>
                }
              </button>
            </form>
            </div>
          )}

          {/* Divider + demo */}
          <div className="mt-7 space-y-5">
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-[12.5px] text-slate-400 font-bold uppercase tracking-wider">or</span>
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

          <p className="text-center text-[13px] text-slate-400 mt-8 leading-relaxed">
            By signing up you agree to our{' '}
            <a href="#" className="text-blue-600 font-semibold hover:underline">Terms of Service</a> and{' '}
            <a href="#" className="text-blue-600 font-semibold hover:underline">Privacy Policy</a>.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
