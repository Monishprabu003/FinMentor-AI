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
    <aside className="w-64 border-r border-slate-200 bg-white/70 backdrop-blur-md flex flex-col justify-between hidden md:flex min-h-[calc(100vh-4rem)]">
      <div className="p-4 space-y-1.5">
        <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
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
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200',
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                )
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.name}</span>
              {item.highlight && (
                <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  AI
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-200">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/50 border border-blue-100">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 mb-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>AI Educational Mandate</span>
          </div>
          <p className="text-[11.5px] text-slate-600 leading-relaxed font-medium">
            All calculations are performed deterministically by FinMentor's backend. AI explains concepts and coaches habits.
          </p>
        </div>
      </div>
    </aside>
  );
};
