import React from 'react';
import { HeroContent } from './hero/HeroContent';
import { HeroVisual } from './hero/HeroVisual';
export const HeroSection = ({ onGetStarted, onExplore }) => {
    return (<section className="relative min-h-screen bg-white overflow-hidden flex items-center pt-20 pb-12">
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-8 items-center w-full">
        {/* Left Column (45%): Content & CTAs */}
        <HeroContent onGetStarted={onGetStarted} onExplore={onExplore}/>

        {/* Right Column (55%): Custom Interactive AI Financial Core Hero Visual */}
        <div className="flex items-center justify-center relative">
          <HeroVisual />
        </div>
      </div>
    </section>);
};
