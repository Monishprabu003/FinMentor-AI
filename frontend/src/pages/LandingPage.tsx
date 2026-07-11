import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import { LandingNavbar } from '../components/landing/Navbar';
import { HeroSection } from '../components/landing/HeroSection';
import { TrustSection } from '../components/landing/TrustSection';
import { FeaturesSection } from '../components/landing/FeaturesSection';
import { WhySection } from '../components/landing/WhySection';
import { LearningSection } from '../components/landing/LearningSection';
import { AIMentorSection } from '../components/landing/AIMentorSection';
import { TestimonialsSection } from '../components/landing/TestimonialsSection';
import { CTASection } from '../components/landing/CTASection';
import { LandingFooter } from '../components/landing/LandingFooter';

// Simple Auth Modal
const AuthModal: React.FC<{
  mode: 'signin' | 'signup';
  onClose: () => void;
}> = ({ mode, onClose }) => {
  const { login, register, quickDemoLogin } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'signin' | 'signup'>(mode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (tab === 'signin') {
        await login(email, password);
      } else {
        await register(email, password, fullName, 'graduate');
      }
      onClose();
      navigate('/dashboard');
    } catch {
      setError('Invalid credentials. Try the demo login below.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = async () => {
    setLoading(true);
    await quickDemoLogin();
    onClose();
    navigate('/dashboard');
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-7 border-b border-gray-100 pb-4">
          {(['signin', 'signup'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`text-[14px] font-semibold pb-1 transition-colors ${
                tab === t
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {t === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'signup' && (
            <div>
              <label className="block text-[12px] font-semibold text-gray-500 mb-1.5">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Alex Rivera"
                className="w-full px-4 py-2.5 text-[14px] text-gray-800 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
              />
            </div>
          )}
          <div>
            <label className="block text-[12px] font-semibold text-gray-500 mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 text-[14px] text-gray-800 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
            />
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-gray-500 mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 text-[14px] text-gray-800 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
            />
          </div>

          {error && (
            <p className="text-[12px] text-rose-500 bg-rose-50 border border-rose-100 px-3 py-2 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-[14px] font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors duration-150 mt-2"
          >
            {loading ? 'Please wait...' : tab === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={handleDemo}
            disabled={loading}
            className="w-full py-3 text-[13px] font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-xl transition-colors"
          >
            ⚡ Explore Instant Demo (No sign-up needed)
          </button>
        </div>
      </div>
    </div>
  );
};

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');

  if (user) {
    navigate('/dashboard');
    return null;
  }

  const openSignIn = () => { setAuthMode('signin'); setShowAuth(true); };
  const openSignUp = () => { setAuthMode('signup'); setShowAuth(true); };

  return (
    <div className="bg-white text-gray-900 overflow-x-hidden scroll-smooth">
      <LandingNavbar onSignIn={openSignIn} onGetStarted={openSignUp} />

      <HeroSection onGetStarted={openSignUp} onExplore={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} />

      <TrustSection />

      <FeaturesSection />

      <WhySection />

      <LearningSection />

      <AIMentorSection />

      <TestimonialsSection />

      <CTASection onGetStarted={openSignUp} onLearnMore={() => document.getElementById('learn')?.scrollIntoView({ behavior: 'smooth' })} />

      <LandingFooter />

      {showAuth && <AuthModal mode={authMode} onClose={() => setShowAuth(false)} />}
    </div>
  );
};
