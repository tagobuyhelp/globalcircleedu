import type { Country } from './types';

export const france: Country = {
  name: 'France',
  description: 'Experience world-class education in one of Europe\'s most culturally rich countries, offering prestigious programs across diverse fields including fashion, culinary arts, and business.',
  image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=2000',
  stats: {
    universities: '150+',
    students: '25,000+',
    programs: '500+',
  },
  features: ['Rich Cultural Heritage', 'Quality Education', 'Post-Study Work Options', 'Affordable Education'],
  academicInstitutions: {
    publicUniversities: {
      description: 'State-funded universities offering programs from Bachelor\'s to Doctoral degrees at very affordable rates.',
      percentage: 70
    },
    grandesEcoles: {
      description: 'Prestigious institutions known for business, engineering, and political science programs.',
      percentage: 20
    },
    specializedSchools: {
      description: 'Institutions focused on art, fashion, culinary arts, and other specific fields.',
      percentage: 10
    }
  },
  universities: {
    general: [
      {
        name: 'Sorbonne University',
        fees: 'Bachelor\'s: €170-3,770/year\nMaster\'s: €243-3,770/year'
      },
      {
        name: 'Paris-Saclay University',
        fees: 'Bachelor\'s: €170-3,770/year\nMaster\'s: €243-3,770/year'
      }
    ],
    business: [
      {
        name: 'HEC Paris',
        fees: 'Master\'s: €36,500/year\nMBA: €72,500/program'
      },
      {
        name: 'ESSEC Business School',
        fees: 'Bachelor\'s: €15,200/year\nMaster\'s: €21,500/year'
      },
      {
        name: 'INSEAD',
        fees: 'MBA: €89,000/program'
      }
    ],
    fashion: [
      {
        name: 'ESMOD Paris',
        fees: 'Fashion Design: €12,900/year'
      },
      {
        name: 'Institut Français de la Mode',
        fees: 'Fashion Business: €16,000/year'
      },
      {
        name: 'Parsons Paris',
        fees: 'Fashion Design: €21,500/year'
      }
    ],
    culinary: [
      {
        name: 'Le Cordon Bleu Paris',
        fees: 'Grand Diplôme: €47,000/9 months'
      },
      {
        name: 'Institut Paul Bocuse',
        fees: 'Culinary Arts: €15,000/year'
      },
      {
        name: 'Ferrandi Paris',
        fees: 'Culinary Programs: €14,000/year'
      }
    ],
    technology: [
      {
        name: 'École Polytechnique',
        fees: 'Engineering Programs: €12,000-15,000/year'
      },
      {
        name: 'CentraleSupélec',
        fees: 'Engineering: €10,000-12,000/year'
      }
    ]
  },
  admissionRequirements: {
    documents: [
      'High school diploma/transcripts',
      'Bachelor\'s degree (for Master\'s programs)',
      'French/English language proficiency',
      'Motivation letter',
      'CV/Resume',
      'Letters of recommendation',
      'Portfolio (for art/design programs)',
      'Campus France authorization'
    ],
    languageRequirements: {
      french: 'B2 level for French-taught programs (DELF/DALF)',
      english: 'IELTS 6.5 or TOEFL 90 for English-taught programs',
      business: 'C1 level for top business schools'
    }
  },
  visaRequirements: {
    documents: [
      'Valid passport',
      'Acceptance letter from French institution',
      'Proof of financial means (€615/month)',
      'Health insurance',
      'Birth certificate',
      'Campus France validation',
      'Accommodation proof',
      'OFII form'
    ],
    steps: [
      'Create Campus France account',
      'Submit application on Études en France',
      'Get Campus France approval',
      'Apply for student visa',
      'Submit required documents',
      'Attend visa interview',
      'Validate visa within 3 months of arrival'
    ]
  },
  costOfLiving: {
    range: '€800 - €1,500',
    period: 'per month',
    note: 'Paris is significantly more expensive than other cities. Students get housing assistance (CAF).'
  },
  scholarships: {
    available: true,
    types: [
      'Eiffel Excellence Scholarship',
      'French Embassy Scholarships',
      'Erasmus+ Grants',
      'Regional Council Scholarships',
      'University-specific Scholarships',
      'French Government Grants'
    ]
  }
};