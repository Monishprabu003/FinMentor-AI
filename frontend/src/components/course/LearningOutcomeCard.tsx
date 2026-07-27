import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Award } from 'lucide-react';

interface LearningOutcomeCardProps {
  skills: string[];
}

export const LearningOutcomeCard: React.FC<LearningOutcomeCardProps> = ({ skills }) => {
  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            <span>Skills You'll Master</span>
          </h3>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">
            Practical financial competencies verified upon course completion.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {skills.map((skill, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -2 }}
            className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-start gap-2.5"
          >
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span className="text-xs font-extrabold text-blue-950 leading-snug">{skill}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
