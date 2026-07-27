import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Download, Share2, CheckCircle2, X } from 'lucide-react';
export const CertificateModal = ({ isOpen, onClose, title, issueDate, credentialId, }) => {
    return (<AnimatePresence>
      {isOpen && (<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 md:p-8 space-y-6 text-zinc-100 shadow-2xl relative">
            <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 transition-colors">
              <X className="w-4 h-4"/>
            </button>

            {/* Certificate Preview Card */}
            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-amber-500/30 text-center space-y-4 shadow-inner relative overflow-hidden">
              <div className="flex justify-between items-center text-[10px] font-black uppercase text-amber-400">
                <span>FINMENTOR AI ACADEMY</span>
                <span>ID: {credentialId}</span>
              </div>

              <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                <Award className="w-8 h-8"/>
              </div>

              <h2 className="text-xl md:text-2xl font-black text-white">{title}</h2>
              <p className="text-xs text-zinc-300 font-medium">Issued to Yashwanth on {issueDate}</p>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-bold text-zinc-400">
                <span>Verified Credential</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5"/> Authenticated
                </span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap gap-3">
              <button onClick={() => alert('Certificate PDF downloaded!')} className="flex-1 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer">
                <Download className="w-4 h-4"/> Download PDF Certificate
              </button>

              <button onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Certificate verification link copied!');
            }} className="py-3 px-5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-bold text-xs flex items-center gap-1.5 transition-all">
                <Share2 className="w-4 h-4"/> Share on LinkedIn
              </button>
            </div>
          </motion.div>
        </div>)}
    </AnimatePresence>);
};
