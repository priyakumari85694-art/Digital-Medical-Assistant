import React from 'react';
import { HeartPulse, ShieldAlert, Lock, ArrowUpRight } from 'lucide-react';
import { NavPage } from '../types';

interface FooterProps {
  onNavigate: (page: NavPage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: NavPage) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Brand & Purpose */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5 text-white font-bold text-lg">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center text-white">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span>Digital Medical Assistant</span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Making healthcare information easier to understand. Combining modern web technology and educational health guidance.
            </p>
            <div className="pt-2 text-xs text-slate-500">
              <span>Prototype build for educational preview.</span>
            </div>
          </div>

          {/* Core Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Platform Tools</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button 
                  onClick={() => handleNav('assistant')}
                  className="hover:text-white transition-colors"
                >
                  AI Health Assistant
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('symptoms')}
                  className="hover:text-white transition-colors"
                >
                  Symptom Guidance
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('health-info')}
                  className="hover:text-white transition-colors"
                >
                  Health Information Library
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('medications')}
                  className="hover:text-white transition-colors"
                >
                  Medication Reference
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('appointments')}
                  className="hover:text-white transition-colors"
                >
                  Appointment Assistance
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Purpose */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button 
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('features')}
                  className="hover:text-white transition-colors"
                >
                  Features Overview
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('dashboard')}
                  className="hover:text-white transition-colors"
                >
                  User Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors"
                >
                  About the Project
                </button>
              </li>
            </ul>
          </div>

          {/* Privacy, DPDP, & Disclaimers */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Compliance & Privacy</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button 
                  onClick={() => handleNav('privacy')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5 text-teal-400" />
                  <span>Privacy & DPDP Act (India)</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors"
                >
                  Responsible AI Principles
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('privacy')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                  <span>Medical Disclaimer</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Quiet disclaimer banner in footer */}
        <div className="border-t border-slate-800/80 pt-8 pb-4 text-xs text-slate-500 space-y-2">
          <p>
            <strong className="text-slate-400 font-medium">Medical Notice:</strong> Digital Medical Assistant provides general health information for educational purposes only. It does not provide medical diagnosis, treatment, or professional medical advice. Always consult a qualified healthcare professional for medical concerns. In an emergency, contact your local emergency response service immediately.
          </p>
          <p>
            <strong className="text-slate-400 font-medium">Data Protection Notice:</strong> This educational prototype may save signed-in customer chat history and visit notes to the configured Supabase project. Do not enter real health information until the deployment has completed appropriate privacy, security, and legal review. Demonstration doctors and appointments are fictional.
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800/50 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Digital Medical Assistant. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => handleNav('privacy')} className="hover:text-slate-300">Privacy Policy</button>
            <button onClick={() => handleNav('privacy')} className="hover:text-slate-300">Terms of Use</button>
            <button onClick={() => handleNav('privacy')} className="hover:text-slate-300">Medical Disclaimer</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
