import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, ShieldCheck, Sparkles, Target, Activity
} from 'lucide-react';

const DashboardMockup: React.FC = () => (
  <div className="relative w-full max-w-md mx-auto">
    {/* Main dashboard card */}
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header bar */}
      <div className="bg-gray-50 border-b border-gray-100 px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <span className="text-[11px] font-medium text-gray-400">FinMentor Dashboard</span>
        <div className="w-16" />
      </div>

      {/* Dashboard Content */}
      <div className="p-5 space-y-4">
        {/* Health Score Row */}
        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
          <div>
            <p className="text-[11px] text-blue-500 font-semibold uppercase tracking-wide">Financial Health Score</p>
            <p className="text-3xl font-bold text-blue-700 mt-0.5">82 <span className="text-base font-medium text-blue-400">/ 100</span></p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <Activity className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        {/* Monthly Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl border border-gray-100 bg-gray-50">
            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">Monthly Spend</p>
            <p className="text-xl font-bold text-gray-800 mt-1">₹24,600</p>
            <p className="text-[10px] text-green-500 font-medium mt-0.5">↓ 8% vs last month</p>
          </div>
          <div className="p-3.5 rounded-xl border border-gray-100 bg-gray-50">
            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">Savings</p>
            <p className="text-xl font-bold text-gray-800 mt-1">₹12,400</p>
            <p className="text-[10px] text-blue-500 font-medium mt-0.5">↑ 20% savings rate</p>
          </div>
        </div>

        {/* Savings Goal Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-violet-500" />
              <p className="text-[11px] font-semibold text-gray-600">Emergency Fund Goal</p>
            </div>
            <span className="text-[11px] font-bold text-violet-600">68%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full w-[68%] bg-violet-500 rounded-full" />
          </div>
          <p className="text-[10px] text-gray-400">₹68,000 of ₹1,00,000 saved</p>
        </div>

        {/* Budget Pills */}
        <div>
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">Budget Overview</p>
          <div className="space-y-1.5">
            {[
              { label: 'Housing', pct: 52, color: 'bg-blue-400' },
              { label: 'Food & Dining', pct: 78, color: 'bg-amber-400' },
              { label: 'Transport', pct: 40, color: 'bg-green-400' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <p className="text-[10px] w-24 text-gray-500 font-medium">{item.label}</p>
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                </div>
                <span className="text-[10px] text-gray-400 w-6 text-right">{item.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendation Card */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-violet-50 to-blue-50 border border-violet-100">
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-3.5 h-3.5 text-violet-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-violet-600 uppercase tracking-wide">AI Insight</p>
              <p className="text-[11px] text-gray-600 mt-0.5 leading-relaxed">
                You spent 22% more on dining this week. Consider cooking at home 3× to hit your savings goal by August.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Floating stat cards */}
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -left-10 top-1/3 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 hidden lg:block"
    >
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-green-500" />
        </div>
        <div>
          <p className="text-[10px] text-gray-400">Net Worth</p>
          <p className="text-sm font-bold text-gray-800">₹3.6L</p>
        </div>
      </div>
    </motion.div>

    <motion.div
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      className="absolute -right-8 bottom-1/4 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 hidden lg:block"
    >
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
          <ShieldCheck className="w-4 h-4 text-blue-500" />
        </div>
        <div>
          <p className="text-[10px] text-gray-400">Streak</p>
          <p className="text-sm font-bold text-gray-800">32 days 🔥</p>
        </div>
      </div>
    </motion.div>
  </div>
);


interface HeroSectionProps {
  onGetStarted: () => void;
  onExplore: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted, onExplore }) => (
  <section className="min-h-screen pt-28 pb-20 bg-white flex items-center overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
      {/* Text */}
      <div className="space-y-7">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold"
        >
          <Sparkles className="w-3.5 h-3.5" />
          AI-Powered Financial OS
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.12] tracking-tight"
        >
          Master your money{' '}
          <span className="text-blue-600">with AI.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="text-lg text-gray-500 leading-relaxed max-w-lg"
        >
          Track expenses, build wealth, learn finance, and receive personalized AI guidance—all in one intelligent platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <button
            onClick={onGetStarted}
            className="px-6 py-3.5 text-[14px] font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors duration-150 shadow-sm shadow-blue-200"
          >
            Start Free →
          </button>
          <button
            onClick={onExplore}
            className="px-6 py-3.5 text-[14px] font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors duration-150"
          >
            Explore Platform
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.4 }}
          className="flex items-center gap-6 pt-2"
        >
          <div className="flex -space-x-2">
            {['SK', 'PR', 'AM', 'VR'].map((initials) => (
              <div
                key={initials}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 border-2 border-white flex items-center justify-center"
              >
                <span className="text-[9px] font-bold text-white">{initials}</span>
              </div>
            ))}
          </div>
          <p className="text-[13px] text-gray-500">
            Joined by <span className="font-semibold text-gray-700">10,000+</span> users
          </p>
        </motion.div>
      </div>

      {/* Dashboard Mockup */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
        className="relative"
      >
        <DashboardMockup />
      </motion.div>
    </div>
  </section>
);
