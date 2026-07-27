import React from 'react';
import { motion } from 'framer-motion';
import { WorkspaceHeader } from '../components/dashboard/WorkspaceHeader';
import { ModuleCard } from '../components/dashboard/ModuleCard';
import { AIWidget } from '../components/dashboard/AIWidget';
import { APP_MODULES } from '../constants/modules';
export const DashboardPage = () => {
    return (<div className="relative min-h-[calc(100vh-56px)] bg-slate-50 overflow-x-hidden">

      {/* Subtle background pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.018]" style={{
            backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
            backgroundSize: '28px 28px',
        }}/>

      {/* Three-column layout */}
      <div className="relative flex gap-0 h-full">

        {/* ── Center Workspace ── */}
        <div className="flex-1 min-w-0 px-6 lg:px-8 py-8 space-y-10 overflow-y-auto">

          {/* Hero Greeting */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-7 py-7">
            <WorkspaceHeader />
          </div>

          {/* Module Grid section */}
          <div>
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }} className="flex items-center justify-between mb-5">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-400 mb-1">
                  Your Workspace
                </p>
                <h2 className="text-xl font-bold text-slate-800">Financial OS Modules</h2>
              </div>
              <span className="text-[11px] font-bold text-slate-400 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
                {APP_MODULES.length} modules
              </span>
            </motion.div>

            {/* Module grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {APP_MODULES.map((mod, i) => (<ModuleCard key={mod.id} {...mod} delay={0.05 * i}/>))}
            </div>
          </div>

          <div className="h-8"/>
        </div>

        {/* ── Right AI Panel ── */}
        <div className="hidden xl:block w-[300px] shrink-0 border-l border-slate-200 bg-slate-50">
          <div className="sticky top-0 h-[calc(100vh-56px)] overflow-y-auto px-4 py-6 space-y-4">
            <div className="mb-2">
              <p className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-400 mb-1">
                AI Assistant
              </p>
              <h2 className="text-[15px] font-bold text-slate-700">Intelligence Panel</h2>
            </div>
            <AIWidget />
          </div>
        </div>

      </div>
    </div>);
};
