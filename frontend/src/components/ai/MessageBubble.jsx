import React, { useState } from 'react';
import { Bot, Copy, Bookmark, Check, Sparkles, User } from 'lucide-react';
export const MessageBubble = ({ message, onSelectPrompt }) => {
    const [copied, setCopied] = useState(false);
    const [bookmarked, setBookmarked] = useState(message.bookmarked || false);
    const handleCopy = () => {
        navigator.clipboard.writeText(message.text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    const isAI = message.sender === 'ai';
    return (<div className={`flex gap-3 max-w-3xl ${isAI ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}>
      {/* Avatar Icon */}
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-xs font-bold text-xs ${isAI
            ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white'
            : 'bg-slate-800 text-slate-200'}`}>
        {isAI ? <Bot className="w-4 h-4"/> : <User className="w-4 h-4"/>}
      </div>

      {/* Bubble Box */}
      <div className={`p-4 md:p-5 rounded-2xl text-xs md:text-sm font-medium leading-relaxed space-y-3 shadow-xs ${isAI
            ? 'bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-tl-none'
            : 'bg-blue-600 text-white rounded-tr-none'}`}>
        <p className="whitespace-pre-line leading-relaxed">{message.text}</p>

        {/* Structured Table Data if present */}
        {message.tableData && (<div className="overflow-x-auto my-3 rounded-xl border border-zinc-800 bg-zinc-950">
            <table className="w-full text-left text-xs font-medium border-collapse">
              <thead>
                <tr className="bg-zinc-900 border-b border-zinc-800 text-zinc-300 font-bold">
                  {message.tableData.headers.map((h, idx) => (<th key={idx} className="p-2.5">
                      {h}
                    </th>))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-200">
                {message.tableData.rows.map((row, rIdx) => (<tr key={rIdx} className="hover:bg-zinc-900/50 transition-colors">
                    {row.map((cell, cIdx) => (<td key={cIdx} className="p-2.5">
                        {cell}
                      </td>))}
                  </tr>))}
              </tbody>
            </table>
          </div>)}

        {/* Formula Code Block if present */}
        {message.formulaCode && (<div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-indigo-300 overflow-x-auto">
            <code>{message.formulaCode}</code>
          </div>)}

        {/* Follow-up Prompts if present */}
        {isAI && message.followUpPrompts && message.followUpPrompts.length > 0 && (<div className="pt-2 border-t border-zinc-800/80 space-y-2">
            <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-zinc-500">
              <Sparkles className="w-3 h-3 text-amber-400"/>
              <span>Suggested Follow-ups</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {message.followUpPrompts.map((p, idx) => (<button key={idx} onClick={() => onSelectPrompt && onSelectPrompt(p)} className="text-[11px] font-semibold text-blue-400 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 px-3 py-1 rounded-lg transition-colors text-left">
                  💡 {p}
                </button>))}
            </div>
          </div>)}

        {/* Actions bar */}
        {isAI && (<div className="flex items-center justify-between pt-2 text-[11px] font-bold text-zinc-500 border-t border-zinc-800/60">
            <span>FinMentor AI Intelligence Engine</span>
            <div className="flex items-center gap-2">
              <button onClick={handleCopy} className="hover:text-zinc-200 transition-colors flex items-center gap-1" title="Copy Response">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400"/> : <Copy className="w-3.5 h-3.5"/>}
              </button>
              <button onClick={() => setBookmarked((v) => !v)} className={`hover:text-zinc-200 transition-colors ${bookmarked ? 'text-amber-400' : ''}`} title="Save Answer">
                <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-amber-400' : ''}`}/>
              </button>
            </div>
          </div>)}
      </div>
    </div>);
};
