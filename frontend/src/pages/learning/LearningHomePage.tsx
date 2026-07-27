import React from 'react';
import { ArrowRight, Compass, GraduationCap, BookOpen, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LearningLayout } from '../../components/learning/LearningLayout';
import { LearningHero } from '../../components/learning/LearningHero';
import { ContinueLearningCard } from '../../components/learning/ContinueLearningCard';
import { AIRecommendationCard } from '../../components/learning/AIRecommendationCard';
import { LearningPathCard } from '../../components/learning/LearningPathCard';
import { CourseCard } from '../../components/learning/CourseCard';
import { BookCard } from '../../components/learning/BookCard';
import { ChallengeCard } from '../../components/learning/ChallengeCard';
import { AchievementsCard } from '../../components/learning/AchievementsCard';
import { LearningAnalytics } from '../../components/learning/LearningAnalytics';

import {
  LEARNING_PATHS,
  POPULAR_COURSES,
  LIBRARY_RESOURCES,
  DAILY_CHALLENGES,
} from '../../constants/learningData';

export const LearningHomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <LearningLayout>
      <div className="max-w-6xl mx-auto space-y-8 pb-12">
        {/* Section 1: Learning Hero */}
        <LearningHero />

        {/* Section 2: Continue Learning Banner */}
        <ContinueLearningCard />

        {/* Section 3: AI Recommendations */}
        <AIRecommendationCard />

        {/* Section 4: Learning Paths (Roadmaps) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <Compass className="w-5 h-5 text-blue-600" />
                <span>Financial Learning Paths</span>
              </h2>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                Structured step-by-step financial roadmaps from foundations to financial independence.
              </p>
            </div>
            <button
              onClick={() => navigate('/dashboard/learning/paths')}
              className="text-xs font-extrabold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
            >
              <span>View All 15 Paths</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LEARNING_PATHS.slice(0, 6).map((path) => (
              <LearningPathCard key={path.id} path={path} />
            ))}
          </div>
        </div>

        {/* Section 5: Popular Courses */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-indigo-600" />
                <span>Featured Interactive Courses</span>
              </h2>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                Deep-dive video lessons, spreadsheets, and practical finance exercises.
              </p>
            </div>
            <button
              onClick={() => navigate('/dashboard/learning/courses')}
              className="text-xs font-extrabold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
            >
              <span>Explore All Courses</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {POPULAR_COURSES.slice(0, 3).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        {/* Section 6: Finance Digital Library */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                <span>Finance Library & Summaries</span>
              </h2>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                Curated book key takeaways, investment guides, and financial templates.
              </p>
            </div>
            <button
              onClick={() => navigate('/dashboard/learning/library')}
              className="text-xs font-extrabold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
            >
              <span>Open Library</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LIBRARY_RESOURCES.slice(0, 3).map((item) => (
              <BookCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Section 7: Daily Quests & Challenges */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500 fill-amber-400" />
                <span>Today's Learning Quests</span>
              </h2>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                Earn XP and Coins by completing daily micro-challenges.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {DAILY_CHALLENGES.map((ch) => (
              <ChallengeCard key={ch.id} challenge={ch} />
            ))}
          </div>
        </div>

        {/* Section 8: Achievements & Badges */}
        <AchievementsCard />

        {/* Section 9: Learning Analytics & Heatmap */}
        <LearningAnalytics />
      </div>
    </LearningLayout>
  );
};
