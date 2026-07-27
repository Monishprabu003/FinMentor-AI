import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, CheckCircle2, XCircle, Zap } from 'lucide-react';
export const PracticeSection = ({ questions, onCompletePractice }) => {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [submitted, setSubmitted] = useState({});
    const handleSelect = (questionId, optionIndex) => {
        if (submitted[questionId])
            return;
        setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    };
    const handleCheck = (questionId) => {
        if (selectedAnswers[questionId] === undefined)
            return;
        setSubmitted((prev) => ({ ...prev, [questionId]: true }));
        if (Object.keys(submitted).length + 1 >= questions.length) {
            onCompletePractice();
        }
    };
    return (<div className="p-6 md:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 text-zinc-100 space-y-6 my-8 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <HelpCircle className="w-5 h-5"/>
          </div>
          <div>
            <h3 className="text-lg font-black tracking-tight">Lesson Knowledge Check</h3>
            <p className="text-xs text-zinc-400 font-medium">Answer mini-exercises to reinforce your understanding & earn XP.</p>
          </div>
        </div>

        <span className="text-xs font-bold text-amber-300 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 fill-amber-300"/> Instant Feedback
        </span>
      </div>

      <div className="space-y-6">
        {questions.map((q, qIdx) => {
            const selected = selectedAnswers[q.id];
            const isSubmitted = submitted[q.id];
            return (<div key={q.id} className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-500">Question {qIdx + 1} of {questions.length}</span>
                <span className="text-xs font-extrabold text-amber-400">+{q.xpReward} XP</span>
              </div>

              <p className="text-sm font-extrabold text-zinc-100 leading-snug">{q.question}</p>

              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                    const isSelected = selected === optIdx;
                    let btnStyle = 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800/80';
                    if (isSubmitted) {
                        if (opt.isCorrect) {
                            btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                        }
                        else if (isSelected && !opt.isCorrect) {
                            btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold';
                        }
                    }
                    else if (isSelected) {
                        btnStyle = 'bg-blue-600/30 border-blue-500 text-white font-bold';
                    }
                    return (<motion.button key={optIdx} whileHover={{ x: isSubmitted ? 0 : 2 }} onClick={() => handleSelect(q.id, optIdx)} className={`w-full p-3.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${btnStyle}`}>
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full border border-zinc-700 flex items-center justify-center text-[10px] font-bold">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt.text}</span>
                      </div>

                      {isSubmitted && opt.isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0"/>}
                      {isSubmitted && isSelected && !opt.isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0"/>}
                    </motion.button>);
                })}
              </div>

              {/* Check Answer Button / Explanation */}
              {!isSubmitted ? (<button disabled={selected === undefined} onClick={() => handleCheck(q.id)} className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${selected !== undefined
                        ? 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer shadow-md'
                        : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'}`}>
                  Validate Answer
                </button>) : (<motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 space-y-1">
                  <p className="font-extrabold text-blue-400">Explanation & Diagnostic:</p>
                  <p className="font-medium text-zinc-300 leading-relaxed">
                    {selected !== undefined && q.options[selected]?.explanation}
                  </p>
                </motion.div>)}
            </div>);
        })}
      </div>
    </div>);
};
