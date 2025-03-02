import type { Country } from './types';

export const belarus: Country = {
  name: 'Belarus',
  description: 'Experience quality education in one of Eastern Europe\'s most affordable study destinations, known for its strong focus on science, technology and medical education.',
  image: 'https://res.cloudinary.com/dttifrbaa/image/upload/v1740639450/download_2_blp6ag.jpg',
  stats: {
    universities: '50+',
    students: '15,000+',
    programs: '400+'
  },
  features: ['Affordable Education', 'High Academic Standards', 'Rich Cultural Heritage', 'Modern Infrastructure'],
  academicInstitutions: {
    publicUniversities: {
      description: 'State-funded universities offering comprehensive programs at highly competitive rates.',
      percentage: 70
    },
    privateUniversities: {
      description: 'Private institutions offering specialized programs with modern facilities.',
      percentage: 20
    },
    specializedInstitutes: {
      description: 'Technical and medical institutes focused on professional education.',
      percentage: 10
    }
  },
  universities: {
    medical: [
      {
        name: 'Belarusian State Medical University',
        fees: 'Medicine: $4,500/year\nDentistry: $4,800/year'
      },
      {
        name: 'Vitebsk State Medical University',
        fees: 'Medicine: $4,200/year\nPharmacy: $4,000/year'
      },
      {
        name: 'Grodno State Medical University',
        fees: 'Medicine: $4,300/year\nNursing: $3,800/year'
      }
    ],
    general: [
      {
        name: 'Belarusian State University',
        fees: 'Bachelor\'s: $3,000-4,500/year\nMaster\'s: $3,500-5,000/year'
      },
      {
        name: 'Belarusian National Technical University',
        fees: 'Bachelor\'s: $2,800-4,000/year\nMaster\'s: $3,200-4,500/year'
      },
      {
        name: 'Minsk State Linguistic University',
        fees: 'Bachelor\'s: $2,500-3,800/year\nMaster\'s: $3,000-4,200/year'
      }
    ],
    technology: [
      {
        name: 'Belarusian State University of Informatics and Radioelectronics',
        fees: 'IT Programs: $3,500-4,800/year\nEngineering: $3,200-4,500/year'
      },
      {
        name: 'Belarusian State Technological University',
        fees: 'Technology Programs: $2,800-4,200/year'
      }
    ]
  },
  admissionRequirements: {
    documents: [
      'High school certificate',
      'Academic transcripts',
      'Medical certificate',
      'HIV test certificate',
      'Passport copy',
      'Birth certificate',
      'Photos',
      'Language proficiency proof',
      'Application form'
    ],
    languageRequirements: {
      russian: 'B1 level for Russian-taught programs',
      english: 'IELTS 5.5 or TOEFL 70 for English-taught programs',
      medical: 'B2 level in program language'
    }
  },
  visaRequirements: {
    documents: [
      'Valid passport',
      'University invitation letter',
      'Medical insurance',
      'HIV test certificate',
      'Visa application form',
      'Passport-size photos',
      'Bank statement',
      'Return ticket booking'
    ],
    steps: [
      'Receive university acceptance',
      'Obtain invitation letter',
      'Gather required documents',
      'Apply for student visa',
      'Pay visa fee',
      'Attend visa interview if required',
      'Register with local authorities upon arrival'
    ]
  },
  costOfLiving: {
    range: '$300 - $500',
    period: 'per month',
    note: 'Minsk is more expensive than other cities. Student dormitories cost $30-50/month'
  },
  scholarships: {
    available: true,
    types: [
      'Government of Belarus Scholarships',
      'University Merit Scholarships',
      'Bilateral Agreement Scholarships',
      'Sport Excellence Scholarships',
      'Research Grants',
      'Cultural Exchange Programs'
    ]
  }
};