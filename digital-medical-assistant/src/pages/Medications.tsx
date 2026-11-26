import React, { useState } from 'react';
import { 
  Pill, 
  Search, 
  AlertTriangle, 
  Info, 
  ShieldAlert, 
  ArrowRight, 
  X, 
  CheckCircle2,
  FileWarning
} from 'lucide-react';
import { MedicationItem } from '../types';
import { MEDICATIONS_DATA } from '../data/medicationData';
import { Disclaimer } from '../components/Disclaimer';

export const Medications: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMed, setSelectedMed] = useState<MedicationItem | null>(null);

  const filteredMeds = MEDICATIONS_DATA.filter((med) => {
    const q = searchQuery.toLowerCase().trim();
    return (
      !q ||
      med.name.toLowerCase().includes(q) ||
      med.genericName.toLowerCase().includes(q) ||
      med.drugClass.toLowerCase().includes(q) ||
      med.purpose.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
          <Pill className="w-3.5 h-3.5 text-emerald-600" />
          <span>Educational Reference Database</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Medication Information
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Learn general information about commonly referenced medications, including pharmacological classes, intended purposes, and vital precautions.
        </p>
      </div>

      {/* Prominent Educational Caution Banner */}
      <div className="bg-amber-50/90 border border-amber-200/90 rounded-2xl p-4 sm:p-5 text-xs sm:text-sm text-amber-950 flex items-start gap-3.5 shadow-2xs">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <p className="font-bold text-amber-900">
            Important Educational Disclaimer:
          </p>
          <p className="mt-0.5 text-amber-950">
            This information is for educational purposes and should not be used as a substitute for advice from a doctor or pharmacist. This tool does not provide personalized dosage recommendations. Always follow prescription instructions provided by your licensed healthcare provider.
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-xl">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search medication (e.g. Paracetamol, Ibuprofen, Amoxicillin)..."
          className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 shadow-2xs"
        />
      </div>

      {/* Medication Cards Grid */}
      {filteredMeds.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeds.map((med) => (
            <div
              key={med.id}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-200 group"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {med.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Generic: {med.genericName}
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Pill className="w-4 h-4" />
                  </div>
                </div>

                <div className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md inline-block mb-3 border border-teal-100">
                  {med.drugClass}
                </div>

                {/* General Purpose */}
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                    General Purpose
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {med.purpose}
                  </p>
                </div>

                {/* Common Uses */}
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                    Common Uses
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {med.commonUses.slice(0, 2).map((use, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{use}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Important Precautions */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 space-y-1">
                  <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">
                    Important Precautions
                  </span>
                  <p className="line-clamp-2 text-slate-600 leading-relaxed">
                    {med.importantPrecautions[0]}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setSelectedMed(med)}
                  className="w-full py-2 px-3 text-xs font-semibold text-blue-600 hover:text-white bg-blue-50 hover:bg-blue-600 rounded-lg transition-colors flex items-center justify-center gap-1.5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <Pill className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No medications found</h3>
          <p className="text-xs text-slate-500">
            We couldn't find a medicine matching "{searchQuery}".
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 underline"
          >
            Reset search
          </button>
        </div>
      )}

      {/* Detailed Modal */}
      {selectedMed && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedMed(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              aria-label="Close medication modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Pill className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {selectedMed.name}
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Generic: {selectedMed.genericName} · {selectedMed.drugClass}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed mb-6">
              <strong className="text-slate-900 block mb-1">Pharmacological Purpose:</strong>
              {selectedMed.purpose}
            </div>

            <div className="space-y-4 mb-6">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Common Uses
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600">
                {selectedMed.commonUses.map((use, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 mb-6">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Important Precautions
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                {selectedMed.importantPrecautions.map((prec, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                    <span>{prec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-950 space-y-2 mb-6">
              <div className="flex items-center gap-2 font-bold text-rose-900">
                <FileWarning className="w-4 h-4 text-rose-600" />
                <span>Critical Safety Notes</span>
              </div>
              <ul className="space-y-1 text-rose-900/90">
                {selectedMed.warnings.map((warn, idx) => (
                  <li key={idx}>• {warn}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedMed(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold"
              >
                Close Reference
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Safety Notice */}
      <Disclaimer />

    </div>
  );
};
