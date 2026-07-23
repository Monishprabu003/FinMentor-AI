import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp } from 'lucide-react';

interface Props { onGetStarted: () => void; onLearnMore: () => void; }

export const CTASection: React.FC<Props> = ({ onGetStarted, onLearnMore }) => (
  <section className="py-24 bg-blue-600 relative overflow-hidden">
    {/* Subtle grid overlay */}
    <div
      className="absolute inset-0 pointer-events-none opacity-10"
      style={{
        backgroundImage: 'linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    />
    <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-7"
      >
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
            <TrendingUp className="w-7 h-7 text-white" strokeWidth={2} />
          </div>
        </div>
        <p className="text-[11px] font-black text-blue-200 uppercase tracking-[0.25em]">Get Started Today</p>
        <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
          Start building financial <br className="hidden sm:block" />freedom today.
        </h2>
        <p className="text-[16px] text-blue-100 max-w-xl mx-auto leading-relaxed">
          Your AI-powered finance companion is waiting. Join over 10,000 users taking control of their financial future—for free.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onGetStarted}
            className="flex items-center gap-2 px-8 py-3.5 text-[14px] font-black text-blue-700 bg-white hover:bg-blue-50 rounded-2xl transition-colors shadow-md"
          >
            Create Free Account <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onLearnMore}
            className="px-8 py-3.5 text-[14px] font-bold text-white border-2 border-blue-400 hover:border-white hover:bg-blue-700 rounded-2xl transition-all"
          >
            Explore Features
          </button>
        </div>
        <p className="text-[12px] text-blue-200/80">No credit card required · Free forever for core features</p>
      </motion.div>
    </div>
  </section>
);
