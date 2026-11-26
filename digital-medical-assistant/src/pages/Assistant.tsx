import React from 'react';
import { Bot, ShieldCheck, Sparkles, AlertTriangle, ArrowLeft } from 'lucide-react';
import { NavPage } from '../types';
import { Chatbot } from '../components/Chatbot';
import { Disclaimer } from '../components/Disclaimer';

interface AssistantPageProps {
  onNavigate: (page: NavPage) => void;
}

export const Assistant: React.FC<AssistantPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              AI Health Assistant
            </h1>
            <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-md">
              Interactive Preview
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-600 max-w-2xl">
            Ask health-related questions and receive easy-to-understand educational explanations. Ready for future Google Gemini integration.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200/90 rounded-xl px-3.5 py-2 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium text-slate-800">Online & Ready</span>
          <span aria-hidden="true">·</span>
          <span>Educational Mock Mode</span>
        </div>
      </div>

      {/* Main Grid: Chatbot on left/center + Safety guidelines on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Chatbot Window */}
        <div className="lg:col-span-8">
          <Chatbot embedded={false} />
        </div>

        {/* Sidebar Information & Disclaimers */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Medical Notice */}
          <Disclaimer />

          {/* How this assistant helps */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>What You Can Ask</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Explaining non-urgent symptoms in accessible terms</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Sleep hygiene and everyday recovery strategies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>General purpose and safety precautions for common medicines</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Structuring questions to ask during your doctor's appointment</span>
              </li>
            </ul>
          </div>

          {/* What this assistant CANNOT do */}
          <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-5 text-xs text-rose-950 space-y-2">
            <h3 className="text-sm font-bold text-rose-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Important Boundaries</span>
            </h3>
            <p className="leading-relaxed text-rose-900/90">
              This system does not provide medical diagnosis, prescribe pharmaceutical treatments, or handle medical emergencies.
            </p>
            <p className="font-semibold text-rose-950 pt-1">
              If you suspect an emergency, immediately dial 112 / 102.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
