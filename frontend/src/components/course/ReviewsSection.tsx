import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';
import type { ReviewItem } from '../../types/course';

interface ReviewsSectionProps {
  rating: number;
  ratingCount: number;
  reviews: ReviewItem[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ rating, ratingCount, reviews }) => {
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>({});

  const handleHelpful = (id: string, initialCount: number) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [id]: (prev[id] ?? initialCount) + 1,
    }));
  };

  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <span>Learner Reviews & Ratings</span>
          </h3>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">
            Based on {ratingCount.toLocaleString()} verified student evaluations.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
          <span className="text-3xl font-black text-slate-900">{rating}</span>
          <div>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-[11px] font-bold text-slate-500">Overall Course Rating</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                  {rev.userName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{rev.userName}</h4>
                  <span className="text-[10px] text-slate-400">{rev.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-0.5">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              "{rev.comment}"
            </p>

            <div className="flex justify-end">
              <button
                onClick={() => handleHelpful(rev.id, rev.helpfulCount)}
                className="text-[11px] font-bold text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
              >
                <ThumbsUp className="w-3 h-3" />
                <span>Helpful ({helpfulCounts[rev.id] ?? rev.helpfulCount})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
