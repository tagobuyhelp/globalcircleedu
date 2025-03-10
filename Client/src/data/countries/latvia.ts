import type { Country } from './types';

export const latvia: Country = {
  name: 'Latvia',
  description: 'Experience high-quality European education in a country known for its rich cultural heritage, innovative tech sector, and affordable living costs, offering excellent programs in medicine, engineering, and business.',
  image: 'https://res.cloudinary.com/dttifrbaa/image/upload/v1741618131/GCE/peusryqf46vsfkxvjqye.jpg',
  stats: {
    universities: '35+',
    students: '12,000+',
    programs: '250+'
  },
  features: ['Affordable Education', 'EU Standards', 'Rich Cultural Heritage', 'Growing Tech Hub'],
  academicInstitutions: {
    publicUniversities: {
      description: 'State-funded universities offering comprehensive programs at competitive rates.',
      percentage: 60
    },
    privateUniversities: {
      description: 'Private institutions with specialized programs and modern facilities.',
      percentage: 25
    },
    technicalInstitutes: {
      description: 'Specialized institutions focusing on engineering and applied sciences.',
      percentage: 15
    }
  },
  universities: {
    medical: [
      {
        name: 'Riga Stradins University',
        fees: 'Medicine: €12,000/year\nDentistry: €12,000/year'
      },
      {
        name: 'University of Latvia Faculty of Medicine',
        fees: 'Medicine: €11,000/year\nPharmacy: €8,000/year'
      }
    ],
    general: [
      {
        name: 'University of Latvia',
        fees: 'Bachelor\'s: €3,000-6,000/year\nMaster\'s: €3,500-7,000/year'
      },
      {
        name: 'Latvia University of Life Sciences and Technologies',
        fees: 'Bachelor\'s: €2,800-5,000/year\nMaster\'s: €3,200-6,000/year'
      },
      {
        name: 'Daugavpils University',
        fees: 'Bachelor\'s: €2,500-4,500/year\nMaster\'s: €3,000-5,500/year'
      }
    ],
    technology: [
      {
        name: 'Riga Technical University',
        fees: 'Engineering: €3,500-6,000/year\nIT Programs: €4,000-7,000/year'
      },
      {
        name: 'Transport and Telecommunication Institute',
        fees: 'Technology Programs: €3,000-5,000/year'
      }
    ]
  },
  admissionRequirements: {
    documents: [
      'Secondary education certificate',
      'Academic transcripts',
      'Language proficiency certificates',
      'Motivation letter',
      'CV/Resume',
      'Copy of passport',
      'Health insurance proof',
      'Bank statement',
      'Passport photos'
    ],
    languageRequirements: {
      english: 'IELTS 6.0 or TOEFL 75 for Bachelor\'s\nIELTS 6.5 or TOEFL 85 for Master\'s',
      latvian: 'B2 level for Latvian-taught programs',
      medical: 'B2 level in program language'
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
      'Bank statement'
    ],
    steps: [
      'Receive university acceptance',
      'Apply for residence permit',
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
    note: 'Riga is more expensive than other cities. Student dormitories from €100/month'
  },
  scholarships: {
    available: true,
    types: [
      'Latvian Government Scholarships',
      'University Merit Scholarships',
      'EU Student Support',
      'Baltic-American Freedom Foundation Scholarships',
      'Research Grants',
      'Erasmus+ Funding'
    ]
  }
};