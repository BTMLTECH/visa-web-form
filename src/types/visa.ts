export interface TravelInfo {
  countryOfNationality: string;
  reasonForTravel: string;
  employmentVisaType?: string;
  studyVisaType?: string;
  visaType: 'short' | 'long';
  journeyType: 'single' | 'multiple';
  purposeOfTravel: string;
  passportType: string;
  passportNumber: string;
  proposedEntryDate: string;
  proposedExitDate: string;
}

export interface PersonalInfo {
  surname: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  countryOfBirth: string;
  currentLocation: string;
  addressLine1: string;
  addressLine2: string;
  contactPhone: string;
  emailAddress: string;
}

export interface VisaHistory {
  lengthOfResidenceYears: string;
  lengthOfResidenceMonths: string;
  previousVisaApplications: string;
  visaRefusals: string;
  criminalConvictions: string;
  hasBeenRefused: 'yes' | 'no';
  hasConvictions: 'yes' | 'no';
}

export interface PassportDetails {
  passportNumber: string;
  travelDocumentType: string;
  issuingAuthority: string;
  dateOfIssue: string;
  dateOfExpiry: string;
  isFirstPassport: boolean;
  previousPassportNumber?: string;
  previousPassportExpiry?: string;
}

export interface EmploymentEducation {
  employmentStatus: string;
  employerName?: string;
  employerAddress?: string;
  jobTitle?: string;
  studentStatus: string;
  schoolName?: string;
  schoolAddress?: string;
  courseOfStudy?: string;
}

export interface TravelCompanion {
  name: string;
  relationship: string;
}

export interface TravelCompanions {
  travelingWithOthers: boolean;
  companions: TravelCompanion[];
}

export interface ContactHost {
  hostName: string;
  hostAddress: string;
  hostPhone: string;
  hostEmail: string;
  relationshipToHost: string;
  hostType: string;
}

export interface PersonalStatus {
  maritalStatus: string;
  spouseName?: string;
  spouseNationality?: string;
  spouseDateOfBirth?: string;
}

export interface Child {
  name: string;
  dateOfBirth: string;
  nationality: string;
}

export interface DependantChildren {
  numberOfChildren: string;
  children: Child[];
}

export interface AgentAssistance {
  usingAgent: boolean;
  agentName?: string;
  agentAddress?: string;
  agentPhone?: string;
  agentEmail?: string;
}

export interface Declaration {
  agreeToDeclaration: boolean;
  signature: string;
  dateOfDeclaration: string;
}

export interface VisaFormData {
  travelInfo: TravelInfo;
  personalInfo: PersonalInfo;
  visaHistory: VisaHistory;
  passportDetails: PassportDetails;
  employmentEducation: EmploymentEducation;
  travelCompanions: TravelCompanions;
  contactHost: ContactHost;
  personalStatus: PersonalStatus;
  dependantChildren: DependantChildren;
  agentAssistance: AgentAssistance;
  declaration: Declaration;
}
