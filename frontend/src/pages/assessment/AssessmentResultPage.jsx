import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ResultCard } from '../../components/assessment/ResultCard';
import { LevelUpModal } from '../../components/assessment/LevelUpModal';
import { MOCK_ASSESSMENT_RESULT } from '../../mock/assessmentData';
export const AssessmentResultPage = () => {
    const navigate = useNavigate();
    const result = MOCK_ASSESSMENT_RESULT;
    const [isLevelModalOpen, setIsLevelModalOpen] = useState(true); // Open modal on completion!
    return (<div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <button onClick={() => navigate('/dashboard/learning/assessment')} className="flex items-center gap-1.5 text-xs font-extrabold text-zinc-400 hover:text-zinc-200 transition-colors">
          <ArrowLeft className="w-4 h-4"/>
          <span>Back to Assessment Hub</span>
        </button>

        <ResultCard result={result} onOpenLevelModal={() => setIsLevelModalOpen(true)}/>
      </div>

      {/* Level Up Celebration Modal */}
      {result.newLevelUnlocked && (<LevelUpModal isOpen={isLevelModalOpen} onClose={() => setIsLevelModalOpen(false)} newLevel={result.newLevelUnlocked.level} levelTitle={result.newLevelUnlocked.title} badgesUnlocked={result.badgesUnlocked}/>)}
    </div>);
};
