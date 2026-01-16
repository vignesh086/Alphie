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
  city: string;
  state: string;
  zipCode: string;
  country: string;

  // Step 3: Identity Verification
  ssn: string;
  idType: 'drivers_license' | 'passport' | 'state_id';
  idNumber: string;

  // Step 4: Account Preferences
  accountNickname: string;
  initialDeposit: string;
  enablePaperlessStatements: boolean;
  enableMobileDeposit: boolean;
}

// Business Account Data
export interface BusinessAccountData {
  // Step 1: Business Info
  businessName: string;
  businessType: 'sole_proprietor' | 'llc' | 'corporation' | 'partnership' | 'nonprofit';
  ein: string;
  businessPhone: string;
  businessEmail: string;
  website: string;

  // Step 2: Business Address
  businessStreetAddress: string;
  businessCity: string;
  businessState: string;
  businessZipCode: string;
  businessCountry: string;

  // Step 3: Owner/Authorized Signer Info
  ownerFirstName: string;
  ownerLastName: string;
  ownerEmail: string;
  ownerPhone: string;
  ownerDateOfBirth: string;
  ownerSSN: string;
  ownershipPercentage: string;

  // Step 4: Business Details
  industryType: string;
  yearEstablished: string;
  numberOfEmployees: string;
  annualRevenue: string;

  // Step 5: Account Preferences
  accountNickname: string;
  initialDeposit: string;
  enablePaperlessStatements: boolean;
  enableWireTransfers: boolean;
  enableACHPayments: boolean;
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
  type: 'text' | 'email' | 'phone' | 'date' | 'ssn' | 'currency' | 'select' | 'toggle';
  required: boolean;
  options?: { label: string; value: string }[];
}
