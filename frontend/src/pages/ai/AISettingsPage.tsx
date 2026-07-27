import React, { useState } from 'react';
import { Settings, Check } from 'lucide-react';
import { AILayout } from '../../components/ai/AILayout';
import { MOCK_AI_SETTINGS } from '../../mock/aiData';

export const AISettingsPage: React.FC = () => {
  const [settings, setSettings] = useState(MOCK_AI_SETTINGS);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AILayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Settings className="w-6 h-6 text-slate-700" />
            <span>AI Tutor Preferences & Persona</span>
          </h1>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            Customize AI response depth, teaching style, tone, and language preferences.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          {/* Response Length */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-700 tracking-wider">
              Response Depth
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['Concise', 'Detailed', 'Comprehensive'] as const).map((len) => (
                <button
                  key={len}
                  onClick={() => setSettings((s) => ({ ...s, responseLength: len }))}
                  className={`p-3 rounded-2xl border text-xs font-extrabold transition-all ${
                    settings.responseLength === len
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {len}
                </button>
              ))}
            </div>
          </div>

          {/* Learning Style */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-700 tracking-wider">
              Teaching Style
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['Practical & Examples', 'Theoretical & Equations', 'Balanced'] as const).map((style) => (
                <button
                  key={style}
                  onClick={() => setSettings((s) => ({ ...s, learningStyle: style }))}
                  className={`p-3 rounded-2xl border text-xs font-extrabold transition-all ${
                    settings.learningStyle === style
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Tone */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-700 tracking-wider">
              AI Coach Tone
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['Encouraging & Friendly', 'Professional & Direct', 'Socratic Coach'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setSettings((s) => ({ ...s, tone: t }))}
                  className={`p-3 rounded-2xl border text-xs font-extrabold transition-all ${
                    settings.tone === t
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            {saved && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <Check className="w-4 h-4" /> AI Persona preferences updated!
              </span>
            )}
            <button
              onClick={handleSave}
              className="ml-auto px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-md shadow-blue-600/20 transition-all hover:scale-102 cursor-pointer"
            >
              Save AI Persona
            </button>
          </div>
        </div>
      </div>
    </AILayout>
  );
};
