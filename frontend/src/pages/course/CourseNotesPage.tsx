import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Download } from 'lucide-react';
import { LearningLayout } from '../../components/learning/LearningLayout';

export const CourseNotesPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  const notes = [
    'Always base 50/30/20 calculations on net take-home pay, not gross CTC salary.',
    'Automate the 20% savings transfer on payday to eliminate willpower dependency.',
  ];

  return (
    <LearningLayout>
      <div className="max-w-4xl mx-auto space-y-6 pb-12">
        <button
          onClick={() => navigate(`/dashboard/learning/course/${courseId || 'course-1'}`)}
          className="flex items-center gap-1.5 text-xs font-extrabold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Course Overview</span>
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <FileText className="w-6 h-6 text-indigo-600" />
              <span>Personal Saved Notes</span>
            </h1>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              Your personal study notes and highlights from this course.
            </p>
          </div>
          <button className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs flex items-center gap-1.5">
            <Download className="w-4 h-4" /> Export Notes
          </button>
        </div>

        <div className="space-y-3">
          {notes.map((n, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
              <span className="text-[10px] font-bold text-slate-400">Note #{idx + 1}</span>
              <p className="text-xs font-semibold text-slate-800 leading-relaxed">{n}</p>
            </div>
          ))}
        </div>
      </div>
    </LearningLayout>
  );
};
