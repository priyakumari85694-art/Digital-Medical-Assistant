/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavPage } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Disclaimer } from './components/Disclaimer';
import { Home } from './pages/Home';
import { Assistant } from './pages/Assistant';
import { Features } from './pages/Features';
import { Symptoms } from './pages/Symptoms';
import { HealthInformation } from './pages/HealthInformation';
import { Medications } from './pages/Medications';
import { Appointments } from './pages/Appointments';
import { Dashboard } from './pages/Dashboard';
import { About } from './pages/About';
import { Privacy } from './pages/Privacy';
import { SignIn } from './pages/SignIn';
import { AuthProvider, useAuth } from './AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState<NavPage>('home');
  const { user, signOut } = useAuth();

  // Sync with window.location.hash for shareable links and back/forward browser navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as NavPage;
      const validPages: NavPage[] = [
        'home', 
        'assistant', 
        'features', 
        'symptoms', 
        'health-info', 
        'medications', 
        'appointments', 
        'dashboard', 
        'about', 
        'privacy',
        'signin'
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: NavPage) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'assistant':
        return <Assistant onNavigate={navigateTo} />;
      case 'features':
        return <Features onNavigate={navigateTo} />;
      case 'symptoms':
        return <Symptoms />;
      case 'health-info':
        return <HealthInformation />;
      case 'medications':
        return <Medications />;
      case 'appointments':
        return <Appointments onNavigate={navigateTo} />;
      case 'dashboard':
        return <Dashboard onNavigate={navigateTo} />;
      case 'about':
        return <About onNavigate={navigateTo} />;
      case 'privacy':
        return <Privacy />;
      case 'signin':
        return <SignIn onNavigate={navigateTo} />;
      case 'home':
      default:
        return <Home onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Top Quiet Educational & Emergency Safety Bar */}
      <Disclaimer variant="banner" />

      {/* Sticky Responsive Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        userEmail={user?.email ?? null}
        onSignOut={() => {
          void signOut().then(() => navigateTo('home'));
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Professional Footer */}
      <Footer onNavigate={navigateTo} />

    </div>
  );
}
