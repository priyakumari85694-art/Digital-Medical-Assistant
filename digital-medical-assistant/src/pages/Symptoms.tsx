import React, { useState } from 'react';
import { 
  Stethoscope, 
  AlertCircle, 
  HelpCircle, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  Sparkles,
  ShieldCheck,
  HeartPulse
} from 'lucide-react';
import { SymptomSeverity, SymptomGuidanceResult } from '../types';
import { Disclaimer } from '../components/Disclaimer';
import { EmergencyBanner } from '../components/EmergencyBanner';

export const Symptoms: React.FC = () => {
  const [symptomsText, setSymptomsText] = useState('');
  const [duration, setDuration] = useState('1-3 days');
  const [severity, setSeverity] = useState<SymptomSeverity>('low');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SymptomGuidanceResult | null>(null);

  const durationOptions = [
    { value: 'under-24h', label: 'Less than 24 hours' },
    { value: '1-3 days', label: '1 to 3 days' },
    { value: '4-7 days', label: '4 to 7 days' },
    { value: '1-2 weeks', label: '1 to 2 weeks' },
    { value: 'more-than-2-weeks', label: 'More than 2 weeks' }
  ];

  const handleGetGuidance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptomsText.trim()) return;

    setIsLoading(true);
    setResult(null);

    // Simulate analysis delay
    setTimeout(() => {
      const lower = symptomsText.toLowerCase();
      let factors = [
        'Routine muscular fatigue, physical tension, or postural strain',
        'Inadequate hydration, electrolyte imbalance, or irregular meal times',
        'Mild viral exposure, seasonal atmospheric shifts, or sleep disruption'
      ];

      if (lower.includes('headache') || lower.includes('migraine')) {
        factors = [
          'Dehydration or missed fluids during high-temperature periods',
          'Prolonged screen glare, digital eye fatigue, or neck posture tension',
          'Irregular sleep patterns or elevated daily stress levels'
        ];
      } else if (lower.includes('stomach') || lower.includes('nausea') || lower.includes('digest')) {
        factors = [
          'Mild dietary sensitivity, spicy foods, or rapid eating',
          'Temporary gastrointestinal viral or bacterial irritation',
          'Stress-related gastric motility changes'
        ];
      }

      setResult({
        summary: 'Based on the information provided, there are several possible general explanations. This information is not a diagnosis. Consider speaking with a healthcare professional if symptoms persist or worsen.',
        possibleGeneralFactors: factors,
        selfCareTips: [
          'Ensure consistent hydration with water or electrolyte-balanced fluids.',
          'Get 7–9 hours of restful sleep and avoid strenuous overexertion.',
          'Keep a brief symptom log noting any specific food, timing, or activity triggers.'
        ],
        whenToSeeDoctor: [
          'Symptoms persist longer than typical (e.g. fever >3 days or pain >1 week).',
          'Pain or discomfort progressively intensifies instead of subsiding.',
          'You develop high fever, inability to retain fluids, or unusual dizziness.'
        ],
        urgencyLevel: severity === 'severe' ? 'prompt_attention' : severity === 'moderate' ? 'monitor' : 'routine',
        disclaimer: 'This guidance is an educational demonstration prototype only. It does not replace an in-person physical clinical examination.'
      });
      setIsLoading(false);
    }, 700);
  };

  const handleReset = () => {
    setSymptomsText('');
    setDuration('1-3 days');
    setSeverity('low');
    setAdditionalInfo('');
    setResult(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200">
          <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
          <span>Educational Assessment Tool</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Symptom Guidance
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Describe what you are experiencing to receive general, educational information about possible non-emergency explanations and when consulting a healthcare provider may be appropriate.
        </p>
      </div>

      {/* Emergency Guidance Banner */}
      <EmergencyBanner />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Input Form (Left 6-7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
          <form onSubmit={handleGetGuidance} className="space-y-6">
            
            {/* Symptoms Input */}
            <div>
              <label htmlFor="symptoms-input" className="block text-sm font-bold text-slate-900 mb-1.5">
                What symptoms are you experiencing? <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="symptoms-input"
                rows={4}
                required
                value={symptomsText}
                onChange={(e) => setSymptomsText(e.target.value)}
                placeholder="E.g., Mild headache and slight fatigue since this morning after working at my computer..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all resize-y"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Describe the sensation, location, and what you were doing when it began.
              </p>
            </div>

            {/* Duration Dropdown */}
            <div>
              <label htmlFor="duration-select" className="block text-sm font-bold text-slate-900 mb-1.5">
                How long have you experienced them?
              </label>
              <select
                id="duration-select"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all"
              >
                {durationOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Severity Radio/Buttons */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                How severe are they?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['low', 'moderate', 'severe'] as SymptomSeverity[]).map((level) => {
                  const isSelected = severity === level;
                  const labels = {
                    low: 'Low (Mild annoyance, manageable)',
                    moderate: 'Moderate (Interferes with activities)',
                    severe: 'Severe (Intense, highly distressing)'
                  };
                  return (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setSeverity(level)}
                      className={`p-3 rounded-xl border text-left transition-all text-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 ${
                        isSelected
                          ? level === 'severe'
                            ? 'bg-rose-50 border-rose-300 text-rose-950 font-bold ring-1 ring-rose-300'
                            : 'bg-blue-50 border-blue-400 text-blue-900 font-bold ring-1 ring-blue-400'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="capitalize font-bold text-sm">
                        {level}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                        {level === 'low' && 'Mild, daily tasks ok'}
                        {level === 'moderate' && 'Noticeable, uncomfortable'}
                        {level === 'severe' && 'Disruptive or intense'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional Additional Info */}
            <div>
              <label htmlFor="additional-input" className="block text-sm font-bold text-slate-900 mb-1.5">
                Optional additional context <span className="text-xs font-normal text-slate-400">(e.g., fever, allergies, age group)</span>
              </label>
              <input
                id="additional-input"
                type="text"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="E.g., No fever, took a multivitamin, worked outside in warm weather"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                disabled={!symptomsText.trim() || isLoading}
                className="flex-1 py-3 px-6 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-200 text-white disabled:text-slate-400 font-bold rounded-xl text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Preparing Guidance...</span>
                  </>
                ) : (
                  <>
                    <span>Get Guidance</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="py-3 px-4 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl text-xs font-semibold transition-colors"
                title="Reset form"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

          </form>
        </div>

        {/* Results & Educational Context (Right 5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {result ? (
            <div className="bg-white rounded-2xl border border-teal-200/90 p-6 sm:p-7 shadow-sm space-y-5 animate-in fade-in duration-200">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                    <HeartPulse className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Guidance Summary</h3>
                    <span className="text-[10px] text-slate-400">Educational Review</span>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                  result.urgencyLevel === 'prompt_attention'
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : result.urgencyLevel === 'monitor'
                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}>
                  {result.urgencyLevel === 'prompt_attention' ? 'Medical Evaluation Advised' : 'Self-Monitoring'}
                </span>
              </div>

              {/* Primary Demo Result Text */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {result.summary}
              </div>

              {/* General Factors */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  General Possible Explanations
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {result.possibleGeneralFactors.map((factor, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Supportive Self-Care Tips */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Supportive Self-Care
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {result.selfCareTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* When to see doctor */}
              <div className="bg-amber-50/80 border border-amber-200/80 p-3.5 rounded-xl text-xs text-amber-950">
                <h4 className="font-bold mb-1.5 flex items-center gap-1.5 text-amber-900">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>When to Consult a Physician</span>
                </h4>
                <ul className="space-y-1 text-slate-700">
                  {result.whenToSeeDoctor.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ) : (
            <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">No Assessment Active</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                Fill in the symptoms above and click "Get Guidance" to see educational factors, self-care points, and doctor visit signals.
              </p>
            </div>
          )}

          {/* Standard Medical Disclaimer */}
          <Disclaimer variant="compact" />

        </div>

      </div>

    </div>
  );
};
