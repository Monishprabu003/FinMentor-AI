import { Sparkles, ShieldAlert, Target } from 'lucide-react';
import type { FullCourse } from '../../types/course';

interface CourseInfoCardProps {
  course: FullCourse;
}

export const CourseInfoCard: React.FC<CourseInfoCardProps> = ({ course }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Why This Course Matters */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-600">
          <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
          <span>Why This Course Matters</span>
        </div>
        <h3 className="text-lg font-black text-slate-900 leading-snug">
          Engineered for Real-World Impact
        </h3>
        <p className="text-xs text-slate-600 font-medium leading-relaxed">
          {course.whyItMatters}
        </p>
      </div>

      {/* Target Audience & Prerequisites */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-indigo-600 mb-1.5">
            <Target className="w-4 h-4" />
            <span>Target Audience</span>
          </div>
          <ul className="space-y-1 text-xs text-slate-600 font-medium">
            {course.targetAudience.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400 mb-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
            <span>Prerequisites</span>
          </div>
          <ul className="space-y-1 text-xs text-slate-500 font-medium">
            {course.prerequisites.map((req, idx) => (
              <li key={idx}>• {req}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
