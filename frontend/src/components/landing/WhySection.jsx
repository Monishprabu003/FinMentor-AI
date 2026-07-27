import React from 'react';
import { ShieldCheck, Zap, TrendingUp, Lock } from 'lucide-react';
export const WhySection = () => {
    const reasons = [
        {
            icon: ShieldCheck,
            title: 'Bank-Grade Security',
            desc: '256-bit encryption protects all your financial data and credentials at all times.',
        },
        {
            icon: Zap,
            title: 'Real-time AI Guidance',
            desc: 'Instant insights on spending habits, budget allocation, and SIP wealth milestones.',
        },
        {
            icon: TrendingUp,
            title: 'Smart Wealth Growth',
            desc: 'Personalized 50/30/20 budget guardrails tailored specifically to your goals.',
        },
        {
            icon: Lock,
            title: '100% Private & Safe',
            desc: 'Your data belongs to you. We never sell your personal information to third parties.',
        },
    ];
    return (<section id="why" className="py-20 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Why Choose FinMentor AI?
          </h2>
          <p className="text-slate-600 text-base">
            Built for modern individuals who demand clarity, privacy, and actionable intelligence over their money.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((r, i) => (<div key={i} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                <r.icon className="w-6 h-6"/>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{r.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{r.desc}</p>
            </div>))}
        </div>
      </div>
    </section>);
};
