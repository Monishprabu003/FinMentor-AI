import React from 'react';
import { BackgroundGlow } from './BackgroundGlow';
import { ParticleLayer } from './ParticleLayer';
import { FloatingIcon } from './FloatingIcon';
import { OrbitRing } from './OrbitRing';
import { AICore } from './AICore';
import { FloatingMetricCard } from './FloatingMetricCard';
import { MouseParallax } from './MouseParallax';

export const HeroVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-[540px] lg:max-w-[620px] aspect-square flex items-center justify-center">
      {/* Background ambient radial gradients & grid */}
      <BackgroundGlow />

      {/* Floating particles */}
      <ParticleLayer />

      {/* Floating low-opacity background finance icons */}
      <FloatingIcon />

      {/* Interactive 3D Perspective Tilt Stage */}
      <MouseParallax className="w-full h-full">
        {/* Orbit Ring 1 (Inner ring - Radius 130px, fast clockwise) */}
        <OrbitRing
          radius={130}
          duration={24}
          nodes={[
            { angle: 30, color: '#3b82f6' },
            { angle: 210, color: '#10b981' },
          ]}
          opacity={0.4}
        />

        {/* Orbit Ring 2 (Middle ring - Radius 200px, counter-clockwise) */}
        <OrbitRing
          radius={200}
          duration={36}
          reverse
          nodes={[
            { angle: 90, color: '#8b5cf6' },
            { angle: 270, color: '#f59e0b' },
          ]}
          borderDash="dashed"
          opacity={0.3}
        />

        {/* Orbit Ring 3 (Outer ring - Radius 270px, slow clockwise) */}
        <OrbitRing
          radius={270}
          duration={50}
          nodes={[
            { angle: 0, color: '#06b6d4' },
            { angle: 150, color: '#ec4899' },
            { angle: 300, color: '#3b82f6' },
          ]}
          opacity={0.25}
        />

        {/* Central Pulsing AI Core */}
        <AICore />

        {/* 6 Floating Orbit Metric Cards (positioned around center) */}

        {/* Top Left — Financial Score */}
        <FloatingMetricCard
          type="score"
          className="top-6 left-2 sm:left-4"
          floatDelay={0}
          floatDuration={4.8}
        />

        {/* Top Right — Budget Health */}
        <FloatingMetricCard
          type="budget"
          className="top-12 right-2 sm:right-4"
          floatDelay={0.8}
          floatDuration={5.2}
        />

        {/* Middle Right — Monthly Savings */}
        <FloatingMetricCard
          type="savings"
          className="top-1/2 -translate-y-1/2 -right-4 sm:-right-6"
          floatDelay={1.4}
          floatDuration={4.4}
        />

        {/* Bottom Right — Investment Growth */}
        <FloatingMetricCard
          type="investment"
          className="bottom-10 right-2 sm:right-6"
          floatDelay={0.5}
          floatDuration={5}
        />

        {/* Bottom Left — Expense Tracker */}
        <FloatingMetricCard
          type="expenses"
          className="bottom-6 left-2 sm:left-6"
          floatDelay={1.1}
          floatDuration={4.6}
        />

        {/* Middle Left — Smart AI Insights */}
        <FloatingMetricCard
          type="insights"
          className="top-1/2 -translate-y-1/2 -left-4 sm:-left-6"
          floatDelay={1.8}
          floatDuration={5.4}
        />
      </MouseParallax>
    </div>
  );
};
