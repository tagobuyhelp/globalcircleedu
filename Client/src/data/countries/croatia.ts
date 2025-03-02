import type { Country } from './types';

export const croatia: Country = {
  name: 'Croatia',
  description: 'Experience high-quality education in one of Europe\'s most beautiful countries, offering a perfect blend of rich cultural heritage, modern facilities, and affordable tuition fees.',
  image: 'https://images.unsplash.com/photo-1414862625453-d87604a607e4?auto=format&fit=crop&q=80&w=2000',
  stats: {
    universities: '40+',
    students: '20,000+', 
    programs: '350+',
  },
  features: ['Affordable Education', 'Rich Cultural Heritage', 'High Living Standards', 'Mediterranean Lifestyle'],
  academicInstitutions: {
    publicUniversities: {
      description: 'State-funded universities offering comprehensive programs at competitive rates.',
      percentage: 60
    },
    privateUniversities: {
      description: 'Private institutions offering specialized programs with more personalized attention.',
      percentage: 25
    },
    polytechnics: {
      description: 'Technical institutions focused on applied sciences and professional education.',
      percentage: 15
    }
  },
  universities: {
    general: [
      {
        name: 'University of Zagreb',
        fees: 'Bachelor\'s: €3,000-7,000/year\nMaster\'s: €4,000-8,000/year'
      },
      {
        name: 'University of Split',
        fees: 'Bachelor\'s: €2,500-6,000/year\nMaster\'s: €3,500-7,000/year'
      },
      {
        name: 'University of Rijeka',
        fees: 'Bachelor\'s: €2,000-5,000/year\nMaster\'s: €3,000-6,000/year'
      }
    ],
    medical: [
      {
        name: 'University of Zagreb School of Medicine',
        fees: 'Medicine: €12,000/year\nDentistry: €12,000/year'
      },
      {
        name: 'University of Split School of Medicine',
        fees: 'Medicine: €10,000/year\nDental Medicine: €10,000/year'
      }
    ],
    business: [
      {
        name: 'Zagreb School of Economics and Management',
        fees: 'Bachelor\'s: €5,000/year\nMBA: €7,000/year'
      },
      {
        name: 'VERN University',
        fees: 'Business Programs: €4,000-6,000/year'
      }
    ]
  },
  admissionRequirements: {
    documents: [
      'High school diploma or equivalent',
      'Academic transcripts with official translation',
      'Language proficiency certificate', 
      'Motivation letter',
      'CV/Resume',
      'Birth certificate',
      'Copy of passport',
      'Health insurance proof',
      'Passport-sized photographs'
    ],
    languageRequirements: {
      croatian: 'B2 level for Croatian-taught programs',
      english: 'IELTS 6.0 or TOEFL 80 for English-taught programs',
      medical: 'B2 English for medical programs'
    }
  },
  visaRequirements: {
    documents: [
      'Valid passport',
      'University acceptance letter',
      'Proof of sufficient funds',
      'Health insurance',
      'Proof of accommodation',
      'Criminal record certificate',
      'Visa application form',
      'Biometric photos'
    ],
    steps: [
      'Receive university acceptance',
      'Gather required documents',
      'Submit visa application', 
      'Pay visa fees',
      'Attend visa interview if required',
      'Wait for processing (up to 60 days)',
      'Register with local authorities upon arrival'
    ]
  },
  costOfLiving: {
    range: '€600 - €900',
    period: 'per month',
    note: 'Zagreb and coastal cities are more expensive than inland regions'
  },
  scholarships: {
    available: true,
    types: [
      'Croatian Government Scholarships',
      'University Merit Scholarships',
      'Erasmus+ Mobility Grants',
      'Bilateral Agreement Scholarships',
      'Research Excellence Scholarships',
      'STEM Field Scholarships'
    ]
  }
};