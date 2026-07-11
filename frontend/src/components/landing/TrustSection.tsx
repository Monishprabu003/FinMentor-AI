import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '10,000+', label: 'Financial Plans Created' },
  { value: '₹2M+', label: 'Savings Goals Managed' },
  { value: '95%', label: 'Learning Completion Rate' },
  { value: 'AI Powered', label: 'Personal Finance Assistant' },
];

export const TrustSection: React.FC = () => (
  <section className="py-16 bg-gray-50 border-y border-gray-100">
    <div className="max-w-7xl mx-auto px-6">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-center text-[13px] font-medium text-gray-400 uppercase tracking-widest mb-10"
      >
        Trusted by students, professionals and future investors
      </motion.p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="text-center"
          >
            <p className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">{stat.value}</p>
            <p className="text-[13px] text-gray-500 mt-2 font-medium leading-snug">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
