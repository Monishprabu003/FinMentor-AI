import React from 'react';
import { motion } from 'framer-motion';
const stats = [
    { num: '10,000+', label: 'Financial Plans Created' },
    { num: '₹2M+', label: 'Savings Goals Managed' },
    { num: '95%', label: 'Learning Completion Rate' },
    { num: 'AI', label: 'Powered Personal Assistant' },
];
export const TrustSection = () => (<section className="py-16 bg-slate-50 border-y border-gray-100">
    <div className="max-w-7xl mx-auto px-6">
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-[11px] font-black text-slate-400 uppercase tracking-[0.22em] mb-10">
        Trusted by students, professionals and future investors across India
      </motion.p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (<motion.div key={s.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.4 }} className="text-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-4xl font-black text-slate-900 tracking-tight">{s.num}</p>
            <p className="text-[12px] text-slate-500 font-semibold mt-2 leading-snug">{s.label}</p>
          </motion.div>))}
      </div>
    </div>
  </section>);
