import { HealthTopic } from '../types';

export const HEALTH_TOPICS: HealthTopic[] = [
  {
    id: 'sleep-optimization',
    title: 'Science-Backed Sleep Optimization',
    category: 'Sleep',
    shortDescription: 'Explore the biological rhythms of deep sleep and practical behavioral steps to enhance restorative rest.',
    readTime: '4 min read',
    iconName: 'Moon',
    overview: 'High quality sleep is essential for cognitive function, immune defense, cardiovascular health, and hormone balance. Circadian rhythms regulate our internal sleep-wake cycle through exposure to light and melatonin secretion.',
    keyTakeaways: [
      'Aim for 7 to 9 hours of uninterrupted sleep per night for optimal adult health.',
      'Morning sunlight exposure helps anchor your circadian rhythm.',
      'Avoid blue light and intense screen stimulation 1 hour before sleep.',
      'Maintain a cool bedroom temperature around 18–20°C (65–68°F).'
    ],
    practicalTips: [
      'Wake up at the same hour every day, including weekends, to synchronize your internal clock.',
      'Stop caffeinated beverages at least 8 hours prior to your scheduled bedtime.',
      'Practice 10 minutes of gentle non-sleep deep rest (NSDR) or slow diaphragmatic breathing if waking up mid-sleep.'
    ],
    whenToConsult: 'Consult a physician if you experience chronic snoring, daytime sleepiness, or persistent difficulty falling asleep for more than 4 weeks.'
  },
  {
    id: 'hydration-cellular-health',
    title: 'Hydration and Cellular Function',
    category: 'General Health',
    shortDescription: 'Why fluid balance affects blood pressure, renal filtration, cognitive clarity, and daily energy levels.',
    readTime: '3 min read',
    iconName: 'Droplets',
    overview: 'Water accounts for roughly 60% of the adult human body. Mild dehydration (just 1-2% loss of body fluid) can impair memory, increase fatigue, cause mild tension headaches, and reduce kidney efficiency.',
    keyTakeaways: [
      'Hydration needs vary based on climate, activity level, and body composition.',
      'Urine color (pale straw yellow) is one of the easiest daily hydration indicators.',
      'Electrolytes like sodium, potassium, and magnesium maintain osmotic balance.'
    ],
    practicalTips: [
      'Drink a glass of water first thing in the morning to offset overnight respiratory fluid loss.',
      'Incorporate water-rich whole foods like cucumbers, oranges, and watermelon into meals.',
      'Sip fluids steadily across the day rather than chugging large volumes at once.'
    ],
    whenToConsult: 'Consult a clinician if you experience extreme thirst coupled with frequent urination, or persistent dark urine despite adequate fluid intake.'
  },
  {
    id: 'cardiovascular-nutrition',
    title: 'Heart-Healthy Nutrition Fundamentals',
    category: 'Nutrition',
    shortDescription: 'Understanding the impact of dietary fibers, healthy fats, and sodium regulation on vascular longevity.',
    readTime: '5 min read',
    iconName: 'Apple',
    overview: 'Diet plays a pivotal role in preventing atherosclerotic cardiovascular disease. A dietary pattern rich in dietary fiber, unsaturated fatty acids, and colorful phytonutrients fosters endothelial wellness and steady lipid profiles.',
    keyTakeaways: [
      'Soluble fiber helps bind bile acids and maintain healthy LDL cholesterol levels.',
      'Replace trans fats and excessive saturated fats with extra-virgin olive oil and nuts.',
      'Moderate dietary sodium to reduce strain on arterial walls and kidneys.'
    ],
    practicalTips: [
      'Include leafy greens, legumes, and oats in your weekly meal rotations.',
      'Incorporate omega-3 fatty acids from walnuts, flaxseeds, or cold-water fish twice a week.',
      'Cook with fresh herbs, garlic, and citrus to reduce reliance on table salt.'
    ],
    whenToConsult: 'Discuss individualized nutrition planning with your doctor or registered dietitian if you have hypertension, diabetes, or a family history of early heart disease.'
  },
  {
    id: 'stress-nervous-system',
    title: 'Managing Chronic Stress & Nervous System Health',
    category: 'Mental Wellness',
    shortDescription: 'How prolonged cortisol elevation affects inflammation, digestion, and evidence-based relaxation techniques.',
    readTime: '4 min read',
    iconName: 'Brain',
    overview: 'The sympathetic "fight-or-flight" response is life-saving in acute threats, but prolonged modern psychosocial stress keeps cortisol and adrenaline elevated, leading to gastrointestinal tension, poor sleep, and increased blood pressure.',
    keyTakeaways: [
      'Activating the vagus nerve stimulates the parasympathetic "rest-and-digest" state.',
      'Daily 10-minute mindfulness or breathwork exercises physically lower heart rate.',
      'Physical movement metabolizes excess stress hormones naturally.'
    ],
    practicalTips: [
      'Try the 4-7-8 breathing technique: inhale 4s, hold 7s, exhale slowly 8s.',
      'Take 5-minute screen-free breaks every 90 minutes of focused desk work.',
      'Spend time in nature or green spaces several times weekly.'
    ],
    whenToConsult: 'Seek evaluation from a mental health professional or primary care physician if anxiety or low mood impairs your work, relationships, or daily functioning.'
  },
  {
    id: 'common-headaches',
    title: 'Understanding Common Types of Headaches',
    category: 'Common Conditions',
    shortDescription: 'Differentiating tension-type headaches, migraines, and sinus pressure triggers.',
    readTime: '5 min read',
    iconName: 'Activity',
    overview: 'Headaches are among the most common neurological complaints. Understanding whether your discomfort is a dull band-like tension headache, a throbbing migraine with light sensitivity, or postural strain helps guide appropriate care.',
    keyTakeaways: [
      'Tension headaches typically present as dull, aching pain across the temples or neck.',
      'Migraines often feature unilateral throbbing, sensory hypersensitivity, and nausea.',
      'Common triggers include skipping meals, dehydration, poor ergonomics, and sudden weather shifts.'
    ],
    practicalTips: [
      'Track a headache diary recording sleep, food, water, and onset triggers.',
      'Ensure ergonomic workstation setup so the neck remains in neutral alignment.',
      'Take eye-breaks following the 20-20-20 rule (every 20 mins, look 20 feet away for 20 secs).'
    ],
    whenToConsult: 'Seek emergency care for "worst headache of life", sudden onset with neurological deficits, stiff neck, fever, or pain after head trauma.'
  },
  {
    id: 'preventive-screenings',
    title: 'Essential Preventive Health Screenings by Age',
    category: 'Preventive Care',
    shortDescription: 'A proactive overview of routine blood panels, blood pressure checks, and cancer screenings.',
    readTime: '6 min read',
    iconName: 'ShieldCheck',
    overview: 'Preventive medicine identifies potential physiological changes before symptoms emerge. Early detection of high blood pressure, elevated fasting glucose, and dyslipidemia enables proactive lifestyle and medical interventions.',
    keyTakeaways: [
      'Adults should have blood pressure monitored at least once annually.',
      'Fasting lipid profiles and blood glucose testing are standard proactive benchmarks.',
      'Age-appropriate screenings (e.g. colorectal, mammograms, cervical checks) save lives through early detection.'
    ],
    practicalTips: [
      'Schedule an annual wellness check with your primary physician.',
      'Keep a digital or paper copy of your immunization records and past lab results.',
      'Know your key health numbers: blood pressure, resting heart rate, and fasting glucose.'
    ],
    whenToConsult: 'Discuss with your primary physician what personalized screening intervals match your personal and familial health history.'
  }
];
