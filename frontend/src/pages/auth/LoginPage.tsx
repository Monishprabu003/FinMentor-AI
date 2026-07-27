import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import {
  Eye, EyeOff, AlertCircle, Sparkles,
  DollarSign, CreditCard, Landmark, Coins, TrendingUp,
  PieChart, BarChart3, Wallet, Banknote, Bitcoin, ArrowUpRight
} from 'lucide-react';
import { Logo } from '../../components/common/Logo';

/* ──────────────────────────────────────────────────────────────────────────
   FLOATING FINANCE BACKGROUND SYMBOLS
   Dollar, Bank, ATM Card, Crypto, Stocks, Wallet icons floating with motion
────────────────────────────────────────────────────────────────────────── */
const FloatingFinanceBackground: React.FC = () => {
  const symbols = [
    // Top Left Cluster
    { Icon: DollarSign,     x: '8%',   y: '12%', scale: 1.4, duration: 6,   delay: 0,   color: 'text-emerald-500/20' },
    { Icon: Landmark,       x: '18%',  y: '28%', scale: 1.2, duration: 7.5, delay: 0.5, color: 'text-blue-500/20' },
    { Icon: CreditCard,     x: '6%',   y: '48%', scale: 1.3, duration: 8,   delay: 1,   color: 'text-indigo-500/20' },
    { Icon: TrendingUp,     x: '15%',  y: '68%', scale: 1.5, duration: 6.5, delay: 1.5, color: 'text-emerald-500/20' },
    { Icon: Bitcoin,        x: '8%',   y: '85%', scale: 1.2, duration: 7,   delay: 0.8, color: 'text-amber-500/20' },

    // Top Right Cluster
    { Icon: Coins,          x: '88%',  y: '10%', scale: 1.5, duration: 7,   delay: 0.2, color: 'text-amber-500/20' },
    { Icon: BarChart3,      x: '78%',  y: '26%', scale: 1.3, duration: 6.2, delay: 0.7, color: 'text-blue-500/20' },
    { Icon: Banknote,       x: '90%',  y: '46%', scale: 1.4, duration: 8.5, delay: 1.2, color: 'text-emerald-500/20' },
    { Icon: PieChart,       x: '82%',  y: '66%', scale: 1.2, duration: 6.8, delay: 0.4, color: 'text-violet-500/20' },
    { Icon: Wallet,         x: '89%',  y: '84%', scale: 1.3, duration: 7.2, delay: 1.6, color: 'text-indigo-500/20' },

    // Subtle Mid Accent Float
    { Icon: ArrowUpRight,   x: '28%',  y: '15%', scale: 1.1, duration: 5.5, delay: 0.3, color: 'text-blue-500/15' },
    { Icon: DollarSign,     x: '70%',  y: '18%', scale: 1.2, duration: 6.4, delay: 1.1, color: 'text-emerald-500/15' },
    { Icon: CreditCard,     x: '25%',  y: '82%', scale: 1.2, duration: 7.8, delay: 0.9, color: 'text-indigo-500/15' },
    { Icon: Landmark,       x: '72%',  y: '82%', scale: 1.3, duration: 8.2, delay: 1.4, color: 'text-blue-500/15' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {symbols.map(({ Icon, x, y, scale, duration, delay, color }, i) => (
        <motion.div
          key={i}
          className={`absolute ${color}`}
          style={{ left: x, top: y }}
          animate={{
            y: [0, -18, 0],
            rotate: [0, i % 2 === 0 ? 8 : -8, 0],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay,
          }}
        >
          <div style={{ transform: `scale(${scale})` }}>
            <Icon className="w-9 h-9" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

/* ──────────────────────────────────────────────────────────────────────────
   LOGIN PAGE COMPONENT
────────────────────────────────────────────────────────────────────────── */
export const LoginPage: React.FC = () => {
  const { login, loginWithGoogle, quickDemoLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
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
    <div className="min-h-screen bg-slate-50/70 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Ambient background glow effects */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none rounded-full blur-3xl opacity-50 z-0"
        style={{ background: 'radial-gradient(circle, #3b82f618 0%, #60a5fa0a 50%, transparent 70%)' }}
      />
      <div
        className="absolute -top-32 -left-32 w-96 h-96 pointer-events-none rounded-full blur-3xl opacity-30 z-0"
        style={{ background: 'radial-gradient(circle, #8b5cf618 0%, transparent 70%)' }}
      />

      {/* Floating Finance Icons in Background */}
      <FloatingFinanceBackground />

      {/* Main Centered Card (Rocket Money minimal style) */}
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-[450px] bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl shadow-slate-200/60 border border-slate-100 p-8 sm:p-10 relative z-10"
      >
        {/* Top Centered Brand Logo */}
        <div className="flex flex-col items-center justify-center mb-6">
          <Link to="/" className="hover:opacity-90 transition-opacity">
            <Logo size="lg" />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-6">
            Welcome back
          </h1>
        </div>

        {/* GOOGLE LOGIN BUTTON */}
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
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3.5 border border-slate-200 hover:border-slate-300 rounded-2xl text-slate-700 hover:bg-slate-50 transition-all font-semibold shadow-sm mb-5 text-[14.5px] cursor-pointer"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-5">
          <div className="flex-1 h-px bg-slate-200/80" />
          <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">or sign in with email</span>
          <div className="flex-1 h-px bg-slate-200/80" />
        </div>

        {/* LOGIN FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-1 text-left">
            <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-wider ml-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              className={`w-full px-4 py-3.5 text-[15px] text-slate-900 bg-slate-50 border rounded-2xl outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all ${
                fieldErrors.email
                  ? 'border-red-300 bg-red-50/50'
                  : 'border-slate-200/80 hover:border-slate-300'
              }`}
            />
            {fieldErrors.email && (
              <p className="flex items-center gap-1.5 text-[13px] text-red-500 font-medium pt-0.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />{fieldErrors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-1 text-left">
            <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-wider ml-1">Password</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                className={`w-full pl-4 pr-11 py-3.5 text-[15px] text-slate-900 bg-slate-50 border rounded-2xl outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all ${
                  fieldErrors.password
                    ? 'border-red-300 bg-red-50/50'
                    : 'border-slate-200/80 hover:border-slate-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                {showPw ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
              </button>
            </div>
            {fieldErrors.password && (
              <p className="flex items-center gap-1.5 text-[13px] text-red-500 font-medium pt-0.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />{fieldErrors.password}
              </p>
            )}
          </div>

          {/* Forgot Password link */}
          <div className="text-left pt-0.5">
            <a href="#" className="text-[13px] text-slate-600 hover:text-blue-600 font-medium transition-colors">
              Forgot password?
            </a>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-100 rounded-2xl text-[13.5px] text-red-600 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          {/* Primary Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 text-[15.5px] font-bold text-white bg-slate-900 hover:bg-black rounded-full transition-all shadow-md active:scale-[0.98] cursor-pointer mt-2 disabled:opacity-60"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        {/* Demo Login Option */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <button
            onClick={handleDemo}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 text-[13.5px] font-semibold text-blue-600 bg-blue-50/70 hover:bg-blue-100/70 rounded-2xl transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            Explore Instant Demo
          </button>
        </div>

        {/* Create Account prompt */}
        <p className="text-[13.5px] text-slate-500 mt-5">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 font-bold hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>

      {/* Footer Navigation Links */}
      <div className="mt-8 text-center space-y-2 text-[12.5px] text-slate-500 font-medium relative z-10">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <a href="#" className="hover:text-slate-900 transition-colors">Need Help? Talk To Us</a>
          <span>·</span>
          <a href="#" className="hover:text-slate-900 transition-colors">Terms of Use</a>
          <span>·</span>
          <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
        </div>
        <p className="text-[11.5px] text-slate-400">
          Do not sell or share my personal information
        </p>
      </div>
    </div>
  );
};
