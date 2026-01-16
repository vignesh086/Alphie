import { OnboardingStep, FormField } from '../types';

// Personal Account Steps
export const PERSONAL_ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 1,
    title: 'Personal Information',
    description: 'Tell us about yourself',
  },
  {
    id: 2,
    title: 'Address',
    description: 'Where do you live?',
  },
  {
    id: 3,
    title: 'Identity Verification',
    description: 'Verify your identity',
  },
  {
    id: 4,
    title: 'Account Setup',
    description: 'Set up your account preferences',
  },
];

// Business Account Steps
export const BUSINESS_ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 1,
    title: 'Business Information',
    description: 'Tell us about your business',
  },
  {
    id: 2,
    title: 'Business Address',
    description: 'Where is your business located?',
  },
  {
    id: 3,
    title: 'Owner Information',
    description: 'Primary owner details',
  },
  {
    id: 4,
    title: 'Business Details',
    description: 'Additional business information',
  },
  {
    id: 5,
    title: 'Account Setup',
    description: 'Set up your business account',
  },
];

// Personal Account Form Fields
export const PERSONAL_STEP_1_FIELDS: FormField[] = [
  { key: 'firstName', label: 'First Name', placeholder: 'Enter first name', type: 'text', required: true },
  { key: 'lastName', label: 'Last Name', placeholder: 'Enter last name', type: 'text', required: true },
  { key: 'email', label: 'Email Address', placeholder: 'Enter email address', type: 'email', required: true },
  { key: 'phone', label: 'Phone Number', placeholder: '(555) 123-4567', type: 'phone', required: true },
  { key: 'dateOfBirth', label: 'Date of Birth', placeholder: 'MM/DD/YYYY', type: 'date', required: true },
];

export const PERSONAL_STEP_2_FIELDS: FormField[] = [
  { key: 'streetAddress', label: 'Street Address', placeholder: 'Enter street address', type: 'text', required: true },
  { key: 'city', label: 'City', placeholder: 'Enter city', type: 'text', required: true },
  {
    key: 'state',
    label: 'State',
    placeholder: 'Select state',
    type: 'select',
    required: true,
    options: [
      { label: 'Alabama', value: 'AL' },
      { label: 'Alaska', value: 'AK' },
      { label: 'Arizona', value: 'AZ' },
      { label: 'California', value: 'CA' },
      { label: 'Colorado', value: 'CO' },
      { label: 'Florida', value: 'FL' },
      { label: 'Georgia', value: 'GA' },
      { label: 'New York', value: 'NY' },
      { label: 'Texas', value: 'TX' },
      { label: 'Washington', value: 'WA' },
    ],
  },
  { key: 'zipCode', label: 'ZIP Code', placeholder: 'Enter ZIP code', type: 'text', required: true },
  {
    key: 'country',
    label: 'Country',
    placeholder: 'Select country',
    type: 'select',
    required: true,
    options: [{ label: 'United States', value: 'US' }],
  },
];

export const PERSONAL_STEP_3_FIELDS: FormField[] = [
  { key: 'ssn', label: 'Social Security Number', placeholder: 'XXX-XX-XXXX', type: 'ssn', required: true },
  {
    key: 'idType',
    label: 'ID Type',
    placeholder: 'Select ID type',
    type: 'select',
    required: true,
    options: [
      { label: "Driver's License", value: 'drivers_license' },
      { label: 'Passport', value: 'passport' },
      { label: 'State ID', value: 'state_id' },
    ],
  },
  { key: 'idNumber', label: 'ID Number', placeholder: 'Enter ID number', type: 'text', required: true },
];

export const PERSONAL_STEP_4_FIELDS: FormField[] = [
  { key: 'accountNickname', label: 'Account Nickname', placeholder: 'e.g., My Savings', type: 'text', required: false },
  { key: 'initialDeposit', label: 'Initial Deposit Amount', placeholder: '$0.00', type: 'currency', required: false },
  { key: 'enablePaperlessStatements', label: 'Paperless Statements', placeholder: '', type: 'toggle', required: false },
  { key: 'enableMobileDeposit', label: 'Mobile Check Deposit', placeholder: '', type: 'toggle', required: false },
];

// Business Account Form Fields
export const BUSINESS_STEP_1_FIELDS: FormField[] = [
  { key: 'businessName', label: 'Business Name', placeholder: 'Enter business name', type: 'text', required: true },
  {
    key: 'businessType',
    label: 'Business Type',
    placeholder: 'Select business type',
    type: 'select',
    required: true,
    options: [
      { label: 'Sole Proprietor', value: 'sole_proprietor' },
      { label: 'LLC', value: 'llc' },
      { label: 'Corporation', value: 'corporation' },
      { label: 'Partnership', value: 'partnership' },
      { label: 'Non-Profit', value: 'nonprofit' },
    ],
  },
  { key: 'ein', label: 'EIN (Tax ID)', placeholder: 'XX-XXXXXXX', type: 'text', required: true },
  { key: 'businessPhone', label: 'Business Phone', placeholder: '(555) 123-4567', type: 'phone', required: true },
  { key: 'businessEmail', label: 'Business Email', placeholder: 'Enter business email', type: 'email', required: true },
  { key: 'website', label: 'Website (Optional)', placeholder: 'www.yourbusiness.com', type: 'text', required: false },
];

