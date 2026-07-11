import React, { useState, useEffect } from 'react';
import { Bot, Send, ShieldCheck } from 'lucide-react';
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
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white">FinMentor AI Studio</h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Google Gemini Powered
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Strict educational mandate: explains financial literacy concepts without handling raw calculations
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'chat'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            AI Chat Tutor
          </button>
          <button
            onClick={() => setActiveTab('explain')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'explain'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Concept Explainer (ELI5)
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'insights'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Spending Insights
          </button>
        </div>
      </div>

      {/* Tab 1: AI Chat Tutor */}
      {activeTab === 'chat' && (
        <div className="glass-panel rounded-3xl border border-slate-800 flex flex-col h-[640px] overflow-hidden">
          {/* Messages display */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${
                  m.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {m.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-slate-950" />
                  </div>
                )}

                <div
                  className={`max-w-xl p-4 rounded-2xl text-sm leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-medium rounded-tr-none'
                      : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none space-y-2'
                  }`}
                >
                  {m.text.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            ))}

            {loadingChat && (
              <div className="flex items-center gap-3 text-slate-400 text-xs">
                <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center animate-pulse">
                  <Bot className="w-4 h-4 text-emerald-400" />
                </div>
                <span>FinMentor AI is preparing your educational explanation...</span>
              </div>
            )}
          </div>

          {/* Suggested Questions Bar */}
          <div className="px-6 py-2.5 bg-slate-900/50 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto">
            <span className="text-[11px] text-slate-400 shrink-0 font-semibold">Try asking:</span>
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs shrink-0 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-slate-900/80 border-t border-slate-800">
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
                className="flex-1 px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={loadingChat || !inputMessage.trim()}
                className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 disabled:opacity-50 hover:opacity-90 transition-opacity"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab 2: Concept Explainer (ELI5) */}
      {activeTab === 'explain' && (
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-8">
          <div className="max-w-xl">
            <h3 className="text-xl font-bold text-white">ELI5 Financial Concept Demystifier</h3>
            <p className="text-xs text-slate-400 mt-1">
              Type any financial term to get an intuitive explanation tailored to young professionals.
            </p>
          </div>

          <form onSubmit={handleExplainConcept} className="flex gap-3 max-w-xl">
            <input
              type="text"
              value={conceptInput}
              onChange={(e) => setConceptInput(e.target.value)}
              placeholder="e.g. Compound Interest, Expense Ratio, Asset vs Liability"
              className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white"
            />
            <button
              type="submit"
              disabled={loadingConcept}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-sm hover:opacity-90 transition-opacity"
            >
              {loadingConcept ? 'Explaining...' : 'Explain'}
            </button>
          </form>

          {conceptResult && (
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5 max-w-3xl">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-bold text-emerald-400">{conceptResult.concept}</h4>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300">
                  Simple Explanation
                </span>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  How It Works
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {conceptResult.simple_explanation}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                  Real-World Student Example
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {conceptResult.real_world_example}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1">
                  Key Actionable Takeaway
                </div>
                <p className="text-sm text-emerald-200 font-medium">
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
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white">AI Habit Coach & Spending Analysis</h3>
              <p className="text-xs text-slate-400">
                Interprets your deterministic backend metrics into constructive financial habits
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Deterministic Math Based</span>
            </div>
          </div>

          {loadingInsights ? (
            <div className="p-12 text-center text-slate-400 text-sm">Analyzing spending habits...</div>
          ) : insights.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-sm">
              Log transactions to unlock AI spending habits coaching.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {insights.map((ins, idx) => (
                <div
                  key={idx}
                  className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300">
                      {ins.type}
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-base">{ins.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{ins.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
