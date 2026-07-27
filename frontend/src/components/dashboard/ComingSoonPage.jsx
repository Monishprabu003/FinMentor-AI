import React from 'react';
import { motion } from 'framer-motion';
import { Construction, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export const ComingSoonPage = ({ title, description, icon: Icon = Construction, gradientFrom = '#3b82f6', }) => {
    const navigate = useNavigate();
    return (<div className="min-h-[calc(100vh-56px)] bg-slate-50 flex items-center justify-center px-6">
      {/* Subtle pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.018]" style={{
            backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
            backgroundSize: '28px 28px',
        }}/>

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }} className="relative z-10 text-center max-w-md">
        {/* Icon */}
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1, duration: 0.5, type: 'spring', stiffness: 200 }} className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center bg-white border border-slate-200 shadow-md">
          <Icon className="w-9 h-9" style={{ color: gradientFrom }} strokeWidth={1.5}/>
        </motion.div>

        {/* Badge */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"/>
          <span className="text-[11px] font-bold uppercase tracking-widest text-amber-600">Coming Soon</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.4 }} className="text-3xl font-black text-slate-900 tracking-tight mb-3">
          {title}
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }} className="text-[15px] font-medium text-slate-500 leading-relaxed mb-8">
          {description}
        </motion.p>

        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/dashboard')} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-300 text-[13px] font-bold text-slate-600 hover:text-blue-600 shadow-sm transition-all duration-200">
          <ArrowLeft className="w-4 h-4"/>
          Back to Dashboard
        </motion.button>
      </motion.div>
    </div>);
};
