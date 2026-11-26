export type NavPage = 
  | 'home' 
  | 'assistant' 
  | 'features' 
  | 'symptoms' 
  | 'health-info' 
  | 'medications' 
  | 'appointments' 
  | 'dashboard' 
  | 'about' 
  | 'privacy'
  | 'signin';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  category?: string;
}

export type SymptomSeverity = 'low' | 'moderate' | 'severe';

export interface SymptomQuery {
  symptoms: string;
  duration: string;
  severity: SymptomSeverity;
  additionalInfo?: string;
}

export interface SymptomGuidanceResult {
  summary: string;
  possibleGeneralFactors: string[];
  selfCareTips: string[];
  whenToSeeDoctor: string[];
  urgencyLevel: 'routine' | 'monitor' | 'prompt_attention';
  disclaimer: string;
}

export type HealthCategory = 
  | 'all'
  | 'General Health'
  | 'Nutrition'
  | 'Sleep'
  | 'Mental Wellness'
  | 'Common Conditions'
  | 'Preventive Care';

export interface HealthTopic {
  id: string;
  title: string;
  category: HealthCategory;
  shortDescription: string;
  readTime: string;
  iconName: string;
  keyTakeaways: string[];
  overview: string;
  practicalTips: string[];
  whenToConsult: string;
}

export interface MedicationItem {
  id: string;
  name: string;
  genericName: string;
  drugClass: string;
  purpose: string;
  commonUses: string[];
  importantPrecautions: string[];
  typicalInstructions: string;
  warnings: string[];
}

export interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  clinic: string;
  date: string;
  time: string;
  mode: 'In-Person' | 'Video Consultation';
  addressOrLink: string;
  notes: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  city: string;
  phone: string;
  email: string;
}

export interface DoctorQuestion {
  id: string;
  text: string;
  category: string;
  checked: boolean;
}
