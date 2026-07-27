import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppNavbar } from './components/layout/AppNavbar';
import { AppSidebar } from './components/layout/AppSidebar';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { AssessmentPage } from './pages/onboarding/Assessment';
import { DashboardPage } from './pages/DashboardPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { BudgetsPage } from './pages/BudgetsPage';
import { SavingsGoalsPage } from './pages/SavingsGoalsPage';
import { BooksLibraryPage } from './pages/BooksLibraryPage';
import { ProfileSettingsPage } from './pages/ProfileSettingsPage';
import { InvestmentsPage } from './pages/dashboard/InvestmentsPage';
import { AnalyticsPage } from './pages/dashboard/AnalyticsPage';
import { ReportsPage } from './pages/dashboard/ReportsPage';
/* ── Learning Platform Pages ───────────────────────────────── */
import { LearningHomePage } from './pages/learning/LearningHomePage';
import { LearningPathsPage } from './pages/learning/LearningPathsPage';
import { PathDetailPage } from './pages/learning/PathDetailPage';
import { CoursesPage } from './pages/learning/CoursesPage';
import { LibraryPage } from './pages/learning/LibraryPage';
import { ChallengesPage } from './pages/learning/ChallengesPage';
import { BookmarksPage } from './pages/learning/BookmarksPage';
import { LearningSettingsPage } from './pages/learning/LearningSettingsPage';
/* ── Course & Lesson Experience Pages ───────────────────────── */
import { CourseOverviewPage } from './pages/course/CourseOverviewPage';
import { LessonReaderPage } from './pages/course/LessonReaderPage';
import { CourseResourcesPage } from './pages/course/CourseResourcesPage';
import { CourseNotesPage } from './pages/course/CourseNotesPage';
import { CourseDiscussionPage } from './pages/course/CourseDiscussionPage';
import { CourseReviewsPage } from './pages/course/CourseReviewsPage';
/* ── Assessment & Gamification Pages ───────────────────────── */
import { AssessmentHomePage } from './pages/assessment/AssessmentHomePage';
import { AssessmentRunnerPage } from './pages/assessment/AssessmentRunnerPage';
import { AssessmentResultPage } from './pages/assessment/AssessmentResultPage';
import { AssessmentReviewPage } from './pages/assessment/AssessmentReviewPage';
import { AchievementsHubPage } from './pages/assessment/AchievementsHubPage';
import { BadgesPage } from './pages/assessment/BadgesPage';
import { CertificatesHubPage } from './pages/assessment/CertificatesHubPage';
import { LeaderboardHubPage } from './pages/assessment/LeaderboardHubPage';
import { StreakHubPage } from './pages/assessment/StreakHubPage';
import { ProfileProgressPage } from './pages/assessment/ProfileProgressPage';
/* ── AI Tutor Ecosystem Pages ───────────────────────────────── */
import { AIHomePage } from './pages/ai/AIHomePage';
import { AIChatPage } from './pages/ai/AIChatPage';
import { AIHistoryPage } from './pages/ai/AIHistoryPage';
import { AISavedPage } from './pages/ai/AISavedPage';
import { AIPromptsPage } from './pages/ai/AIPromptsPage';
import { AIRecommendationsPage } from './pages/ai/AIRecommendationsPage';
import { AISettingsPage } from './pages/ai/AISettingsPage';
/* ── Error Boundary ──────────────────────────────────────────── */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        console.error('Uncaught Error Boundary Exception:', error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (<div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
          <div className="max-w-lg w-full bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-black text-rose-500">!</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-2">Something went wrong</h2>
            <p className="text-sm text-slate-500 mb-6">An unexpected error occurred while loading this page.</p>
            <div className="bg-slate-50 rounded-xl p-4 text-left border border-slate-200 mb-6 overflow-auto max-h-40">
              <code className="text-xs font-mono text-rose-600">{this.state.error?.toString()}</code>
            </div>
            <button onClick={() => {
                    this.setState({ hasError: false, error: null });
                    window.location.href = '/';
                }} className="px-6 py-3 bg-blue-600 text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition-colors">
              Return to Home Page
            </button>
          </div>
        </div>);
        }
        return this.props.children;
    }
}
/* ── Loading Spinner ─────────────────────────────────────────── */
const LoadingSpinner = () => (<div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"/>
      <p className="text-sm font-semibold text-slate-400">Loading your workspace...</p>
    </div>
  </div>);
