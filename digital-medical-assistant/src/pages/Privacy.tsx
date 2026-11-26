import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  FileCheck, 
  UserCheck, 
  EyeOff, 
  RefreshCw,
  PhoneCall
} from 'lucide-react';
import { Disclaimer } from '../components/Disclaimer';

export const Privacy: React.FC = () => {
  const [consentGranted, setConsentGranted] = useState(true);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200">
          <Lock className="w-3.5 h-3.5 text-teal-600" />
          <span>India DPDP Act, 2023 & Rules 2025 Framework</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Privacy & Data Protection
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          How personal information, health queries, and privacy governance are handled in Digital Medical Assistant in accordance with modern Indian data protection standards.
        </p>
      </div>

      {/* Official Privacy Notice */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg space-y-4">
        <div className="flex items-center gap-2 text-teal-300 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Core Privacy Statement</span>
        </div>
        <blockquote className="text-lg sm:text-xl font-medium text-slate-100 leading-relaxed max-w-4xl border-l-4 border-teal-400 pl-4">
          "Your privacy matters. Digital Medical Assistant is designed with privacy and responsible data handling in mind. Personal data should only be collected and processed for clearly stated purposes and handled in accordance with applicable Indian data-protection requirements, including the Digital Personal Data Protection Act, 2023 and applicable rules."
        </blockquote>
      </div>

      {/* Mandatory Prototype Educational Disclaimer */}
      <div className="bg-amber-50/90 border border-amber-200/90 rounded-2xl p-6 sm:p-7 space-y-2 text-amber-950">
        <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>Prototype Educational Disclaimer</span>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed text-amber-950 font-medium">
          "This prototype is an educational project and does not claim legal or regulatory compliance. A production healthcare application should undergo appropriate legal, security, privacy, and healthcare compliance review before handling real patient data."
        </p>
        <p className="text-xs text-amber-900/80 pt-1">
          Note: In accordance with our anti-misrepresentation standards, this platform does not claim unverified certifications such as "HIPAA Compliant", "DPDP Compliant", "100% Secure", or "Government Certified".
        </p>
      </div>

      {/* Key Architectural Data Principles under DPDP Act */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <FileCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Purpose Limitation & Transparency</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Clearly explains what personal information is collected and for what specified purpose. We collect only what is strictly necessary to answer educational health inquiries.
          </p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Explicit Consent & Withdrawal</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Obtains appropriate user consent before processing personal information where required, providing accessible mechanisms to review or withdraw consent at any time.
          </p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
            <EyeOff className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Account-Linked History</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            When Supabase is configured, signed-in customers can save assistant conversations and their own visit notes. The displayed doctors and appointments remain synthetic examples; do not enter real health information until the service has completed appropriate privacy and security review.
          </p>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Account Access Controls</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Account data is stored in the configured Supabase project with row-level access policies. Deployment owners remain responsible for provider configuration, retention, backups, monitoring, and required legal and security review.
          </p>
        </div>

      </div>

      {/* Interactive Consent Simulator Widget */}
      <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-blue-600" />
              <span>Consent Preferences Simulator</span>
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Demonstrating the DPDP requirement for clear user-controlled consent status.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-700">
              {consentGranted ? 'Consent Active' : 'Consent Withdrawn'}
            </span>
            <button
              onClick={() => setConsentGranted(!consentGranted)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 cursor-pointer ${
                consentGranted ? 'bg-teal-600 justify-end' : 'bg-slate-300 justify-start'
              }`}
              role="switch"
              aria-checked={consentGranted}
              aria-label="Toggle demo consent"
            >
              <span className="bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform" />
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          {consentGranted 
            ? 'This simulator does not control Supabase account storage. Signed-in chat and visit notes are saved to the configured project; use account controls and project policies to manage those records.'
            : 'This demo toggle does not delete records already saved to a customer account. Sign out and manage stored data through the configured account service.'}
        </p>
      </div>

      {/* Dedicated Medical Disclaimer Section */}
      <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-slate-900">
          Medical Disclaimer
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          "Digital Medical Assistant provides general health information for educational purposes only. It does not provide medical diagnosis, treatment, or professional medical advice. Always consult a qualified healthcare professional for medical concerns."
        </p>

        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-rose-900 bg-rose-50 p-4 rounded-xl">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="font-semibold">
              Emergency Notice: If you are experiencing a medical emergency, contact your local emergency services (112 / 102 in India) or seek immediate medical attention.
            </span>
          </div>
        </div>
      </section>

    </div>
  );
};
