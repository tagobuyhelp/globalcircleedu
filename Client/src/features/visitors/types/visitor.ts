// Core visitor types
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface EducationScore {
  percentage: number;
  gpa: number;
}

export interface Education {
  score: EducationScore;
  level: string;
  institution: string;
  fieldOfStudy: string;
  degreeName: string;
  courseType: string;
  modeOfStudy: string;
  mediumOfEducation: string;
  division: string;
  yearOfReceiving: number;
}

export interface Professional {
  companyName: string;
  jobTitle: string;
  yearsOfExperience: number;
}

export interface Document {
  name: string;
  fileURL: string;
  documentType: string;
}

export interface Documents {
  identityDocument: Document;
  transcript: Document;
  workExperience: Document;
  languageTests: Document;
}

export interface Visitor {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  visitorType: 'Student' | 'Worker';
  interestedCourse: any | null; // Replace 'any' with proper Course type
  country: string;
  profilePicture: string;
  preferredContact: 'Email' | 'Phone' | 'WhatsApp';
  gender: 'Male' | 'Female' | 'Other';
  age: number;
  isConsultationBooked: boolean;
  notes: string;
  preferredConsultationDate: string | null;
  referralSource: string;
  address: Address;
  education: Education;
  professional: Professional;
  documents: Documents;
  createdAt: string;
  updatedAt: string;
}