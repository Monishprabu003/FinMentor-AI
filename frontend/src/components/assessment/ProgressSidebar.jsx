import React from 'react';
export const ProgressSidebar = ({ questions, currentQuestionIndex, selectedAnswers, onSelectQuestion, onSubmitExam, }) => {
    const answeredCount = Object.keys(selectedAnswers).length;
    return (<div className="w-64 shrink-0 hidden lg:block space-y-4">
      <div className="p-5 rounded-3xl bg-zinc-900 border border-zinc-800 text-zinc-100 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400">
            Question Palette
          </h4>
          <span className="text-xs font-extrabold text-blue-400">
            {answeredCount}/{questions.length} Answered
          </span>
        </div>

        {/* Question Palette Grid */}
        <div className="grid grid-cols-5 gap-2">
          {questions.map((q, idx) => {
            const isAnswered = !!selectedAnswers[q.id];
            const isCurrent = currentQuestionIndex === idx;
            return (<button key={q.id} onClick={() => onSelectQuestion(idx)} className={`w-9 h-9 rounded-xl font-black text-xs transition-all flex items-center justify-center ${isCurrent
                    ? 'bg-blue-600 text-white ring-2 ring-blue-400 ring-offset-2 ring-offset-zinc-950 shadow-md'
                    : isAnswered
                        ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300'
                        : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:bg-zinc-800'}`}>
                {idx + 1}
              </button>);
        })}
        </div>

        {/* Submit Exam Button */}
        <button onClick={onSubmitExam} className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-blue-600/20 transition-all hover:scale-102 cursor-pointer">
          Submit & Finish Exam
        </button>
      </div>
    </div>);
};
