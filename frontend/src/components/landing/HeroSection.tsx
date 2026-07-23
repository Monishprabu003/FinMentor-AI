import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  TrendingUp, Sparkles, ArrowUpRight,
  PieChart, ShieldCheck, Coins
} from 'lucide-react';

/* ──────────────────────────────────────────────────────────────────────────
   3D Tilt Container (React Bits style interactive 3D perspective stage)
────────────────────────────────────────────────────────────────────────── */
const Interactive3DStage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for fluid 3D physics
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-14deg', '14deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center cursor-pointer select-none"
      style={{ perspective: 1200, width: 460, height: 540 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {children}
      </motion.div>
    </div>
  );
};

/* ──────────────────────────────────────────────────────────────────────────
   3D Floating Finance Card 1: Central FinMentor Cobalt Wealth Card
────────────────────────────────────────────────────────────────────────── */
const CobaltWealthCard: React.FC = () => (
  <motion.div
    style={{ transform: 'translateZ(30px)' }}
    className="relative w-[320px] bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 rounded-[28px] p-6 shadow-2xl border border-slate-800/80 overflow-hidden text-white"
  >
    {/* Holographic metallic shine overlay */}
    <div
      className="absolute -right-20 -top-20 w-64 h-64 rounded-full pointer-events-none opacity-25 blur-3xl"
      style={{ background: 'radial-gradient(circle, #60A5FA 0%, transparent 70%)' }}
    />

    {/* Top Header & Chip */}
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
          <TrendingUp className="w-4 h-4 text-white" strokeWidth={2.5} />
        </div>
        <span className="text-[13px] font-black tracking-wider uppercase text-blue-200">FinMentor Infinite</span>
      </div>

      {/* EMV Metallic Chip */}
      <div className="w-10 h-7 rounded-md bg-gradient-to-tr from-amber-200 via-yellow-400 to-amber-500 border border-yellow-300/60 shadow-inner flex items-center justify-center">
        <div className="w-6 h-4 border border-amber-800/30 rounded-sm grid grid-cols-2 gap-0.5" />
      </div>
    </div>

    {/* Balance & Performance */}
    <div className="space-y-1 mb-7">
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Net Wealth Portfolio</p>
      <div className="flex items-baseline gap-2.5">
        <span className="text-3xl font-black tracking-tight">₹14,28,500</span>
        <span className="inline-flex items-center gap-0.5 text-[11px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
          +24.8% CAGR
        </span>
      </div>
    </div>

    {/* Asset Breakdown Bar */}
    <div className="space-y-2 mb-6">
      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-300">
        <span>Asset Allocation</span>
        <span className="text-blue-400 font-bold">Optimal 50/30/20</span>
      </div>
      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex gap-0.5">
        <div className="h-full bg-blue-500 rounded-l-full" style={{ width: '50%' }} />
        <div className="h-full bg-indigo-400" style={{ width: '30%' }} />
        <div className="h-full bg-emerald-400 rounded-r-full" style={{ width: '20%' }} />
      </div>
    </div>

    {/* Bottom Footer */}
    <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-[11px]">
      <span className="font-mono text-slate-400 tracking-widest">•••• •••• •••• 8842</span>
      <span className="font-bold text-blue-300 flex items-center gap-1">
        <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Insured Portfolio
      </span>
    </div>
  </motion.div>
);

