import React from 'react';
import { History, Pin, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AILayout } from '../../components/ai/AILayout';
import { MOCK_CONVERSATIONS } from '../../mock/aiData';
export const AIHistoryPage = () => {
    const navigate = useNavigate();
    return (<AILayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <History className="w-6 h-6 text-blue-600"/>
            <span>AI Conversation History</span>
          </h1>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            Access past financial mentoring threads, pinned advice, and custom strategies.
          </p>
        </div>

        <div className="space-y-3">
          {MOCK_CONVERSATIONS.map((conv) => (<div key={conv.id} onClick={() => navigate('/dashboard/ai/chat')} className="p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {conv.category}
                  </span>
                  {conv.pinned && (<span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Pin className="w-3 h-3 fill-amber-500 text-amber-500"/> Pinned Strategy
                    </span>)}
                </div>
                <h3 className="text-base font-black text-slate-900">{conv.title}</h3>
                <p className="text-xs text-slate-500 font-medium">{conv.lastMessage}</p>
              </div>

              <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                <span>{conv.timestamp}</span>
                <ArrowRight className="w-4 h-4 text-blue-600"/>
              </div>
            </div>))}
        </div>
      </div>
    </AILayout>);
};
