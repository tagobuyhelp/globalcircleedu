import type { Country } from './types';

export const lithuania: Country = {
  name: 'Lithuania',
  description: 'Experience high-quality European education in a country known for its excellent medical programs, innovative tech sector, and rich cultural heritage, all at competitive tuition rates.',
  image: 'https://res.cloudinary.com/dttifrbaa/image/upload/v1740640997/download_5_ig3wzo.jpg',
  stats: {
    universities: '45+',
    students: '10,000+',
    programs: '500+'
  },
  features: ['Quality Education', 'Affordable Tuition', 'EU Standards', 'Growing Tech Hub'],
  academicInstitutions: {
    publicUniversities: {
      description: 'State universities offering comprehensive programs with competitive fees.',
      percentage: 65
    },
    privateUniversities: {
      description: 'Private institutions with specialized programs and modern facilities.',
      percentage: 20
    },
    medicalSchools: {
      description: 'Specialized medical universities with advanced training facilities.',
      percentage: 15
    }
  },
  universities: {
    medical: [
      {
        name: 'Lithuanian University of Health Sciences',
        fees: 'Medicine: €12,000/year\nDentistry: €12,000/year'
      },
      {
        name: 'Vilnius University Faculty of Medicine',
        fees: 'Medicine: €11,000/year\nPharmacy: €8,000/year'
      }
    ],
    general: [
      {
        name: 'Vilnius University',
        fees: 'Bachelor\'s: €3,500-6,000/year\nMaster\'s: €4,000-7,000/year'
      },
      {
        name: 'Kaunas University of Technology',
        fees: 'Bachelor\'s: €3,000-5,500/year\nMaster\'s: €3,500-6,500/year'
      },
      {
        name: 'Vytautas Magnus University',
        fees: 'Bachelor\'s: €2,800-5,000/year\nMaster\'s: €3,200-6,000/year'
      }
    ],
    technology: [
      {
        name: 'Vilnius Gediminas Technical University',
        fees: 'Engineering: €4,000-6,000/year\nIT Programs: €4,500-7,000/year'
      }
    ]
  },
  admissionRequirements: {
    documents: [
      'Secondary education certificate',
      'Academic transcripts',
      'Proof of English proficiency',
      'Motivation letter',
      'CV/Resume',
      'Copy of passport',
      'Health insurance',
      'Bank statement',
      'Photos'
    ],
    languageRequirements: {
      english: 'IELTS 6.0 or TOEFL 75 for Bachelor\'s\nIELTS 6.5 or TOEFL 85 for Master\'s',
      lithuanian: 'B2 level for Lithuanian-taught programs',
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
      'Visa application form',
      'Biometric photos',
      'Return ticket booking'
    ],
    steps: [
      'Receive university acceptance',
      'Apply for national visa (D)',
      'Submit required documents',
      'Pay visa fees',
      'Provide biometric data',
      'Wait for processing',
      'Register residence upon arrival'
    ]
  },
  costOfLiving: {
    range: '€500 - €800',
    period: 'per month',
    note: 'Vilnius is more expensive than other cities. Student dormitories available from €100/month'
  },
  scholarships: {
    available: true,
    types: [
      'Lithuanian Government Scholarships',
      'EU Student Support',
      'University Merit Scholarships',
      'Baltic-American Freedom Foundation Scholarships',
      'Research Grants',
      'Erasmus+ Funding'
    ]
  }
};