import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  onGetStarted: () => void;
  onLearnMore: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onGetStarted, onLearnMore }) => (
  <section className="py-24 bg-gray-950">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="space-y-7"
      >
        <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
          Start building financial freedom today.
        </h2>
        <p className="text-[16px] text-gray-400 max-w-xl mx-auto leading-relaxed">
          Your AI-powered finance companion is waiting. Join over 10,000 users who are taking control of their financial future.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onGetStarted}
            className="px-7 py-3.5 text-[14px] font-semibold text-gray-900 bg-white hover:bg-gray-100 rounded-xl transition-colors duration-150 flex items-center gap-2"
          >
            Create Free Account
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onLearnMore}
            className="px-7 py-3.5 text-[14px] font-semibold text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 rounded-xl transition-colors duration-150"
          >
            Learn More
          </button>
        </div>
        <p className="text-[12px] text-gray-600">No credit card required. Free forever for core features.</p>
      </motion.div>
    </div>
  </section>
);
