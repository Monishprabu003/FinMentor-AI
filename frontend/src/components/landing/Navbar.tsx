import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Logo } from '../common/Logo';

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
          : 'bg-white/80 backdrop-blur-xl'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-18 py-4 flex items-center justify-between gap-8">
        {/* Logo + Nav links grouped on the left */}
        <div className="flex items-center gap-6 shrink-0">
          <a href="/" className="flex items-center shrink-0">
            <Logo size="md" />
          </a>

          {/* Desktop links — right next to logo */}
          <div className="hidden md:flex items-center gap-2">
            {/* Products dropdown */}
            <div className="relative" onMouseEnter={() => setProductsOpen(true)} onMouseLeave={() => setProductsOpen(false)}>
              <button className="flex items-center gap-1.5 px-4 py-2 text-[18px] font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50/60 rounded-lg transition-all">
                Features <ChevronDown className="w-5 h-5" />
              </button>
              <AnimatePresence>
                {productsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-2"
                  >
                    {products.map((p) => (
                      <a
                        key={p.label}
                        href="#features"
                        className="flex flex-col gap-0.5 px-3 py-2.5 rounded-xl hover:bg-blue-50 group transition-colors"
                      >
                        <span className="text-[14px] font-semibold text-slate-800 group-hover:text-blue-600">{p.label}</span>
                        <span className="text-[12px] text-slate-400">{p.desc}</span>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="#learn"
              className="px-4 py-2 text-[18px] font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50/60 rounded-lg transition-all"
            >
              Learn
            </a>
          </div>
        </div>


        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <button
            onClick={onSignIn}
            className="px-4 py-2 text-[16px] font-semibold text-slate-900 hover:text-black transition-colors cursor-pointer"
          >
            Log in
          </button>
          <button
            onClick={onGetStarted}
            className="px-6 py-2.5 text-[16px] font-semibold text-white bg-[#0f0f0f] hover:bg-black rounded-full transition-all shadow-sm active:scale-[0.98] cursor-pointer"
          >
            Sign up
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-slate-700"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
              {['#features', '#learn'].map((href, i) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-[14.5px] font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl"
                >
                  {['Features', 'Learn'][i]}
                </a>
              ))}
              <div className="pt-3 border-t border-gray-100 grid grid-cols-2 gap-3">
                <button onClick={onSignIn} className="py-2.5 text-[15px] font-semibold text-slate-900 border border-slate-200 rounded-full">Log in</button>
                <button onClick={onGetStarted} className="py-2.5 text-[15px] font-semibold text-white bg-[#0f0f0f] rounded-full">Sign up</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
