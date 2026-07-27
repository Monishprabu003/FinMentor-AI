import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Bookmark, ArrowUpRight } from 'lucide-react';
export const BookCard = ({ item }) => {
    const [isBookmarked, setIsBookmarked] = useState(item.bookmarked);
    return (<motion.div whileHover={{ y: -4 }} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Book Cover simulation */}
        <div className={`h-36 rounded-xl bg-gradient-to-br ${item.coverGradient} text-white p-4 flex flex-col justify-between mb-4 shadow-md relative overflow-hidden`}>
          <div className="flex items-center justify-between z-10">
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
              {item.type}
            </span>
            <button onClick={() => setIsBookmarked((v) => !v)} className="p-1.5 rounded-lg bg-black/30 backdrop-blur-md hover:bg-black/50 transition-colors text-white">
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`}/>
            </button>
          </div>

          <div className="z-10">
            <h4 className="text-base font-black leading-tight line-clamp-2">{item.title}</h4>
            <p className="text-xs text-slate-300 font-medium mt-0.5">{item.authorOrSource}</p>
          </div>
        </div>

        <div className="space-y-1.5 mb-4">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
            <span>{item.difficulty} Level</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3"/> {item.readingTimeMinutes} mins read
            </span>
          </div>
          {item.tagline && (<p className="text-xs font-semibold text-blue-600 line-clamp-1">
              "{item.tagline}"
            </p>)}
          <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">
            {item.summary}
          </p>
        </div>
      </div>

      <button className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all group">
        <span>Read Summary & Takeaways</span>
        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"/>
      </button>
    </motion.div>);
};
