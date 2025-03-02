import type { Country } from './types';

export const australia: Country = {
  name: 'Australia',
  description: 'Experience world-class education in a multicultural environment with globally recognized universities, offering excellent research opportunities and an outstanding quality of life in one of the world\'s most livable countries.',
  image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=2000',
  stats: {
    universities: '43+',
    students: '750,000+',
    programs: '22,000+'
  },
  features: ['World-Class Education', 'Multicultural Environment', 'Post-Study Work Rights', 'High Living Standards'],
  academicInstitutions: {
    publicUniversities: {
      description: 'Government-funded universities known as the "Group of Eight" and other public institutions.',
      percentage: 65
    },
    privateUniversities: {
      description: 'Independent institutions offering specialized programs.',
      percentage: 15
    },
    technicalInstitutes: {
      description: 'TAFE (Technical and Further Education) institutions offering vocational and diploma courses.',
      percentage: 20
    }
  },
  universities: {
    general: [
      {
        name: 'University of Melbourne',
        fees: 'Bachelor\'s: AUD 33,000-46,000/year\nMaster\'s: AUD 34,000-48,000/year'
      },
      {
        name: 'University of Sydney',
        fees: 'Bachelor\'s: AUD 35,000-45,000/year\nMaster\'s: AUD 36,000-49,000/year'
      },
      {
        name: 'Australian National University',
        fees: 'Bachelor\'s: AUD 32,000-45,000/year\nMaster\'s: AUD 34,000-47,000/year'
      }
    ],
    medical: [
      {
        name: 'Monash University Medical School',
        fees: 'Medicine: AUD 75,000/year\nDentistry: AUD 78,000/year'
      },
      {
        name: 'University of Queensland Medical School',
        fees: 'Medicine: AUD 71,000/year\nPharmacy: AUD 45,000/year'
      }
    ],
    technology: [
      {
        name: 'University of New South Wales',
        fees: 'Engineering: AUD 44,000/year\nIT Programs: AUD 42,000/year'
      },
      {
        name: 'Royal Melbourne Institute of Technology',
        fees: 'Technology Programs: AUD 36,000-43,000/year'
      }
    ]
  },
  admissionRequirements: {
    documents: [
      'Academic transcripts',
      'English language proficiency proof',
      'Statement of purpose',
      'Letters of recommendation',
      'CV/Resume',
      'Passport copy',
      'Financial documents',
      'Health insurance (OSHC)',
      'Portfolio (for specific courses)'
    ],
    languageRequirements: {
      english: 'IELTS 6.5+ (no band less than 6.0)\nTOEFL iBT 79+ (with minimum section scores)',
      postgraduate: 'IELTS 7.0+ for some programs',
      medical: 'IELTS 7.0+ (no band less than 7.0)'
    }
  },
  visaRequirements: {
    documents: [
      'Valid passport',
      'Confirmation of Enrollment (CoE)',
      'Proof of financial capacity',
      'Overseas Student Health Cover (OSHC)',
      'English proficiency results',
      'Statement of purpose',
      'Visa application form',
      'Genuine Temporary Entrant (GTE) statement'
    ],
    steps: [
      'Receive university acceptance',
      'Pay first tuition installment',
      'Receive CoE from university',
      'Apply for student visa (subclass 500)',
      'Submit required documents',
      'Undergo health examination if required',
      'Wait for visa processing',
      'Arrange accommodation and travel'
    ]
  },
  costOfLiving: {
    range: 'AUD 1,800 - 2,500',
    period: 'per month',
    note: 'Sydney and Melbourne are more expensive than other cities. Student accommodation: AUD 150-500/week'
  },
  scholarships: {
    available: true,
    types: [
      'Australia Awards Scholarships',
      'Destination Australia Scholarships',
      'Research Training Program (RTP)',
      'University Merit Scholarships',
      'Australian Government Scholarships',
      'Endeavour Leadership Program'
    ]
  }
};