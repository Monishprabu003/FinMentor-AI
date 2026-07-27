import React, { useState } from 'react';
import { MessageSquare, Send, CheckCircle2 } from 'lucide-react';

interface CommentItem {
  id: string;
  author: string;
  time: string;
  text: string;
  upvotes: number;
  instructorReply?: string;
}

export const DiscussionPanel: React.FC = () => {
  const [comments, setComments] = useState<CommentItem[]>([
    {
      id: 'c1',
      author: 'Rohan Verma',
      time: '3 hours ago',
      text: 'If my minimum credit card payment is 5% of the balance, does that full 5% come out of Needs, or only the interest part?',
      upvotes: 8,
      instructorReply: 'The minimum required 5% payment comes out of your 5% Needs bucket to protect your credit score! Any additional extra principal payoff comes from your 20% Wealth bucket.',
    },
  ]);
  const [newComment, setNewComment] = useState('');

  const handlePost = () => {
    if (!newComment.trim()) return;
    setComments((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        author: 'Yashwanth (You)',
        time: 'Just now',
        text: newComment,
        upvotes: 1,
      },
    ]);
    setNewComment('');
  };

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 text-zinc-100 space-y-6 my-8 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-black tracking-tight">Learner Q&A & Discussion</h3>
        </div>
        <span className="text-xs font-bold text-zinc-400">{comments.length} Questions</span>
      </div>

      {/* Post comment input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handlePost()}
          placeholder="Ask a question about this lesson..."
          className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-medium text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handlePost}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-xs flex items-center gap-1.5 transition-all"
        >
          <Send className="w-4 h-4" />
          <span>Ask</span>
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-4 pt-2">
        {comments.map((c) => (
          <div key={c.id} className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-3">
            <div className="flex items-center justify-between text-xs font-extrabold">
              <span className="text-zinc-200">{c.author}</span>
              <span className="text-[10px] text-zinc-500 font-semibold">{c.time}</span>
            </div>
            <p className="text-xs text-zinc-300 font-medium leading-relaxed">{c.text}</p>

            {c.instructorReply && (
              <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-500/30 text-xs space-y-1">
                <div className="text-[10px] font-black uppercase text-blue-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Instructor Pinned Answer
                </div>
                <p className="text-zinc-200 font-medium leading-relaxed">{c.instructorReply}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
