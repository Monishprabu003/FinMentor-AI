import React from 'react';
import { TrendingUp, Globe, Code2, Users } from 'lucide-react';

const footerLinks = {
  Platform: ['Dashboard', 'Expense Tracking', 'Budget Planner', 'Savings Goals', 'Analytics', 'Health Score'],
  Learning: ['Budgeting Basics', 'Investing 101', 'Mutual Funds', 'Tax Saving', 'Insurance', 'Emergency Fund'],
  Resources: ['Documentation', 'API Reference', 'Changelog', 'Blog', 'Press Kit'],
  Company: ['About Us', 'Careers', 'Contact', 'Partners', 'Community'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Disclaimer'],
};

export const LandingFooter: React.FC = () => (
  <footer className="bg-gray-950 border-t border-gray-800">
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[14px] font-semibold text-white">FinMentor</span>
          </div>
          <p className="text-[12px] text-gray-500 leading-relaxed">
            Your AI-powered financial operating system for students and young professionals.
          </p>
          <div className="flex items-center gap-3">
            {[Globe, Code2, Users].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
              >
                <Icon className="w-3.5 h-3.5 text-gray-400" />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading} className="space-y-4">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{heading}</p>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[13px] text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[12px] text-gray-600">
          © {new Date().getFullYear()} FinMentor. All rights reserved.
        </p>
        <p className="text-[12px] text-gray-600">
          Built with care for India's next generation of investors.
        </p>
      </div>
    </div>
  </footer>
);