export const BUSINESS_STEP_2_FIELDS: FormField[] = [
  { key: 'businessStreetAddress', label: 'Street Address', placeholder: 'Enter business address', type: 'text', required: true },
  { key: 'businessCity', label: 'City', placeholder: 'Enter city', type: 'text', required: true },
  {
    key: 'businessState',
    label: 'State',
    placeholder: 'Select state',
    type: 'select',
    required: true,
    options: [
      { label: 'Alabama', value: 'AL' },
      { label: 'Alaska', value: 'AK' },
      { label: 'Arizona', value: 'AZ' },
      { label: 'California', value: 'CA' },
      { label: 'Colorado', value: 'CO' },
      { label: 'Florida', value: 'FL' },
      { label: 'Georgia', value: 'GA' },
      { label: 'New York', value: 'NY' },
      { label: 'Texas', value: 'TX' },
      { label: 'Washington', value: 'WA' },
    ],
  },
  { key: 'businessZipCode', label: 'ZIP Code', placeholder: 'Enter ZIP code', type: 'text', required: true },
  {
    key: 'businessCountry',
    label: 'Country',
    placeholder: 'Select country',
    type: 'select',
    required: true,
    options: [{ label: 'United States', value: 'US' }],
  },
];

export const BUSINESS_STEP_3_FIELDS: FormField[] = [
  { key: 'ownerFirstName', label: 'First Name', placeholder: 'Enter first name', type: 'text', required: true },
  { key: 'ownerLastName', label: 'Last Name', placeholder: 'Enter last name', type: 'text', required: true },
  { key: 'ownerEmail', label: 'Email Address', placeholder: 'Enter email', type: 'email', required: true },
  { key: 'ownerPhone', label: 'Phone Number', placeholder: '(555) 123-4567', type: 'phone', required: true },
  { key: 'ownerDateOfBirth', label: 'Date of Birth', placeholder: 'MM/DD/YYYY', type: 'date', required: true },
  { key: 'ownerSSN', label: 'Social Security Number', placeholder: 'XXX-XX-XXXX', type: 'ssn', required: true },
  { key: 'ownershipPercentage', label: 'Ownership Percentage', placeholder: 'Enter percentage', type: 'text', required: true },
];

export const BUSINESS_STEP_4_FIELDS: FormField[] = [
  {
    key: 'industryType',
    label: 'Industry',
    placeholder: 'Select industry',
    type: 'select',
    required: true,
    options: [
      { label: 'Retail', value: 'retail' },
      { label: 'Technology', value: 'technology' },
      { label: 'Healthcare', value: 'healthcare' },
      { label: 'Food & Beverage', value: 'food_beverage' },
      { label: 'Professional Services', value: 'professional_services' },
      { label: 'Construction', value: 'construction' },
      { label: 'Manufacturing', value: 'manufacturing' },
      { label: 'Other', value: 'other' },
    ],
  },
  { key: 'yearEstablished', label: 'Year Established', placeholder: 'YYYY', type: 'text', required: true },
  {
    key: 'numberOfEmployees',
    label: 'Number of Employees',
    placeholder: 'Select range',
    type: 'select',
    required: true,
    options: [
      { label: '1-5', value: '1-5' },
      { label: '6-25', value: '6-25' },
      { label: '26-100', value: '26-100' },
      { label: '101-500', value: '101-500' },
      { label: '500+', value: '500+' },
    ],
  },
  {
    key: 'annualRevenue',
    label: 'Annual Revenue',
    placeholder: 'Select range',
    type: 'select',
    required: true,
    options: [
      { label: 'Under $100K', value: 'under_100k' },
      { label: '$100K - $500K', value: '100k_500k' },
      { label: '$500K - $1M', value: '500k_1m' },
      { label: '$1M - $5M', value: '1m_5m' },
      { label: 'Over $5M', value: 'over_5m' },
    ],
  },
];

export const BUSINESS_STEP_5_FIELDS: FormField[] = [
  { key: 'accountNickname', label: 'Account Nickname', placeholder: 'e.g., Business Checking', type: 'text', required: false },
  { key: 'initialDeposit', label: 'Initial Deposit Amount', placeholder: '$0.00', type: 'currency', required: false },
  { key: 'enablePaperlessStatements', label: 'Paperless Statements', placeholder: '', type: 'toggle', required: false },
  { key: 'enableWireTransfers', label: 'Wire Transfers', placeholder: '', type: 'toggle', required: false },
  { key: 'enableACHPayments', label: 'ACH Payments', placeholder: '', type: 'toggle', required: false },
];
