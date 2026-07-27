import { Star, Users, BookOpen } from 'lucide-react';
import type { Instructor } from '../../types/course';

interface InstructorCardProps {
  instructor: Instructor;
}

export const InstructorCard: React.FC<InstructorCardProps> = ({ instructor }) => {
  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 mb-8">
      <div className="flex items-center gap-4">
        <img
          src={instructor.avatarUrl}
          alt={instructor.name}
          className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-md"
        />
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            Course Instructor
          </span>
          <h3 className="text-lg font-black text-slate-900 mt-1">{instructor.name}</h3>
          <p className="text-xs text-slate-500 font-semibold">{instructor.role}</p>
        </div>
      </div>

      <p className="text-xs text-slate-600 font-medium leading-relaxed">
        {instructor.bio}
      </p>

      <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-100 text-center">
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
          <div className="text-[10px] font-bold uppercase text-slate-400">Rating</div>
          <div className="text-xs font-black text-slate-800 flex items-center justify-center gap-1 mt-0.5">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>{instructor.rating}</span>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
          <div className="text-[10px] font-bold uppercase text-slate-400">Learners</div>
          <div className="text-xs font-black text-slate-800 flex items-center justify-center gap-1 mt-0.5">
            <Users className="w-3.5 h-3.5 text-blue-600" />
            <span>{instructor.studentsTaught.toLocaleString()}</span>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
          <div className="text-[10px] font-bold uppercase text-slate-400">Courses</div>
          <div className="text-xs font-black text-slate-800 flex items-center justify-center gap-1 mt-0.5">
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span>{instructor.coursesCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
