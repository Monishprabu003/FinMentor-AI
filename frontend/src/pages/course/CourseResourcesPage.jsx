import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, FileSpreadsheet, FileText } from 'lucide-react';
import { LearningLayout } from '../../components/learning/LearningLayout';
export const CourseResourcesPage = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const resources = [
        { title: '50/30/20 Monthly Excel Budget Template', type: 'Excel Spreadsheet', size: '1.2 MB' },
        { title: 'Emergency Fund Calculation Cheat Sheet', type: 'PDF Document', size: '450 KB' },
        { title: 'Tax Deductions Checklist (80C & 80D)', type: 'PDF Document', size: '820 KB' },
    ];
    return (<LearningLayout>
      <div className="max-w-4xl mx-auto space-y-6 pb-12">
        <button onClick={() => navigate(`/dashboard/learning/course/${courseId || 'course-1'}`)} className="flex items-center gap-1.5 text-xs font-extrabold text-slate-500 hover:text-slate-800 transition-colors">
          <ArrowLeft className="w-4 h-4"/>
          <span>Back to Course Overview</span>
        </button>

        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-emerald-600"/>
            <span>Course Downloadable Resources</span>
          </h1>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            Spreadsheets, PDF summaries, and financial planning templates.
          </p>
        </div>

        <div className="space-y-3">
          {resources.map((res, idx) => (<div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5"/>
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">{res.title}</h3>
                  <p className="text-xs text-slate-400 font-medium">{res.type} · {res.size}</p>
                </div>
              </div>

              <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-xs">
                <Download className="w-4 h-4"/> Download
              </button>
            </div>))}
        </div>
      </div>
    </LearningLayout>);
};
