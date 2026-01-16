import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Button } from '../components';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { RootStackParamList, PersonalAccountData, BusinessAccountData } from '../types';

type AccountReviewScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AccountReview'>;
  route: RouteProp<RootStackParamList, 'AccountReview'>;
};

interface ReviewSection {
  title: string;
  fields: { label: string; value: string }[];
}

export const AccountReviewScreen: React.FC<AccountReviewScreenProps> = ({
  navigation,
  route,
}) => {
  const { accountType, accountData } = route.params;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const formatSSN = (ssn: string) => {
    if (ssn.length >= 4) {
      return `***-**-${ssn.slice(-4)}`;
    }
    return '***-**-****';
  };

  const getPersonalReviewSections = (data: PersonalAccountData): ReviewSection[] => [
    {
      title: 'Personal Information',
      fields: [
        { label: 'Full Name', value: `${data.firstName} ${data.lastName}` },
        { label: 'Email', value: data.email },
        { label: 'Phone', value: data.phone },
        { label: 'Date of Birth', value: data.dateOfBirth },
      ],
    },
    {
      title: 'Address',
      fields: [
        { label: 'Street Address', value: data.streetAddress },
        { label: 'City', value: data.city },
        { label: 'State', value: data.state },
        { label: 'ZIP Code', value: data.zipCode },
      ],
    },
    {
      title: 'Identity Verification',
      fields: [
        { label: 'SSN', value: formatSSN(data.ssn) },
        { label: 'ID Type', value: data.idType.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase()) },
        { label: 'ID Number', value: `****${data.idNumber.slice(-4)}` },
      ],
    },
    {
      title: 'Account Preferences',
      fields: [
        { label: 'Account Nickname', value: data.accountNickname || 'Personal Checking' },
        { label: 'Initial Deposit', value: data.initialDeposit || '$0.00' },
        { label: 'Paperless Statements', value: data.enablePaperlessStatements ? 'Enabled' : 'Disabled' },
        { label: 'Mobile Deposit', value: data.enableMobileDeposit ? 'Enabled' : 'Disabled' },
      ],
    },
  ];

  const getBusinessReviewSections = (data: BusinessAccountData): ReviewSection[] => [
    {
      title: 'Business Information',
      fields: [
        { label: 'Business Name', value: data.businessName },
        { label: 'Business Type', value: data.businessType.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase()) },
        { label: 'EIN', value: data.ein },
        { label: 'Business Email', value: data.businessEmail },
        { label: 'Business Phone', value: data.businessPhone },
        { label: 'Website', value: data.website || 'Not provided' },
      ],
    },
    {
      title: 'Business Address',
      fields: [
        { label: 'Street Address', value: data.businessStreetAddress },
        { label: 'City', value: data.businessCity },
        { label: 'State', value: data.businessState },
        { label: 'ZIP Code', value: data.businessZipCode },
      ],
    },
    {
      title: 'Owner Information',
      fields: [
        { label: 'Full Name', value: `${data.ownerFirstName} ${data.ownerLastName}` },
        { label: 'Email', value: data.ownerEmail },
        { label: 'Phone', value: data.ownerPhone },
        { label: 'Date of Birth', value: data.ownerDateOfBirth },
        { label: 'SSN', value: formatSSN(data.ownerSSN) },
        { label: 'Ownership', value: `${data.ownershipPercentage}%` },
      ],
    },
    {
      title: 'Business Details',
      fields: [
        { label: 'Industry', value: data.industryType.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase()) },
        { label: 'Year Established', value: data.yearEstablished },
        { label: 'Employees', value: data.numberOfEmployees },
        { label: 'Annual Revenue', value: data.annualRevenue.replace('_', ' - $').replace(/\b\w/g, (l) => l.toUpperCase()) },
      ],
    },
    {
      title: 'Account Preferences',
      fields: [
        { label: 'Account Nickname', value: data.accountNickname || 'Business Checking' },
        { label: 'Initial Deposit', value: data.initialDeposit || '$0.00' },
        { label: 'Paperless Statements', value: data.enablePaperlessStatements ? 'Enabled' : 'Disabled' },
        { label: 'Wire Transfers', value: data.enableWireTransfers ? 'Enabled' : 'Disabled' },
        { label: 'ACH Payments', value: data.enableACHPayments ? 'Enabled' : 'Disabled' },
      ],
    },
  ];

  const reviewSections =
    accountType === 'personal'
      ? getPersonalReviewSections(accountData as PersonalAccountData)
      : getBusinessReviewSections(accountData as BusinessAccountData);

  const handleSubmit = async () => {
    if (!agreedToTerms) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    navigation.navigate('Success', { accountType });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review Application</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Account Type Banner */}
        <View style={styles.accountBanner}>
          <Text style={styles.accountBannerIcon}>
            {accountType === 'personal' ? '👤' : '🏢'}
          </Text>
          <View>
            <Text style={styles.accountBannerTitle}>
              {accountType === 'personal' ? 'Personal Account' : 'Business Account'}
            </Text>
            <Text style={styles.accountBannerSubtitle}>
              Please review your information below
            </Text>
          </View>
        </View>

        {/* Review Sections */}
        {reviewSections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.fields.map((field, fieldIndex) => (
                <View
                  key={fieldIndex}
                  style={[
                    styles.fieldRow,
                    fieldIndex < section.fields.length - 1 && styles.fieldRowBorder,
                  ]}
                >
                  <Text style={styles.fieldLabel}>{field.label}</Text>
                  <Text style={styles.fieldValue}>{field.value}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Terms and Conditions */}
        <TouchableOpacity
          style={styles.termsContainer}
          onPress={() => setAgreedToTerms(!agreedToTerms)}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}>
            {agreedToTerms && <Text style={styles.checkboxCheck}>✓</Text>}
          </View>
          <Text style={styles.termsText}>
            I have read and agree to the{' '}
            <Text style={styles.termsLink}>Terms of Service</Text>,{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>, and{' '}
            <Text style={styles.termsLink}>Electronic Consent Agreement</Text>.
          </Text>
        </TouchableOpacity>

        {/* Disclosure */}
        <View style={styles.disclosureContainer}>
          <Text style={styles.disclosureText}>
            By submitting this application, you authorize Alphie Banking to verify
            your identity, check your credit history, and process your application.
            You certify that all information provided is accurate and complete.
          </Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Button
          title={isSubmitting ? 'Submitting...' : 'Submit Application'}
          onPress={handleSubmit}
          size="large"
          fullWidth
          disabled={!agreedToTerms}
          loading={isSubmitting}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    backgroundColor: Colors.white,
  },
  backButton: {
    padding: Spacing.sm,
  },
  backButtonText: {
    fontSize: Typography.fontSize.md,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.medium,
  },
  headerTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
  },
  placeholder: {
    width: 60,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.xl,
  },
  accountBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    padding: Spacing.base,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.xl,
  },
  accountBannerIcon: {
    fontSize: 40,
    marginRight: Spacing.md,
  },
  accountBannerTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
  },
  accountBannerSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.white,
    opacity: 0.9,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  sectionContent: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.base,
  },
  fieldRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  fieldLabel: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    flex: 1,
  },
  fieldValue: {
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.medium,
    flex: 1,
    textAlign: 'right',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.base,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: BorderRadius.sm,
    borderWidth: 2,
    borderColor: Colors.border,
    marginRight: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkboxCheck: {
    color: Colors.white,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
  },
  termsText: {
    flex: 1,
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    lineHeight: Typography.fontSize.sm * Typography.lineHeight.relaxed,
  },
  termsLink: {
    color: Colors.primary,
    fontWeight: Typography.fontWeight.medium,
  },
  disclosureContainer: {
    backgroundColor: Colors.background,
    padding: Spacing.base,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.xl,
  },
  disclosureText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textTertiary,
    lineHeight: Typography.fontSize.xs * Typography.lineHeight.relaxed,
  },
  footer: {
    padding: Spacing.xl,
    paddingTop: Spacing.base,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
});
