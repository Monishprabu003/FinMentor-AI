import React from 'react';
import { TrendingUp, Globe, Code2, Users } from 'lucide-react';

const links = {
  Platform:  ['Dashboard', 'Expense Tracking', 'Budget Planner', 'Savings Goals', 'Analytics', 'Health Score'],
  Learning:  ['Budgeting Basics', 'Investing 101', 'Mutual Funds', 'Tax Saving', 'Insurance', 'Emergency Fund'],
  Resources: ['Documentation', 'API Reference', 'Changelog', 'Blog', 'Press Kit'],
  Company:   ['About Us', 'Careers', 'Contact', 'Partners', 'Community'],
  Legal:     ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Disclaimer'],
};

export const LandingFooter: React.FC = () => (
  <footer className="bg-white border-t border-gray-100">
    <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
        {/* Brand */}
        <div className="col-span-2 sm:col-span-3 lg:col-span-1 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
              <TrendingUp className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[15px] font-black text-slate-900">FinMentor</span>
          </div>
          <p className="text-[12.5px] text-slate-500 leading-relaxed max-w-[200px]">
            Your AI-powered financial OS for students and young professionals.
          </p>
          <div className="flex gap-2">
            {[Globe, Code2, Users].map((Icon, i) => (
              <a key={i} href="#" className="w-8 h-8 rounded-lg border border-gray-100 bg-slate-50 hover:border-blue-200 hover:bg-blue-50 flex items-center justify-center transition-all">
                <Icon className="w-3.5 h-3.5 text-slate-500" />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        {Object.entries(links).map(([heading, items]) => (
          <div key={heading}>
            <p className="text-[11px] font-black text-slate-900 uppercase tracking-[0.15em] mb-4">{heading}</p>
            <ul className="space-y-2.5">
              {items.map((l) => (
                <li key={l}>
                  <a href="#" className="text-[13px] text-slate-500 hover:text-blue-600 transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[12px] text-slate-400">© {new Date().getFullYear()} FinMentor AI. All rights reserved.</p>
        <p className="text-[12px] text-slate-400">Built for India's next generation of investors.</p>
      </div>
    </div>
  </footer>
);
