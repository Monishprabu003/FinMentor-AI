import React, { useEffect, useState } from 'react';
import { GraduationCap, CheckCircle2, Clock, Sparkles, BookOpen } from 'lucide-react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
export const LearningCenterPage = () => {
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedModule, setSelectedModule] = useState(null);
    const navigate = useNavigate();
    const fetchModules = async () => {
        setLoading(true);
        try {
            const res = await api.get('/learn/modules');
            setModules(res.data);
            if (res.data.length > 0 && !selectedModule) {
                setSelectedModule(res.data[0]);
            }
        }
        catch (err) {
            console.error('Error fetching learning modules:', err);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchModules();
    }, []);
    const handleCompleteModule = async (moduleId) => {
        try {
            await api.post('/learn/modules/complete', { module_id: moduleId, score: 100 });
            setModules((prev) => prev.map((m) => (m.id === moduleId ? { ...m, completed: true } : m)));
            if (selectedModule && selectedModule.id === moduleId) {
                setSelectedModule({ ...selectedModule, completed: true });
            }
        }
        catch (err) {
            console.error('Error marking module completed:', err);
        }
    };
    return (<div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Financial Literacy Academy</h1>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            Structured bite-sized modules teaching budgeting, emergency funds, ETFs, and taxes
          </p>
        </div>
        <button onClick={() => navigate('/ai')} className="px-4 py-2.5 rounded-2xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-600 text-xs font-bold flex items-center gap-2 transition-all shadow-xs">
          <Sparkles className="w-4 h-4 text-blue-600"/>
          <span>Ask AI Tutor to Explain a Lesson</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module List */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            Curriculum Modules
          </div>

          {loading ? (<div className="p-6 text-slate-400 text-sm font-medium">Loading curriculum...</div>) : (modules.map((m) => (<div key={m.id} onClick={() => setSelectedModule(m)} className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 ${selectedModule?.id === m.id
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20'
                : 'bg-white/90 backdrop-blur-xl border-slate-200/80 hover:border-blue-300 shadow-sm hover:shadow-md'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${selectedModule?.id === m.id
                ? 'bg-white/20 text-white'
                : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                    {m.category}
                  </span>
                  <div className={`flex items-center gap-1.5 text-xs font-bold ${selectedModule?.id === m.id ? 'text-blue-100' : 'text-slate-400'}`}>
                    <Clock className="w-3.5 h-3.5"/>
                    <span>{m.duration_minutes}m</span>
                    {m.completed && (<CheckCircle2 className={`w-4 h-4 ml-1 ${selectedModule?.id === m.id ? 'text-white' : 'text-emerald-500'}`}/>)}
                  </div>
                </div>

                <div className={`font-black text-base ${selectedModule?.id === m.id ? 'text-white' : 'text-slate-900'}`}>
                  {m.title}
                </div>
                <div className={`text-xs mt-1.5 line-clamp-2 leading-relaxed font-medium ${selectedModule?.id === m.id ? 'text-blue-100' : 'text-slate-500'}`}>
                  {m.summary}
                </div>
              </div>)))}
        </div>

        {/* Selected Module Reader View */}
        <div className="lg:col-span-2 bg-white/90 backdrop-blur-xl p-6 sm:p-10 rounded-[2rem] border border-slate-200/80 shadow-xl shadow-slate-200/40 space-y-6">
          {selectedModule ? (<>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{selectedModule.category}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">{selectedModule.level}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{selectedModule.title}</h2>
                </div>

                <button onClick={() => handleCompleteModule(selectedModule.id)} disabled={selectedModule.completed} className={`px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all ${selectedModule.completed
                ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 cursor-default'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30'}`}>
                  <CheckCircle2 className="w-4 h-4"/>
                  <span>{selectedModule.completed ? 'Lesson Completed' : 'Mark Lesson Completed'}</span>
                </button>
              </div>

              {/* Lesson area */}
              <div className="space-y-4 text-sm text-slate-700 leading-relaxed font-medium">
                {selectedModule.content.split('\n\n').map((para, i) => {
                if (para.startsWith('### ')) {
                    return (<h3 key={i} className="text-xl font-black text-slate-900 pt-4 tracking-tight">
                        {para.replace('### ', '')}
                      </h3>);
                }
                return <p key={i} className="text-slate-600 text-[15px] leading-relaxed">{para}</p>;
            })}
              </div>

              {/* Actionable Takeaways Checklist */}
              <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-3">
                <div className="flex items-center gap-2 text-xs font-black text-blue-700 uppercase tracking-wider">
                  <GraduationCap className="w-4.5 h-4.5 text-blue-600"/>
                  <span>Key Actionable Student Takeaways</span>
                </div>
                <ul className="space-y-2.5">
                  {selectedModule.takeaways.map((item, idx) => (<li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 font-medium">
                      <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600"/>
                      </div>
                      <span>{item}</span>
                    </li>))}
                </ul>
              </div>
            </>) : (<div className="p-16 text-center space-y-3">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto"/>
              <div className="text-slate-600 font-bold text-base">Select a module</div>
              <p className="text-xs text-slate-400">Choose a curriculum topic from the left menu to start reading.</p>
            </div>)}
        </div>
      </div>
    </div>);
};
