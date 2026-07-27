import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, PlayCircle, CheckCircle2, Star, Sparkles } from 'lucide-react';
import { LearningLayout } from '../../components/learning/LearningLayout';
import { POPULAR_COURSES } from '../../constants/learningData';
export const CourseDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const course = POPULAR_COURSES.find((c) => c.id === id) || POPULAR_COURSES[0];
    const [activeLesson, setActiveLesson] = useState('l1');
    return (<LearningLayout>
      <div className="max-w-5xl mx-auto space-y-6 pb-12">
        <button onClick={() => navigate('/dashboard/learning/courses')} className="flex items-center gap-1.5 text-xs font-extrabold text-slate-500 hover:text-slate-800 transition-colors">
          <ArrowLeft className="w-4 h-4"/>
          <span>Back to All Courses</span>
        </button>

        {/* Course Banner */}
        <div className={`p-6 md:p-8 rounded-3xl bg-gradient-to-br ${course.thumbnailGradient} text-white shadow-xl space-y-4`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-black/30 backdrop-blur-md">
              {course.category}
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-300">
              <Star className="w-4 h-4 fill-amber-300"/>
              <span>{course.rating}</span>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-black tracking-tight">{course.title}</h1>
          <p className="text-sm text-slate-100 font-medium leading-relaxed max-w-2xl">{course.description}</p>

          <div className="flex items-center gap-4 text-xs font-bold text-slate-200 pt-2 border-t border-white/20">
            <span>Difficulty: {course.difficulty}</span>
            <span>Duration: {course.durationHours} hrs</span>
            <span>Lessons: {course.lessonsCount}</span>
          </div>
        </div>

        {/* Course Interactive Player Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Video/Content Player Window */}
          <div className="lg:col-span-2 space-y-4">
            <div className="aspect-video rounded-3xl bg-slate-900 border border-slate-800 text-white flex flex-col items-center justify-center p-8 text-center relative overflow-hidden shadow-lg">
              <div className="w-16 h-16 rounded-full bg-blue-600/90 flex items-center justify-center mb-3 shadow-lg shadow-blue-600/30 cursor-pointer hover:scale-105 transition-transform">
                <PlayCircle className="w-8 h-8 text-white fill-white"/>
              </div>
              <h3 className="text-lg font-black tracking-tight">Lesson Video Player Studio</h3>
              <p className="text-xs text-slate-400 max-w-sm mt-1">
                Interactive lesson video with deterministic calculations and automated financial models.
              </p>
            </div>

            {/* Lesson Takeaways */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600"/>
                <span>Key Lesson Takeaways</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0"/>
                  <span>Needs (50%): Rent, Utilities, Basic Groceries, Loan Minimum Payments.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0"/>
                  <span>Wants (30%): Dining Out, Subscriptions, Entertainment, Travel.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0"/>
                  <span>Savings (20%): Index Funds, Emergency Fund, Retirement Buckets.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Module Syllabus Sidebar */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              Course Syllabus
            </h3>

            <div className="space-y-3">
              {course.modules && course.modules.length > 0 ? (course.modules.map((m) => (<div key={m.id} className="space-y-2">
                    <p className="text-xs font-black uppercase text-slate-400 tracking-wider">
                      {m.title}
                    </p>
                    {m.lessons.map((les) => (<button key={les.id} onClick={() => setActiveLesson(les.id)} className={`w-full p-3 rounded-xl border text-left flex items-center justify-between text-xs font-bold transition-all ${activeLesson === les.id
                    ? 'bg-blue-50 border-blue-300 text-blue-900 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}`}>
                        <div className="flex items-center gap-2">
                          {les.completed ? (<CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0"/>) : (<PlayCircle className="w-4 h-4 text-blue-600 shrink-0"/>)}
                          <span className="line-clamp-1">{les.title}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">{les.durationMinutes}m</span>
                      </button>))}
                  </div>))) : (<div className="text-xs text-slate-500 font-medium">
                  Syllabus modules loaded for this course.
                </div>)}
            </div>
          </div>
        </div>
      </div>
    </LearningLayout>);
};
