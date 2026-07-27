import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import { LearningLayout } from '../../components/learning/LearningLayout';
import { ReviewsSection } from '../../components/course/ReviewsSection';
import { MOCK_FULL_COURSE } from '../../mock/courseData';
export const CourseReviewsPage = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    return (<LearningLayout>
      <div className="max-w-4xl mx-auto space-y-6 pb-12">
        <button onClick={() => navigate(`/dashboard/learning/course/${courseId || 'course-1'}`)} className="flex items-center gap-1.5 text-xs font-extrabold text-slate-500 hover:text-slate-800 transition-colors">
          <ArrowLeft className="w-4 h-4"/>
          <span>Back to Course Overview</span>
        </button>

        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Star className="w-6 h-6 text-amber-500 fill-amber-400"/>
            <span>Student Reviews & Feedback</span>
          </h1>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            See what thousands of learners are saying about this course.
          </p>
        </div>

        <ReviewsSection rating={MOCK_FULL_COURSE.rating} ratingCount={MOCK_FULL_COURSE.ratingCount} reviews={MOCK_FULL_COURSE.reviews}/>
      </div>
    </LearningLayout>);
};
