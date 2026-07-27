import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, GraduationCap, PieChart, Receipt, Target, TrendingUp, BarChart3, BookOpen, Trophy, FileText, Settings, ChevronLeft, ChevronRight, Bot, } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
const NAV_ITEMS = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Learning', path: '/learn', icon: GraduationCap, group: 'Grow' },
    { label: 'AI Mentor', path: '/ai', icon: Bot, badge: 'AI', group: 'Grow' },
    { label: 'Finance Library', path: '/books', icon: BookOpen, group: 'Grow' },
    { label: 'Budget Planner', path: '/budgets', icon: PieChart, group: 'Track' },
    { label: 'Expenses', path: '/transactions', icon: Receipt, group: 'Track' },
    { label: 'Goals', path: '/savings', icon: Target, group: 'Track' },
    { label: 'Investments', path: '/dashboard/investments', icon: TrendingUp, badge: 'Soon', group: 'Analyse' },
    { label: 'Analytics', path: '/dashboard/analytics', icon: BarChart3, badge: 'Soon', group: 'Analyse' },
    { label: 'Reports', path: '/dashboard/reports', icon: FileText, badge: 'Soon', group: 'Analyse' },
    { label: 'Achievements', path: '/dashboard/achievements', icon: Trophy, badge: 'Soon', group: 'More' },
    { label: 'Settings', path: '/settings', icon: Settings, group: 'More' },
];
const NavGroupLabel = ({ label, collapsed }) => (<AnimatePresence>
    {!collapsed && (<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="px-3 pt-4 pb-1 text-[10px] font-black uppercase tracking-[0.12em] text-slate-400 select-none">
        {label}
      </motion.p>)}
  </AnimatePresence>);
const SidebarLink = ({ item, collapsed }) => {
    const Icon = item.icon;
    return (<NavLink to={item.path} title={collapsed ? item.label : undefined} className={({ isActive }) => [
            'group relative flex items-center rounded-xl transition-all duration-200 overflow-hidden',
            collapsed ? 'w-10 h-10 mx-auto justify-center' : 'gap-3 px-3 py-2.5 w-full',
            isActive
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100',
        ].join(' ')}>
      {({ isActive }) => (<>
          <Icon className={[
                'w-4 h-4 shrink-0 transition-colors duration-200',
                isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700',
            ].join(' ')} strokeWidth={isActive ? 2 : 1.75}/>

          <AnimatePresence initial={false}>
            {!collapsed && (<motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }} transition={{ duration: 0.2 }} className={[
                    'text-[13px] font-semibold whitespace-nowrap overflow-hidden',
                    isActive ? 'text-white' : '',
                ].join(' ')}>
                {item.label}
              </motion.span>)}
          </AnimatePresence>

          {!collapsed && item.badge && (<AnimatePresence initial={false}>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={[
                    'ml-auto text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full',
                    item.badge === 'AI'
                        ? 'bg-blue-100 text-blue-600 border border-blue-200'
                        : 'bg-slate-100 text-slate-400 border border-slate-200',
                ].join(' ')}>
                {item.badge}
              </motion.span>
            </AnimatePresence>)}

          {collapsed && item.badge === 'AI' && (<span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-blue-500"/>)}
        </>)}
    </NavLink>);
};
export const AppSidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();
    const groups = {};
    const ungrouped = [];
    NAV_ITEMS.forEach((item) => {
        if (item.group) {
            if (!groups[item.group])
                groups[item.group] = [];
            groups[item.group].push(item);
        }
        else {
            ungrouped.push(item);
        }
    });
    return (<motion.aside animate={{ width: collapsed ? 68 : 220 }} transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }} className="hidden md:flex flex-col h-[calc(100vh-56px)] sticky top-14 shrink-0 bg-white border-r border-slate-200 overflow-hidden">
      {/* Collapse Toggle */}
      <div className={`flex ${collapsed ? 'justify-center' : 'justify-end'} px-3 pt-3 pb-2`}>
        <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }} onClick={() => setCollapsed(v => !v)} className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center transition-colors">
          {collapsed
            ? <ChevronRight className="w-3 h-3 text-slate-500"/>
            : <ChevronLeft className="w-3 h-3 text-slate-500"/>}
        </motion.button>
      </div>

      {/* Nav content */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 pb-4 space-y-0.5">
        {ungrouped.map((item) => (<SidebarLink key={item.path} item={item} collapsed={collapsed}/>))}
        {Object.entries(groups).map(([groupName, items]) => (<div key={groupName}>
            <NavGroupLabel label={groupName} collapsed={collapsed}/>
            {items.map((item) => (<SidebarLink key={item.path} item={item} collapsed={collapsed}/>))}
          </div>))}
      </nav>

      {/* Bottom user card */}
      {user && (<div className="px-2 py-3 border-t border-slate-200 shrink-0">
          <motion.button whileHover={{ scale: 1.02 }} onClick={() => navigate('/settings')} className={`flex items-center rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all duration-200 overflow-hidden ${collapsed ? 'w-10 h-10 mx-auto justify-center p-0' : 'gap-2.5 w-full p-2.5'}`}>
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold text-[11px] shrink-0">
              {user.full_name.charAt(0).toUpperCase()}
            </div>
            <AnimatePresence initial={false}>
              {!collapsed && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overflow-hidden min-w-0 text-left">
                  <p className="text-[12px] font-bold text-slate-700 truncate leading-snug">
                    {user.full_name}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium truncate capitalize">
                    {user.experience_level}
                  </p>
                </motion.div>)}
            </AnimatePresence>
          </motion.button>
        </div>)}
    </motion.aside>);
};
