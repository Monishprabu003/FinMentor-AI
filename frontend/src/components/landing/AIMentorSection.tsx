import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send } from 'lucide-react';

const conversation = [
  {
    role: 'user' as const,
    text: 'Can I afford an iPhone right now?',
  },
  {
    role: 'ai' as const,
    text: 'Based on your current savings (₹42,000) and monthly surplus (₹8,200), buying an iPhone today would wipe out 85% of your emergency fund. Waiting just 3 months would let you buy it without touching your emergency buffer.',
  },
];

const suggested = [
  'How do I start a SIP with ₹1,000?',
  'Explain expense ratio in simple terms',
  'Am I saving enough for retirement?',
];

export const AIMentorSection: React.FC = () => {
  const [input, setInput] = useState('');

  return (
    <section id="ai-mentor" className="py-24 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="space-y-6"
          >
            <div>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">AI Mentor</p>
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight leading-tight">
                Your personal finance expert, available 24/7.
              </h2>
            </div>
            <p className="text-[15px] text-gray-500 leading-relaxed">
              Ask anything—from basic budgeting to advanced tax-saving strategies. The AI uses your actual spending data to give answers that are relevant to <em>your</em> life, not generic advice.
            </p>
            <ul className="space-y-3">
              {[
                'Explains concepts without jargon',
                'Uses your real financial data for context',
                'Teaches—never executes transactions for you',
              ].map((point) => (
                <li key={point} className="flex items-center gap-3 text-[14px] text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Chat UI */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Chat header */}
              <div className="border-b border-gray-100 px-5 py-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-gray-800">FinMentor AI</p>
                  <p className="text-[11px] text-emerald-500 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    Active
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="p-5 space-y-4 min-h-[200px]">
                {conversation.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.2 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start gap-2.5'}`}
                  >
                    {msg.role === 'ai' && (
                      <div className="w-7 h-7 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                    )}
                    <div
                      className={`text-[13px] leading-relaxed px-4 py-2.5 rounded-2xl max-w-[82%] ${
                        msg.role === 'user'
                          ? 'bg-blue-600 text-white rounded-tr-sm'
                          : 'bg-gray-50 border border-gray-100 text-gray-700 rounded-tl-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Suggested prompts */}
              <div className="px-5 pb-3 flex flex-wrap gap-2">
                {suggested.map((s) => (
                  <button
                    key={s}
                    onClick={() => setInput(s)}
                    className="text-[11px] font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-100 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Input bar */}
              <div className="border-t border-gray-100 p-4 flex items-center gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask your financial question..."
                  className="flex-1 text-[13px] text-gray-700 placeholder:text-gray-400 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-50"
                />
                <button className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-700 flex items-center justify-center shrink-0 transition-colors">
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
