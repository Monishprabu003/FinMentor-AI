import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles } from 'lucide-react';

interface AITutorPanelProps {
  isOpen: boolean;
  onClose: () => void;
  lessonTitle: string;
}

export const AITutorPanel: React.FC<AITutorPanelProps> = ({ isOpen, onClose, lessonTitle }) => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: `Hello! I am your FinMentor AI Tutor for "${lessonTitle}". Ask me to simplify any formula, give real-world examples, or test your understanding!`,
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `Great question regarding "${userMsg}"! In personal finance, automating your 20% savings first guarantees you never accidentally overspend on discretionary wants.`,
        },
      ]);
    }, 800);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: 380, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 380, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed right-0 top-14 bottom-0 w-96 bg-zinc-950 border-l border-zinc-800 text-zinc-100 shadow-2xl z-50 flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-zinc-100">AI Tutor Assistant</h3>
                <p className="text-[10.5px] font-semibold text-zinc-400">Contextual Lesson Helper</p>
              </div>
            </div>

            <button onClick={onClose} className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-zinc-800">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl text-xs font-medium leading-relaxed max-w-[85%] ${
                  m.sender === 'user'
                    ? 'ml-auto bg-blue-600 text-white rounded-br-none'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-bl-none shadow-xs'
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="p-3 border-t border-zinc-800 bg-zinc-900/40 space-y-2">
            <div className="flex items-center gap-1 text-[10.5px] font-extrabold uppercase text-zinc-500">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Suggested Prompts</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => handleQuickPrompt('Simplify the 50/30/20 rule in simple terms')}
                className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] font-semibold text-zinc-300 transition-colors text-left"
              >
                💡 Simplify 50/30/20
              </button>
              <button
                onClick={() => handleQuickPrompt('Give me a real-life example of lifestyle inflation')}
                className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] font-semibold text-zinc-300 transition-colors text-left"
              >
                📖 Lifestyle Creep Example
              </button>
            </div>
          </div>

          {/* Input Box */}
          <div className="p-3 border-t border-zinc-800 bg-zinc-900/80 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask AI Tutor anything..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-medium text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleSend}
              className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
