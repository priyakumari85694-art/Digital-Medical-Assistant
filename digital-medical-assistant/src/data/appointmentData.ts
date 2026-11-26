import { Appointment, Doctor, DoctorQuestion } from '../types';

export const DOCTORS: Doctor[] = [
  {
    id: 'doctor-1',
    name: 'Dr. Rajesh Kumar Sharma',
    specialty: 'General Physician',
    city: 'Delhi',
    phone: '+91 90000 10001',
    email: 'rajesh.sharma@example.com'
  },
  {
    id: 'doctor-2',
    name: 'Dr. Priya Venkatesh',
    specialty: 'Cardiologist',
    city: 'Bengaluru',
    phone: '+91 90000 10002',
    email: 'priya.venkatesh@example.com'
  },
  {
    id: 'doctor-3',
    name: 'Dr. Anil Deshmukh',
    specialty: 'Orthopedic Surgeon',
    city: 'Pune',
    phone: '+91 90000 10003',
    email: 'anil.deshmukh@example.com'
  },
  {
    id: 'doctor-4',
    name: 'Dr. Sunita Reddy',
    specialty: 'Gynecologist',
    city: 'Hyderabad',
    phone: '+91 90000 10004',
    email: 'sunita.reddy@example.com'
  },
  {
    id: 'doctor-5',
    name: 'Dr. Amit Banerjee',
    specialty: 'Neurologist',
    city: 'Kolkata',
    phone: '+91 90000 10005',
    email: 'amit.banerjee@example.com'
  },
  {
    id: 'doctor-6',
    name: 'Dr. Kavita Iyer',
    specialty: 'Dermatologist',
    city: 'Chennai',
    phone: '+91 90000 10006',
    email: 'kavita.iyer@example.com'
  },
  {
    id: 'doctor-7',
    name: 'Dr. Mohammed Faisal Khan',
    specialty: 'Pediatrician',
    city: 'Lucknow',
    phone: '+91 90000 10007',
    email: 'faisal.khan@example.com'
  },
  {
    id: 'doctor-8',
    name: 'Dr. Neha Gupta',
    specialty: 'Endocrinologist',
    city: 'Jaipur',
    phone: '+91 90000 10008',
    email: 'neha.gupta@example.com'
  },
  {
    id: 'doctor-9',
    name: 'Dr. Harpreet Singh Gill',
    specialty: 'Pulmonologist',
    city: 'Chandigarh',
    phone: '+91 90000 10009',
    email: 'harpreet.gill@example.com'
  },
  {
    id: 'doctor-10',
    name: 'Dr. Lakshmi Nair',
    specialty: 'Psychiatrist',
    city: 'Kochi',
    phone: '+91 90000 10010',
    email: 'lakshmi.nair@example.com'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    doctorName: 'Dr. Sarah Johnson',
    specialty: 'General Physician',
    clinic: 'Metro Wellness Health Center',
    date: 'October 15, 2026',
    time: '10:30 AM',
    mode: 'In-Person',
    addressOrLink: 'Suite 402, 120 Health Sciences Blvd, Metro City',
    notes: 'Routine biannual wellness review and preventive blood work follow-up.'
  },
  {
    id: 'apt-2',
    doctorName: 'Dr. Rajesh Mehta',
    specialty: 'Cardiologist',
    clinic: 'Apex Heart & Vascular Institute',
    date: 'October 22, 2026',
    time: '02:00 PM',
    mode: 'Video Consultation',
    addressOrLink: 'Secure Telehealth Portal (Link active 15 mins prior)',
    notes: 'Follow-up on 24-hour ambulatory blood pressure monitoring logs.'
  },
  {
    id: 'apt-3',
    doctorName: 'Dr. Anita Desai',
    specialty: 'Dermatologist',
    clinic: 'Skin Care & Laser Specialty Clinic',
    date: 'November 05, 2026',
    time: '11:15 AM',
    mode: 'In-Person',
    addressOrLink: 'Level 2, Cedar Medical Plaza, Building B',
    notes: 'Annual skin mole mapping and seasonal allergy consultation.'
  }
];

export const INITIAL_QUESTIONS: DoctorQuestion[] = [
  {
    id: 'q-1',
    text: 'Are there any specific dietary adjustments that could help my morning energy levels?',
    category: 'Lifestyle',
    checked: false
  },
  {
    id: 'q-2',
    text: 'Should we recheck my fasting lipid panel and Vitamin D levels during this visit?',
    category: 'Lab Tests',
    checked: true
  },
  {
    id: 'q-3',
    text: 'Could my occasional afternoon headaches be related to cervical posture or eye strain?',
    category: 'Symptoms',
    checked: false
  },
  {
    id: 'q-4',
    text: 'Are there any potential interactions between my daily multivitamins and prescribed medications?',
    category: 'Medications',
    checked: false
  }
];
