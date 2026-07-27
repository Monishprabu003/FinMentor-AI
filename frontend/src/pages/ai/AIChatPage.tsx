import React, { useState } from 'react';
import { Send, Plus, Pin } from 'lucide-react';
import { AILayout } from '../../components/ai/AILayout';
import { MessageBubble } from '../../components/ai/MessageBubble';
import { TypingIndicator } from '../../components/ai/TypingIndicator';
import { MOCK_CONVERSATIONS } from '../../mock/aiData';
import type { AIMessage } from '../../types/ai';

export const AIChatPage: React.FC = () => {
  const [activeConvId, setActiveConvId] = useState<string>(MOCK_CONVERSATIONS[0].id);
  const activeConv = MOCK_CONVERSATIONS.find((c) => c.id === activeConvId) || MOCK_CONVERSATIONS[0];

  const [messages, setMessages] = useState<AIMessage[]>(activeConv.messages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Simulate streaming response
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse: AIMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `Great question regarding "${query}"! In financial engineering, optimizing your cash flow allocation before investing guarantees long-term portfolio resilience.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        followUpPrompts: [
          'Show me a 5-year compounding table for this strategy',
          'Which index funds have the lowest expense ratio?',
        ],
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1200);
  };

  return (
    <AILayout>
      <div className="h-[calc(100vh-130px)] rounded-3xl bg-zinc-950 border border-zinc-800 text-zinc-100 shadow-2xl flex overflow-hidden">
        {/* Left Sidebar: Conversations list */}
        <div className="w-64 border-r border-zinc-800 bg-zinc-900/60 hidden md:flex flex-col justify-between shrink-0">
          <div className="p-3 border-b border-zinc-800 flex items-center justify-between">
            <button
              onClick={() => {
                setMessages([
                  {
                    id: Date.now().toString(),
                    sender: 'ai',
                    text: 'Hello, Monish! I am your FinMentor AI Tutor. Ask me any question on budgeting, investing, or tax strategies.',
                    timestamp: 'Just now',
                  },
                ]);
              }}
              className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>New Conversation</span>
            </button>
          </div>

          {/* Conversation Items */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-zinc-800">
            {MOCK_CONVERSATIONS.map((conv) => (
              <button
                key={conv.id}
                onClick={() => {
                  setActiveConvId(conv.id);
                  setMessages(conv.messages);
                }}
                className={`w-full p-3 rounded-xl text-left text-xs font-semibold transition-all ${
                  activeConvId === conv.id
                    ? 'bg-blue-600/20 border border-blue-500/40 text-blue-300'
                    : 'text-zinc-400 hover:bg-zinc-800/80 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="truncate max-w-[140px] font-black text-zinc-100">{conv.title}</span>
                  {conv.pinned && <Pin className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />}
                </div>
                <p className="text-[10.5px] text-zinc-500 truncate mt-0.5">{conv.lastMessage}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Right Stage: Active Chat Thread */}
        <div className="flex-1 flex flex-col justify-between min-w-0 bg-[#09090b]">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-thin scrollbar-thumb-zinc-800">
            {messages.map((m) => (
              <MessageBubble
                key={m.id}
                message={m}
                onSelectPrompt={(pText) => handleSend(pText)}
              />
            ))}

            {isTyping && <TypingIndicator />}
          </div>

          {/* Input & Prompt Chips */}
          <div className="p-4 border-t border-zinc-800 bg-zinc-950/90 space-y-3">
            {/* Quick Prompt Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[10px] font-black uppercase text-zinc-500 shrink-0">Quick Ask:</span>
              {[
                'Explain SIP vs FD',
                '50/30/20 Salary Breakdown',
                'Old vs New Tax Regime',
                'Emergency Buffer Calculator',
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(chip)}
                  className="px-3 py-1 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] font-semibold text-zinc-300 transition-colors shrink-0"
                >
                  💡 {chip}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask FinMentor AI anything about personal finance, investing, or tax strategies..."
                className="flex-1 px-4 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs md:text-sm font-medium text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500 shadow-inner"
              />
              <button
                onClick={() => handleSend()}
                className="p-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-lg shadow-blue-600/20 transition-all hover:scale-105 shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AILayout>
  );
};
