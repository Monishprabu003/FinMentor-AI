import React from 'react';
import { LearningSidebar } from './LearningSidebar';
import { LearningNavbar } from './LearningNavbar';
import { RightAIPanel } from './RightAIPanel';
export const LearningLayout = ({ children, onSearch }) => {
    return (<div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <LearningNavbar onSearch={onSearch}/>
      <div className="flex flex-1 overflow-hidden">
        <LearningSidebar />
        <main className="flex-1 overflow-y-auto min-w-0 p-4 md:p-6 lg:p-8">
          {children}
        </main>
        <RightAIPanel />
      </div>
    </div>);
};
