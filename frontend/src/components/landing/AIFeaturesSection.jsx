import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, BrainCircuit, BookOpen, MessageSquare } from 'lucide-react';
const aiFeatures = [
    {
        icon: BrainCircuit,
        title: 'Smart Financial Analysis',
        desc: 'The AI analyses your real income, expense, and savings data to generate insights that are specific to your situation—not generic advice.',
    },
    {
        icon: BookOpen,
        title: 'ELI5 Concept Explainer',
        desc: '"Explain Like I\'m 5" mode breaks down mutual funds, tax deductions, compounding interest, and ETFs using analogies you already understand.',
    },
    {
        icon: MessageSquare,
        title: 'Habit Coach',
        desc: 'Based on your spending patterns, the AI identifies destructive habits and suggests practical, actionable alternatives every week.',
    },
    {
        icon: Sparkles,
        title: 'Proactive Nudges',
        desc: 'The AI monitors your goals and sends you a nudge when you\'re about to miss a savings milestone—before it\'s too late.',
    },
];
export const AIFeaturesSection = () => (<section className="py-24 bg-slate-50 border-y border-gray-100">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* Left sticky label */}
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:sticky lg:top-24 space-y-6">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-3.5 py-1.5">
            <Bot className="w-3.5 h-3.5 text-blue-600"/>
            <span className="text-[11px] font-black text-blue-600 uppercase tracking-widest">AI Features</span>
          </div>

          <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
            An AI that actually <br />
            <span className="text-blue-600">understands your money.</span>
          </h2>

          <p className="text-[15px] text-slate-500 leading-relaxed">
            Powered by Google Gemini, FinMentor's AI mentor is purpose-built for financial literacy. It never makes decisions for you—it teaches you to make better ones yourself.
          </p>

          {/* Guardrails pill */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <p className="text-[12px] font-black text-slate-400 uppercase tracking-wider mb-2">Built-in Guardrails</p>
            <ul className="space-y-2">
              {[
        'Never executes transactions',
        'Never recommends specific stocks',
        'Always cites educational context',
    ].map((g) => (<li key={g} className="flex items-center gap-2.5 text-[13px] text-slate-600 font-medium">
                  <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                    <span className="text-[10px] text-blue-600 font-bold">✓</span>
                  </div>
                  {g}
                </li>))}
            </ul>
          </div>
        </motion.div>

        {/* Right — feature cards stacked */}
        <div className="space-y-4">
          {aiFeatures.map((f, i) => (<motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.45 }} className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-blue-100 hover:shadow-md transition-all duration-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                  <f.icon className="w-5 h-5 text-blue-600" strokeWidth={1.7}/>
                </div>
                <div>
                  <h3 className="text-[15px] font-black text-slate-900 mb-1.5">{f.title}</h3>
                  <p className="text-[13px] text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </motion.div>))}
        </div>
      </div>
    </div>
  </section>);
