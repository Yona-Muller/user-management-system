import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import Login from './components/auth/Login';
import Dashboard from './components/users/Dashboard';
import NotFound from './components/layout/NotFound';
import PrivateRoute from './components/auth/PrivateRoute';
import { LanguageProvider } from './contexts/LanguageContext';
import { useLanguage } from './contexts/LanguageContext';
import './styles/index.css';

const App = () => {
  return (
    <LanguageProvider>
      <div>
        <LanguageWrapper />
      </div>
    </LanguageProvider>
  );
};

const LanguageWrapper = () => {
  const { language } = useLanguage();

  return (
    <div dir={language === 'he' ? 'rtl' : 'ltr'}>
        <AuthProvider>
          <UserProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  } 
                />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </UserProvider>
        </AuthProvider>
    </div>
  );
};

export default App;