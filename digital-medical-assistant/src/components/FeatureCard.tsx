import React from 'react';
import { 
  Bot, 
  Stethoscope, 
  BookOpen, 
  Pill, 
  Calendar, 
  AlertTriangle, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { NavPage } from '../types';

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: 'bot' | 'stethoscope' | 'book' | 'pill' | 'calendar' | 'alert';
  badge?: string;
  isUrgent?: boolean;
  targetPage: NavPage;
}

interface FeatureCardProps {
  feature: FeatureItem;
  onSelect: (page: NavPage) => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature, onSelect }) => {
  const renderIcon = () => {
    switch (feature.icon) {
      case 'bot':
        return <Bot className="w-6 h-6 text-blue-600" />;
      case 'stethoscope':
        return <Stethoscope className="w-6 h-6 text-teal-600" />;
      case 'book':
        return <BookOpen className="w-6 h-6 text-indigo-600" />;
      case 'pill':
        return <Pill className="w-6 h-6 text-emerald-600" />;
      case 'calendar':
        return <Calendar className="w-6 h-6 text-sky-600" />;
      case 'alert':
        return <AlertTriangle className="w-6 h-6 text-rose-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-blue-600" />;
    }
  };

  const isUrgent = feature.isUrgent;

  return (
    <div
      onClick={() => onSelect(feature.targetPage)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(feature.targetPage);
        }
      }}
      className={`group text-left p-6 rounded-2xl transition-all duration-200 cursor-pointer flex flex-col justify-between focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 ${
        isUrgent
          ? 'bg-rose-50/70 hover:bg-rose-50 border-2 border-rose-200/90 hover:border-rose-300 shadow-xs hover:shadow-md'
          : 'bg-white hover:bg-slate-50/80 border border-slate-200/80 hover:border-blue-200 shadow-xs hover:shadow-md'
      }`}
    >
      <div>
        {/* Top Header with Icon & Meta */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div 
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${
              isUrgent ? 'bg-rose-100' : 'bg-slate-100 group-hover:bg-blue-50'
            }`}
          >
            {renderIcon()}
          </div>
          {feature.badge && (
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100/80">
              {feature.badge}
            </span>
          )}
          {isUrgent && (
            <span className="text-xs font-semibold text-rose-700 bg-rose-100 px-2.5 py-1 rounded-md border border-rose-200/80">
              Urgent Guidance
            </span>
          )}
        </div>

        {/* Title */}
        <h3 
          className={`text-lg font-bold transition-colors ${
            isUrgent ? 'text-rose-950 group-hover:text-rose-700' : 'text-slate-900 group-hover:text-blue-600'
          }`}
        >
          {feature.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          {feature.description}
        </p>
      </div>

      {/* Action footer link */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
        <span 
          className={
            isUrgent 
              ? 'text-rose-700 group-hover:text-rose-800' 
              : 'text-blue-600 group-hover:text-blue-700'
          }
        >
          {isUrgent ? 'View Emergency Protocols' : 'Explore Tool'}
        </span>
        <ArrowRight 
          className={`w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 ${
            isUrgent ? 'text-rose-600' : 'text-blue-600'
          }`} 
        />
      </div>
    </div>
  );
};
