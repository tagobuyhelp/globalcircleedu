import type { Country } from './types';

export const uae: Country = {
  name: 'United Arab Emirates',
  description: 'Experience world-class education in one of the most dynamic and multicultural hubs of the Middle East, offering modern infrastructure, safe environment, and excellent career opportunities in a tax-free economy.',
  image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=2000',
  stats: {
    universities: '60+',
    students: '80,000+',
    programs: '500+'
  },
  features: ['Modern Infrastructure', 'Multicultural Environment', 'Tax-Free Economy', 'Safe Environment'],
  academicInstitutions: {
    publicUniversities: {
      description: 'Federal institutions offering programs primarily in Arabic with some English options.',
      percentage: 30
    },
    privateUniversities: {
      description: 'International branch campuses and private institutions offering diverse programs.',
      percentage: 60
    },
    technicalInstitutes: {
      description: 'Specialized institutions focusing on technical and vocational education.',
      percentage: 10
    }
  },
  universities: {
    general: [
      {
        name: 'United Arab Emirates University',
        fees: 'Bachelor\'s: AED 60,000-90,000/year\nMaster\'s: AED 75,000-120,000/year'
      },
      {
        name: 'American University of Sharjah',
        fees: 'Bachelor\'s: AED 85,000-105,000/year\nMaster\'s: AED 95,000-125,000/year'
      },
      {
        name: 'University of Dubai',
        fees: 'Bachelor\'s: AED 55,000-85,000/year\nMaster\'s: AED 75,000-110,000/year'
      }
    ],
    medical: [
      {
        name: 'Mohammed Bin Rashid University of Medicine',
        fees: 'Medicine: AED 157,500/year\nDentistry: AED 145,000/year'
      },
      {
        name: 'Gulf Medical University',
        fees: 'Medicine: AED 132,000/year\nPharmacy: AED 85,000/year'
      }
    ],
    technology: [
      {
        name: 'Khalifa University',
        fees: 'Engineering: AED 97,500/year\nIT Programs: AED 95,000/year'
      },
      {
        name: 'Rochester Institute of Technology Dubai',
        fees: 'Technology Programs: AED 85,000-115,000/year'
      }
    ]
  },
  admissionRequirements: {
    documents: [
      'High school certificate with attestation',
      'Academic transcripts',
      'English proficiency proof',
      'Arabic proficiency (for Arabic programs)',
      'Passport copy',
      'Emirates ID (if applicable)',
      'Passport-size photographs',
      'Health insurance',
      'Medical fitness certificate'
    ],
    languageRequirements: {
      english: 'IELTS 6.0+ or TOEFL iBT 79+ (varies by university)',
      arabic: 'Certificate of proficiency for Arabic-taught programs',
      medical: 'IELTS 6.5+ or TOEFL iBT 85+ for medical programs'
    }
  },
  visaRequirements: {
    documents: [
      'Valid passport',
      'University acceptance letter',
      'Completed visa application',
      'Passport-size photographs',
      'Academic certificates',
      'Bank statements',
      'Health insurance',
      'Police clearance certificate'
    ],
    steps: [
      'Receive university acceptance',
      'Submit visa application through university',
      'Complete medical examination',
      'Pay visa fees',
      'Receive entry permit',
      'Enter UAE',
      'Complete Emirates ID process',
      'Convert entry permit to residence visa'
    ]
  },
  costOfLiving: {
    range: 'AED 3,000 - 7,000',
    period: 'per month',
    note: 'Dubai and Abu Dhabi are more expensive than other emirates. Student accommodation: AED 1,500-4,000/month'
  },
  scholarships: {
    available: true,
    types: [
      'UAE Government Scholarships',
      'University Merit Scholarships',
      'Emirati Excellence Scholarship',
      'Research Grants',
      'Corporate Sponsorships',
      'Cultural Exchange Programs'
    ]
  }
};