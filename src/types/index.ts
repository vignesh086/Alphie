// Account Types
export type AccountType = 'personal' | 'business';

// Personal Account Data
export interface PersonalAccountData {
  // Step 1: Basic Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;

  // Step 2: Address
  streetAddress: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string;

  // Step 3: Identity Verification
  tfn: string; // Tax File Number
  idType: 'drivers_licence' | 'passport' | 'proof_of_age_card';
  idNumber: string;
  idState: string; // State of issue for licence/ID

  // Step 4: Account Preferences
  accountNickname: string;
  initialDeposit: string;
  enablePaperlessStatements: boolean;
  enablePayID: boolean;
}

// Business Account Data
export interface BusinessAccountData {
  // Step 1: Business Info
  businessName: string;
  businessType: 'sole_trader' | 'partnership' | 'company' | 'trust' | 'nonprofit';
  abn: string; // Australian Business Number
  acn: string; // Australian Company Number (optional, for companies)
  businessPhone: string;
  businessEmail: string;
  website: string;

  // Step 2: Business Address
  businessStreetAddress: string;
  businessSuburb: string;
  businessState: string;
  businessPostcode: string;
  businessCountry: string;

  // Step 3: Owner/Authorised Signer Info
  ownerFirstName: string;
  ownerLastName: string;
  ownerEmail: string;
  ownerPhone: string;
  ownerDateOfBirth: string;
  ownerTFN: string;
  ownershipPercentage: string;

  // Step 4: Business Details
  industryType: string;
  yearEstablished: string;
  numberOfEmployees: string;
  annualTurnover: string;

  // Step 5: Account Preferences
  accountNickname: string;
  initialDeposit: string;
  enablePaperlessStatements: boolean;
  enableBPAY: boolean;
  enablePayID: boolean;
}

// Navigation Types
export type RootStackParamList = {
  Welcome: undefined;
  AccountTypeSelection: undefined;
  PersonalOnboarding: undefined;
  BusinessOnboarding: undefined;
  AccountReview: {
    accountType: AccountType;
    accountData: PersonalAccountData | BusinessAccountData;
  };
  Success: {
    accountType: AccountType;
  };
};

// Onboarding Step
export interface OnboardingStep {
  id: number;
  title: string;
  description: string;
}

// Form Field
export interface FormField {
  key: string;
  label: string;
  placeholder: string;
  type: 'text' | 'email' | 'phone' | 'date' | 'tfn' | 'abn' | 'currency' | 'select' | 'toggle';
  required: boolean;
  options?: { label: string; value: string }[];
}
