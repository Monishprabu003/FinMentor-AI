import React from 'react';
import { Sparkles, User as UserIcon, LogOut, ClipboardCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../common/Logo';
export const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/');
    };
    return (<header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-3">
        <Logo size="sm" onClick={() => navigate('/dashboard')}/>
        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
          AI OS
        </span>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Take Financial Assessment Button */}
        <button onClick={() => navigate('/assessment')} className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-sm font-semibold transition-all duration-200 shadow-xs">
          <ClipboardCheck className="w-4 h-4 text-blue-600"/>
          <span>Take Financial Assessment</span>
        </button>

        {/* Quick AI Explainer Button */}
        <button onClick={() => navigate('/ai')} className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-600 text-sm font-semibold transition-all duration-200 shadow-xs">
          <Sparkles className="w-4 h-4 text-blue-600"/>
          <span>Ask AI Tutor</span>
        </button>

        {user && (<div className="flex items-center gap-3 pl-3 border-l border-slate-200">
            <div className="text-right hidden md:block">
              <div className="text-sm font-bold text-slate-800">{user.full_name}</div>
              <div className="text-xs text-slate-400 font-medium capitalize">{user.experience_level} Account</div>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold">
              <UserIcon className="w-4 h-4"/>
            </div>
            <button onClick={handleLogout} title="Logout" className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors">
              <LogOut className="w-4 h-4"/>
            </button>
          </div>)}
      </div>
    </header>);
};
