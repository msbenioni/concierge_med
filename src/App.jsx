import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { pagesConfig } from './pages.config'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { TEXT_PRIMARY, TEXT_PRIMARY_ALPHA_50, COLORS, COMPONENTS } from './constants/colors';
import { useEffect, useState } from 'react';
import ConciergeLoginModal from '@/components/ConciergeLoginModal';

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>;

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuthStatus = () => {
      // This would typically check with your auth service
      // For now, we'll assume no one is logged in initially
      const storedUser = localStorage.getItem('concierge_admin');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
        setIsAdmin(true);
      }
    };
    
    checkAuthStatus();
  }, []);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setIsAdmin(true);
    localStorage.setItem('concierge_admin', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAdmin(false);
    localStorage.removeItem('concierge_admin');
  };

  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={
            <LayoutWrapper currentPageName={mainPageKey}>
              <MainPage />
            </LayoutWrapper>
          } />
          {Object.entries(Pages).map(([path, Page]) => (
            <Route
              key={path.toLowerCase()}
              path={`/${path.toLowerCase()}`}
              element={
                <LayoutWrapper currentPageName={path}>
                  {path.toLowerCase() === 'admin' && !isAdmin ? (
                    <div className="flex items-center justify-center min-h-screen">
                      <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4" style={{ color: TEXT_PRIMARY }}>Admin Access Required</h1>
                        <p className="mb-8" style={{ color: TEXT_PRIMARY_ALPHA_50 }}>Please sign in to access the admin dashboard.</p>
                        <button
                          onClick={() => setShowLoginModal(true)}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors"
                          style={{ backgroundColor: COLORS.ACCENT_PRIMARY, color: COMPONENTS.BUTTON_PRIMARY_TEXT }}
                        >
                          Sign In as Admin
                        </button>
                      </div>
                    </div>
                  ) : (
                    <Page />
                  )}
                </LayoutWrapper>
              }
            />
          ))}
          <Route path="*" element={
            <LayoutWrapper>
              <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                  <h1 className="text-4xl font-bold mb-4" style={{ color: TEXT_PRIMARY }}>Page Not Found</h1>
                  <p className="mb-8" style={{ color: TEXT_PRIMARY_ALPHA_50 }}>The page you're looking for doesn't exist.</p>
                  <a href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors" style={{ backgroundColor: COLORS.ACCENT_PRIMARY, color: COMPONENTS.BUTTON_PRIMARY_TEXT }}>
                    Return Home
                  </a>
                </div>
              </div>
            </LayoutWrapper>
          } />
        </Routes>
      </Router>
      
      {/* Concierge Login Modal */}
      <ConciergeLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      
      <Toaster />
    </QueryClientProvider>
  )
}

export default App
