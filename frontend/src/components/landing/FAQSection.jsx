import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
export const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(0);
    const faqs = [
        {
            q: 'How does FinMentor AI analyze my financial habits?',
            a: 'FinMentor AI evaluates your transactions, income, and spending against proven financial frameworks like the 50/30/20 rule to give you instant recommendations.',
        },
        {
            q: 'Is my financial data secure with FinMentor?',
            a: 'Yes! We use end-to-end 256-bit encryption. Your data is stored securely and never shared with third parties.',
        },
        {
            q: 'Can I track both monthly budgets and long-term investments?',
            a: 'Absolutely. FinMentor tracks your daily expenses, monthly budget limits, as well as SIP wealth accumulation goals.',
        },
        {
            q: 'Is FinMentor suitable for beginners?',
            a: 'Yes, FinMentor provides simple, step-by-step guidance tailored for all experience levels.',
        },
    ];
    return (<section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-base">
            Everything you need to know about FinMentor AI.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (<div key={i} className="border border-slate-200 rounded-2xl overflow-hidden transition-colors">
                <button onClick={() => setOpenIndex(isOpen ? null : i)} className="w-full flex items-center justify-between p-6 text-left font-bold text-slate-900 hover:bg-slate-50 transition-colors">
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-blue-600' : ''}`}/>
                </button>
                {isOpen && (<div className="px-6 pb-6 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>)}
              </div>);
        })}
        </div>
      </div>
    </section>);
};
