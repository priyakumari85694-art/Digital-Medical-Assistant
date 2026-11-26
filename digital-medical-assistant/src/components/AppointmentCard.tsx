import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  UserCheck, 
  ClipboardList, 
  CheckCircle, 
  X,
  FileText
} from 'lucide-react';
import { Appointment } from '../types';

interface AppointmentCardProps {
  appointment: Appointment;
  onPrepare: (appointment: Appointment) => void;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, onPrepare }) => {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-200 p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                <UserCheck className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {appointment.doctorName}
                </h3>
                <p className="text-xs font-semibold text-blue-600">
                  {appointment.specialty}
                </p>
              </div>
            </div>
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border ${
              appointment.mode === 'Video Consultation'
                ? 'bg-purple-50 text-purple-700 border-purple-100'
                : 'bg-emerald-50 text-emerald-700 border-emerald-100'
            }`}>
              {appointment.mode}
            </span>
          </div>

          {/* Logistics meta */}
          <div className="space-y-2 py-3 border-y border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="font-medium text-slate-800">{appointment.date}</span>
              <span aria-hidden="true">·</span>
              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{appointment.time}</span>
            </div>

            <div className="flex items-start gap-2">
              {appointment.mode === 'Video Consultation' ? (
                <Video className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
              ) : (
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              )}
              <span className="line-clamp-1">{appointment.clinic}</span>
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500 italic line-clamp-2">
            "{appointment.notes}"
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 pt-3 flex items-center gap-2">
          <button
            onClick={() => setDetailsOpen(true)}
            className="flex-1 py-2 px-3 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-center"
          >
            View Details
          </button>
          <button
            onClick={() => onPrepare(appointment)}
            className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs hover:shadow-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <ClipboardList className="w-3.5 h-3.5" />
            <span>Prepare</span>
          </button>
        </div>
      </div>

      {/* Details Modal */}
      {detailsOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setDetailsOpen(false)}
              className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              aria-label="Close appointment details"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{appointment.doctorName}</h3>
                <p className="text-xs font-semibold text-blue-600">{appointment.specialty}</p>
                <p className="text-xs text-slate-500">{appointment.clinic}</p>
              </div>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-xl text-xs text-slate-700">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Date & Time:</span>
                <span className="font-semibold text-slate-900">{appointment.date} at {appointment.time}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Consultation Mode:</span>
                <span className="font-semibold text-slate-900">{appointment.mode}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Location / Connection:</span>
                <span className="font-medium text-slate-900 text-right max-w-[240px] truncate">{appointment.addressOrLink}</span>
              </div>
              <div className="py-1">
                <span className="text-slate-500 block mb-1">Clinical Notes & Objective:</span>
                <p className="text-slate-800 leading-relaxed">{appointment.notes}</p>
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => {
                  setDetailsOpen(false);
                  onPrepare(appointment);
                }}
                className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-2"
              >
                <ClipboardList className="w-4 h-4" />
                <span>Prepare Visit Questions</span>
              </button>
              <button
                onClick={() => setDetailsOpen(false)}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
