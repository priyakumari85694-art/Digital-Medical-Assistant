import React from 'react';
import { 
  Bot, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  BookOpen, 
  ShieldCheck, 
  Activity, 
  CheckCircle2,
  HeartPulse
} from 'lucide-react';
import { NavPage } from '../types';

interface HeroProps {
  onNavigate: (page: NavPage) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-blue-50/50 via-white to-slate-50/30">
      
      {/* Subtle ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headings & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Context tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/70 text-xs font-semibold text-blue-800">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Next-Generation Healthcare Information Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] text-balance">
              Your Digital <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-600 to-blue-700">
                Medical Assistant
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
              Smart, accessible healthcare information whenever you need it. Understand symptoms, research medications, and prepare for doctor visits with clarity and confidence.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('assistant')}
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-98"
              >
                <Bot className="w-5 h-5 text-blue-200 group-hover:scale-110 transition-transform" />
                <span>Talk to AI Assistant</span>
                <ArrowRight className="w-4 h-4 text-blue-200 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('features')}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-base border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all duration-200 flex items-center justify-center gap-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <span>Explore Features</span>
              </button>
            </div>

            {/* Anti-Slop Non-Claim Footnote */}
            <div className="pt-3 flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
              <span>For educational health guidance · Does not provide clinical medical diagnosis</span>
            </div>

          </div>

          {/* Right Column: Visual Healthcare Interface with Floating Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Card / Graphic Frame */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 bg-white shadow-xl shadow-blue-900/5 group">
                
                {/* Visual Image Asset */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gradient-to-br from-blue-100 via-teal-50 to-slate-100">
                  <img
                    src="/src/assets/images/hero_medical_consultation_1791393623824.jpg"
                    alt="Clinician discussing healthcare guidance with digital assistance"
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Resilient CSS Fallback if asset is unavailable
                      const target = e.currentTarget;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
                  
                  {/* Badge on Image */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                    <span className="font-semibold flex items-center gap-1.5 drop-shadow-sm">
                      <HeartPulse className="w-4 h-4 text-teal-300" />
                      <span>Digital Medical Assistant Preview</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-[11px] font-medium border border-white/20">
                      Interactive
                    </span>
                  </div>
                </div>

                {/* Simulated Assistant UI Widget underneath */}
                <div className="p-5 bg-white space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                        DMA
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Health Inquiry Desk</div>
                        <div className="text-[11px] text-emerald-600 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Ready to assist</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">Session Active</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 flex items-start gap-2.5">
                    <Activity className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900">What would you like to explore today?</p>
                      <p className="text-slate-500 text-[11px] mt-0.5">Explore symptoms, understand medications, or review doctor visit checklists.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Card 1: Health Information (Top-Left) */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-lg border border-slate-200/80 flex items-center gap-3 animate-in fade-in duration-300">
                <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Health Information</div>
                  <div className="text-[10px] text-slate-500">Verified educational topics</div>
                </div>
              </div>

              {/* Floating Card 2: AI Assistance (Top-Right) */}
              <div className="absolute top-12 -right-3 sm:-right-6 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-lg border border-slate-200/80 flex items-center gap-3 animate-in fade-in duration-300">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">AI Assistance</div>
                  <div className="text-[10px] text-blue-600 font-medium">Natural language support</div>
                </div>
              </div>

              {/* Floating Card 3: 24/7 Availability (Bottom-Right) */}
              <div className="absolute -bottom-5 right-4 sm:-right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-lg border border-slate-200/80 flex items-center gap-3 animate-in fade-in duration-300">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">24/7 Availability</div>
                  <div className="text-[10px] text-emerald-600 font-medium">Always accessible guidance</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
