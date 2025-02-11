import type { Country } from './types';

export const denmark: Country = {
  name: 'Denmark',
  description: 'Experience world-class education in one of the countries with the highest living standards, offering innovative teaching methods and strong focus on research.',
  image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&q=80&w=2000',
  stats: {
    universities: '45+',
    students: '25,000+',
    programs: '400+',
  },
  features: ['Quality of Life', 'Innovation Hub', 'Green Technology', 'Work-Life Balance'],
  academicInstitutions: {
    universities: {
      description: 'Research-based institutions offering comprehensive bachelor\'s, master\'s and PhD programs.',
      percentage: 40
    },
    universityColleges: {
      description: 'Professional higher education institutions focusing on practice-oriented bachelor programs.',
      percentage: 30
    },
    specializedInstitutions: {
      description: 'Institutions focused on specific fields like arts, maritime education, and business.',
      percentage: 30
    }
  },
  universities: {
    general: [
      {
        name: 'University of Copenhagen',
        fees: 'Bachelor\'s: €8,000-15,000/year\nMaster\'s: €10,000-17,000/year'
      },
      {
        name: 'Aarhus University',
        fees: 'Bachelor\'s: €8,500-14,000/year\nMaster\'s: €10,000-16,000/year'
      },
      {
        name: 'University of Southern Denmark',
        fees: 'Bachelor\'s: €8,000-13,000/year\nMaster\'s: €9,000-15,000/year'
      }
    ],
    business: [
      {
        name: 'Copenhagen Business School (CBS)',
        fees: 'Bachelor\'s: €12,000-15,000/year\nMaster\'s: €15,000-20,000/year'
      },
      {
        name: 'Business Academy Aarhus',
        fees: 'Bachelor\'s: €7,500-12,000/year\nMaster\'s: €9,000-14,000/year'
      }
    ],
    technology: [
      {
        name: 'Technical University of Denmark (DTU)',
        fees: 'Bachelor\'s: €13,000-16,000/year\nMaster\'s: €15,000-18,000/year'
      },
      {
        name: 'IT University of Copenhagen',
        fees: 'Bachelor\'s: €12,000-15,000/year\nMaster\'s: €13,000-16,000/year'
      }
    ],
    arts: [
      {
        name: 'Royal Danish Academy of Fine Arts',
        fees: 'Bachelor\'s: €10,000-13,000/year\nMaster\'s: €12,000-15,000/year'
      },
      {
        name: 'Royal Danish Academy of Music',
        fees: 'Bachelor\'s: €9,000-12,000/year\nMaster\'s: €11,000-14,000/year'
      }
    ]
  },
  admissionRequirements: {
    documents: [
      'Secondary school diploma',
      'Academic transcripts',
      'English language proficiency proof',
      'Danish language proficiency (for Danish-taught programs)',
      'Letter of motivation',
      'CV/Resume',
      'Portfolio (for art/design programs)',
      'Research proposal (for PhD programs)'
    ],
    languageRequirements: {
      english: 'IELTS 6.5 or TOEFL 83',
      danish: 'Danish A-level or equivalent for Danish-taught programs',
      research: 'C1 level English for doctoral programs'
    }
  },
  visaRequirements: {
    documents: [
      'Valid passport',
      'Acceptance letter from Danish institution',
      'Proof of financial means (DKK 6,243/month)',
      'Health insurance',
      'ST1 application form',
      'Passport photos',
      'Proof of paid tuition fees',
      'Housing documentation'
    ],
    steps: [
      'Receive university acceptance',
      'Pay first semester tuition',
      'Apply for residence permit (ST1)',
      'Submit biometrics',
      'Wait for processing',
      'Register with local authorities upon arrival'
    ]
  },
  costOfLiving: {
    range: 'DKK 8,000 - 12,000',
    period: 'per month',
    note: 'Copenhagen is significantly more expensive than other cities'
  },
  scholarships: {
    available: true,
    types: [
      'Danish Government Scholarships',
      'Erasmus+ Grants',
      'University Merit Scholarships',
      'Nordic Research Grants',
      'Department-specific Scholarships',
      'Cultural Agreements Scholarships'
    ]
  }
};