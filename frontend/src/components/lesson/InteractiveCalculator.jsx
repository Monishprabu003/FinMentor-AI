import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Sparkles, IndianRupee } from 'lucide-react';
export const InteractiveCalculator = ({ config }) => {
    const [income, setIncome] = useState(config.defaultIncome || 75000);
    const needs = Math.round(income * 0.5);
    const wants = Math.round(income * 0.3);
    const wealth = Math.round(income * 0.2);
    return (<div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 text-zinc-100 space-y-6 my-8 shadow-xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"/>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-xs">
            <Calculator className="w-5 h-5"/>
          </div>
          <div>
            <h3 className="text-base font-black tracking-tight">{config.title}</h3>
            <p className="text-xs text-zinc-400 font-medium">{config.description}</p>
          </div>
        </div>
        <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
          LIVE INTERACTIVE WIDGET
        </span>
      </div>

      {/* Salary Slider Input */}
      <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-zinc-400">Monthly Net Income (After Taxes)</span>
          <span className="text-xl font-black text-blue-400 flex items-center">
            <IndianRupee className="w-4 h-4"/> {income.toLocaleString('en-IN')}
          </span>
        </div>

        <input type="range" min={20000} max={300000} step={5000} value={income} onChange={(e) => setIncome(Number(e.target.value))} className="w-full h-2.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"/>

        <div className="flex justify-between text-[10px] font-semibold text-zinc-500">
          <span>₹20,000 / mo</span>
          <span>₹1,50,000 / mo</span>
          <span>₹3,00,000 / mo</span>
        </div>
      </div>

      {/* Live Calculated Split Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Needs 50% */}
        <motion.div whileHover={{ y: -2 }} className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 space-y-1">
          <div className="flex justify-between text-xs font-bold text-blue-300">
            <span>Needs (50%)</span>
            <span>Essentials Cap</span>
          </div>
          <div className="text-2xl font-black text-white">₹{needs.toLocaleString('en-IN')}</div>
          <p className="text-[11px] text-blue-200/70 font-medium">Rent, Groceries, Utility Bills, Insurance</p>
        </motion.div>

        {/* Wants 30% */}
        <motion.div whileHover={{ y: -2 }} className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-1">
          <div className="flex justify-between text-xs font-bold text-purple-300">
            <span>Wants (30%)</span>
            <span>Discretionary</span>
          </div>
          <div className="text-2xl font-black text-white">₹{wants.toLocaleString('en-IN')}</div>
          <p className="text-[11px] text-purple-200/70 font-medium">Dining Out, Netflix, Shopping, Travel</p>
        </motion.div>

        {/* Wealth 20% */}
        <motion.div whileHover={{ y: -2 }} className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-1">
          <div className="flex justify-between text-xs font-bold text-emerald-300">
            <span>Future Wealth (20%)</span>
            <span>Automated</span>
          </div>
          <div className="text-2xl font-black text-emerald-400">₹{wealth.toLocaleString('en-IN')}</div>
          <p className="text-[11px] text-emerald-200/70 font-medium">SIP Index Funds, Emergency Reserve</p>
        </motion.div>
      </div>

      {/* Advice Footnote */}
      <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800 text-xs text-zinc-300 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-amber-400 shrink-0"/>
        <span>
          Automating <strong>₹{wealth.toLocaleString('en-IN')}/mo</strong> into an index fund at 12% returns yields <strong>₹1.75 Crore</strong> in 20 years!
        </span>
      </div>
    </div>);
};
