import type { Country } from './types';

export const canada: Country = {
  name: 'Canada',
  description: 'Experience world-class education in one of the most welcoming and multicultural countries, offering high-quality programs, post-graduation work opportunities, and an excellent quality of life.',
  image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&q=80&w=2000',
  stats: {
    universities: '100+',
    students: '640,000+',
    programs: '15,000+'
  },
  features: ['Post-Graduation Work Permit', 'Multicultural Environment', 'High Living Standards', 'Safe Environment'],
  academicInstitutions: {
    publicUniversities: {
      description: 'Government-funded institutions offering comprehensive programs at competitive rates.',
      percentage: 65
    },
    privateUniversities: {
      description: 'Independent institutions offering specialized programs with smaller class sizes.',
      percentage: 20
    },
    colleges: {
      description: 'Institutions focusing on practical, career-oriented programs and certificates.',
      percentage: 15
    }
  },
  universities: {
    general: [
      {
        name: 'University of Toronto',
        fees: 'Bachelor\'s: CAD 45,000-65,000/year\nMaster\'s: CAD 30,000-45,000/year'
      },
      {
        name: 'University of British Columbia',
        fees: 'Bachelor\'s: CAD 40,000-58,000/year\nMaster\'s: CAD 28,000-42,000/year'
      },
      {
        name: 'McGill University',
        fees: 'Bachelor\'s: CAD 35,000-55,000/year\nMaster\'s: CAD 27,000-40,000/year'
      }
    ],
    medical: [
      {
        name: 'University of Toronto Faculty of Medicine',
        fees: 'Medicine: CAD 95,000/year\nDentistry: CAD 85,000/year'
      },
      {
        name: 'McGill Faculty of Medicine',
        fees: 'Medicine: CAD 87,000/year\nPharmacy: CAD 45,000/year'
      }
    ],
    technology: [
      {
        name: 'University of Waterloo',
        fees: 'Engineering: CAD 65,000/year\nComputer Science: CAD 55,000/year'
      },
      {
        name: 'University of Alberta',
        fees: 'Technology Programs: CAD 40,000-50,000/year'
      }
    ]
  },
  admissionRequirements: {
    documents: [
      'Academic transcripts',
      'Language proficiency proof',
      'Statement of purpose',
      'Letters of recommendation',
      'CV/Resume',
      'Passport copy',
      'Study permit application',
      'Financial documents',
      'Portfolio (for specific programs)'
    ],
    languageRequirements: {
      english: 'IELTS: 6.5+ (no band below 6.0)\nTOEFL iBT: 90+ (minimum component scores)',
      french: 'TEF/TCF for Quebec institutions',
      medical: 'IELTS: 7.0+ for medical programs'
    }
  },
  visaRequirements: {
    documents: [
      'Valid passport',
      'Letter of acceptance',
      'Proof of financial support',
      'Study permit application',
      'Medical exam results',
      'Police certificates',
      'Biometrics',
      'Immigration photos'
    ],
    steps: [
      'Receive university acceptance',
      'Create account on IRCC portal',
      'Complete study permit application',
      'Pay application fees',
      'Submit biometrics',
      'Attend interview if required',
      'Wait for processing',
      'Prepare for arrival'
    ]
  },
  costOfLiving: {
    range: 'CAD 15,000 - 20,000',
    period: 'per year',
    note: 'Toronto and Vancouver are more expensive than other cities. Student housing: CAD 500-1,500/month'
  },
  scholarships: {
    available: true,
    types: [
      'Vanier Canada Graduate Scholarships',
      'Trudeau Foundation Scholarships',
      'University-specific Scholarships',
      'Entrance Scholarships',
      'Research Grants',
      'Provincial Scholarships'
    ]
  }
};