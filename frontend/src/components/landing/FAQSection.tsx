import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  { q: 'Is FinMentor free to use?', a: 'Yes! Core features—expense tracking, budget planner, savings goals, and the learning hub—are completely free. Premium AI features are free during beta.' },
  { q: 'Is my financial data secure?', a: 'Absolutely. We use JWT authentication, bcrypt password hashing, and HTTPS encryption. Your data is stored on Neon PostgreSQL with strict access controls. We never share your data.' },
  { q: 'Does the AI give financial advice?', a: 'No. The AI is a financial literacy educator, not an advisor. It explains concepts and teaches principles using your data, but never recommends specific securities or investment decisions.' },
  { q: 'How is this different from other finance apps?', a: 'FinMentor is the only platform that combines expense tracking + smart budgeting + an interactive learning academy + an AI tutor in one product. Most apps only do one of these things.' },
  { q: 'Can I connect my bank account?', a: 'Manual entry is fully supported today. Bank sync via Open Banking APIs is on our product roadmap and coming soon for supported Indian banks.' },
  { q: 'What is the Financial Health Score?', a: 'A single number (0–100) computed by our deterministic backend engine based on your savings rate, budget adherence, emergency fund status, and goal progress. It updates live.' },
];

const Item: React.FC<{ faq: { q: string; a: string } }> = ({ faq }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-b border-gray-100 last:border-0 transition-colors ${open ? 'bg-blue-50/50' : ''}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 px-1 text-left"
      >
        <span className={`text-[15px] font-bold transition-colors ${open ? 'text-blue-600' : 'text-slate-800'}`}>
          {faq.q}
        </span>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${open ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
          {open ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 px-1 text-[14px] text-slate-500 leading-relaxed">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQSection: React.FC = () => (
  <section id="faq" className="py-24 bg-slate-50 border-y border-gray-100">
    <div className="max-w-3xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-[11px] font-black text-blue-600 uppercase tracking-[0.2em] mb-3">FAQ</p>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Common questions, answered.</h2>
      </motion.div>
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm px-8 py-2">
        {FAQS.map((faq) => <Item key={faq.q} faq={faq} />)}
      </div>
    </div>
  </section>
);
