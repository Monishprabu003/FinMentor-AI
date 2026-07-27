import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, X, Plus, Trash2, Download } from 'lucide-react';
export const NotesPanel = ({ isOpen, onClose }) => {
    const [notes, setNotes] = useState([
        'Always base 50/30/20 calculations on net take-home pay, not gross CTC salary.',
        'Automate the 20% savings transfer on payday to eliminate willpower dependency.',
    ]);
    const [newNote, setNewNote] = useState('');
    const handleAdd = () => {
        if (!newNote.trim())
            return;
        setNotes((prev) => [...prev, newNote]);
        setNewNote('');
    };
    const handleDelete = (index) => {
        setNotes((prev) => prev.filter((_, i) => i !== index));
    };
    return (<AnimatePresence>
      {isOpen && (<motion.div initial={{ x: 380, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 380, opacity: 0 }} transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }} className="fixed right-0 top-14 bottom-0 w-96 bg-zinc-950 border-l border-zinc-800 text-zinc-100 shadow-2xl z-50 flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
                <FileText className="w-4 h-4"/>
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-zinc-100">Personal Study Notes</h3>
                <p className="text-[10.5px] font-semibold text-zinc-400">Notion-Style Notebook</p>
              </div>
            </div>

            <button onClick={onClose} className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 transition-colors">
              <X className="w-4 h-4"/>
            </button>
          </div>

          {/* Notes list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-zinc-800">
            {notes.map((note, idx) => (<div key={idx} className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2 relative group">
                <p className="text-xs font-medium text-zinc-200 leading-relaxed">{note}</p>
                <div className="flex items-center justify-between pt-1 text-[10px] text-zinc-500 font-bold border-t border-zinc-800/60">
                  <span>Note #{idx + 1}</span>
                  <button onClick={() => handleDelete(idx)} className="text-rose-400 hover:text-rose-300 transition-colors">
                    <Trash2 className="w-3.5 h-3.5"/>
                  </button>
                </div>
              </div>))}
          </div>

          {/* Add Note Input */}
          <div className="p-4 border-t border-zinc-800 bg-zinc-900/80 space-y-2">
            <textarea value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="Write a personal note or key insight..." rows={2} className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-medium text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 resize-none"/>
            <div className="flex items-center justify-between">
              <button onClick={() => alert('Notes exported to Markdown!')} className="text-[11px] font-bold text-zinc-400 hover:text-zinc-200 flex items-center gap-1 transition-colors">
                <Download className="w-3.5 h-3.5"/> Export Notes
              </button>
              <button onClick={handleAdd} className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold flex items-center gap-1 shadow-xs transition-all">
                <Plus className="w-4 h-4"/> Save Note
              </button>
            </div>
          </div>
        </motion.div>)}
    </AnimatePresence>);
};
