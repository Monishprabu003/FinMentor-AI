import React from 'react';
import { motion } from 'framer-motion';

/* ── Shimmer on white background ───────────────────────────── */
const shimmer = {
  animate: { backgroundPosition: ['200% 0', '-200% 0'] },
  transition: { duration: 1.8, repeat: Infinity, ease: 'linear' as const },
};

const SkeletonBox: React.FC<{ className?: string }> = ({ className = '' }) => (
  <motion.div
    className={`rounded-lg bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 bg-[length:200%_100%] ${className}`}
    animate={shimmer.animate}
    transition={shimmer.transition}
  />
);

export const ModuleCardSkeleton: React.FC = () => (
  <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4 shadow-sm">
    <div className="flex items-start justify-between">
      <SkeletonBox className="w-12 h-12 rounded-xl" />
      <SkeletonBox className="w-12 h-5 rounded-full" />
    </div>
    <div className="space-y-2">
      <SkeletonBox className="w-3/5 h-5" />
      <SkeletonBox className="w-full h-3" />
      <SkeletonBox className="w-4/5 h-3" />
    </div>
    <div className="flex items-center justify-between pt-1">
      <SkeletonBox className="w-28 h-3" />
      <SkeletonBox className="w-8 h-8 rounded-lg" />
    </div>
  </div>
);

export const WorkspaceHeaderSkeleton: React.FC = () => (
  <div className="space-y-3">
    <SkeletonBox className="w-48 h-4 rounded-full" />
    <SkeletonBox className="w-72 h-9 rounded-lg" />
    <SkeletonBox className="w-56 h-4 rounded-lg" />
  </div>
);

export const RightPanelSkeleton: React.FC = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3 shadow-sm">
        <SkeletonBox className="w-2/3 h-4" />
        <SkeletonBox className="w-full h-3" />
        <SkeletonBox className="w-1/2 h-3" />
      </div>
    ))}
  </div>
);
