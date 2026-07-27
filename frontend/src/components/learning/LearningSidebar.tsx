import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Compass,
  GraduationCap,
  BookOpen,
  Bookmark,
  Award,
  Trophy,
  Zap,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';

interface SidebarItem {
  label: string;
  path: string;
  icon: LucideIcon;
  badge?: string;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  { label: 'Overview', path: '/dashboard/learning', icon: LayoutDashboard },
  { label: 'Learning Paths', path: '/dashboard/learning/paths', icon: Compass, badge: '15 Paths' },
  { label: 'Courses', path: '/dashboard/learning/courses', icon: GraduationCap },
  { label: 'Finance Library', path: '/dashboard/learning/library', icon: BookOpen },
  { label: 'Bookmarks', path: '/dashboard/learning/bookmarks', icon: Bookmark },
  { label: 'Certificates', path: '/dashboard/learning/certificates', icon: Award, badge: '2' },
  { label: 'Achievements', path: '/dashboard/learning/achievements', icon: Trophy },
  { label: 'Daily Quests', path: '/dashboard/learning/challenges', icon: Zap, badge: 'Daily' },
  { label: 'Leaderboard', path: '/dashboard/learning/leaderboard', icon: BarChart2 },
  { label: 'Settings', path: '/dashboard/learning/settings', icon: Settings },
];

export const LearningSidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 68 : 230 }}
      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="hidden md:flex flex-col h-[calc(100vh-56px)] sticky top-14 shrink-0 bg-white border-r border-slate-200 shadow-sm overflow-hidden z-20"
    >
      {/* Header & Toggle */}
      <div className="flex items-center justify-between px-3 pt-3 pb-2 border-b border-slate-100">
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 px-1"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-xs">
                🎓
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                Academy Hub
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          onClick={() => setCollapsed((v) => !v)}
          className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center transition-colors ml-auto"
        >
          {collapsed ? (
            <ChevronRight className="w-3 h-3 text-slate-600" />
          ) : (
            <ChevronLeft className="w-3 h-3 text-slate-600" />
          )}
        </motion.button>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-3 space-y-1">
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard/learning'}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                [
                  'group relative flex items-center rounded-xl transition-all duration-200 overflow-hidden',
                  collapsed ? 'w-10 h-10 mx-auto justify-center' : 'gap-3 px-3 py-2.5 w-full',
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
                ].join(' ')
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={[
                      'w-4 h-4 shrink-0 transition-colors duration-200',
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700',
                    ].join(' ')}
                  />

                  <AnimatePresence initial={false}>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-[13px] font-semibold whitespace-nowrap overflow-hidden"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {!collapsed && item.badge && (
                    <span
                      className={[
                        'ml-auto text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full',
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-blue-50 text-blue-600 border border-blue-100',
                      ].join(' ')}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Banner */}
      {!collapsed && (
        <div className="p-3 m-2 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 text-xs">
          <p className="font-bold text-blue-900">🔥 14-Day Streak!</p>
          <p className="text-[11px] text-slate-600 mt-0.5">Learn 1 lesson today to keep your multiplier active.</p>
        </div>
      )}
    </motion.aside>
  );
};