/* ── Route Guards ────────────────────────────────────────────── */
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading)
        return <LoadingSpinner />;
    if (!user)
        return <Navigate to="/login" replace/>;
    if (!user.assessment_completed)
        return <Navigate to="/assessment" replace/>;
    return <>{children}</>;
};
const AssessmentGuard = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading)
        return <LoadingSpinner />;
    if (!user)
        return <Navigate to="/login" replace/>;
    return <>{children}</>;
};
const PublicOnlyRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading)
        return <LoadingSpinner />;
    if (user) {
        if (!user.assessment_completed)
            return <Navigate to="/assessment" replace/>;
        return <Navigate to="/dashboard" replace/>;
    }
    return <>{children}</>;
};
/* ── Body Theme ────────────────────────────────────────────── */
const BodyTheme = ({ isDark }) => {
    useEffect(() => {
        document.body.style.background = isDark ? '#09090b' : '#f8fafc';
        document.body.style.color = isDark ? '#f4f4f5' : '#0f172a';
        if (isDark) {
            document.documentElement.classList.add('dark');
        }
        else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);
    return null;
};
/* ── App Layout ──────────────────────────────────────────────── */
const AppLayout = () => {
    const { user } = useAuth();
    const { pathname } = useLocation();
    const isPublicOrOnboarding = ['/', '/login', '/signup', '/assessment'].includes(pathname);
    const isLessonReader = pathname.includes('/lesson/');
    const isAssessmentRunner = pathname.includes('/assessment/asm-') || pathname.includes('/result') || pathname.includes('/review');
    const isLearningPlatformRoute = pathname.startsWith('/dashboard/learning') && !isLessonReader && !isAssessmentRunner;
    /* ── Public / Onboarding pages ── */
    if (isPublicOrOnboarding) {
        return (<>
        <BodyTheme isDark={false}/>
        <Routes>
          <Route path="/" element={<PublicOnlyRoute><LandingPage /></PublicOnlyRoute>}/>
          <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>}/>
          <Route path="/signup" element={<PublicOnlyRoute><SignupPage /></PublicOnlyRoute>}/>
          <Route path="/assessment" element={<AssessmentGuard><AssessmentPage /></AssessmentGuard>}/>
        </Routes>
      </>);
    }
    /* ── Standalone Lesson Reader Page (Dark Mode Notion Experience) ── */
    if (isLessonReader) {
        return (<>
        <BodyTheme isDark={true}/>
        <Routes>
          <Route path="/dashboard/learning/course/:courseId/lesson/:lessonId" element={<ProtectedRoute><LessonReaderPage /></ProtectedRoute>}/>
        </Routes>
      </>);
    }
    /* ── Standalone Assessment Runner & Results (Dark Mode Exam Workspace) ── */
    if (isAssessmentRunner) {
        return (<>
        <BodyTheme isDark={true}/>
        <Routes>
          <Route path="/dashboard/learning/assessment/:assessmentId" element={<ProtectedRoute><AssessmentRunnerPage /></ProtectedRoute>}/>
          <Route path="/dashboard/learning/assessment/:assessmentId/result" element={<ProtectedRoute><AssessmentResultPage /></ProtectedRoute>}/>
          <Route path="/dashboard/learning/assessment/:assessmentId/review" element={<ProtectedRoute><AssessmentReviewPage /></ProtectedRoute>}/>
        </Routes>
      </>);
    }
    /* ── Learning Platform routes render inside LearningLayout ── */
    if (isLearningPlatformRoute) {
        return (<>
        <BodyTheme isDark={false}/>
        <Routes>
          <Route path="/dashboard/learning" element={<ProtectedRoute><LearningHomePage /></ProtectedRoute>}/>
          <Route path="/dashboard/learning/paths" element={<ProtectedRoute><LearningPathsPage /></ProtectedRoute>}/>
          <Route path="/dashboard/learning/path/:id" element={<ProtectedRoute><PathDetailPage /></ProtectedRoute>}/>
          <Route path="/dashboard/learning/courses" element={<ProtectedRoute><CoursesPage /></ProtectedRoute>}/>
          <Route path="/dashboard/learning/course/:courseId" element={<ProtectedRoute><CourseOverviewPage /></ProtectedRoute>}/>
          <Route path="/dashboard/learning/course/:courseId/resources" element={<ProtectedRoute><CourseResourcesPage /></ProtectedRoute>}/>
          <Route path="/dashboard/learning/course/:courseId/notes" element={<ProtectedRoute><CourseNotesPage /></ProtectedRoute>}/>
          <Route path="/dashboard/learning/course/:courseId/discussion" element={<ProtectedRoute><CourseDiscussionPage /></ProtectedRoute>}/>
          <Route path="/dashboard/learning/course/:courseId/reviews" element={<ProtectedRoute><CourseReviewsPage /></ProtectedRoute>}/>
          <Route path="/dashboard/learning/library" element={<ProtectedRoute><LibraryPage /></ProtectedRoute>}/>
          <Route path="/dashboard/learning/books" element={<ProtectedRoute><LibraryPage /></ProtectedRoute>}/>
          <Route path="/dashboard/learning/articles" element={<ProtectedRoute><LibraryPage /></ProtectedRoute>}/>
          <Route path="/dashboard/learning/challenges" element={<ProtectedRoute><ChallengesPage /></ProtectedRoute>}/>
          <Route path="/dashboard/learning/assessment" element={<ProtectedRoute><AssessmentHomePage /></ProtectedRoute>}/>
          <Route path="/dashboard/learning/achievements" element={<ProtectedRoute><AchievementsHubPage /></ProtectedRoute>}/>
          <Route path="/dashboard/learning/badges" element={<ProtectedRoute><BadgesPage /></ProtectedRoute>}/>
          <Route path="/dashboard/learning/certificates" element={<ProtectedRoute><CertificatesHubPage /></ProtectedRoute>}/>
          <Route path="/dashboard/learning/leaderboard" element={<ProtectedRoute><LeaderboardHubPage /></ProtectedRoute>}/>
          <Route path="/dashboard/learning/streak" element={<ProtectedRoute><StreakHubPage /></ProtectedRoute>}/>
          <Route path="/dashboard/learning/bookmarks" element={<ProtectedRoute><BookmarksPage /></ProtectedRoute>}/>
          <Route path="/dashboard/learning/settings" element={<ProtectedRoute><LearningSettingsPage /></ProtectedRoute>}/>
        </Routes>
      </>);
    }
    /* ── Authenticated app shell — main workspace ── */
    return (<div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <BodyTheme isDark={false}/>
      <AppNavbar />
      <div className="flex flex-1 overflow-hidden">
        {user && <AppSidebar />}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}/>
            <Route path="/dashboard/investments" element={<ProtectedRoute><InvestmentsPage /></ProtectedRoute>}/>
            <Route path="/dashboard/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>}/>
            <Route path="/dashboard/achievements" element={<ProtectedRoute><AchievementsHubPage /></ProtectedRoute>}/>
            <Route path="/dashboard/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>}/>
            <Route path="/dashboard/profile/progress" element={<ProtectedRoute><ProfileProgressPage /></ProtectedRoute>}/>

            {/* AI Tutor Routes */}
            <Route path="/dashboard/ai" element={<ProtectedRoute><AIHomePage /></ProtectedRoute>}/>
            <Route path="/dashboard/ai/chat" element={<ProtectedRoute><AIChatPage /></ProtectedRoute>}/>
            <Route path="/dashboard/ai/history" element={<ProtectedRoute><AIHistoryPage /></ProtectedRoute>}/>
            <Route path="/dashboard/ai/saved" element={<ProtectedRoute><AISavedPage /></ProtectedRoute>}/>
            <Route path="/dashboard/ai/prompts" element={<ProtectedRoute><AIPromptsPage /></ProtectedRoute>}/>
            <Route path="/dashboard/ai/recommendations" element={<ProtectedRoute><AIRecommendationsPage /></ProtectedRoute>}/>
            <Route path="/dashboard/ai/settings" element={<ProtectedRoute><AISettingsPage /></ProtectedRoute>}/>

            <Route path="/transactions" element={<ProtectedRoute><TransactionsPage /></ProtectedRoute>}/>
            <Route path="/budgets" element={<ProtectedRoute><BudgetsPage /></ProtectedRoute>}/>
            <Route path="/savings" element={<ProtectedRoute><SavingsGoalsPage /></ProtectedRoute>}/>
            <Route path="/learn" element={<Navigate to="/dashboard/learning" replace/>}/>
            <Route path="/books" element={<ProtectedRoute><BooksLibraryPage /></ProtectedRoute>}/>
            <Route path="/ai" element={<Navigate to="/dashboard/ai" replace/>}/>
            <Route path="/settings" element={<ProtectedRoute><ProfileSettingsPage /></ProtectedRoute>}/>
            <Route path="*" element={<Navigate to="/" replace/>}/>
          </Routes>
        </main>
      </div>
    </div>);
};
/* ── App Root ────────────────────────────────────────────────── */
export function App() {
    return (<ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <AppLayout />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>);
}
export default App;
