import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { LearningLayout } from '../../components/learning/LearningLayout';
import { CourseHero } from '../../components/course/CourseHero';
import { CourseInfoCard } from '../../components/course/CourseInfoCard';
import { LearningOutcomeCard } from '../../components/course/LearningOutcomeCard';
import { CurriculumAccordion } from '../../components/course/CurriculumAccordion';
import { InstructorCard } from '../../components/course/InstructorCard';
import { ReviewsSection } from '../../components/course/ReviewsSection';
import { MOCK_FULL_COURSE } from '../../mock/courseData';
export const CourseOverviewPage = () => {
    const navigate = useNavigate();
    const course = MOCK_FULL_COURSE;
    return (<LearningLayout>
      <div className="max-w-5xl mx-auto space-y-6 pb-12">
        {/* Navigation Breadcrumb */}
        <button onClick={() => navigate('/dashboard/learning/courses')} className="flex items-center gap-1.5 text-xs font-extrabold text-slate-500 hover:text-slate-800 transition-colors">
          <ArrowLeft className="w-4 h-4"/>
          <span>Back to All Courses</span>
        </button>

        {/* 1. Course Hero */}
        <CourseHero course={course}/>

        {/* 2. Course Information (Why it matters, prerequisites, target audience) */}
        <CourseInfoCard course={course}/>

        {/* 3. Learning Outcomes / Skills Mastered */}
        <LearningOutcomeCard skills={course.skillsGained}/>

        {/* 4. Course Curriculum Accordion */}
        <CurriculumAccordion courseId={course.id} modules={course.modules}/>

        {/* 5. Instructor Bio Card */}
        <InstructorCard instructor={course.instructor}/>

        {/* 6. Student Reviews & Ratings */}
        <ReviewsSection rating={course.rating} ratingCount={course.ratingCount} reviews={course.reviews}/>
      </div>
    </LearningLayout>);
};
