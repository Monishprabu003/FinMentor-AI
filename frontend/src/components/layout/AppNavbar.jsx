import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Settings, LogOut, ChevronDown, Sparkles, ClipboardCheck, Command, X, } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../common/Logo';
/* ── Notification data ─────────────────────────────────────── */
const NOTIFICATIONS = [
    { id: 1, title: 'Budget Alert', body: "Food budget at 85% for this month", time: '2h ago', dot: 'bg-amber-400' },
    { id: 2, title: 'Streak Milestone', body: "You've maintained a 7-day learning streak!", time: '5h ago', dot: 'bg-emerald-500' },
    { id: 3, title: 'AI Insight Ready', body: 'New personalised financial tip available', time: '1d ago', dot: 'bg-blue-500' },
];
/* ── Notification Dropdown ─────────────────────────────────── */
const NotificationDropdown = ({ onClose }) => (<motion.div initial={{ opacity: 0, y: -8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.96 }} transition={{ duration: 0.18, ease: 'easeOut' }} className="absolute right-0 top-full mt-3 w-80 rounded-2xl bg-white border border-slate-200 shadow-xl shadow-slate-200/60 overflow-hidden z-50">
    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
      <p className="text-[13px] font-bold text-slate-700">Notifications</p>
      <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 transition-colors">
        <X className="w-3.5 h-3.5 text-slate-400"/>
      </button>
    </div>
    {NOTIFICATIONS.map((n) => (<div key={n.id} className="flex gap-3 px-4 py-3.5 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 cursor-pointer">
        <div className={`w-2 h-2 rounded-full ${n.dot} mt-1.5 shrink-0`}/>
        <div>
          <p className="text-[13px] font-bold text-slate-700">{n.title}</p>
          <p className="text-[12px] text-slate-500 font-medium mt-0.5 leading-snug">{n.body}</p>
          <p className="text-[10px] text-slate-400 font-semibold mt-1">{n.time}</p>
        </div>
      </div>))}
    <div className="px-4 py-3">
      <button className="w-full text-center text-[12px] font-bold text-blue-600 hover:text-blue-700 transition-colors">
        View all notifications
      </button>
    </div>
  </motion.div>);
/* ── Avatar Dropdown ───────────────────────────────────────── */
const AvatarDropdown = ({ user, onLogout, onSettings }) => (<motion.div initial={{ opacity: 0, y: -8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.96 }} transition={{ duration: 0.18, ease: 'easeOut' }} className="absolute right-0 top-full mt-3 w-64 rounded-2xl bg-white border border-slate-200 shadow-xl shadow-slate-200/60 overflow-hidden z-50">
    {/* User info */}
    <div className="px-4 py-4 border-b border-slate-100">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm">
          {user.full_name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-[13px] font-bold text-slate-800 leading-snug">{user.full_name}</p>
          <p className="text-[11px] text-slate-400 font-medium">{user.email}</p>
        </div>
      </div>
      <div className="mt-2.5 px-2 py-1 rounded-lg bg-slate-50 border border-slate-100 inline-flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"/>
        <span className="text-[11px] font-bold text-slate-500 capitalize">{user.experience_level} Account</span>
      </div>
    </div>

    {/* Actions */}
    <div className="p-2">
      <button onClick={onSettings} className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group">
        <Settings className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors"/>
        <span className="text-[13px] font-semibold text-slate-500 group-hover:text-slate-700 transition-colors">Settings & Profile</span>
      </button>
      <div className="my-1.5 border-t border-slate-100"/>
      <button onClick={onLogout} className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl hover:bg-rose-50 transition-colors group">
        <LogOut className="w-4 h-4 text-slate-400 group-hover:text-rose-500 transition-colors"/>
        <span className="text-[13px] font-semibold text-slate-500 group-hover:text-rose-500 transition-colors">Sign Out</span>
      </button>
    </div>
  </motion.div>);
/* ── App Navbar (Light) ────────────────────────────────────── */
export const AppNavbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showAvatar, setShowAvatar] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);
    const notifRef = useRef(null);
    const avatarRef = useRef(null);
    useEffect(() => {
        const handler = (e) => {
            if (notifRef.current && !notifRef.current.contains(e.target))
                setShowNotifications(false);
            if (avatarRef.current && !avatarRef.current.contains(e.target))
                setShowAvatar(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);
    const handleLogout = () => { logout(); navigate('/'); };
    return (<header className="h-14 sticky top-0 z-50 flex items-center px-4 gap-3 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm">

      {/* Logo */}
      <div className="shrink-0 flex items-center gap-2">
        <Logo size="sm" variant="default" onClick={() => navigate('/dashboard')}/>
        <span className="hidden sm:flex text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200 uppercase tracking-widest">
          OS
        </span>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-sm mx-auto lg:mx-4">
        <motion.div animate={{ scale: searchFocused ? 1.01 : 1 }} className="relative flex items-center">
          <Search className="absolute left-3 w-3.5 h-3.5 text-slate-400 pointer-events-none"/>
          <input type="text" placeholder="Search modules, topics..." onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)} className={`w-full pl-9 pr-14 py-2 rounded-xl bg-slate-50 border text-[13px] font-medium text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-200 ${searchFocused
            ? 'border-blue-300 bg-white ring-3 ring-blue-100'
            : 'border-slate-200 hover:border-slate-300'}`}/>
          <div className="absolute right-3 flex items-center gap-0.5 pointer-events-none">
            <Command className="w-3 h-3 text-slate-300"/>
            <span className="text-[11px] font-bold text-slate-300">K</span>
          </div>
        </motion.div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 shrink-0">

        {/* Assessment Button */}
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/assessment')} className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[12px] font-bold text-slate-600 hover:text-slate-800 transition-all duration-200">
          <ClipboardCheck className="w-3.5 h-3.5 text-blue-500"/>
          <span>Assessment</span>
        </motion.button>

        {/* AI Tutor Button */}
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/ai')} className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[12px] font-bold text-blue-600 hover:text-blue-700 transition-all duration-200">
          <Sparkles className="w-3.5 h-3.5"/>
          <span>Ask AI</span>
        </motion.button>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { setShowNotifications(v => !v); setShowAvatar(false); }} className="relative w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center transition-all">
            <Bell className="w-4 h-4 text-slate-500"/>
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-blue-500"/>
          </motion.button>
          <AnimatePresence>
            {showNotifications && <NotificationDropdown onClose={() => setShowNotifications(false)}/>}
          </AnimatePresence>
        </div>

        {/* Avatar */}
        {user && (<div ref={avatarRef} className="relative">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => { setShowAvatar(v => !v); setShowNotifications(false); }} className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 transition-all duration-200">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold text-[11px]">
                {user.full_name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:block text-[12px] font-bold text-slate-700 max-w-[80px] truncate">
                {user.full_name.split(' ')[0]}
              </span>
              <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${showAvatar ? 'rotate-180' : ''}`}/>
            </motion.button>
            <AnimatePresence>
              {showAvatar && (<AvatarDropdown user={user} onLogout={handleLogout} onSettings={() => { navigate('/settings'); setShowAvatar(false); }}/>)}
            </AnimatePresence>
          </div>)}
      </div>
    </header>);
};
