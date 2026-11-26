import React, { useState } from 'react';
import { AlertTriangle, PhoneCall, ChevronDown, ChevronUp, Clock, HeartPulse } from 'lucide-react';

export const EmergencyBanner: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const urgentSigns = [
    'Sudden chest pain, tightness, or pressure radiating to the jaw, neck, or left arm',
    'Sudden severe shortness of breath or difficulty breathing',
    'Sudden numbness, facial droop, or weakness on one side of the body',
    'Sudden severe "thunderclap" headache unlike any previously experienced',
    'Uncontrolled severe bleeding or direct head trauma with loss of consciousness',
    'Severe allergic reaction (swelling of lips, tongue, or throat with wheezing)'
  ];

  return (
    <div className="rounded-2xl border-2 border-rose-200 bg-rose-50/70 p-5 sm:p-6 transition-all duration-200 shadow-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-rose-950">
                Emergency & Urgent Guidance
              </h3>
              <span className="text-[11px] font-semibold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                Immediate Action
              </span>
            </div>
            <p className="text-xs sm:text-sm text-rose-800/90 mt-1 max-w-2xl leading-relaxed">
              If you or someone near you experiences life-threatening symptoms, do not use an online tool. Seek immediate medical attention.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
          <a
            href="tel:112"
            className="flex-1 sm:flex-none px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-xs flex items-center justify-center gap-2 transition-colors"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call 112 / 102</span>
          </a>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3 py-2 text-xs font-medium text-rose-800 hover:bg-rose-100 rounded-lg border border-rose-200 flex items-center gap-1.5 transition-colors"
          >
            <span>{isExpanded ? 'Hide Signs' : 'Red Flags'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-rose-200/80 space-y-3 animate-in fade-in duration-150">
          <p className="text-xs font-semibold text-rose-950 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-rose-600" />
            <span>Symptoms requiring emergency room (ER) or ambulance dispatch:</span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-rose-900">
            {urgentSigns.map((sign, idx) => (
              <div key={idx} className="flex items-start gap-2 bg-white/70 p-2.5 rounded-lg border border-rose-100">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{sign}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
