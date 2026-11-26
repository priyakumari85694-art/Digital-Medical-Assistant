import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Copy, 
  Check, 
  ClipboardCheck, 
  HelpCircle,
  X,
  Search,
  MapPin,
  Phone,
  Mail,
  Stethoscope
} from 'lucide-react';
import { Appointment, DoctorQuestion } from '../types';
import { DOCTORS, INITIAL_APPOINTMENTS, INITIAL_QUESTIONS } from '../data/appointmentData';
import { AppointmentCard } from '../components/AppointmentCard';
import { Disclaimer } from '../components/Disclaimer';
import { NavPage } from '../types';
import { useAuth } from '../AuthContext';
import { loadVisitNotes, saveVisitNote, SavedVisitNote } from '../services/accountData';

interface AppointmentsProps {
  onNavigate: (page: NavPage) => void;
}

export const Appointments: React.FC<AppointmentsProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [appointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [questions, setQuestions] = useState<DoctorQuestion[]>(INITIAL_QUESTIONS);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionCategory, setNewQuestionCategory] = useState('General');
  const [copiedChecklist, setCopiedChecklist] = useState(false);
  const [activePrepModal, setActivePrepModal] = useState<Appointment | null>(null);
  const [visitNotes, setVisitNotes] = useState<Record<string, SavedVisitNote>>({});
  const [visitNoteDraft, setVisitNoteDraft] = useState('');
  const [visitNoteStatus, setVisitNoteStatus] = useState('');
  const [savingVisitNote, setSavingVisitNote] = useState(false);
  const [doctorSearch, setDoctorSearch] = useState('');

  const filteredDoctors = DOCTORS.filter((doctor) =>
    `${doctor.name} ${doctor.specialty} ${doctor.city}`
      .toLowerCase()
      .includes(doctorSearch.trim().toLowerCase())
  );

  React.useEffect(() => {
    let active = true;
    if (!user) {
      setVisitNotes({});
      return () => { active = false; };
    }

    void loadVisitNotes(user.id)
      .then((savedNotes) => {
        if (active) {
          setVisitNotes(Object.fromEntries(savedNotes.map((note) => [note.appointment_id, note])));
        }
      })
      .catch(() => {
        if (active) setVisitNoteStatus('Saved visit notes could not be loaded. Check your account data setup and try again.');
      });

    return () => { active = false; };
  }, [user?.id]);

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    const newQ: DoctorQuestion = {
      id: `q-${Date.now()}`,
      text: newQuestionText.trim(),
      category: newQuestionCategory,
      checked: false
    };

    setQuestions([...questions, newQ]);
    setNewQuestionText('');
  };

  const handleToggleQuestion = (id: string) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, checked: !q.checked } : q));
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleCopyChecklist = () => {
    const text = questions
      .map((q, idx) => `${idx + 1}. [${q.checked ? 'X' : ' '}] (${q.category}) ${q.text}`)
      .join('\n');

    navigator.clipboard.writeText(`Questions for Doctor:\n\n${text}`);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 2000);
  };

  const handleSaveVisitNote = async () => {
    if (!user || !activePrepModal || !visitNoteDraft.trim()) return;

    const visitNote: SavedVisitNote = {
      appointment_id: activePrepModal.id,
      doctor_name: activePrepModal.doctorName,
      specialty: activePrepModal.specialty,
      appointment_date: activePrepModal.date,
      note: visitNoteDraft.trim()
    };

    setSavingVisitNote(true);
    setVisitNoteStatus('');
    try {
      await saveVisitNote(user.id, visitNote);
      setVisitNotes((previous) => ({ ...previous, [visitNote.appointment_id]: visitNote }));
      setVisitNoteStatus('Visit notes saved to your account.');
    } catch {
      setVisitNoteStatus('Visit notes could not be saved. Check your account data setup and try again.');
    } finally {
      setSavingVisitNote(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
          <Calendar className="w-3.5 h-3.5 text-blue-600" />
          <span>Patient Visit Preparation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Appointment Assistance
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Prepare for upcoming medical visits, structure targeted questions for your physician, and organize key symptom timelines in one place.
        </p>
      </div>

      <section className="space-y-5" aria-labelledby="doctor-directory-heading">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-teal-700">
              <Stethoscope className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">Patient Directory</span>
            </div>
            <h2 id="doctor-directory-heading" className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">Find a doctor</h2>
            <p className="mt-1 text-sm text-slate-600">Browse clinicians by name, specialty, or city.</p>
          </div>
          <label className="relative block w-full sm:max-w-sm">
            <span className="sr-only">Search doctors</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={doctorSearch}
              onChange={(event) => setDoctorSearch(event.target.value)}
              placeholder="Search name, specialty, or city"
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>
        </div>

        <p className="text-xs text-slate-500">
          Contact details are shown as provided and have not been independently verified. Confirm them before sharing personal or health information.
        </p>

        {filteredDoctors.length ? (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {filteredDoctors.map((doctor) => (
              <article key={doctor.id} className="flex min-w-0 flex-col justify-between border border-slate-200 bg-white p-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{doctor.name}</h3>
                  <p className="mt-1 text-sm font-medium text-teal-700">{doctor.specialty}</p>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-600">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                    {doctor.city}
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-3">
                  <a
                    href={`tel:${doctor.phone.replace(/[\s-]/g, '')}`}
                    className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    Call
                  </a>
                  <a
                    href={`mailto:${doctor.email}`}
                    className="inline-flex min-w-0 items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                  >
                    <Mail className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">Email</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="border border-slate-200 bg-white p-5 text-sm text-slate-600" role="status">
            No doctors match “{doctorSearch}”. Try a different name, specialty, or city.
          </p>
        )}
      </section>

      {/* 1. Upcoming Appointments */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Upcoming Appointments
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Scheduled clinical consultations and reviews
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
            {appointments.length} Consultations Scheduled
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onPrepare={(apt) => {
                setActivePrepModal(apt);
                setVisitNoteDraft(visitNotes[apt.id]?.note ?? '');
                setVisitNoteStatus('');
              }}
            />
          ))}
        </div>
      </section>

      {/* 2. Interactive "Questions for your doctor" section */}
      <section className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Questions for Your Doctor
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Add specific concerns, questions about test results, or medication queries to review during your visit.
            </p>
          </div>

          <button
            onClick={handleCopyChecklist}
            className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs flex items-center gap-1.5 transition-colors shrink-0"
          >
            {copiedChecklist ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
            <span>{copiedChecklist ? 'Checklist Copied!' : 'Copy Questions'}</span>
          </button>
        </div>

        {/* Add Question Input Form */}
        <form onSubmit={handleAddQuestion} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={newQuestionText}
            onChange={(e) => setNewQuestionText(e.target.value)}
            placeholder="Type a question for your doctor (e.g. Could my headaches be related to sleep?)..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <select
            value={newQuestionCategory}
            onChange={(e) => setNewQuestionCategory(e.target.value)}
            aria-label="Question category"
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-700 focus:bg-white focus:outline-hidden"
          >
            <option value="General">General</option>
            <option value="Symptoms">Symptoms</option>
            <option value="Medications">Medications</option>
            <option value="Lab Tests">Lab Tests</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
          <button
            type="submit"
            disabled={!newQuestionText.trim()}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white disabled:text-slate-400 font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Question</span>
          </button>
        </form>

        {/* Questions Checklist List */}
        <div className="space-y-2.5">
          {questions.map((q) => (
            <div
              key={q.id}
              className={`p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                q.checked
                  ? 'bg-emerald-50/60 border-emerald-200 text-slate-500'
                  : 'bg-white border-slate-200/90 text-slate-800'
              }`}
            >
              <div className="flex items-start gap-3 flex-1">
                <input
                  type="checkbox"
                  checked={q.checked}
                  onChange={() => handleToggleQuestion(q.id)}
                  className="w-4 h-4 mt-0.5 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <div>
                  <span className={`text-xs sm:text-sm leading-relaxed block ${q.checked ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                    {q.text}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5 block">
                    {q.category}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleDeleteQuestion(q.id)}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors"
                title="Remove question"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Prepare For Appointment Dialog */}
      {activePrepModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setActivePrepModal(null)}
              className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              aria-label="Close preparation checklist"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Appointment Preparation Checklist
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Preparing for consultation with {activePrepModal.doctorName} ({activePrepModal.specialty})
            </p>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <span>Bring valid photo ID, health insurance cards, or digital health records.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <span>Keep an up-to-date physical or photo list of all active medications and dosages.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <span>Review your {questions.length} saved questions in the checklist above.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <span>Arrive 15 minutes before the scheduled time ({activePrepModal.time}).</span>
              </div>
            </div>

            <section className="mt-5 space-y-3" aria-labelledby="visit-notes-heading">
              <div>
                <h4 id="visit-notes-heading" className="text-sm font-bold text-slate-900">Visit conversation notes</h4>
                <p className="mt-1 text-xs leading-5 text-slate-600">
                  Your personal summary of the visit with {activePrepModal.doctorName}. This does not message the doctor.
                </p>
              </div>
              <textarea
                value={visitNoteDraft}
                onChange={(event) => setVisitNoteDraft(event.target.value)}
                disabled={!user}
                rows={4}
                placeholder={user ? 'Record what you discussed or agreed to follow up on...' : 'Sign in to save private visit notes.'}
                className="w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
              />
              <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                <p aria-live="polite" className="text-xs text-slate-600">{visitNoteStatus}</p>
                {user ? (
                  <button
                    onClick={() => void handleSaveVisitNote()}
                    disabled={!visitNoteDraft.trim() || savingVisitNote}
                    className="rounded-lg bg-blue-700 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    {savingVisitNote ? 'Saving...' : 'Save visit notes'}
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigate('signin')}
                    className="rounded-lg bg-blue-700 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-800"
                  >
                    Sign in to save
                  </button>
                )}
              </div>
            </section>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActivePrepModal(null)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs"
              >
                Ready for Consultation
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
