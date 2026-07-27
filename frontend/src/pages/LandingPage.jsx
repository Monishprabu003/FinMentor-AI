import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LandingNavbar } from '../components/landing/Navbar';
import { HeroSection } from '../components/landing/HeroSection';
import { FeaturesSection } from '../components/landing/FeaturesSection';
import { AIFeaturesSection } from '../components/landing/AIFeaturesSection';
import { WhySection } from '../components/landing/WhySection';
import { LearningSection } from '../components/landing/LearningSection';
import { AIMentorSection } from '../components/landing/AIMentorSection';
import { TestimonialsSection } from '../components/landing/TestimonialsSection';
import { FAQSection } from '../components/landing/FAQSection';
import { CTASection } from '../components/landing/CTASection';
import { LandingFooter } from '../components/landing/LandingFooter';
export const LandingPage = () => {
    const navigate = useNavigate();
    const goLogin = () => navigate('/login');
    const goSignup = () => navigate('/signup');
    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    return (<div className="bg-white text-slate-900 overflow-x-hidden scroll-smooth">
      <LandingNavbar onSignIn={goLogin} onGetStarted={goSignup}/>

      <HeroSection onGetStarted={goSignup} onExplore={() => scrollTo('features')}/>

      <FeaturesSection />
      <AIFeaturesSection />
      <WhySection />
      <LearningSection />
      <AIMentorSection />
      <TestimonialsSection />
      <FAQSection />

      <CTASection onGetStarted={goSignup} onLearnMore={() => scrollTo('learn')}/>

      <LandingFooter />
    </div>);
};
