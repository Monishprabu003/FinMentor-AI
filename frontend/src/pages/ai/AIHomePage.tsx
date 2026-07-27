import React from 'react';
import { Sparkles, MessageSquare, Compass, ArrowRight, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { AILayout } from '../../components/ai/AILayout';
import { AIHero } from '../../components/ai/AIHero';
import { InsightCard } from '../../components/ai/InsightCard';
import { RecommendationCard } from '../../components/ai/RecommendationCard';
import { QuickActionCard } from '../../components/ai/QuickActionCard';

import {
  MOCK_RECOMMENDATIONS,
  MOCK_AI_INSIGHTS,
  MOCK_CONVERSATIONS,
} from '../../mock/aiData';

export const AIHomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AILayout>
      <div className="space-y-8">
        {/* AI Hero Greeting */}
        <AIHero />

        {/* Quick Actions Grid */}
        <div className="space-y-3">
          <h2 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>AI Coach Quick Actions</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <QuickActionCard
              title="50/30/20 Salary Breakdown"
              subtitle="Calculate Needs, Wants & Wealth targets"
              icon="pie"
              onClick={() => navigate('/dashboard/ai/chat')}
            />
            <QuickActionCard
              title="SIP vs Fixed Deposit"
              subtitle="Compare returns over 10 years"
              icon="chart"
              onClick={() => navigate('/dashboard/ai/chat')}
            />
            <QuickActionCard
              title="Emergency Buffer Tool"
              subtitle="Determine 6-month safety reserve"
              icon="calc"
              onClick={() => navigate('/dashboard/ai/chat')}
            />
            <QuickActionCard
              title="Quiz Me on Budgeting"
              subtitle="Test your cash flow knowledge"
              icon="help"
              onClick={() => navigate('/dashboard/learning/assessment')}
            />
          </div>
        </div>

        {/* Personal Learning Insights */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Brain className="w-4 h-4 text-blue-600" />
              <span>Personalized Diagnostic Insights</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {MOCK_AI_INSIGHTS.map((ins) => (
              <InsightCard key={ins.id} insight={ins} />
            ))}
          </div>
        </div>

        {/* Smart Recommendations */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-600" />
              <span>AI Smart Recommendations</span>
            </h2>
            <button
              onClick={() => navigate('/dashboard/ai/recommendations')}
              className="text-xs font-extrabold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_RECOMMENDATIONS.map((rec) => (
              <RecommendationCard key={rec.id} rec={rec} />
            ))}
          </div>
        </div>

        {/* Recent Conversations */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-slate-700" />
              <span>Recent AI Chats</span>
            </h2>
            <button
              onClick={() => navigate('/dashboard/ai/history')}
              className="text-xs font-extrabold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View History</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {MOCK_CONVERSATIONS.map((conv) => (
              <div
                key={conv.id}
                onClick={() => navigate('/dashboard/ai/chat')}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-black text-slate-900">{conv.title}</h4>
                  <p className="text-[11px] text-slate-500 font-medium line-clamp-1 mt-0.5">
                    {conv.lastMessage}
                  </p>
                </div>
                <span className="text-[10px] font-bold text-slate-400 shrink-0 ml-2">{conv.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AILayout>
  );
};
