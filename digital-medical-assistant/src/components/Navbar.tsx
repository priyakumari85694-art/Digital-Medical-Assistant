import React, { useState, useEffect } from 'react';
import { 
  HeartPulse, 
  Menu, 
  X, 
  Sparkles, 
  Stethoscope, 
  FileText, 
  Pill, 
  Calendar, 
  ShieldCheck, 
  LayoutDashboard,
  ChevronRight,
  UserRound,
  LogOut
} from 'lucide-react';
import { NavPage } from '../types';

interface NavbarProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  userEmail: string | null;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, userEmail, onSignOut }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: Array<{ id: NavPage; label: string }> = [
    { id: 'home', label: 'Home' },
    { id: 'assistant', label: 'AI Assistant' },
    { id: 'features', label: 'Features' },
    { id: 'health-info', label: 'Health Information' },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (page: NavPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs' 
          : 'bg-white/70 backdrop-blur-xs border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Wordmark (Zone 1) */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-600 to-teal-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform duration-200">
              <HeartPulse className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              Digital Medical Assistant
            </span>
          </button>

          {/* Nav Links (Zone 2) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 transition-colors hover:text-blue-600 whitespace-nowrap focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm ${
                    isActive ? 'text-blue-600 font-semibold' : 'text-slate-600'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Hub Dropdown / Action (Zone 3) */}
          <div className="hidden lg:flex items-center gap-3">
            {userEmail ? (
              <button
                onClick={onSignOut}
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500"
                title={`Signed in as ${userEmail}`}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign out</span>
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('signin')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  currentPage === 'signin'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <UserRound className="w-3.5 h-3.5" />
                <span>Sign in</span>
              </button>
            )}
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 ${
                currentPage === 'dashboard' 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Portal</span>
            </button>
            <button
              onClick={() => handleNavClick('assistant')}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs hover:shadow-sm transition-all duration-150 flex items-center gap-2 whitespace-nowrap focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-98"
            >
              <Sparkles className="w-4 h-4 text-blue-200" />
              <span>Get Started</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => handleNavClick('assistant')}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-blue-200" />
              <span>Assistant</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === item.id 
                    ? 'bg-blue-50 text-blue-700 font-semibold' 
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
            <button
              onClick={() => handleNavClick('symptoms')}
              className="p-2.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg flex items-center gap-2"
            >
              <Stethoscope className="w-4 h-4 text-teal-600" />
              <span>Symptom Guide</span>
            </button>
            <button
              onClick={() => handleNavClick('medications')}
              className="p-2.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg flex items-center gap-2"
            >
              <Pill className="w-4 h-4 text-indigo-600" />
              <span>Medications</span>
            </button>
            <button
              onClick={() => handleNavClick('appointments')}
              className="p-2.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Appointments</span>
            </button>
            <button
              onClick={() => handleNavClick('privacy')}
              className="p-2.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Privacy & DPDP</span>
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            {userEmail ? (
              <button
                onClick={onSignOut}
                className="w-full mb-2 py-2.5 px-4 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign out</span>
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('signin')}
                className="w-full mb-2 py-2.5 px-4 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center justify-center gap-2"
              >
                <UserRound className="w-4 h-4" />
                <span>Customer sign in</span>
              </button>
            )}
            <button
              onClick={() => handleNavClick('dashboard')}
              className="w-full py-2.5 px-4 text-sm font-medium text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4 text-slate-600" />
              <span>Open Patient Portal Dashboard</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
