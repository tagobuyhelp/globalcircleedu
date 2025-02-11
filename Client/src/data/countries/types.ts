export interface University {
  name: string;
  fees: string;
  description?: string;
  imatScore?: number;
}

export interface AcademicInstitution {
  description: string;
  percentage: number;
}

export interface AdmissionRequirement {
  documents: string[];
  languageRequirements: Record<string, string>;
}

export interface VisaRequirement {
  documents: string[];
  steps: string[];
}

export interface CostOfLiving {
  range: string;
  period: string;
  note?: string;
}

export interface Scholarship {
  available: boolean;
  types: string[];
}

export interface CountryStats {
  universities: string;
  students: string;
  programs: string;
}

export interface CountryUniversities {
  general?: University[];
  business?: University[];
  medical?: University[];
  dental?: University[];
  technology?: University[];
  fashion?: University[];
  culinary?: University[];
}

export interface Country {
  name: string;
  description: string;
  image: string;
  stats: CountryStats;
  features: string[];
  academicInstitutions: Record<string, AcademicInstitution>;
  universities: CountryUniversities;
  admissionRequirements: AdmissionRequirement;
  visaRequirements: VisaRequirement;
  costOfLiving: CostOfLiving;
  scholarships: Scholarship;
}