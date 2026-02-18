import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { pagesConfig } from './pages.config'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TEXT_PRIMARY, TEXT_PRIMARY_ALPHA_50, ACCENT_PRIMARY, COMPONENTS } from './constants/colors';

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>;

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={
            <LayoutWrapper currentPageName={mainPageKey}>
              <MainPage />
            </LayoutWrapper>
          } />
          {Object.entries(Pages).map(([path, Page]) => (
            <Route
              key={path}
              path={`/${path}`}
              element={
                <LayoutWrapper currentPageName={path}>
                  <Page />
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
                  <a href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors" style={{ backgroundColor: ACCENT_PRIMARY, color: COMPONENTS.BUTTON_PRIMARY_TEXT }}>
                    Return Home
                  </a>
                </div>
              </div>
            </LayoutWrapper>
          } />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  )
}

export default App
