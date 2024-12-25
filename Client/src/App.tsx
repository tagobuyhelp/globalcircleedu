import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { useThemeStore } from './store/themeStore';
import { AuthProvider } from './providers/AuthProvider';

function App() {
  const { isDarkMode } = useThemeStore();

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className={isDarkMode ? 'dark' : ''}>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <AppRoutes />
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;