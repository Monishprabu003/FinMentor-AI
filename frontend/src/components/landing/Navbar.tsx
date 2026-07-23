import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Menu, X, ChevronDown } from 'lucide-react';

const products = [
  { label: 'Expense Tracking', desc: 'Log every rupee automatically' },
  { label: 'Budget Planner', desc: '50/30/20 rule, visualised' },
  { label: 'Savings Goals', desc: 'Milestones with deadlines' },
  { label: 'AI Mentor', desc: 'Your 24/7 finance expert' },
];

interface Props {
  onSignIn: () => void;
  onGetStarted: () => void;
}

export const LandingNavbar: React.FC<Props> = ({ onSignIn, onGetStarted }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-sm border-b border-gray-100'
          : 'bg-white/60 backdrop-blur-xl'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between gap-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
            <TrendingUp className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-[15px] font-black text-slate-900 tracking-tight">FinMentor</span>
        </a>

        {/* Desktop centre links */}
        <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {/* Products dropdown */}
          <div className="relative" onMouseEnter={() => setProductsOpen(true)} onMouseLeave={() => setProductsOpen(false)}>
            <button className="flex items-center gap-1 px-3.5 py-2 text-[13.5px] font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
              Features <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <AnimatePresence>
              {productsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-2"
                >
                  {products.map((p) => (
                    <a
                      key={p.label}
                      href="#features"
                      className="flex flex-col gap-0.5 px-3 py-2.5 rounded-xl hover:bg-blue-50 group transition-colors"
                    >
                      <span className="text-[13px] font-semibold text-slate-800 group-hover:text-blue-600">{p.label}</span>
                      <span className="text-[11px] text-slate-400">{p.desc}</span>
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {[
            { label: 'Learn', href: '#learn' },
            { label: 'AI Mentor', href: '#ai-mentor' },
            { label: 'Why FinMentor', href: '#why' },
            { label: 'FAQ', href: '#faq' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3.5 py-2 text-[13.5px] font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={onSignIn}
            className="px-4 py-2 text-[13.5px] font-semibold text-slate-700 hover:text-blue-600 transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={onGetStarted}
            className="px-5 py-2 text-[13.5px] font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm shadow-blue-200"
          >
            Get Started →
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-slate-600"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-white border-t border-gray-100"
          >
            <div className="px-5 py-4 space-y-1">
              {['#features', '#learn', '#ai-mentor', '#why', '#faq'].map((href, i) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-[14px] font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl"
                >
                  {['Features', 'Learn', 'AI Mentor', 'Why FinMentor', 'FAQ'][i]}
                </a>
              ))}
              <div className="pt-3 border-t border-gray-100 grid grid-cols-2 gap-2">
                <button onClick={onSignIn} className="py-2.5 text-sm font-semibold text-slate-700 border border-gray-200 rounded-xl">Sign In</button>
                <button onClick={onGetStarted} className="py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl">Get Started</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
