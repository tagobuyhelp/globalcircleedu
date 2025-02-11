import type { Country } from './types';

export const sweden: Country = {
  name: 'Sweden',
  description: 'Experience world-class education in one of the most innovative countries, offering high-quality research-based education and strong industry connections.',
  image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&q=80&w=2000',
  stats: {
    universities: '60+',
    students: '40,000+',
    programs: '700+',
  },
  features: ['Innovation Focus', 'Research Excellence', 'Work-Life Balance', 'Sustainable Living'],
  academicInstitutions: {
    publicUniversities: {
      description: 'State-funded research universities offering comprehensive programs with strong research focus.',
      percentage: 70
    },
    specializedInstitutes: {
      description: 'Technical and medical institutions focused on specific fields.',
      percentage: 20
    },
    universityColleges: {
      description: 'Institutions focusing on specific subject areas and applied sciences.',
      percentage: 10
    }
  },
  universities: {
    medical: [
      {
        name: 'Karolinska Institute',
        fees: 'Biomedicine (Bachelor\'s): 540,000 SEK total\nMaster\'s Programs: 330,000-400,000 SEK total'
      },
      {
        name: 'University of Gothenburg',
        fees: 'Medicine: 460,000 SEK/year\nDental: 450,000 SEK/year'
      },
      {
        name: 'Lund University Medical Faculty',
        fees: 'Medicine: 460,000 SEK/year\nBiomedical Programs: 420,000 SEK/year'
      }
    ],
    general: [
      {
        name: 'Lund University',
        fees: 'Bachelor\'s: 80,000-140,000 SEK/year\nMaster\'s: 110,000-295,000 SEK/year'
      },
      {
        name: 'Uppsala University',
        fees: 'Bachelor\'s: 90,000-150,000 SEK/year\nMaster\'s: 120,000-280,000 SEK/year'
      },
      {
        name: 'Stockholm University',
        fees: 'Bachelor\'s: 90,000-140,000 SEK/year\nMaster\'s: 100,000-270,000 SEK/year'
      }
    ],
    technology: [
      {
        name: 'KTH Royal Institute of Technology',
        fees: 'Engineering: 150,000-190,000 SEK/year\nTechnology Programs: 140,000-180,000 SEK/year'
      },
      {
        name: 'Chalmers University of Technology',
        fees: 'Engineering: 140,000-180,000 SEK/year\nMaster\'s Programs: 150,000-190,000 SEK/year'
      }
    ]
  },
  admissionRequirements: {
    documents: [
      'High school diploma/transcripts',
      'Bachelor\'s degree (for Master\'s programs)',
      'English language proficiency proof',
      'Letter of motivation',
      'CV/Resume',
      'Letters of recommendation',
      'Portfolio (for art/design programs)',
      'Research proposal (for PhD programs)'
    ],
    languageRequirements: {
      english: 'IELTS 6.5 or TOEFL 90',
      swedish: 'TISUS or equivalent for Swedish-taught programs',
      research: 'C1 level English for doctoral programs'
    }
  },
  visaRequirements: {
    documents: [
      'Valid passport',
      'Letter of acceptance',
      'Proof of financial means (SEK 8,010/month)',
      'Health insurance',
      'Residence permit application',
      'Proof of paid tuition fees',
      'Passport photos',
      'Application fee receipt (SEK 1,000)'
    ],
    steps: [
      'Receive university acceptance',
      'Pay first tuition fee installment',
      'Apply for residence permit online',
      'Submit biometrics at embassy',
      'Wait for processing',
      'Receive permit decision'
    ]
  },
  costOfLiving: {
    range: 'SEK 8,000 - 13,500',
    period: 'per month',
    note: 'Stockholm is significantly more expensive than other cities'
  },
  scholarships: {
    available: true,
    types: [
      'Swedish Institute Scholarships',
      'University-specific Scholarships',
      'Government Research Grants',
      'Erasmus+ Funding',
      'Department Scholarships',
      'Industry-sponsored Scholarships'
    ]
  }
};