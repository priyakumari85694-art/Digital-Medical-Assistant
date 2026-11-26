import React from 'react';
import { AlertCircle, PhoneCall, ShieldCheck } from 'lucide-react';

interface DisclaimerProps {
  variant?: 'banner' | 'card' | 'compact';
  className?: string;
}

export const Disclaimer: React.FC<DisclaimerProps> = ({ variant = 'card', className = '' }) => {
  if (variant === 'compact') {
    return (
      <div className={`flex items-start gap-2.5 p-3 rounded-lg bg-amber-50/80 border border-amber-200/60 text-xs text-amber-900 ${className}`}>
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="font-semibold">Educational Only:</strong> Provides general health information, not medical diagnosis or treatment. Consult a physician for personal medical concerns. If experiencing an emergency, call emergency services immediately.
        </p>
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <div className={`bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white px-4 py-3 border-b border-slate-800 ${className}`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            <p className="text-slate-200">
              <strong className="text-white font-medium">Important:</strong> For educational purposes only. Does not replace professional medical diagnosis or personalized treatment.
            </p>
          </div>
          <div className="flex items-center gap-3 text-slate-300 shrink-0">
            <span className="flex items-center gap-1.5 text-amber-300 font-medium">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Medical Emergency? Dial 112 / 102</span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs ${className}`}>
      <div className="flex items-start gap-3.5">
        <div className="p-2 rounded-lg bg-blue-100/70 text-blue-700 shrink-0 mt-0.5">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="space-y-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p className="font-semibold text-slate-900">
            Important Medical Notice
          </p>
          <p>
            Digital Medical Assistant provides general health information for educational purposes only. It does not provide medical diagnosis, treatment, or professional medical advice. Always consult a qualified healthcare professional for medical concerns.
          </p>
          <p className="text-amber-800 font-medium pt-1 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>If you are experiencing a medical emergency, contact your local emergency services immediately.</span>
          </p>
        </div>
      </div>
    </div>
  );
};
