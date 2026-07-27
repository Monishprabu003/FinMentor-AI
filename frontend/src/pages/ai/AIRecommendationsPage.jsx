import React from 'react';
import { Compass } from 'lucide-react';
import { AILayout } from '../../components/ai/AILayout';
import { RecommendationCard } from '../../components/ai/RecommendationCard';
import { MOCK_RECOMMENDATIONS } from '../../mock/aiData';
export const AIRecommendationsPage = () => {
    return (<AILayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Compass className="w-6 h-6 text-indigo-600"/>
            <span>AI Smart Recommendations</span>
          </h1>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            Personalized lessons, books, and diagnostic assessments curated specifically for your learning profile.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_RECOMMENDATIONS.map((rec) => (<RecommendationCard key={rec.id} rec={rec}/>))}
        </div>
      </div>
    </AILayout>);
};
