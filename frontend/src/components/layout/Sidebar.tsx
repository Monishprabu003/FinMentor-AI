import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Receipt,
  PieChart,
  Target,
  GraduationCap,
  BookOpen,
  Bot,
  Settings,
  HelpCircle
} from 'lucide-react';
import clsx from 'clsx';

export const Sidebar: React.FC = () => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Transactions', path: '/transactions', icon: Receipt },
    { name: 'Budgets & 50/30/20', path: '/budgets', icon: PieChart },
    { name: 'Savings Goals', path: '/savings', icon: Target },
    { name: 'Learning Center', path: '/learn', icon: GraduationCap },
    { name: 'Books Library', path: '/books', icon: BookOpen },
    { name: 'AI Mentor Studio', path: '/ai', icon: Bot, highlight: true },
    { name: 'Profile & Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-slate-800/80 bg-slate-900/60 backdrop-blur-md flex flex-col justify-between hidden md:flex min-h-[calc(100vh-4rem)]">
      <div className="p-4 space-y-1.5">
        <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Platform Menu
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/10 text-emerald-300 border border-emerald-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                )
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.name}</span>
              {item.highlight && (
                <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                  AI
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-800/60">
        <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>AI Educational Mandate</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            All calculations are performed deterministically by FinMentor's backend. AI explains concepts and coaches habits.
          </p>
        </div>
      </div>
    </aside>
  );
};
