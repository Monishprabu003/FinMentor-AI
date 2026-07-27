import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { LessonNavbar } from '../../components/lesson/LessonNavbar';
import { TableOfContents } from '../../components/lesson/TableOfContents';
import { LessonHeader } from '../../components/lesson/LessonHeader';
import { CalloutBox } from '../../components/lesson/CalloutBox';
import { InteractiveCalculator } from '../../components/lesson/InteractiveCalculator';
import { TakeawayCard } from '../../components/lesson/TakeawayCard';
import { PracticeSection } from '../../components/lesson/PracticeSection';
import { AITutorPanel } from '../../components/lesson/AITutorPanel';
import { NotesPanel } from '../../components/lesson/NotesPanel';
import { DiscussionPanel } from '../../components/lesson/DiscussionPanel';
import { LessonNavigation } from '../../components/lesson/LessonNavigation';
import { CompletionModal } from '../../components/lesson/CompletionModal';

import { MOCK_DETAILED_LESSON, MOCK_FULL_COURSE } from '../../mock/courseData';

export const LessonReaderPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();

  const lesson = MOCK_DETAILED_LESSON;
  const course = MOCK_FULL_COURSE;

  const [isAITutorOpen, setIsAITutorOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(lesson.bookmarked);
  const [isCompleted, setIsCompleted] = useState(lesson.completed);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCompleteLesson = () => {
    setIsCompleted(true);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Fixed Sticky Header */}
      <LessonNavbar
        courseId={courseId || 'course-1'}
        courseTitle={course.title}
        moduleTitle={lesson.moduleTitle}
        progressPercentage={isCompleted ? 100 : lesson.completionPercentage}
        onToggleAITutor={() => {
          setIsAITutorOpen((v) => !v);
          setIsNotesOpen(false);
        }}
        onToggleNotes={() => {
          setIsNotesOpen((v) => !v);
          setIsAITutorOpen(false);
        }}
        isBookmarked={isBookmarked}
        onToggleBookmark={() => setIsBookmarked((v) => !v)}
      />

      {/* Main Notion/Medium/Apple Books Editorial Stage */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 flex justify-between gap-12 relative">
        {/* Sticky Table of Contents Sidebar */}
        <TableOfContents items={lesson.tableOfContents} />

        {/* Center Wide Editorial Reading Column */}
        <article className="flex-1 max-w-3xl min-w-0 mx-auto space-y-8">
          {/* Lesson Title Header */}
          <LessonHeader lesson={lesson} />

          {/* Lead Paragraph */}
          <p className="text-lg md:text-xl text-zinc-300 font-serif leading-relaxed italic border-l-2 border-blue-500 pl-4 py-1">
            "{lesson.leadParagraph}"
          </p>

          {/* Content Sections */}
          <div className="space-y-10 text-sm md:text-base text-zinc-300 leading-relaxed font-normal">
            {lesson.sections.map((section) => (
              <section key={section.id} id={section.id} className="space-y-4 scroll-mt-24">
                <h2 className="text-xl md:text-2xl font-black text-zinc-100 tracking-tight">
                  {section.title}
                </h2>

                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="leading-relaxed text-zinc-300">
                    {p}
                  </p>
                ))}

                {section.callout && (
                  <CalloutBox
                    type={section.callout.type}
                    title={section.callout.title}
                    text={section.callout.text}
                    formulaCode={section.callout.formulaCode}
                  />
                )}
              </section>
            ))}

            {/* Interactive 50/30/20 & SIP Calculator */}
            {lesson.calculatorConfig && (
              <div id="section-5" className="scroll-mt-24">
                <InteractiveCalculator config={lesson.calculatorConfig} />
              </div>
            )}

            {/* Core Lesson Takeaways */}
            <div id="section-6" className="scroll-mt-24">
              <TakeawayCard takeaways={lesson.keyTakeaways} />
            </div>

            {/* Practice Exercises & Knowledge Check */}
            <PracticeSection
              questions={lesson.practiceQuestions}
              onCompletePractice={() => setIsCompleted(true)}
            />

            {/* Community Q&A & Discussion */}
            <DiscussionPanel />

            {/* Next/Prev Navigation & Completion CTA */}
            <LessonNavigation
              courseId={courseId || 'course-1'}
              currentLessonNumber={lesson.lessonNumber}
              totalLessons={lesson.totalLessonsInCourse}
              onCompleteLesson={handleCompleteLesson}
              isCompleted={isCompleted}
            />
          </div>
        </article>
      </div>

      {/* AI Assistant Drawer */}
      <AITutorPanel
        isOpen={isAITutorOpen}
        onClose={() => setIsAITutorOpen(false)}
        lessonTitle={lesson.title}
      />

      {/* Personal Notes Drawer */}
      <NotesPanel
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        lessonTitle={lesson.title}
      />

      {/* Lesson Completion Celebration Modal */}
      <CompletionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        xpEarned={lesson.xpReward}
        courseId={courseId || 'course-1'}
        lessonTitle={lesson.title}
      />
    </div>
  );
};
