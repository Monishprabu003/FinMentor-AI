import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AnswerReviewCard } from '../../components/assessment/AnswerReviewCard';
import { MOCK_ASSESSMENTS, MOCK_ASSESSMENT_RESULT } from '../../mock/assessmentData';
export const AssessmentReviewPage = () => {
    const { assessmentId } = useParams();
    const navigate = useNavigate();
    const assessment = MOCK_ASSESSMENTS.find((a) => a.id === assessmentId) || MOCK_ASSESSMENTS[0];
    const result = MOCK_ASSESSMENT_RESULT;
    return (<div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <button onClick={() => navigate(`/dashboard/learning/assessment/${assessment.id}/result`)} className="flex items-center gap-1.5 text-xs font-extrabold text-zinc-400 hover:text-zinc-200 transition-colors">
          <ArrowLeft className="w-4 h-4"/>
          <span>Back to Result Summary</span>
        </button>

        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div>
            <h1 className="text-2xl font-black text-white">{assessment.title} — Detailed Answer Review</h1>
            <p className="text-xs font-semibold text-zinc-400 mt-1">
              Score: {result.scorePercentage}% · Correct: {result.correctCount}/{result.totalQuestions}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {assessment.questions.map((q) => (<AnswerReviewCard key={q.id} question={q} selectedOptionId={result.userAnswers[q.id]}/>))}
        </div>
      </div>
    </div>);
};
