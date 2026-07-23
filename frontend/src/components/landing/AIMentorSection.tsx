import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Sparkles } from 'lucide-react';

const CONVERSATION = [
  { role: 'user', text: 'Can I afford an iPhone right now?' },
  {
    role: 'ai',
    text: "Based on your current savings (₹42,000) and monthly surplus of ₹8,200, buying an iPhone today would use 85% of your emergency fund. Waiting just 3 months keeps your safety net fully intact. 📱",
  },
];

const PROMPTS = [
  'How do I start a SIP with ₹1,000/month?',
  'Explain expense ratio in simple terms',
  'Am I saving enough for retirement?',
];

export const AIMentorSection: React.FC = () => {
  const [input, setInput] = useState('');

  return (
    <section id="ai-mentor" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-7"
          >
            <div>
              <p className="text-[11px] font-black text-blue-600 uppercase tracking-[0.2em] mb-3">AI Mentor</p>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Your personal finance expert, <span className="text-blue-600">available 24/7.</span>
              </h2>
            </div>
            <p className="text-[15px] text-slate-500 leading-relaxed">
              Ask anything—from basic budgeting to advanced tax-saving strategies. The AI uses your actual spending data to give answers that are relevant to <em>your</em> life, not generic advice.
            </p>
            <ul className="space-y-3.5">
              {[
                'Explains concepts without jargon',
                'Uses your real financial data for context',
                'Teaches—never executes transactions for you',
                'Powered by Google Gemini AI',
              ].map((p) => (
                <li key={p} className="flex items-center gap-3 text-[14px] text-slate-600 font-medium">
                  <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                    <span className="text-blue-600 text-[11px] font-black">✓</span>
                  </div>
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Chat window */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
              {/* Header */}
              <div className="bg-slate-50 border-b border-gray-100 px-5 py-4 flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-[13px] font-black text-slate-900">FinMentor AI</p>
                  <p className="text-[11px] text-blue-500 font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block animate-pulse" />
                    Always Active
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span className="text-[11px] text-blue-400 font-semibold">Gemini AI</span>
                </div>
              </div>

              {/* Messages */}
              <div className="p-5 space-y-4">
                {CONVERSATION.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 + 0.2 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'gap-2.5 items-start'}`}
                  >
                    {msg.role === 'ai' && (
                      <div className="w-7 h-7 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                    )}
                    <div
                      className={`text-[13px] leading-relaxed px-4 py-3 rounded-2xl max-w-[85%] ${
                        msg.role === 'user'
                          ? 'bg-blue-600 text-white rounded-tr-none'
                          : 'bg-slate-50 border border-gray-100 text-slate-700 rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Prompt chips */}
              <div className="px-5 pb-3 flex flex-wrap gap-2">
                {PROMPTS.map((p) => (
                  <button
                    key={p}
                    onClick={() => setInput(p)}
                    className="text-[11px] font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-100 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="border-t border-gray-100 p-4 flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask your financial question..."
                  className="flex-1 text-[13px] text-slate-700 placeholder:text-slate-400 bg-slate-50 border border-gray-100 rounded-2xl px-4 py-2.5 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-50 transition-all"
                />
                <button className="w-10 h-10 rounded-2xl bg-blue-600 hover:bg-blue-700 flex items-center justify-center shrink-0 transition-colors shadow-sm shadow-blue-200">
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
