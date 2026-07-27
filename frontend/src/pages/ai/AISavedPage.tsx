import React from 'react';
import { Bookmark } from 'lucide-react';
import { AILayout } from '../../components/ai/AILayout';
import { MessageBubble } from '../../components/ai/MessageBubble';
import { MOCK_CONVERSATIONS } from '../../mock/aiData';

export const AISavedPage: React.FC = () => {
  const savedMessages = MOCK_CONVERSATIONS.flatMap((c) => c.messages).filter(
    (m) => m.sender === 'ai'
  );

  return (
    <AILayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-amber-500 fill-amber-400" />
            <span>Saved AI Explanations & Notes</span>
          </h1>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            Bookmarked financial formulas, salary allocation tables, and tax guidance.
          </p>
        </div>

        <div className="space-y-4">
          {savedMessages.map((m) => (
            <MessageBubble key={m.id} message={{ ...m, bookmarked: true }} />
          ))}
        </div>
      </div>
    </AILayout>
  );
};
