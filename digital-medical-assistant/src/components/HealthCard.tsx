import React, { useState } from 'react';
import { 
  BookOpen, 
  Moon, 
  Droplets, 
  Apple, 
  Brain, 
  Activity, 
  ShieldCheck, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { HealthTopic } from '../types';

interface HealthCardProps {
  topic: HealthTopic;
}

export const HealthCard: React.FC<HealthCardProps> = ({ topic }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const getIcon = () => {
    switch (topic.iconName) {
      case 'Moon':
        return <Moon className="w-5 h-5 text-indigo-600" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5 text-sky-600" />;
      case 'Apple':
        return <Apple className="w-5 h-5 text-emerald-600" />;
      case 'Brain':
        return <Brain className="w-5 h-5 text-purple-600" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-rose-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-teal-600" />;
      default:
        return <BookOpen className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-200 group">
        <div>
          {/* Header & Meta */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-blue-50 flex items-center justify-center transition-colors">
              {getIcon()}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-medium text-slate-600">{topic.category}</span>
              <span aria-hidden="true">·</span>
              <span>{topic.readTime}</span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {topic.title}
          </h3>

          <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">
            {topic.shortDescription}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => setModalOpen(true)}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
          >
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Modal View for Article */}
      {modalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              aria-label="Close article modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs text-blue-700 font-semibold mb-2">
              <span className="bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">{topic.category}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500">{topic.readTime}</span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              {topic.title}
            </h2>

            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-700 leading-relaxed">
              {topic.overview}
            </div>

            <div className="mt-6 space-y-4">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Key Takeaways</span>
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                {topic.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 space-y-3">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Practical Behavioral Tips
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                {topic.practicalTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold">When to Consult a Physician:</strong> {topic.whenToConsult}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
