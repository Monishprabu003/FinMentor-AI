import React from 'react';
import { NavLink } from 'react-router-dom';
import { Bot, MessageSquare, History, Bookmark, Sparkles, Compass, Settings } from 'lucide-react';
import { LearningLayout } from '../learning/LearningLayout';
export const AILayout = ({ children }) => {
    const navItems = [
        { label: 'AI Overview', path: '/dashboard/ai', icon: Bot },
        { label: 'Live Chat Studio', path: '/dashboard/ai/chat', icon: MessageSquare },
        { label: 'History', path: '/dashboard/ai/history', icon: History },
        { label: 'Saved Answers', path: '/dashboard/ai/saved', icon: Bookmark },
        { label: 'Prompt Library', path: '/dashboard/ai/prompts', icon: Sparkles },
        { label: 'Recommendations', path: '/dashboard/ai/recommendations', icon: Compass },
        { label: 'AI Settings', path: '/dashboard/ai/settings', icon: Settings },
    ];
    return (<LearningLayout>
      <div className="max-w-6xl mx-auto space-y-6 pb-12">
        {/* Navigation Tabs Header */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 scrollbar-none">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (<NavLink key={item.path} to={item.path} end={item.path === '/dashboard/ai'} className={({ isActive }) => `flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 ${isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'}`}>
                <IconComponent className="w-3.5 h-3.5"/>
                <span>{item.label}</span>
              </NavLink>);
        })}
        </div>

        {/* Content Children */}
        {children}
      </div>
    </LearningLayout>);
};