/* ──────────────────────────────────────────────────────────────────────────
   3D Floating Finance Badge 1: AI Portfolio Guardian (Top Left)
────────────────────────────────────────────────────────────────────────── */
const AIPortfolioGuardianBadge: React.FC = () => (
  <motion.div
    style={{ transform: 'translateZ(75px)' }}
    animate={{ y: [0, -6, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    className="absolute -top-4 -left-6 bg-white rounded-2xl shadow-xl border border-gray-100/90 p-3.5 flex items-center gap-3.5 min-w-[210px]"
  >
    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
      <PieChart className="w-5 h-5 text-blue-600" />
    </div>
    <div>
      <div className="flex items-center gap-1.5">
        <p className="text-[11px] font-black text-slate-900 uppercase tracking-wider">AI Portfolio Guardian</p>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      </div>
      <p className="text-[11px] text-slate-500 font-medium">Auto-rebalancing active</p>
    </div>
  </motion.div>
);

/* ──────────────────────────────────────────────────────────────────────────
   3D Floating Finance Badge 2: SIP Compound Growth Engine (Top Right)
────────────────────────────────────────────────────────────────────────── */
const SIPCompoundBadge: React.FC = () => (
  <motion.div
    style={{ transform: 'translateZ(95px)' }}
    animate={{ y: [0, 6, 0] }}
    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
    className="absolute top-16 -right-10 bg-white rounded-2xl shadow-xl border border-gray-100/90 p-3.5 flex items-center gap-3.5 min-w-[215px]"
  >
    <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
      <TrendingUp className="w-5 h-5 text-indigo-600" />
    </div>
    <div>
      <p className="text-[11px] font-black text-slate-900 uppercase tracking-wider">SIP Compound Engine</p>
      <p className="text-[12px] font-extrabold text-blue-600">₹10k/mo → ₹1.42 Cr</p>
    </div>
  </motion.div>
);

/* ──────────────────────────────────────────────────────────────────────────
   3D Floating Finance Badge 3: Smart Tax Shield Section 80C (Bottom Right)
────────────────────────────────────────────────────────────────────────── */
const TaxShieldBadge: React.FC = () => (
  <motion.div
    style={{ transform: 'translateZ(65px)' }}
    animate={{ y: [0, -5, 0] }}
    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
    className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl border border-gray-100/90 p-3.5 flex items-center gap-3.5 min-w-[210px]"
  >
    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
      <ShieldCheck className="w-5 h-5 text-emerald-600" />
    </div>
    <div>
      <p className="text-[11px] font-black text-slate-900 uppercase tracking-wider">Tax Shield · 80C & ELSS</p>
      <p className="text-[11px] text-emerald-600 font-bold">+₹46,800 Saved This Year</p>
    </div>
  </motion.div>
);

/* ──────────────────────────────────────────────────────────────────────────
   3D Floating Finance Badge 4: 3D Isometric Rupee Coin Medallion (Bottom Left)
────────────────────────────────────────────────────────────────────────── */
const RupeeCoinMedallion: React.FC = () => (
  <motion.div
    style={{ transform: 'translateZ(85px)' }}
    animate={{ y: [0, 5, 0], rotateZ: [0, 3, 0] }}
    transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
    className="absolute bottom-12 -left-8 bg-white rounded-2xl shadow-xl border border-gray-100/90 p-3 flex items-center gap-3"
  >
    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-200">
      <Coins className="w-4 h-4 text-white" />
    </div>
    <div>
      <p className="text-[11px] font-black text-slate-900 leading-none">Instant Expense Sync</p>
      <p className="text-[10px] text-slate-400 mt-0.5">Zero-latency categorization</p>
    </div>
  </motion.div>
);

/* ──────────────────────────────────────────────────────────────────────────
   Hero Section Component
────────────────────────────────────────────────────────────────────────── */
interface HeroProps {
  onGetStarted: () => void;
  onExplore: () => void;
}

export const HeroSection: React.FC<HeroProps> = ({ onGetStarted, onExplore }) => (
  <section className="relative min-h-screen bg-white overflow-hidden flex items-center pt-16">
    {/* Grid texture */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: 'linear-gradient(#e2e8f0 1px,transparent 1px),linear-gradient(90deg,#e2e8f0 1px,transparent 1px)',
        backgroundSize: '44px 44px',
        opacity: 0.45,
      }}
    />
    {/* Soft white fade vignette */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: 'radial-gradient(ellipse 80% 70% at 50% 50%,transparent 30%,rgba(255,255,255,0.9) 100%)',
      }}
    />
    {/* Subtle blue ambient glow */}
    <div
      className="absolute right-0 top-1/4 w-[520px] h-[520px] pointer-events-none"
      style={{
        background: 'radial-gradient(circle, rgba(219,234,254,0.65) 0%, transparent 70%)',
      }}
    />

    <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 items-center w-full">
      {/* ── Left Text Column ── */}
      <div className="max-w-xl space-y-8">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2.5 bg-white border border-blue-100 shadow-sm rounded-2xl px-4 py-2"
        >
          <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <span className="text-[11px] font-black text-blue-600 uppercase tracking-widest">AI-Powered Finance</span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
          <span className="text-[11px] text-slate-400 font-medium">Next-Gen Wealth OS</span>
        </motion.div>

        {/* Headline */}
        <div className="space-y-1">
          {[
            { text: 'Track.', color: 'text-slate-900', delay: 0.08 },
            { text: 'Invest.', color: 'text-blue-600', delay: 0.16 },
            { text: 'Succeed.', color: 'text-slate-900', delay: 0.24 },
          ].map(({ text, color, delay }) => (
            <motion.h1
              key={text}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay, ease: 'easeOut' }}
              className={`text-[68px] sm:text-[80px] font-black leading-[0.95] tracking-tight ${color}`}
            >
              {text}
            </motion.h1>
          ))}
        </div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.35 }}
          className="text-[16px] text-slate-500 leading-relaxed"
        >
          The premium financial ecosystem for students and young professionals. Track expenses, simulate SIP growth, and receive personalised AI guidance—all in one intelligent platform.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.43 }}
          className="flex flex-wrap gap-3"
        >
          <button
            onClick={onGetStarted}
            className="flex items-center gap-2 px-7 py-3.5 text-[14px] font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-2xl transition-colors shadow-md"
          >
            Go to Dashboard
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <button
            onClick={onExplore}
            className="px-7 py-3.5 text-[14px] font-semibold text-slate-700 bg-white border border-gray-200 hover:border-blue-200 hover:text-blue-600 rounded-2xl transition-all"
          >
            Explore Features
          </button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.52 }}
          className="flex items-center gap-4"
        >
          <div className="flex -space-x-2.5">
            {['#2563EB', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'].map((bg, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white"
                style={{ background: bg }}
              >
                {['SK', 'PA', 'RM', 'AK', 'VN'][i]}
              </div>
            ))}
          </div>
          <p className="text-[13px] text-slate-500">
            Joined by <span className="font-black text-slate-900">10,000+</span> users across India
          </p>
        </motion.div>
      </div>

      {/* ── Right 3D Interactive Finance Showcase ── */}
      <div className="hidden lg:flex items-center justify-center">
        <Interactive3DStage>
          {/* Central 3D Cobalt Wealth Card */}
          <CobaltWealthCard />

          {/* 4 Finance-Oriented Floating Isometric Elements */}
          <AIPortfolioGuardianBadge />
          <SIPCompoundBadge />
          <TaxShieldBadge />
          <RupeeCoinMedallion />
        </Interactive3DStage>
      </div>
    </div>
  </section>
);
