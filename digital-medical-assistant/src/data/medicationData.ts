import { MedicationItem } from '../types';

export const MEDICATIONS_DATA: MedicationItem[] = [
  {
    id: 'paracetamol',
    name: 'Paracetamol',
    genericName: 'Acetaminophen',
    drugClass: 'Analgesic & Antipyretic',
    purpose: 'Relief of mild-to-moderate pain and reduction of fever.',
    commonUses: [
      'Tension headaches and mild aches',
      'Fever management during viral colds',
      'Minor muscle soreness or dental discomfort'
    ],
    importantPrecautions: [
      'Do not exceed maximum daily limits due to risk of severe liver toxicity.',
      'Check other over-the-counter cold and flu remedies to avoid accidental duplicate dosing.',
      'Avoid regular or heavy alcohol consumption while taking this medication.'
    ],
    typicalInstructions: 'Follow package labeling or physician directions strictly. Do not combine multiple products containing acetaminophen.',
    warnings: [
      'Severe liver damage risk if taken in excess.',
      'Consult a doctor if pain lasts >10 days or fever >3 days.'
    ]
  },
  {
    id: 'ibuprofen',
    name: 'Ibuprofen',
    genericName: 'Ibuprofen',
    drugClass: 'Nonsteroidal Anti-inflammatory Drug (NSAID)',
    purpose: 'Reduces inflammation, swelling, fever, and acute pain.',
    commonUses: [
      'Inflammatory joint stiffness or sprains',
      'Menstrual cramping and backaches',
      'Toothaches and mild-to-moderate headaches'
    ],
    importantPrecautions: [
      'Take with food or milk to minimize potential stomach irritation or gastritis.',
      'Caution in individuals with a history of stomach ulcers, kidney dysfunction, or cardiovascular disease.',
      'Do not take simultaneously with other oral NSAIDs unless directed by a physician.'
    ],
    typicalInstructions: 'Use the lowest effective dose for the shortest required duration. Always consult a healthcare professional for chronic use.',
    warnings: [
      'May increase risk of gastrointestinal bleeding or cardiovascular events if overused.',
      'Not suitable for patients in third-trimester pregnancy or with severe renal impairment.'
    ]
  },
  {
    id: 'amoxicillin',
    name: 'Amoxicillin',
    genericName: 'Amoxicillin trihydrate',
    drugClass: 'Aminopenicillin Antibiotic',
    purpose: 'Treats confirmed bacterial infections; not effective against viruses.',
    commonUses: [
      'Bacterial ear, nose, and throat infections',
      'Bacterial respiratory tract infections',
      'Certain urinary tract bacterial infections'
    ],
    importantPrecautions: [
      'Must only be taken upon prescription from a licensed physician.',
      'Complete the entire prescribed course even if symptoms resolve early.',
      'Contraindicated in individuals with documented penicillin hypersensitivity or anaphylaxis history.'
    ],
    typicalInstructions: 'Prescription-only medicine. Take with or without food at evenly spaced intervals as prescribed by your doctor.',
    warnings: [
      'Ineffective against common cold, flu, or other viral illnesses.',
      'Seek emergency medical help if developing hives, swelling of the face, or breathing difficulty.'
    ]
  },
  {
    id: 'omeprazole',
    name: 'Omeprazole',
    genericName: 'Omeprazole',
    drugClass: 'Proton Pump Inhibitor (PPI)',
    purpose: 'Reduces gastric acid production in the stomach lining.',
    commonUses: [
      'Gastroesophageal reflux disease (GERD) and heartburn',
      'Stomach ulcer healing and prevention',
      'Gastritis and acid-related stomach discomfort'
    ],
    importantPrecautions: [
      'Typically taken in the morning 30 to 60 minutes before breakfast.',
      'Long-term uninterrupted use requires clinical supervision to monitor magnesium and B12 absorption.',
      'Do not crush or chew delayed-release capsules or tablets.'
    ],
    typicalInstructions: 'Swallow whole with a glass of water. Consult your doctor if heartburn symptoms persist past 14 days.',
    warnings: [
      'Prolonged unmonitored use may mask more serious gastrointestinal conditions.',
      'Discuss potential interactions with blood thinners or antifungals with your pharmacist.'
    ]
  },
  {
    id: 'metformin',
    name: 'Metformin',
    genericName: 'Metformin Hydrochloride',
    drugClass: 'Biguanide Antidiabetic',
    purpose: 'Helps improve insulin sensitivity and manage blood glucose.',
    commonUses: [
      'Type 2 diabetes glycemic management',
      'Polycystic ovary syndrome (PCOS) insulin resistance (off-label under physician guidance)',
      'Lifestyle-supportive blood sugar stabilization'
    ],
    importantPrecautions: [
      'Prescription medicine requiring routine renal and metabolic monitoring.',
      'Take with meals to reduce temporary gastrointestinal side effects like nausea or cramping.',
      'Notify your doctor before radiological contrast dye procedures or major surgeries.'
    ],
    typicalInstructions: 'Take strictly according to your endocrinologist or general practitioner prescription schedule.',
    warnings: [
      'Requires adequate kidney function. Do not consume excessive alcohol while taking.',
      'Rare risk of lactic acidosis; report severe fatigue, cold extremities, or respiratory distress immediately.'
    ]
  },
  {
    id: 'cetirizine',
    name: 'Cetirizine',
    genericName: 'Cetirizine Hydrochloride',
    drugClass: 'Second-Generation Antihistamine',
    purpose: 'Relieves allergy symptoms with lower risk of daytime sedation than first-generation options.',
    commonUses: [
      'Allergic rhinitis (hay fever, pollen, dust mite sneezing)',
      'Watery, itchy eyes and runny nose',
      'Chronic hives and allergic skin itching'
    ],
    importantPrecautions: [
      'While non-drowsy for most, some individuals may experience mild sedation; test sensitivity before driving.',
      'Avoid alcohol or sedatives which can enhance drowsiness.',
      'Inform your doctor if you have severe kidney impairment or urinary retention.'
    ],
    typicalInstructions: 'Once-daily tablet with or without food. Follow packaging instructions or doctor recommendation.',
    warnings: [
      'Do not exceed recommended single daily dose.',
      'Consult a pediatrician for appropriate pediatric formulations.'
    ]
  }
];
