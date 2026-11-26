import React from 'react';
import { 
  Bot, 
  Stethoscope, 
  BookOpen, 
  Pill, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Activity,
  Heart,
  Droplets,
  ShieldCheck
} from 'lucide-react';
import { NavPage } from '../types';
import { Disclaimer } from '../components/Disclaimer';

interface DashboardProps {
  onNavigate: (page: NavPage) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const quickActions = [
    {
      title: 'Ask AI Assistant',
      description: 'Get immediate answers to health questions in plain language.',
      icon: Bot,
      color: 'bg-blue-50 text-blue-600',
      page: 'assistant' as NavPage
    },
    {
      title: 'Symptom Guidance',
      description: 'Review possible causes and learn when to consult a doctor.',
      icon: Stethoscope,
      color: 'bg-teal-50 text-teal-600',
      page: 'symptoms' as NavPage
    },
    {
      title: 'Health Information',
      description: 'Search articles on nutrition, sleep, and preventative care.',
      icon: BookOpen,
      color: 'bg-indigo-50 text-indigo-600',
      page: 'health-info' as NavPage
    },
    {
      title: 'Medications',
      description: 'Research medication uses, side effects, and precautions.',
      icon: Pill,
      color: 'bg-emerald-50 text-emerald-600',
      page: 'medications' as NavPage
    },
    {
      title: 'Appointments',
      description: 'Manage upcoming visits and prepare questions for your doctor.',
      icon: Calendar,
      color: 'bg-sky-50 text-sky-600',
      page: 'appointments' as NavPage
    }
  ];

  const recentActivity = [
    {
      action: 'Asked about headaches',
      timestamp: 'Today, 10:19 AM',
      category: 'AI Assistant',
      target: 'assistant' as NavPage
    },
    {
      action: 'Viewed sleep information',
      timestamp: 'Yesterday, 8:45 PM',
      category: 'Health Guide',
      target: 'health-info' as NavPage
    },
    {
      action: 'Prepared appointment questions',
      timestamp: 'Oct 05, 2026',
      category: 'Doctor Visit',
      target: 'appointments' as NavPage
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-teal-600 to-indigo-700 rounded-3xl p-6 sm:p-10 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-blue-100">
            <span>Welcome back</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Good morning 👋
          </h1>
          <p className="text-blue-100 text-base sm:text-lg">
            How can we help you today? Explore quick tools below or ask your assistant any health query.
          </p>
        </div>
      </div>

      {/* 5 Quick Action Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            Healthcare Tools & Actions
          </h2>
          <span className="text-xs text-slate-500">Fast access</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {quickActions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => onNavigate(item.page)}
                className="bg-white hover:bg-slate-50/80 border border-slate-200/90 hover:border-blue-300 p-5 rounded-2xl text-left transition-all duration-200 shadow-xs hover:shadow-md flex flex-col justify-between group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Two Column Layout: Recent Activity & Daily Wellness Check */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Recent Activity */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <h3 className="text-base font-bold text-slate-900">Recent Activity</h3>
            </div>
            <span className="text-xs text-slate-400">Prototype Demo History</span>
          </div>

          <div className="space-y-3">
            {recentActivity.map((activity, idx) => (
              <div
                key={idx}
                onClick={() => onNavigate(activity.target)}
                className="p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-100 hover:border-blue-200 transition-colors flex items-center justify-between gap-3 cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {activity.action}
                    </h4>
                    <span className="text-[11px] text-slate-500">
                      {activity.category} · {activity.timestamp}
                    </span>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>
            ))}
          </div>

          <div className="pt-2 text-[11px] text-slate-400">
            Note: All demonstration activity is saved only within your local browser session.
          </div>
        </div>

        {/* Right Column: Daily Wellness Reminder & Next Appointment */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Next Scheduled Appointment Widget */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <h4 className="text-sm font-bold text-slate-900">Next Appointment</h4>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                In 8 days
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <p className="text-sm font-bold text-slate-900">Dr. Sarah Johnson</p>
              <p className="text-xs text-blue-600 font-medium">General Physician · Metro Wellness</p>
              <p className="text-xs text-slate-500 pt-1">October 15, 2026 at 10:30 AM</p>
            </div>

            <button
              onClick={() => onNavigate('appointments')}
              className="w-full py-2 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <span>View Appointment Preparation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Disclaimer */}
          <Disclaimer variant="compact" />

        </div>

      </div>

    </div>
  );
};
