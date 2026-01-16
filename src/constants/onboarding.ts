import { OnboardingStep, FormField } from '../types';

// Australian States and Territories
export const AUSTRALIAN_STATES = [
  { label: 'New South Wales', value: 'NSW' },
  { label: 'Victoria', value: 'VIC' },
  { label: 'Queensland', value: 'QLD' },
  { label: 'Western Australia', value: 'WA' },
  { label: 'South Australia', value: 'SA' },
  { label: 'Tasmania', value: 'TAS' },
  { label: 'Australian Capital Territory', value: 'ACT' },
  { label: 'Northern Territory', value: 'NT' },
];

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
  { key: 'phone', label: 'Mobile Number', placeholder: '0412 345 678', type: 'phone', required: true },
  { key: 'dateOfBirth', label: 'Date of Birth', placeholder: 'DD/MM/YYYY', type: 'date', required: true },
];

export const PERSONAL_STEP_2_FIELDS: FormField[] = [
  { key: 'streetAddress', label: 'Street Address', placeholder: 'Enter street address', type: 'text', required: true },
  { key: 'suburb', label: 'Suburb', placeholder: 'Enter suburb', type: 'text', required: true },
  {
    key: 'state',
    label: 'State/Territory',
    placeholder: 'Select state',
    type: 'select',
    required: true,
    options: AUSTRALIAN_STATES,
  },
  { key: 'postcode', label: 'Postcode', placeholder: 'Enter postcode', type: 'text', required: true },
  {
    key: 'country',
    label: 'Country',
    placeholder: 'Select country',
    type: 'select',
    required: true,
    options: [{ label: 'Australia', value: 'AU' }],
  },
];

export const PERSONAL_STEP_3_FIELDS: FormField[] = [
  { key: 'tfn', label: 'Tax File Number (TFN)', placeholder: 'XXX XXX XXX', type: 'tfn', required: true },
  {
    key: 'idType',
    label: 'ID Type',
    placeholder: 'Select ID type',
    type: 'select',
    required: true,
    options: [
      { label: "Driver's Licence", value: 'drivers_licence' },
      { label: 'Australian Passport', value: 'passport' },
      { label: 'Proof of Age Card', value: 'proof_of_age_card' },
    ],
  },
  {
    key: 'idState',
    label: 'State of Issue',
    placeholder: 'Select state',
    type: 'select',
    required: true,
    options: AUSTRALIAN_STATES,
  },
  { key: 'idNumber', label: 'ID Number', placeholder: 'Enter ID number', type: 'text', required: true },
];

export const PERSONAL_STEP_4_FIELDS: FormField[] = [
  { key: 'accountNickname', label: 'Account Nickname', placeholder: 'e.g., My Savings', type: 'text', required: false },
  { key: 'initialDeposit', label: 'Initial Deposit Amount', placeholder: '$0.00', type: 'currency', required: false },
  { key: 'enablePaperlessStatements', label: 'Paperless Statements', placeholder: '', type: 'toggle', required: false },
  { key: 'enablePayID', label: 'PayID (Instant Payments)', placeholder: '', type: 'toggle', required: false },
];

// Business Account Form Fields
export const BUSINESS_STEP_1_FIELDS: FormField[] = [
  { key: 'businessName', label: 'Business Name', placeholder: 'Enter business name', type: 'text', required: true },
  {
    key: 'businessType',
    label: 'Business Structure',
    placeholder: 'Select business structure',
    type: 'select',
    required: true,
    options: [
      { label: 'Sole Trader', value: 'sole_trader' },
      { label: 'Partnership', value: 'partnership' },
      { label: 'Company (Pty Ltd)', value: 'company' },
      { label: 'Trust', value: 'trust' },
      { label: 'Non-Profit', value: 'nonprofit' },
    ],
  },
  { key: 'abn', label: 'ABN (Australian Business Number)', placeholder: 'XX XXX XXX XXX', type: 'abn', required: true },
  { key: 'acn', label: 'ACN (if applicable)', placeholder: 'XXX XXX XXX', type: 'text', required: false },
  { key: 'businessPhone', label: 'Business Phone', placeholder: '02 1234 5678', type: 'phone', required: true },
  { key: 'businessEmail', label: 'Business Email', placeholder: 'Enter business email', type: 'email', required: true },
  { key: 'website', label: 'Website (Optional)', placeholder: 'www.yourbusiness.com.au', type: 'text', required: false },
];

