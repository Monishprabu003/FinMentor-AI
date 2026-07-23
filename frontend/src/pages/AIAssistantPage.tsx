import React, { useState, useEffect } from 'react';
import { Bot, Send, ShieldCheck, Sparkles, User as UserIcon } from 'lucide-react';
import { api } from '../services/api';
import type { SpendingInsight, ConceptExplanation } from '../types';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export const AIAssistantPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'explain' | 'insights'>('chat');

  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: "Hello! I am **FinMentor AI**, your dedicated personal finance educational tutor. Ask me any question about budgeting, ETFs, index funds, taxes, or compound interest!"
    }
  ]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([
    "Explain the difference between an ETF and a mutual fund",
    "How large should my emergency fund be?",
    "How does the 50/30/20 budgeting framework work?"
  ]);
  const [loadingChat, setLoadingChat] = useState<boolean>(false);

  // Concept Explainer state
  const [conceptInput, setConceptInput] = useState<string>('ETF (Exchange-Traded Fund)');
  const [conceptResult, setConceptResult] = useState<ConceptExplanation | null>(null);
  const [loadingConcept, setLoadingConcept] = useState<boolean>(false);

  // Insights state
  const [insights, setInsights] = useState<SpendingInsight[]>([]);
  const [loadingInsights, setLoadingInsights] = useState<boolean>(false);

  useEffect(() => {
    if (activeTab === 'insights') {
      const fetchInsights = async () => {
        setLoadingInsights(true);
        try {
          const res = await api.get('/ai/insights');
          setInsights(res.data.insights || []);
        } catch (err) {
          console.error('Error fetching AI insights:', err);
        } finally {
          setLoadingInsights(false);
        }
      };
      fetchInsights();
    }
  }, [activeTab]);

  const handleSendMessage = async (msgText?: string) => {
    const textToSend = msgText || inputMessage;
    if (!textToSend.trim()) return;

    const newMessages: ChatMessage[] = [...messages, { sender: 'user', text: textToSend }];
    setMessages(newMessages);
    if (!msgText) setInputMessage('');
    setLoadingChat(true);

    try {
      const res = await api.post('/ai/chat', { message: textToSend });
      setMessages([...newMessages, { sender: 'ai', text: res.data.reply }]);
      if (res.data.suggested_questions) {
        setSuggestedQuestions(res.data.suggested_questions);
      }
    } catch (err) {
      console.error('Error sending message to AI:', err);
      setMessages([
        ...newMessages,
        {
          sender: 'ai',
          text: "I'm having trouble connecting right now, but remember: your core financial tracking and calculations remain fully accessible on the dashboard!"
        }
      ]);
    } finally {
      setLoadingChat(false);
    }
  };

  const handleExplainConcept = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!conceptInput.trim()) return;
    setLoadingConcept(true);
    try {
      const res = await api.post('/ai/explain-concept', { concept: conceptInput });
      setConceptResult(res.data);
    } catch (err) {
      console.error('Error explaining concept:', err);
    } finally {
      setLoadingConcept(false);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">FinMentor AI Studio</h1>
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200 uppercase tracking-wider">
              Google Gemini Powered
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            Strict educational mandate: explains financial literacy concepts without handling raw calculations
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'chat'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            AI Chat Tutor
          </button>
          <button
            onClick={() => setActiveTab('explain')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'explain'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Concept Explainer (ELI5)
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'insights'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Spending Insights
          </button>
        </div>
      </div>

      {/* Tab 1: AI Chat Tutor */}
      {activeTab === 'chat' && (
        <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] border border-slate-200/80 shadow-xl shadow-slate-200/40 flex flex-col h-[640px] overflow-hidden">
          {/* Messages display */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-4">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3.5 ${
                  m.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {m.sender === 'ai' && (
                  <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-blue-600/20">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}

                <div
                  className={`max-w-xl p-5 rounded-2xl text-sm leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white font-medium rounded-tr-none shadow-md shadow-blue-600/15'
                      : 'bg-slate-50 border border-slate-100 text-slate-800 rounded-tl-none space-y-2'
                  }`}
                >
                  {m.text.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            ))}

            {loadingChat && (
              <div className="flex items-center gap-3 text-slate-500 text-xs font-semibold">
                <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center animate-pulse">
                  <Bot className="w-4 h-4 text-blue-600" />
                </div>
                <span>FinMentor AI is preparing your educational explanation...</span>
              </div>
            )}
          </div>

          {/* Suggested Questions Bar */}
          <div className="px-6 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2 overflow-x-auto">
            <span className="text-[11px] text-slate-400 shrink-0 font-bold uppercase tracking-wider">Try asking:</span>
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="px-3.5 py-1.5 rounded-full bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-slate-700 hover:text-blue-600 text-xs font-medium shrink-0 transition-all shadow-2xs"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 sm:p-5 bg-white border-t border-slate-100">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                placeholder="Ask any personal finance question (e.g. ETFs, taxes, emergency funds)..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
              <button
                type="submit"
                disabled={loadingChat || !inputMessage.trim()}
                className="p-3.5 rounded-2xl bg-blue-600 text-white disabled:opacity-40 hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab 2: Concept Explainer (ELI5) */}
      {activeTab === 'explain' && (
        <div className="bg-white/90 backdrop-blur-xl p-8 sm:p-10 rounded-[2rem] border border-slate-200/80 shadow-xl shadow-slate-200/40 space-y-8">
          <div className="max-w-xl">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">ELI5 Financial Concept Demystifier</h3>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              Type any financial term to get an intuitive explanation tailored to young professionals.
            </p>
          </div>

          <form onSubmit={handleExplainConcept} className="flex gap-3 max-w-xl">
            <input
              type="text"
              value={conceptInput}
              onChange={(e) => setConceptInput(e.target.value)}
              placeholder="e.g. Compound Interest, Expense Ratio, Asset vs Liability"
              className="flex-1 px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
            />
            <button
              type="submit"
              disabled={loadingConcept}
              className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all"
            >
              {loadingConcept ? 'Explaining...' : 'Explain'}
            </button>
          </form>

          {conceptResult && (
            <div className="p-7 rounded-[1.75rem] bg-slate-50 border border-slate-200/80 space-y-5 max-w-3xl">
              <div className="flex items-center justify-between">
                <h4 className="text-2xl font-black text-blue-600">{conceptResult.concept}</h4>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                  Simple Explanation
                </span>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  How It Works
                </div>
                <p className="text-sm text-slate-700 font-medium leading-relaxed">
                  {conceptResult.simple_explanation}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                  Real-World Student Example
                </div>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  {conceptResult.real_world_example}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-100/60 border border-blue-200/80">
                <div className="text-xs font-black text-blue-700 uppercase tracking-wider mb-1">
                  Key Actionable Takeaway
                </div>
                <p className="text-sm text-blue-900 font-bold">
                  {conceptResult.key_takeaway}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Spending Insights */}
      {activeTab === 'insights' && (
        <div className="space-y-6">
          <div className="bg-white/90 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] border border-slate-200/80 shadow-xl shadow-slate-200/40 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">AI Habit Coach & Spending Analysis</h3>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                Interprets your deterministic backend metrics into constructive financial habits
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-blue-600 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Deterministic Math Based</span>
            </div>
          </div>

          {loadingInsights ? (
            <div className="p-12 text-center text-slate-500 font-semibold text-sm">Analyzing spending habits...</div>
          ) : insights.length === 0 ? (
            <div className="p-12 text-center text-slate-400 font-semibold text-sm">
              Log transactions to unlock AI spending habits coaching.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {insights.map((ins, idx) => (
                <div
                  key={idx}
                  className="bg-white/90 backdrop-blur-xl p-6 rounded-[1.75rem] border border-slate-200/80 shadow-xl shadow-slate-200/40 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 uppercase tracking-wider">
                      {ins.type}
                    </span>
                  </div>
                  <h4 className="font-black text-slate-900 text-base">{ins.title}</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">{ins.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
