import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, PlayCircle, Award, Clock, BookOpen } from 'lucide-react';
import { LearningLayout } from '../../components/learning/LearningLayout';
import { LEARNING_PATHS } from '../../constants/learningData';

export const PathDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const path = LEARNING_PATHS.find((p) => p.id === id) || LEARNING_PATHS[1];

  return (
    <LearningLayout>
      <div className="max-w-4xl mx-auto space-y-6 pb-12">
        <button
          onClick={() => navigate('/dashboard/learning/paths')}
          className="flex items-center gap-1.5 text-xs font-extrabold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Learning Paths</span>
        </button>

        {/* Path Header Banner */}
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
              {path.category} Roadmap
            </span>
            {path.hasCertificate && (
              <span className="text-xs font-bold text-amber-300 bg-amber-400/20 border border-amber-400/30 px-3 py-1 rounded-full flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> Certificate Verified
              </span>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl font-black tracking-tight">{path.title}</h1>
          <p className="text-sm text-slate-300 leading-relaxed font-medium">{path.description}</p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-300 pt-2 border-t border-white/10">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-blue-400" /> {path.durationHours} Hours Total
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4 text-indigo-400" /> {path.lessonsCount} Interactive Lessons
            </span>
            <span className="text-emerald-400">{path.completionPercentage}% Completed</span>
          </div>
        </div>

        {/* Step-by-step Roadmap Milestones Timeline */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-lg font-black text-slate-900 tracking-tight">
            Roadmap Milestones & Lessons
          </h2>

          <div className="space-y-4">
            {path.milestones && path.milestones.length > 0 ? (
              path.milestones.map((node, i) => (
                <div
                  key={node.id}
                  className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                    node.completed
                      ? 'bg-emerald-50/50 border-emerald-200'
                      : 'bg-white border-slate-200 hover:border-blue-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                        node.completed
                          ? 'bg-emerald-500 text-white'
                          : 'bg-blue-100 text-blue-600'
                      }`}
                    >
                      {node.completed ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900">{node.title}</h3>
                      <p className="text-xs text-slate-500 font-medium capitalize">
                        {node.type} · {node.durationMinutes} mins
                      </p>
                    </div>
                  </div>

                  <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-xs">
                    <PlayCircle className="w-4 h-4" />
                    <span>{node.completed ? 'Review' : 'Start'}</span>
                  </button>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-500 font-medium">
                Standard milestone sequence loading for this roadmap...
              </div>
            )}
          </div>
        </div>
      </div>
    </LearningLayout>
  );
};
