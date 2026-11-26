import React from 'react';
import { 
  HeartHandshake, 
  Sparkles, 
  Eye, 
  ShieldCheck, 
  Lock, 
  Stethoscope, 
  Users, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import { NavPage } from '../types';
import { Disclaimer } from '../components/Disclaimer';

interface AboutProps {
  onNavigate: (page: NavPage) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  const corePillars = [
    {
      title: 'Accessibility',
      description: 'Healthcare guidance should be easily readable and available to everyone, regardless of medical background or jargon knowledge.',
      icon: Eye,
      accent: 'text-blue-600 bg-blue-50'
    },
    {
      title: 'Simplicity',
      description: 'Clear, uncluttered user experiences that eliminate cognitive friction during moments when you or a loved one feel unwell.',
      icon: Sparkles,
      accent: 'text-teal-600 bg-teal-50'
    },
    {
      title: 'Responsible AI',
      description: 'Strict ethical guardrails that emphasize educational exploration, transparency, and explicit disclaimers without overpromising diagnosis.',
      icon: ShieldCheck,
      accent: 'text-indigo-600 bg-indigo-50'
    },
    {
      title: 'Privacy by Design',
      description: 'Zero unauthorized surveillance. Modeled around India\'s Digital Personal Data Protection Act, 2023 with minimal data collection principles.',
      icon: Lock,
      accent: 'text-emerald-600 bg-emerald-50'
    },
    {
      title: 'Human Healthcare is Essential',
      description: 'AI cannot touch, auscultate, or physically evaluate a patient. Technology must support, never supplant, licensed physicians and nurses.',
      icon: Stethoscope,
      accent: 'text-rose-600 bg-rose-50'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Top Hero Statement */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
          <HeartHandshake className="w-3.5 h-3.5 text-blue-600" />
          <span>Our Guiding Purpose</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Technology designed to make healthcare information more accessible.
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Digital Medical Assistant was created to combine modern web engineering and conversational AI paradigms to bridge the gap between dense clinical literature and everyday individuals seeking reliable health literacy.
        </p>
      </div>

      {/* Visual Image Feature Block */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-md bg-white">
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-100">
          <img
            src="/src/assets/images/health_wellness_science_1791393635419.jpg"
            alt="Modern preventive medicine and health science tools"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 text-white max-w-2xl">
            <h3 className="text-xl sm:text-2xl font-bold">Bridging Clinical Science and Daily Wellness</h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Empowering proactive patient preparation so consultations with doctors become deeper, more collaborative, and more effective.
            </p>
          </div>
        </div>
      </div>

      {/* 5 Core Pillars Grid */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Our Foundation
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Five Principles Guiding Our Architecture
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {corePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-3"
              >
                <div className={`w-10 h-10 rounded-xl ${pillar.accent} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Collaboration with Clinicians Callout */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-4">
        <div className="flex items-center gap-2 text-teal-400 text-xs font-semibold uppercase tracking-wider">
          <Users className="w-4 h-4" />
          <span>Doctor-Patient Collaboration</span>
        </div>
        <h3 className="text-2xl font-bold text-white max-w-2xl">
          We believe technology should enhance, not replace, the physician's human touch.
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">
          A physical examination, tactile assessment, auscultation with a stethoscope, and clinical intuition formed over decades of practice cannot be replicated by algorithms. Digital Medical Assistant acts as a conversational primer — organizing your observations, symptom timelines, and questions so you can make the absolute most of every minute spent with your healthcare provider.
        </p>

        <div className="pt-4 flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate('assistant')}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
          >
            <span>Try AI Health Assistant</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigate('privacy')}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
          >
            <span>Read DPDP Privacy Architecture</span>
          </button>
        </div>
      </div>

      {/* Safety Notice */}
      <Disclaimer />

    </div>
  );
};
