import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, AlertTriangle, ArrowRight, Lightbulb, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_USER_STATS } from '../../constants/learningData';
export const RightAIPanel = () => {
    const navigate = useNavigate();
    return (<div className="w-[300px] shrink-0 border-l border-slate-200 bg-slate-50/70 p-4 space-y-4 hidden xl:block min-h-[calc(100vh-3.5rem)] overflow-y-auto">
      {/* Header Badge */}
      <div className="flex items-center gap-2 px-1">
        <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
          <Bot className="w-4 h-4"/>
        </div>
        <div>
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
            AI Tutor Coach
          </h3>
          <p className="text-[10.5px] font-semibold text-slate-400">Personalized Learning Radar</p>
        </div>
      </div>

      {/* Card 1: Today's AI Recommendation */}
      <motion.div whileHover={{ y: -2 }} className="p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md space-y-2 relative overflow-hidden">
        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-blue-200">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-300"/> Focus Recommendation
          </span>
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">AI Priority</span>
        </div>
        <h4 className="text-sm font-bold leading-snug">
          "You scored 65% on Budgeting. Review Lesson 4 before the final quiz."
        </h4>
        <p className="text-xs text-blue-100 font-medium leading-relaxed">
          Mastering the 50/30/20 rule will boost your overall Financial Score by +15 points.
        </p>
        <button onClick={() => navigate('/dashboard/learning/paths')} className="mt-2 w-full py-2 rounded-xl bg-white text-blue-700 text-xs font-extrabold flex items-center justify-center gap-1.5 hover:bg-blue-50 transition-colors shadow-xs">
          <span>Continue Lesson 4</span>
          <ArrowRight className="w-3.5 h-3.5"/>
        </button>
      </motion.div>

      {/* Card 2: Weak Topics Alert */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-500"/>
          <span>Weak Area Diagnostic</span>
        </div>
        <p className="text-[11.5px] text-slate-500 font-medium leading-relaxed">
          Our AI diagnostic identified 3 concepts that need reinforcement:
        </p>
        <div className="space-y-1.5">
          {MOCK_USER_STATS.weakTopics.map((topic, i) => (<div key={i} className="flex items-center justify-between p-2 rounded-xl bg-amber-50/60 border border-amber-100 text-xs font-semibold text-amber-900">
              <span>{topic}</span>
              <span className="text-[10px] text-amber-600 font-extrabold underline cursor-pointer">
                Practice
              </span>
            </div>))}
        </div>
      </div>

      {/* Card 3: Strong Topics Verified */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500"/>
          <span>Mastered Competencies</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {MOCK_USER_STATS.strongTopics.map((topic, i) => (<span key={i} className="text-[10.5px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              ✓ {topic}
            </span>))}
        </div>
      </div>

      {/* Card 4: Motivational Quote */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-md space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
          <Lightbulb className="w-3.5 h-3.5"/>
          <span>Daily Mindset</span>
        </div>
        <blockquote className="text-xs italic text-slate-300 font-medium leading-relaxed">
          "Do not save what is left after spending, but spend what is left after saving."
        </blockquote>
        <p className="text-[10px] text-slate-400 font-bold uppercase text-right">— Warren Buffett</p>
      </div>
    </div>);
};
