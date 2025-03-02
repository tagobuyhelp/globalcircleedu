import type { Country } from './types';

export const georgia: Country = {
  name: 'Georgia',
  description: 'Experience quality education in a country that perfectly blends ancient traditions with modern innovation, offering internationally recognized medical programs and affordable education.',
  image: 'https://res.cloudinary.com/dttifrbaa/image/upload/v1740640533/download_4_cq63yl.jpg',
  stats: {
    universities: '55+',
    students: '12,000+',
    programs: '300+'
  },
  features: ['Affordable Education', 'Rich Cultural Heritage', 'Modern Healthcare Education', 'Growing Tech Hub'],
  academicInstitutions: {
    publicUniversities: {
      description: 'State universities offering comprehensive programs at competitive rates.',
      percentage: 60
    },
    privateUniversities: {
      description: 'Private institutions with modern facilities and international partnerships.',
      percentage: 30
    },
    medicalInstitutes: {
      description: 'Specialized medical universities with advanced training facilities.',
      percentage: 10
    }
  },
  universities: {
    medical: [
      {
        name: 'Tbilisi State Medical University',
        fees: 'Medicine: $4,000/year\nDentistry: $4,500/year'
      },
      {
        name: 'David Tvildiani Medical University',
        fees: 'Medicine: $5,000/year\nPharmacy: $4,000/year'
      },
      {
        name: 'Batumi Shota Rustaveli State University',
        fees: 'Medicine: $4,200/year\nNursing: $3,500/year'
      }
    ],
    general: [
      {
        name: 'Tbilisi State University',
        fees: 'Bachelor\'s: $2,500-4,000/year\nMaster\'s: $3,000-4,500/year'
      },
      {
        name: 'Georgian Technical University',
        fees: 'Bachelor\'s: $2,000-3,500/year\nMaster\'s: $2,500-4,000/year'
      },
      {
        name: 'Ilia State University',
        fees: 'Bachelor\'s: $2,200-3,800/year\nMaster\'s: $2,800-4,200/year'
      }
    ],
    business: [
      {
        name: 'Free University of Tbilisi',
        fees: 'Business Programs: $3,000-5,000/year\nMBA: $6,000-8,000/year'
      },
      {
        name: 'Caucasus University',
        fees: 'Business Programs: $2,800-4,500/year'
      }
    ]
  },
  admissionRequirements: {
    documents: [
      'High school certificate',
      'Academic transcripts',
      'Passport copy',
      'Medical certificate',
      'Proof of English/Georgian proficiency',
      'Bank statement',
      'Application form',
      'Photos',
      'Birth certificate'
    ],
    languageRequirements: {
      english: 'IELTS 5.5 or TOEFL 65 for English programs',
      georgian: 'B1 level for Georgian-taught programs',
      medical: 'IELTS 6.0 or equivalent for medical programs'
    }
  },
  visaRequirements: {
    documents: [
      'Valid passport',
      'University acceptance letter',
      'Proof of accommodation',
      'Bank statement',
      'Medical insurance',
      'Visa application form',
      'Photos',
      'Return ticket booking'
    ],
    steps: [
      'Receive university acceptance',
      'Apply for student visa/residence permit',
      'Submit required documents',
      'Pay visa fees',
      'Attend visa interview if required',
      'Wait for processing',
      'Register with local authorities upon arrival'
    ]
  },
  costOfLiving: {
    range: '$400 - $700',
    period: 'per month',
    note: 'Tbilisi is more expensive than other cities. Student dormitories available from $150/month'
  },
  scholarships: {
    available: true,
    types: [
      'International Students Scholarship',
      'Government Exchange Programs',
      'University Merit Scholarships',
      'Research Grants',
      'Cultural Exchange Scholarships',
      'Medical Program Scholarships'
    ]
  }
};