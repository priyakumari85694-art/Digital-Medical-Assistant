import React from 'react';
import { 
  Bot, 
  Stethoscope, 
  BookOpen, 
  Pill, 
  Calendar, 
  AlertTriangle, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { NavPage } from '../types';
import { FeatureCard, FeatureItem } from '../components/FeatureCard';
import { Disclaimer } from '../components/Disclaimer';
import { EmergencyBanner } from '../components/EmergencyBanner';

interface FeaturesPageProps {
  onNavigate: (page: NavPage) => void;
}

export const Features: React.FC<FeaturesPageProps> = ({ onNavigate }) => {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Complete Platform Capabilities</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          How Digital Medical Assistant Can Help
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Explore all six core modules built into the platform to guide your healthcare journey, clarify medical terminology, and enhance doctor-patient communication.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <FeatureCard 
            key={feature.id} 
            feature={feature} 
            onSelect={onNavigate} 
          />
        ))}
      </div>

      {/* Emergency Guidance Visual Component */}
      <EmergencyBanner />

      {/* Safety Notice */}
      <Disclaimer />

    </div>
  );
};
