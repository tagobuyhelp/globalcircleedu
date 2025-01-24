import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { useThemeStore } from './store/themeStore';
import { AuthProvider } from './providers/AuthProvider';
import { ChatProvider } from './components/chat/ChatProvider';
import { Toaster } from 'react-hot-toast';

function App() {
  const { isDarkMode } = useThemeStore();

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ChatProvider>
            <div className={isDarkMode ? 'dark' : ''}>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <AppRoutes />
              </div>
            </div>
          </ChatProvider>
        </AuthProvider>
      </BrowserRouter>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
