import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export const RecommendationCard = ({ rec }) => {
    const navigate = useNavigate();
    return (<motion.div whileHover={{ y: -3 }} onClick={() => navigate(rec.targetUrl)} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex flex-col justify-between">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            {rec.type} Recommendation
          </span>
          <span className="text-[10px] font-semibold text-slate-400">{rec.reason}</span>
        </div>

        <h3 className="text-sm font-black text-slate-900 leading-snug">{rec.title}</h3>
        <p className="text-xs text-slate-500 font-medium leading-relaxed">{rec.description}</p>
      </div>

      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-blue-600">
        <span>Launch Recommendation</span>
        <ArrowRight className="w-4 h-4"/>
      </div>
    </motion.div>);
};
