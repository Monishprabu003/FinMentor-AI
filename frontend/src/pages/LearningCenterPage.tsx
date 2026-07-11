import React, { useEffect, useState } from 'react';
import { GraduationCap, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { api } from '../services/api';
import type { LearningModule } from '../types';
import { useNavigate } from 'react-router-dom';

export const LearningCenterPage: React.FC = () => {
  const [modules, setModules] = useState<LearningModule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const navigate = useNavigate();

  const fetchModules = async () => {
    setLoading(true);
    try {
      const res = await api.get('/learn/modules');
      setModules(res.data);
      if (res.data.length > 0 && !selectedModule) {
        setSelectedModule(res.data[0]);
      }
    } catch (err) {
      console.error('Error fetching learning modules:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const handleCompleteModule = async (moduleId: string) => {
    try {
      await api.post('/learn/modules/complete', { module_id: moduleId, score: 100 });
      setModules((prev) =>
        prev.map((m) => (m.id === moduleId ? { ...m, completed: true } : m))
      );
      if (selectedModule && selectedModule.id === moduleId) {
        setSelectedModule({ ...selectedModule, completed: true });
      }
    } catch (err) {
      console.error('Error marking module completed:', err);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Financial Literacy Academy</h1>
          <p className="text-xs text-slate-400">
            Structured bite-sized modules teaching budgeting, emergency funds, ETFs, and taxes
          </p>
        </div>
        <button
          onClick={() => navigate('/ai')}
          className="px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ask AI Tutor to Explain a Lesson</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module List */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            Curriculum Modules
          </div>

          {loading ? (
            <div className="p-6 text-slate-400 text-sm">Loading curriculum...</div>
          ) : (
            modules.map((m) => (
              <div
                key={m.id}
                onClick={() => setSelectedModule(m)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                  selectedModule?.id === m.id
                    ? 'bg-slate-800/90 border-emerald-500/50 shadow-md'
                    : 'glass-card'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-emerald-400 border border-slate-700">
                    {m.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{m.duration_minutes}m</span>
                    {m.completed && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-1" />
                    )}
                  </div>
                </div>

                <div className="font-bold text-white text-sm">{m.title}</div>
                <div className="text-xs text-slate-400 mt-1 line-clamp-2">{m.summary}</div>
              </div>
            ))
          )}
        </div>

        {/* Selected Module Reader View */}
        <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          {selectedModule ? (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-emerald-400">{selectedModule.category}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-slate-400">{selectedModule.level}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">{selectedModule.title}</h2>
                </div>

                <button
                  onClick={() => handleCompleteModule(selectedModule.id)}
                  disabled={selectedModule.completed}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                    selectedModule.completed
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                      : 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow-glow-emerald hover:opacity-90'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{selectedModule.completed ? 'Lesson Completed' : 'Mark Lesson Completed'}</span>
                </button>
              </div>

              {/* Markdown content area */}
              <div className="prose prose-invert max-w-none space-y-4 text-sm text-slate-300 leading-relaxed">
                {selectedModule.content.split('\n\n').map((para, i) => {
                  if (para.startsWith('### ')) {
                    return (
                      <h3 key={i} className="text-lg font-bold text-white pt-2">
                        {para.replace('### ', '')}
                      </h3>
                    );
                  }
                  return <p key={i}>{para}</p>;
                })}
              </div>

              {/* Actionable Takeaways Checklist */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4" />
                  <span>Key Actionable Student Takeaways</span>
                </div>
                <ul className="space-y-2">
                  {selectedModule.takeaways.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="p-12 text-center text-slate-400 text-sm">
              Select a module from the sidebar curriculum to start learning.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
