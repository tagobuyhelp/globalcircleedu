import type { Country } from './types';

export const cyprus: Country = {
  name: 'Cyprus',
  description: 'Study in a Mediterranean island nation offering high-quality education with English-taught programs and excellent weather year-round.',
  image: 'https://images.unsplash.com/photo-1589489873423-d1745278a8f4?auto=format&fit=crop&q=80&w=2000',
  stats: {
    universities: '30+',
    students: '15,000+',
    programs: '300+',
  },
  features: ['English-taught Programs', 'Mediterranean Climate', 'Safe Environment', 'Strategic Location'],
  academicInstitutions: {
    publicUniversities: {
      description: 'State-funded universities offering comprehensive programs at affordable rates.',
      percentage: 35
    },
    privateUniversities: {
      description: 'International and local private institutions with specialized programs.',
      percentage: 45
    },
    higherEducationInstitutes: {
      description: 'Specialized colleges and institutes focusing on specific fields.',
      percentage: 20
    }
  },
  universities: {
    medical: [
      {
        name: 'University of Cyprus Medical School',
        fees: 'Medicine: €6,000/year\nPharmacy: €5,000/year'
      },
      {
        name: 'European University Cyprus School of Medicine',
        fees: 'Medicine: €19,000-22,000/year\nDental Surgery: €11,600/year'
      },
      {
        name: 'University of Nicosia Medical School',
        fees: 'Medicine: €30,000/year (Advanced)\nMedicine: €18,000-22,000/year (General)'
      }
    ],
    general: [
      {
        name: 'University of Cyprus',
        fees: 'Bachelor\'s: €3,000-12,000/year\nMaster\'s: €5,000-18,000/year'
      },
      {
        name: 'Cyprus University of Technology',
        fees: 'Bachelor\'s: €3,500-9,000/year\nMaster\'s: €4,000-10,000/year'
      },
      {
        name: 'University of Nicosia',
        fees: 'Bachelor\'s: €4,500-8,500/year\nMaster\'s: €5,500-10,500/year'
      }
    ],
    business: [
      {
        name: 'Cyprus International Institute of Management',
        fees: 'MBA: €4,500/program\nMaster\'s: €3,500-5,000/year'
      },
      {
        name: 'European University Cyprus',
        fees: 'Business Programs: €4,000-7,000/year'
      }
    ]
  },
  admissionRequirements: {
    documents: [
      'High School Certificate/Transcripts',
      'Academic transcripts',
      'English language proficiency proof',
      'Greek language certificate (if applicable)',
      'Personal statement',
      'CV/Resume',
      'Copy of passport',
      'Passport-size photographs'
    ],
    languageRequirements: {
      english: 'IELTS 6.0 or TOEFL 80',
      greek: 'B2 level for Greek-taught programs',
      medical: 'IELTS 6.5 or TOEFL 90 for medical programs'
    }
  },
  visaRequirements: {
    documents: [
      'Valid passport',
      'University acceptance letter',
      'Bank statements/Financial guarantee',
      'Health insurance',
      'Police clearance certificate',
      'Medical certificates',
      'Visa application form',
      'Proof of accommodation'
    ],
    steps: [
      'Receive university acceptance',
      'Apply for student visa at Cyprus embassy',
      'Submit required documents',
      'Pay visa fees',
      'Register with District Police within 7 days of arrival',
      'Complete medical examinations within first week',
      'Apply for residence permit'
    ]
  },
  costOfLiving: {
    range: '€700 - €1,000',
    period: 'per month',
    note: 'Accommodation: €300-500/month, Food: €300/month, Transport: €40/month'
  },
  scholarships: {
    available: true,
    types: [
      'University Merit Scholarships (up to 100%)',
      'Academic Excellence Awards',
      'Sports Scholarships',
      'Need-based Grants',
      'Research Fellowships',
      'Early Bird Discounts'
    ]
  }
};