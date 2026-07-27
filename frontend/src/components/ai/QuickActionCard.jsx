import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, PieChart, TrendingUp, Calculator, ArrowRight } from 'lucide-react';
export const QuickActionCard = ({ title, subtitle, icon, onClick }) => {
    const icons = {
        pie: PieChart,
        chart: TrendingUp,
        calc: Calculator,
        help: HelpCircle,
    };
    const IconComp = icons[icon] || HelpCircle;
    return (<motion.div whileHover={{ y: -2 }} onClick={onClick} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-blue-300 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shrink-0">
          <IconComp className="w-5 h-5"/>
        </div>
        <div>
          <h4 className="text-xs font-black text-slate-900 group-hover:text-blue-600 transition-colors">
            {title}
          </h4>
          <p className="text-[11px] text-slate-500 font-medium line-clamp-1">{subtitle}</p>
        </div>
      </div>

      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform shrink-0"/>
    </motion.div>);
};
