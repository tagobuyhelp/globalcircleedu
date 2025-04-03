import type { Country } from './types';

export const finland: Country = {
  name: 'Finland',
  description: 'Experience world-class education in one of the happiest countries, offering tuition-free programs, innovative teaching methods, and excellent quality of life.',
  image: 'https://images.unsplash.com/photo-1529154166925-574a0236a4f4?auto=format&fit=crop&q=80&w=2000',
  stats: {
    universities: '35+',
    students: '30,000+',
    programs: '500+'
  },
  features: ['Tuition-Free Education', 'High Living Standards', 'Innovation Hub', 'Work While Studying'],
  academicInstitutions: {
    universities: {
      description: 'Research-focused institutions offering comprehensive bachelor\'s to doctoral programs.',
      percentage: 45
    },
    polytechnics: {
      description: 'Universities of Applied Sciences focusing on practical professional education.',
      percentage: 40
    },
    specializedInstitutes: {
      description: 'Focused institutions for specific fields like arts, defense, and police education.',
      percentage: 15
    }
  },
  universities: {
    general: [
      {
        name: 'University of Helsinki',
        fees: 'EU/EEA: Free\nNon-EU: €13,000-18,000/year'
      },
      {
        name: 'Aalto University',
        fees: 'EU/EEA: Free\nNon-EU: €12,000-15,000/year'
      },
      {
        name: 'University of Turku',
        fees: 'EU/EEA: Free\nNon-EU: €10,000-16,000/year'
      }
    ],
    technology: [
      {
        name: 'Aalto University School of Engineering',
        fees: 'EU/EEA: Free\nNon-EU: €15,000/year'
      },
      {
        name: 'Tampere University of Technology',
        fees: 'EU/EEA: Free\nNon-EU: €12,000/year'
      }
    ],
    business: [
      {
        name: 'Hanken School of Economics',
        fees: 'EU/EEA: Free\nNon-EU: €12,500/year'
      },
      {
        name: 'Aalto School of Business',
        fees: 'EU/EEA: Free\nNon-EU: €14,000/year'
      }
    ]
  },
  admissionRequirements: {
    documents: [
      'Previous degree certificates',
      'Transcript of records',
      'Proof of language proficiency',
      'Motivation letter',
      'CV/Resume',
      'Copy of passport',
      'Entrance exam results (if applicable)',
      'Portfolio (for art/design programs)',
      'Research proposal (for doctoral programs)'
    ],
    languageRequirements: {
      english: 'IELTS 6.5+ or TOEFL 92+ (varies by program)',
      finnish: 'B2 level for Finnish-taught programs',
      swedish: 'B2 level for Swedish-taught programs'
    }
  },
  visaRequirements: {
    documents: [
      'Valid passport',
      'Acceptance letter',
      'Proof of sufficient funds (€6,720/year)',
      'Health insurance',
      'Residence permit application',
      'Passport photos',
      'Proof of paid tuition (if applicable)',
      'Bank statements'
    ],
    steps: [
      'Receive acceptance letter',
      'Apply for residence permit online',
      'Visit Finnish embassy/consulate',
      'Submit biometric data',
      'Pay permit fee',
      'Wait for processing',
      'Collect residence permit',
      'Register with local authorities upon arrival'
    ]
  },
  costOfLiving: {
    range: '€700 - €1,100',
    period: 'per month',
    note: 'Helsinki region is more expensive than other cities. Student housing from €250-600/month'
  },
  scholarships: {
    available: true,
    types: [
      'Finnish Government Scholarship Pool',
      'EDUFI Fellowships',
      'University-specific Scholarships',
      'Erasmus+ Grants',
      'Nordic First Scholarships',
      'Department Scholarships'
    ]
  }
};