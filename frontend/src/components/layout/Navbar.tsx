import React from 'react';
import { Sparkles, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="h-16 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div 
          onClick={() => navigate('/dashboard')}
          className="cursor-pointer flex items-center gap-2.5 font-bold text-xl tracking-tight"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 flex items-center justify-center shadow-glow-emerald">
            <Sparkles className="w-5 h-5 text-slate-950" />
          </div>
          <span className="text-white">
            Fin<span className="gradient-text">Mentor</span>
          </span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            AI EDU
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Quick AI Explainer Button */}
        <button
          onClick={() => navigate('/ai')}
          className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-medium transition-all duration-200"
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Ask AI Tutor</span>
        </button>

        {user && (
          <div className="flex items-center gap-3 pl-3 border-l border-slate-800">
            <div className="text-right hidden md:block">
              <div className="text-sm font-semibold text-slate-200">{user.full_name}</div>
              <div className="text-xs text-slate-400 capitalize">{user.experience_level} Account</div>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
              <UserIcon className="w-4 h-4" />
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
