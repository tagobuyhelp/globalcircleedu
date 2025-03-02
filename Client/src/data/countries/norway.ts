import type { Country } from './types';

export const norway: Country = {
  name: 'Norway',
  description: 'Experience world-class education in one of the world\'s most advanced countries, offering high-quality programs, stunning nature, and excellent quality of life with many English-taught programs.',
  image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=2000',
  stats: {
    universities: '40+',
    students: '18,000+',
    programs: '400+'
  },
  features: ['High Quality Education', 'Modern Facilities', 'Strong Research Focus', 'Work Opportunities'],
  academicInstitutions: {
    publicUniversities: {
      description: 'State-funded universities offering tuition-free education for most students.',
      percentage: 70
    },
    specializedUniversities: {
      description: 'Focused institutions for specific fields like technology and business.',
      percentage: 20
    },
    privateInstitutions: {
      description: 'Private colleges offering specialized programs.',
      percentage: 10
    }
  },
  universities: {
    general: [
      {
        name: 'University of Oslo',
        fees: 'No tuition (Semester fee: NOK 750/semester)'
      },
      {
        name: 'University of Bergen',
        fees: 'No tuition (Semester fee: NOK 750/semester)'
      },
      {
        name: 'Norwegian University of Science and Technology (NTNU)',
        fees: 'No tuition (Semester fee: NOK 750/semester)'
      }
    ],
    technology: [
      {
        name: 'Norwegian University of Science and Technology',
        fees: 'Engineering: No tuition\nTechnology Programs: No tuition'
      },
      {
        name: 'University of Stavanger',
        fees: 'Technology Programs: No tuition'
      }
    ],
    business: [
      {
        name: 'BI Norwegian Business School',
        fees: 'Bachelor\'s: NOK 224,700/year\nMaster\'s: NOK 278,400/year'
      },
      {
        name: 'NHH Norwegian School of Economics',
        fees: 'No tuition (Semester fee only)'
      }
    ]
  },
  admissionRequirements: {
    documents: [
      'Higher Secondary Certificate',
      'Academic transcripts',
      'Language proficiency certificates',
      'Motivation letter',
      'CV/Resume',
      'Copy of passport',
      'Passport photos',
      'Financial guarantee'
    ],
    languageRequirements: {
      norwegian: 'B2 level for Norwegian-taught programs',
      english: 'IELTS 6.5 or TOEFL 90 for English-taught programs',
      masters: 'IELTS 7.0 for some Master\'s programs'
    }
  },
  visaRequirements: {
    documents: [
      'Valid passport',
      'University acceptance letter',
      'Proof of sufficient funds (NOK 128,887 per year)',
      'Health insurance',
      'Housing guarantee',
      'Visa application form',
      'Biometric data',
      'Police clearance certificate'
    ],
    steps: [
      'Receive university acceptance',
      'Apply for student residence permit',
      'Submit required documents',
      'Pay visa fees',
      'Provide biometric data',
      'Wait for processing',
      'Register with local authorities upon arrival'
    ]
  },
  costOfLiving: {
    range: 'NOK 12,000 - 15,000',
    period: 'per month',
    note: 'Oslo is significantly more expensive than other cities. Student housing from NOK 3,000-7,000/month'
  },
  scholarships: {
    available: true,
    types: [
      'Norwegian State Educational Loan Fund',
      'Quota Scheme Scholarships',
      'Erasmus+ Grants',
      'University-specific Scholarships',
      'Research Fellowships',
      'Nordic Research Opportunities'
    ]
  }
};