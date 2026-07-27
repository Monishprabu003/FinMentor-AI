import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export const AIRecommendationCard = () => {
    const navigate = useNavigate();
    return (<motion.div whileHover={{ y: -2 }} className="p-6 rounded-3xl bg-gradient-to-br from-blue-50/80 via-indigo-50/40 to-purple-50/50 border border-blue-200/80 shadow-xs mb-8 space-y-3 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
            <Brain className="w-4 h-4"/>
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-blue-900">
              AI Personalized Learning Recommendation
            </h3>
            <p className="text-[11px] font-semibold text-slate-500">Based on your onboarding assessment & quiz history</p>
          </div>
        </div>
        <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
          Smart Guidance
        </span>
      </div>

      <div className="p-4 rounded-2xl bg-white/90 border border-blue-100 shadow-2xs space-y-2">
        <div className="text-xs font-extrabold text-blue-800 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400"/>
          <span>Diagnostic Insight</span>
        </div>
        <p className="text-xs md:text-sm text-slate-700 font-medium leading-relaxed">
          "Your onboarding score indicates a strong understanding of Savings, but your Budgeting accuracy is 65%. Complete <strong>Lesson 4 (Automating Monthly Cash Flow)</strong> before taking the path quiz."
        </p>
      </div>

      <div className="flex justify-end">
        <button onClick={() => navigate('/dashboard/learning/paths')} className="text-xs font-extrabold text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
          <span>Jump to Recommended Lesson</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"/>
        </button>
      </div>
    </motion.div>);
};
