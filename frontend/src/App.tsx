import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { AssessmentPage } from './pages/onboarding/Assessment'; // Trigger TS server re-parse
import { DashboardPage } from './pages/DashboardPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { BudgetsPage } from './pages/BudgetsPage';
import { SavingsGoalsPage } from './pages/SavingsGoalsPage';
import { LearningCenterPage } from './pages/LearningCenterPage';
import { BooksLibraryPage } from './pages/BooksLibraryPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { ProfileSettingsPage } from './pages/ProfileSettingsPage';

/* ── Route guards ──────────────────────────────────── */
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="w-8 h-8 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
    </div>
  );
  if (!user) return <Navigate to="/login" replace />;
  if (!user.assessment_completed) return <Navigate to="/assessment" replace />;
  return <>{children}</>;
};

const AssessmentGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (user.assessment_completed) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};

const PublicOnlyRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) {
    if (!user.assessment_completed) return <Navigate to="/assessment" replace />;
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
};

/* ── Body theming (Light mode everywhere to match Landing/Assessment) */
const BodyTheme: React.FC = () => {
  useEffect(() => {
    document.body.style.background = '#f8fafc';
    document.body.style.color = '#0f172a';
  }, []);

  return null;
};

/* ── Layouts ───────────────────────────────────────── */
const AppLayout: React.FC = () => {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const isPublicOrOnboarding = ['/', '/login', '/signup', '/assessment'].includes(pathname);

  // Public pages and Assessment render without app chrome
  if (isPublicOrOnboarding) {
    return (
      <>
        <BodyTheme />
        <Routes>
          <Route path="/" element={<PublicOnlyRoute><LandingPage /></PublicOnlyRoute>} />
          <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
          <Route path="/signup" element={<PublicOnlyRoute><SignupPage /></PublicOnlyRoute>} />
          <Route path="/assessment" element={<AssessmentGuard><AssessmentPage /></AssessmentGuard>} />
        </Routes>
      </>
    );
  }

  // Authenticated app shell (only reachable if assessment_completed is true)
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <BodyTheme />
      <Navbar />
      <div className="flex-1 flex">
        {user && <Sidebar />}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/transactions" element={<ProtectedRoute><TransactionsPage /></ProtectedRoute>} />
            <Route path="/budgets" element={<ProtectedRoute><BudgetsPage /></ProtectedRoute>} />
            <Route path="/savings" element={<ProtectedRoute><SavingsGoalsPage /></ProtectedRoute>} />
            <Route path="/learn" element={<ProtectedRoute><LearningCenterPage /></ProtectedRoute>} />
            <Route path="/books" element={<ProtectedRoute><BooksLibraryPage /></ProtectedRoute>} />
            <Route path="/ai" element={<ProtectedRoute><AIAssistantPage /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><ProfileSettingsPage /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};



export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
