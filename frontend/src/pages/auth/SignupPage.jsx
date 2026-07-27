import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { TrendingUp, Eye, EyeOff, ArrowRight, Mail, Lock, User, CheckCircle2, AlertCircle, Sparkles, ShieldCheck, Activity, Coins } from 'lucide-react';
import { Logo } from '../../components/common/Logo';
/* ── Password strength ── */
function getStrength(pw) {
    let score = 0;
    if (pw.length >= 8)
        score++;
    if (/[A-Z]/.test(pw))
        score++;
    if (/[0-9]/.test(pw))
        score++;
    if (/[^A-Za-z0-9]/.test(pw))
        score++;
    const map = [
        { label: '', color: 'bg-gray-100' },
        { label: 'Weak', color: 'bg-red-400' },
        { label: 'Fair', color: 'bg-amber-400' },
        { label: 'Good', color: 'bg-blue-400' },
        { label: 'Strong', color: 'bg-blue-600' },
    ];
    return { score, ...map[score] };
}
/* ═══════════════════════════════════════════════════════════════
   RICH COLORED BRAND PANEL — Signup
   ═══════════════════════════════════════════════════════════════ */
const BrandPanel = () => (<div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 p-12 xl:p-16 relative overflow-hidden text-white border-r border-slate-800/80">
    {/* Ambient radial glows */}
    <div className="absolute top-1/4 -right-20 w-[480px] h-[480px] pointer-events-none rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }}/>
    <div className="absolute -bottom-20 -left-20 w-[420px] h-[420px] pointer-events-none rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)' }}/>

    {/* Top Brand Logo */}
    <div className="relative z-10 flex items-center justify-between">
      <Logo variant="light" showTagline size="lg"/>
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/> 10,000+ Active Users
      </span>
    </div>

    {/* Center Hero Block */}
    <div className="relative z-10 my-auto py-8 space-y-8 max-w-xl">
      <div>
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border border-blue-500/20 text-blue-400 text-[12px] font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400"/> Start Your Financial Odyssey
        </span>
        <h2 className="text-4xl xl:text-5xl font-black leading-[1.12] tracking-tight">
          Your Complete <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">Financial Ecosystem.</span>
        </h2>
        <p className="text-[15px] text-slate-400 mt-3 leading-relaxed max-w-md">
          Join professionals using Google Gemini AI to master their money, automate tax savings, and compound net worth.
        </p>
      </div>

      {/* Stack of 3 Rich Color Fintech Cards */}
      <div className="space-y-3.5">
        {/* Card 1: SIP & Tax Shield Engine (Emerald Accent) */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5 shadow-2xl backdrop-blur-xl hover:border-slate-700/80 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                <Activity className="w-4 h-4 text-emerald-400"/>
              </div>
              <span className="text-[12px] font-bold text-slate-300 uppercase tracking-wider">SIP Compound & Tax Shield</span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[10.5px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/> 80C Optimized
            </span>
          </div>
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Projected Wealth (15 Yrs)</p>
              <span className="text-2xl font-black tracking-tight text-white">₹1.42 Crore</span>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-slate-400 font-medium">Annual Tax Saved</p>
              <span className="text-[15px] font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-lg inline-block">
                +₹46,800/yr
              </span>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Zero-Latency Expense Sync (Indigo Accent) */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 shadow-2xl backdrop-blur-xl flex items-start gap-3.5 hover:border-slate-700/80 transition-all">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500/20 to-blue-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5">
            <Coins className="w-4.5 h-4.5 text-indigo-400"/>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[12.5px] font-bold text-white">Zero-Latency Expense Sync</span>
              <span className="text-[9.5px] text-emerald-400 font-mono bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">AUTO-TAG</span>
            </div>
            <p className="text-[12.5px] text-slate-300 leading-relaxed">
              Automatic category tagging and smart spend anomaly alerts. Know where every rupee goes effortlessly.
            </p>
          </div>
        </motion.div>
      </div>
    </div>

    {/* Bottom Trust Bar */}
    <div className="relative z-10 flex items-center justify-between pt-6 border-t border-slate-800/80 text-[12px] text-slate-400 font-medium">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-blue-400"/>
        <span>Bank-Grade 256-Bit SSL Encryption</span>
      </div>
      <span className="text-slate-400">Deterministic Engine + Gemini AI</span>
    </div>
  </div>);
/* ═══════════════════════════════════════════════════════════════
   SIGNUP PAGE
   ═══════════════════════════════════════════════════════════════ */
export const SignupPage = () => {
    const { register, loginWithGoogle, quickDemoLogin } = useAuth();
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const strength = getStrength(password);
    const validate = () => {
        const e = {};
        if (!fullName.trim())
            e.fullName = 'Full name is required';
        if (!email.includes('@'))
            e.email = 'Enter a valid email address';
        if (password.length < 6)
            e.password = 'Password must be at least 6 characters';
        if (password !== confirm)
            e.confirm = 'Passwords do not match';
        setErrors(e);
        return Object.keys(e).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate())
            return;
        setLoading(true);
        setError('');
        try {
            await register(email, password, fullName, 'graduate');
            setSuccess(true);
            setTimeout(() => navigate('/dashboard'), 1200);
        }
        catch {
            setError('An account with this email already exists. Try signing in.');
        }
        finally {
            setLoading(false);
        }
    };
    const handleDemo = async () => {
        setLoading(true);
        await quickDemoLogin();
        navigate('/dashboard');
    };
    return (<div className="min-h-screen bg-white grid lg:grid-cols-2">
      <BrandPanel />

      {/* Form side */}
      <div className="flex flex-col items-center justify-center px-8 sm:px-14 py-12 bg-white my-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-600/20">
              <TrendingUp className="w-5 h-5 text-white" strokeWidth={2.5}/>
            </div>
            <span className="text-2xl font-black text-slate-900">FinMentor</span>
          </div>

          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Create your account</h1>
            <p className="text-[15px] text-slate-500 mt-2">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 font-bold hover:underline">Sign in →</Link>
            </p>
          </div>

          {/* Success state */}
          {success ? (<motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mb-8 flex flex-col items-center gap-3.5 p-8 bg-blue-50 border border-blue-100 rounded-3xl text-center">
              <CheckCircle2 className="w-12 h-12 text-blue-600"/>
              <p className="text-[18px] font-black text-slate-900">Account created successfully!</p>
              <p className="text-[15px] text-slate-500">Redirecting to your dashboard...</p>
            </motion.div>) : (<div className="w-full">
              {/* GOOGLE LOGIN BUTTON */}
              <button type="button" onClick={async () => {
                setLoading(true);
                try {
                    await loginWithGoogle();
                    navigate('/dashboard');
                }
                catch {
                    setError('Failed to sign up with Google.');
                }
                finally {
                    setLoading(false);
                }
            }} disabled={loading} className="w-full flex items-center justify-center gap-3 px-4 py-3.5 border border-slate-200 hover:border-slate-300 rounded-2xl text-slate-700 hover:bg-slate-50/80 transition-all font-semibold shadow-sm mb-5 active:scale-[0.99]">
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>

              <div className="flex items-center gap-4 mb-5">
                <div className="flex-1 h-px bg-slate-200/80"/>
                <span className="text-[11.5px] text-slate-400 font-bold uppercase tracking-wider">or sign up with email</span>
                <div className="flex-1 h-px bg-slate-200/80"/>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-wider">Full Name</label>
                  <div className="relative group">
                    <User className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"/>
                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Alex Rivera" autoComplete="name" className={`w-full pl-12 pr-4 py-3.5 text-[15px] text-slate-900 bg-white border rounded-2xl outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all ${errors.fullName
                ? 'border-red-300 bg-red-50/50 focus:border-red-500'
                : 'border-slate-200 hover:border-slate-300'}`}/>
                  </div>
                  {errors.fullName && <p className="text-[12.5px] text-red-500 font-medium pt-0.5">{errors.fullName}</p>}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-wider">Email Address</label>
                  <div className="relative group">
                    <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"/>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" className={`w-full pl-12 pr-4 py-3.5 text-[15px] text-slate-900 bg-white border rounded-2xl outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all ${errors.email
                ? 'border-red-300 bg-red-50/50 focus:border-red-500'
                : 'border-slate-200 hover:border-slate-300'}`}/>
                  </div>
                  {errors.email && <p className="text-[12.5px] text-red-500 font-medium pt-0.5">{errors.email}</p>}
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-wider">Password</label>
                  <div className="relative group">
                    <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"/>
                    <input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 6 characters" autoComplete="new-password" className={`w-full pl-12 pr-12 py-3.5 text-[15px] text-slate-900 bg-white border rounded-2xl outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all ${errors.password
                ? 'border-red-300 bg-red-50/50 focus:border-red-500'
                : 'border-slate-200 hover:border-slate-300'}`}/>
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1">
                      {showPw ? <EyeOff className="w-4.5 h-4.5"/> : <Eye className="w-4.5 h-4.5"/>}
                    </button>
                  </div>
                  {/* Strength meter */}
                  {password && (<div className="space-y-1.5 pt-1">
                      <div className="flex gap-1.5">
                        {[1, 2, 3, 4].map((n) => (<div key={n} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${strength.score >= n ? strength.color : 'bg-gray-200'}`}/>))}
                      </div>
                      {strength.label && <p className={`text-[12px] font-bold ${strength.score <= 1 ? 'text-red-500' : strength.score === 2 ? 'text-amber-500' : 'text-blue-600'}`}>{strength.label} password</p>}
                    </div>)}
                  {errors.password && <p className="text-[12.5px] text-red-500 font-medium pt-0.5">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-wider">Confirm Password</label>
                  <div className="relative group">
                    <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"/>
                    <input type={showPw ? 'text' : 'password'} value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Re-enter password" autoComplete="new-password" className={`w-full pl-12 pr-4 py-3.5 text-[15px] text-slate-900 bg-white border rounded-2xl outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all ${errors.confirm
                ? 'border-red-300 bg-red-50/50 focus:border-red-500'
                : 'border-slate-200 hover:border-slate-300'}`}/>
                  </div>
                  {errors.confirm && <p className="text-[12.5px] text-red-500 font-medium pt-0.5">{errors.confirm}</p>}
                </div>

                {/* Error */}
                {error && (<div className="flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-100 rounded-2xl text-[13.5px] text-red-600 font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5"/>
                    {error}
                  </div>)}

                {/* Submit Button */}
                <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3.5 text-[15.5px] font-bold text-white bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-2xl transition-all shadow-lg shadow-blue-500/25 active:scale-[0.99] disabled:opacity-60">
                  {loading
                ? <><div className="w-4.5 h-4.5 border-2 border-white/40 border-t-white rounded-full animate-spin"/>Creating account...</>
                : <>Create Account <ArrowRight className="w-4.5 h-4.5"/></>}
                </button>
              </form>
            </div>)}

          {/* Demo Login CTA */}
          <div className="mt-5 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-slate-200/80"/>
              <span className="text-[11.5px] text-slate-400 font-bold uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-slate-200/80"/>
            </div>
            <button onClick={handleDemo} disabled={loading} className="w-full flex items-center justify-center gap-2 py-3.5 text-[14.5px] font-bold text-blue-700 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200/70 rounded-2xl transition-all shadow-sm active:scale-[0.99]">
              <Sparkles className="w-4.5 h-4.5 text-blue-600"/>
              Explore Instant Demo — No sign-up required
            </button>
          </div>

          <p className="text-center text-[12.5px] text-slate-400 mt-6 leading-relaxed">
            By signing up you agree to our{' '}
            <a href="#" className="text-blue-600 font-semibold hover:underline">Terms of Service</a> and{' '}
            <a href="#" className="text-blue-600 font-semibold hover:underline">Privacy Policy</a>.
          </p>
        </motion.div>
      </div>
    </div>);
};
