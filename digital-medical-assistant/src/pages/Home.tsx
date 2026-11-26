import React from 'react';
import { 
  Clock, 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  ShieldCheck, 
  Lock,
  HeartPulse,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { NavPage } from '../types';
import { Hero } from '../components/Hero';
import { FeatureCard, FeatureItem } from '../components/FeatureCard';
import { Chatbot } from '../components/Chatbot';
import { Disclaimer } from '../components/Disclaimer';
import { EmergencyBanner } from '../components/EmergencyBanner';

interface HomeProps {
  onNavigate: (page: NavPage) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const features: FeatureItem[] = [
    {
      id: 'ai-assistant',
      title: 'AI Health Assistant',
      description: 'Ask health-related questions and receive easy-to-understand information.',
      icon: 'bot',
      badge: 'Coming Soon',
      targetPage: 'assistant'
    },
    {
      id: 'symptom-guidance',
      title: 'Symptom Guidance',
      description: 'Describe symptoms and explore general information about possible causes and when professional care may be appropriate.',
      icon: 'stethoscope',
      targetPage: 'symptoms'
    },
    {
      id: 'health-info',
      title: 'Health Information',
      description: 'Explore understandable information about common health topics and conditions.',
      icon: 'book',
      targetPage: 'health-info'
    },
    {
      id: 'medication-info',
      title: 'Medication Information',
      description: 'Learn general information about medications, common uses, and important precautions.',
      icon: 'pill',
      targetPage: 'medications'
    },
    {
      id: 'appointment-assist',
      title: 'Appointment Assistance',
      description: 'Prepare for appointments and keep important questions and information organized.',
      icon: 'calendar',
      targetPage: 'appointments'
    },
    {
      id: 'emergency-guidance',
      title: 'Emergency Guidance',
      description: 'Quickly find guidance on when symptoms may require urgent professional attention.',
      icon: 'alert',
      isUrgent: true,
      targetPage: 'symptoms'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. Hero Section */}
      <Hero onNavigate={onNavigate} />

      {/* 2. Trust / Introduction Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-blue-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">
              Educational Healthcare Platform
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Healthcare information, made simpler.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Navigating healthcare shouldn't feel overwhelming. Digital Medical Assistant is designed to help you understand health information, symptoms, medications, and general wellness topics in clear, respectful, plain language.
            </p>
          </div>

          {/* 3 statistics-style cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 pt-8 border-t border-slate-800">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">24/7 Access</h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Available around the clock to help you explore general wellness queries whenever questions arise.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xs">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Easy to Understand</h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Translating intricate clinical vocabulary into plain, accessible explanations without sacrificing scientific rigor.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xs">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">AI-Powered — Coming Soon</h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Engineered with a clean service abstraction, ready for future seamless Google Gemini API integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How Digital Medical Assistant Can Help
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Thoughtfully constructed modular tools to empower your personal health literacy and optimize doctor-patient communication.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard 
              key={feature.id} 
              feature={feature} 
              onSelect={onNavigate} 
            />
          ))}
        </div>
      </section>

      {/* 4. Large AI Assistant Section with Chatbot & Safety Disclaimer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100/70 border border-slate-200/80 rounded-3xl p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Header & Context */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  Interactive Assistant
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
                  Meet Your Digital Medical Assistant
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-3">
                  An intelligent assistant designed to make health information easier to understand. Try asking about everyday symptoms, sleep habits, or when to schedule a visit with your physician.
                </p>
              </div>

              {/* Noticeable Safety Disclaimer */}
              <Disclaimer />

              {/* Feature Highlights */}
              <div className="space-y-3 pt-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Pre-configured with safe, evidence-grounded educational guidance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Interactive suggestions to guide your inquiries</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>No account or personal data collection required to test</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('assistant')}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-2 transition-colors"
                >
                  <span>Open Fullscreen Chatbot</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Chatbot Interface */}
            <div className="lg:col-span-7">
              <Chatbot embedded={true} />
            </div>

          </div>
        </div>
      </section>

      {/* 5. Emergency Guidance & DPDP Privacy Trust Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <EmergencyBanner />

        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-3.5 max-w-2xl">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div className="text-xs text-slate-600 leading-relaxed">
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                Data Protection & Privacy Framework
              </h4>
              <p>
                Digital Medical Assistant is architected with privacy and responsible handling in mind. Aligned with the principles of India's Digital Personal Data Protection Act, 2023 (DPDP Act) and applicable rules.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('privacy')}
            className="shrink-0 px-4 py-2 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors whitespace-nowrap"
          >
            Read DPDP Policy
          </button>
        </div>
      </section>

    </div>
  );
};
