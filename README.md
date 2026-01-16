# Alphie Banking

A React Native mobile banking application with a complete customer onboarding process.

## Features

- **Account Type Selection**: Choose between Personal and Business accounts
- **Personal Account Onboarding**:
  - Personal information collection
  - Address verification
  - Identity verification (SSN, ID)
  - Account preferences setup
- **Business Account Onboarding**:
  - Business information collection
  - Business address verification
  - Owner/authorized signer information
  - Business details (industry, revenue, employees)
  - Account preferences setup
- **Application Review**: Comprehensive review before submission
- **Success Confirmation**: Account creation confirmation with next steps

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Select.tsx
│   ├── Toggle.tsx
│   ├── ProgressSteps.tsx
│   └── AccountTypeCard.tsx
├── constants/           # App constants and configuration
│   ├── theme.ts        # Colors, typography, spacing
│   └── onboarding.ts   # Form field configurations
├── navigation/          # Navigation setup
│   └── AppNavigator.tsx
├── screens/            # Screen components
│   ├── WelcomeScreen.tsx
│   ├── AccountTypeSelectionScreen.tsx
│   ├── PersonalOnboardingScreen.tsx
│   ├── BusinessOnboardingScreen.tsx
│   ├── AccountReviewScreen.tsx
│   └── SuccessScreen.tsx
└── types/              # TypeScript type definitions
    └── index.ts
```

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn
- React Native development environment set up
- Xcode (for iOS development)
- Android Studio (for Android development)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Alphie
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install iOS dependencies (iOS only):
```bash
cd ios && pod install && cd ..
```

### Running the App

**iOS:**
```bash
npm run ios
# or
yarn ios
```

**Android:**
```bash
npm run android
# or
yarn android
```

## Tech Stack

- **React Native** - Cross-platform mobile framework
- **TypeScript** - Type-safe JavaScript
- **React Navigation** - Navigation library
- **React Native Safe Area Context** - Safe area handling

## Onboarding Flow

### Personal Account
1. **Personal Information** - Name, email, phone, date of birth
2. **Address** - Street address, city, state, ZIP code
3. **Identity Verification** - SSN, ID type and number
4. **Account Setup** - Nickname, initial deposit, preferences

### Business Account
1. **Business Information** - Name, type, EIN, contact details
2. **Business Address** - Business location details
3. **Owner Information** - Primary owner details and SSN
4. **Business Details** - Industry, year established, employees, revenue
5. **Account Setup** - Nickname, initial deposit, wire/ACH preferences

## Form Validation

- Required field validation
- Email format validation
- Phone number formatting
- SSN formatting (with masking)
- Date formatting

## UI Components

All components are built with accessibility and reusability in mind:

- **Button** - Multiple variants (primary, secondary, outline, ghost)
- **Input** - Supports various input types with formatting
- **Select** - Modal-based dropdown selection
- **Toggle** - Animated toggle switch
- **ProgressSteps** - Visual progress indicator
- **AccountTypeCard** - Selectable account type cards

## License

MIT
