import type { Country } from './types';

export const bosnia: Country = {
  name: 'Bosnia and Herzegovina',
  description: 'Experience quality education in a country rich in cultural heritage and natural beauty, offering affordable programs in medicine, engineering and social sciences while providing a unique bridge between Eastern and Western academic traditions.',
  image: 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?auto=format&fit=crop&q=80&w=2000',
  stats: {
    universities: '25+',
    students: '10,000+',
    programs: '200+'
  },
  features: ['Affordable Education', 'Rich Cultural Heritage', 'Growing Education Hub', 'Multicultural Environment'],
  academicInstitutions: {
    publicUniversities: {
      description: 'State universities offering programs in local languages and English.',
      percentage: 70
    },
    privateUniversities: {
      description: 'Private institutions with international partnerships and English programs.',
      percentage: 20
    },
    specializedInstitutes: {
      description: 'Focused institutions for specific fields like medicine and technology.',
      percentage: 10
    }
  },
  universities: {
    medical: [
      {
        name: 'University of Sarajevo Faculty of Medicine',
        fees: 'Medicine: €7,000/year\nDentistry: €7,000/year'
      },
      {
        name: 'University of Tuzla Medical Faculty',
        fees: 'Medicine: €6,500/year\nPharmacy: €5,500/year'
      }
    ],
    general: [
      {
        name: 'University of Sarajevo',
        fees: 'Bachelor\'s: €1,500-3,000/year\nMaster\'s: €2,000-4,000/year'
      },
      {
        name: 'University of Banja Luka',
        fees: 'Bachelor\'s: €1,200-2,500/year\nMaster\'s: €1,800-3,500/year'
      },
      {
        name: 'University of Mostar',
        fees: 'Bachelor\'s: €1,500-3,000/year\nMaster\'s: €2,000-3,800/year'
      }
    ],
    technology: [
      {
        name: 'International University of Sarajevo',
        fees: 'Engineering: €3,000-4,500/year\nIT Programs: €2,800-4,000/year'
      },
      {
        name: 'American University in Bosnia and Herzegovina',
        fees: 'Technology Programs: €3,500-5,000/year'
      }
    ]
  },
  admissionRequirements: {
    documents: [
      'High school diploma with apostille',
      'Academic transcripts',
      'Language proficiency certificates',
      'Passport copy',
      'Birth certificate',
      'Medical certificate',
      'Motivation letter',
      'CV/Resume',
      'Photos'
    ],
    languageRequirements: {
      english: 'IELTS 6.0 or TOEFL 75 for English programs',
      bosnian: 'B2 level for programs in local languages',
      medical: 'IELTS 6.5 or equivalent for medical programs'
    }
  },
  visaRequirements: {
    documents: [
      'Valid passport',
      'University acceptance letter',
      'Proof of sufficient funds',
      'Health insurance',
      'Accommodation proof',
      'Police clearance certificate',
      'Visa application form',
      'Biometric photos'
    ],
    steps: [
      'Receive university acceptance',
      'Prepare required documents',
      'Submit visa application',
      'Pay visa fees',
      'Attend visa interview if required',
      'Wait for processing',
      'Register with local authorities upon arrival'
    ]
  },
  costOfLiving: {
    range: '€400 - €700',
    period: 'per month',
    note: 'Sarajevo is more expensive than other cities. Student dormitories from €100/month'
  },
  scholarships: {
    available: true,
    types: [
      'Government of Bosnia and Herzegovina Scholarships',
      'University Merit Scholarships',
      'EU Student Support',
      'Erasmus+ Funding',
      'Regional Development Scholarships',
      'Cultural Exchange Programs'
    ]
  }
};