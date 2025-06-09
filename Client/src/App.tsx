import { BrowserRouter } from 'react-router-dom';
import { ChatProvider } from './components/chat/ChatProvider';
import { useThemeStore } from './store/themeStore';
import { AppRoutes } from './routes';
import { AuthProvider } from './providers/AuthProvider';
import { JourneyPopup } from './components/home/JourneyPopup';
import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from './components/ui/ErrorBoundary';

function App() {
  const { isDarkMode } = useThemeStore();

  return (
    <>
      <ErrorBoundary>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AuthProvider>
            <ChatProvider>
              <div className={isDarkMode ? 'dark' : ''}>
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                  <AppRoutes />
                  <JourneyPopup />
                </div>
              </div>
            </ChatProvider>
          </AuthProvider>
        </BrowserRouter>
      </ErrorBoundary>
      <Toaster position="top-right" />
    </>
  );
}

export default App;