export const BUSINESS_STEP_2_FIELDS: FormField[] = [
  { key: 'businessStreetAddress', label: 'Street Address', placeholder: 'Enter business address', type: 'text', required: true },
  { key: 'businessSuburb', label: 'Suburb', placeholder: 'Enter suburb', type: 'text', required: true },
  {
    key: 'businessState',
    label: 'State/Territory',
    placeholder: 'Select state',
    type: 'select',
    required: true,
    options: AUSTRALIAN_STATES,
  },
  { key: 'businessPostcode', label: 'Postcode', placeholder: 'Enter postcode', type: 'text', required: true },
  {
    key: 'businessCountry',
    label: 'Country',
    placeholder: 'Select country',
    type: 'select',
    required: true,
    options: [{ label: 'Australia', value: 'AU' }],
  },
];

export const BUSINESS_STEP_3_FIELDS: FormField[] = [
  { key: 'ownerFirstName', label: 'First Name', placeholder: 'Enter first name', type: 'text', required: true },
  { key: 'ownerLastName', label: 'Last Name', placeholder: 'Enter last name', type: 'text', required: true },
  { key: 'ownerEmail', label: 'Email Address', placeholder: 'Enter email', type: 'email', required: true },
  { key: 'ownerPhone', label: 'Mobile Number', placeholder: '0412 345 678', type: 'phone', required: true },
  { key: 'ownerDateOfBirth', label: 'Date of Birth', placeholder: 'DD/MM/YYYY', type: 'date', required: true },
  { key: 'ownerTFN', label: 'Tax File Number (TFN)', placeholder: 'XXX XXX XXX', type: 'tfn', required: true },
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
      { label: 'Retail Trade', value: 'retail' },
      { label: 'Professional Services', value: 'professional_services' },
      { label: 'Construction', value: 'construction' },
      { label: 'Healthcare', value: 'healthcare' },
      { label: 'Hospitality & Tourism', value: 'hospitality' },
      { label: 'Manufacturing', value: 'manufacturing' },
      { label: 'Agriculture', value: 'agriculture' },
      { label: 'Information Technology', value: 'technology' },
      { label: 'Transport & Logistics', value: 'transport' },
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
      { label: '1-4 (Micro)', value: '1-4' },
      { label: '5-19 (Small)', value: '5-19' },
      { label: '20-199 (Medium)', value: '20-199' },
      { label: '200+ (Large)', value: '200+' },
    ],
  },
  {
    key: 'annualTurnover',
    label: 'Annual Turnover',
    placeholder: 'Select range',
    type: 'select',
    required: true,
    options: [
      { label: 'Under $75K', value: 'under_75k' },
      { label: '$75K - $500K', value: '75k_500k' },
      { label: '$500K - $2M', value: '500k_2m' },
      { label: '$2M - $10M', value: '2m_10m' },
      { label: 'Over $10M', value: 'over_10m' },
    ],
  },
];

export const BUSINESS_STEP_5_FIELDS: FormField[] = [
  { key: 'accountNickname', label: 'Account Nickname', placeholder: 'e.g., Business Transaction', type: 'text', required: false },
  { key: 'initialDeposit', label: 'Initial Deposit Amount', placeholder: '$0.00', type: 'currency', required: false },
  { key: 'enablePaperlessStatements', label: 'Paperless Statements', placeholder: '', type: 'toggle', required: false },
  { key: 'enableBPAY', label: 'BPAY', placeholder: '', type: 'toggle', required: false },
  { key: 'enablePayID', label: 'PayID (Instant Payments)', placeholder: '', type: 'toggle', required: false },
];
