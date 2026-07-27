import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

import { AssessmentHeader } from '../../components/assessment/AssessmentHeader';
import { QuestionCard } from '../../components/assessment/QuestionCard';
import { ProgressSidebar } from '../../components/assessment/ProgressSidebar';
import { AIHintPanel } from '../../components/assessment/AIHintPanel';

import { MOCK_ASSESSMENTS } from '../../mock/assessmentData';

export const AssessmentRunnerPage: React.FC = () => {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const navigate = useNavigate();

  const assessment = MOCK_ASSESSMENTS.find((a) => a.id === assessmentId) || MOCK_ASSESSMENTS[0];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(assessment.durationMinutes * 60);
  const [isAIHintOpen, setIsAIHintOpen] = useState(false);

  // Timer countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate(`/dashboard/learning/assessment/${assessment.id}/result`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [assessment.id, navigate]);

  const currentQuestion = assessment.questions[currentIndex] || assessment.questions[0];

  const handleSelectOption = (optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  const handleSubmitExam = () => {
    navigate(`/dashboard/learning/assessment/${assessment.id}/result`);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Assessment Header */}
      <AssessmentHeader
        title={assessment.title}
        currentQuestionIndex={currentIndex}
        totalQuestions={assessment.questions.length}
        timeLeftSeconds={timeLeft}
        xpReward={assessment.xpReward}
        onToggleAIHint={() => setIsAIHintOpen((v) => !v)}
      />

      {/* Main Workspace Stage */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 flex items-start justify-between gap-8 relative">
        {/* Center Question Area */}
        <main className="flex-1 max-w-3xl min-w-0 mx-auto space-y-6">
          <QuestionCard
            question={currentQuestion}
            selectedOptionId={selectedAnswers[currentQuestion.id]}
            onSelectOption={handleSelectOption}
          />

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
            <button
              disabled={currentIndex <= 0}
              onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
              className="px-5 py-2.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 disabled:opacity-40 text-zinc-300 font-extrabold text-xs flex items-center gap-1.5 transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>

            {currentIndex < assessment.questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex((i) => Math.min(assessment.questions.length - 1, i + 1))}
                className="px-6 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs shadow-md shadow-blue-600/20 flex items-center gap-1.5 transition-all"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitExam}
                className="px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow-lg shadow-emerald-600/20 flex items-center gap-1.5 transition-all hover:scale-102 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" /> Submit Exam
              </button>
            )}
          </div>
        </main>

        {/* Right Palette Progress Sidebar */}
        <ProgressSidebar
          questions={assessment.questions}
          currentQuestionIndex={currentIndex}
          selectedAnswers={selectedAnswers}
          onSelectQuestion={(idx) => setCurrentIndex(idx)}
          onSubmitExam={handleSubmitExam}
        />
      </div>

      {/* AI Hint Drawer */}
      <AIHintPanel
        isOpen={isAIHintOpen}
        onClose={() => setIsAIHintOpen(false)}
        question={currentQuestion}
      />
    </div>
  );
};
