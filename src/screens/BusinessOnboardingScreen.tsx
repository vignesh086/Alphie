import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Input, Select, Toggle, ProgressSteps } from '../components';
import { Colors, Typography, Spacing } from '../constants/theme';
import { RootStackParamList, BusinessAccountData } from '../types';
import {
  BUSINESS_ONBOARDING_STEPS,
  BUSINESS_STEP_1_FIELDS,
  BUSINESS_STEP_2_FIELDS,
  BUSINESS_STEP_3_FIELDS,
  BUSINESS_STEP_4_FIELDS,
  BUSINESS_STEP_5_FIELDS,
} from '../constants/onboarding';

type BusinessOnboardingScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'BusinessOnboarding'>;
};

const initialFormData: BusinessAccountData = {
  businessName: '',
  businessType: 'company',
  abn: '',
  acn: '',
  businessPhone: '',
  businessEmail: '',
  website: '',
  businessStreetAddress: '',
  businessSuburb: '',
  businessState: '',
  businessPostcode: '',
  businessCountry: 'AU',
  ownerFirstName: '',
  ownerLastName: '',
  ownerEmail: '',
  ownerPhone: '',
  ownerDateOfBirth: '',
  ownerTFN: '',
  ownershipPercentage: '',
  industryType: '',
  yearEstablished: '',
  numberOfEmployees: '',
  annualTurnover: '',
  accountNickname: '',
  initialDeposit: '',
  enablePaperlessStatements: true,
  enableBPAY: true,
  enablePayID: true,
};

export const BusinessOnboardingScreen: React.FC<BusinessOnboardingScreenProps> = ({
  navigation,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BusinessAccountData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof BusinessAccountData, string>>>({});

  const totalSteps = BUSINESS_ONBOARDING_STEPS.length;

  const updateFormData = (key: keyof BusinessAccountData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const getFieldsForStep = () => {
    switch (currentStep) {
      case 1:
        return BUSINESS_STEP_1_FIELDS;
      case 2:
        return BUSINESS_STEP_2_FIELDS;
      case 3:
        return BUSINESS_STEP_3_FIELDS;
      case 4:
        return BUSINESS_STEP_4_FIELDS;
      case 5:
        return BUSINESS_STEP_5_FIELDS;
      default:
        return [];
    }
  };

  const validateStep = (): boolean => {
    const newErrors: Partial<Record<keyof BusinessAccountData, string>> = {};
    const fields = getFieldsForStep();

    fields.forEach((field) => {
      if (field.required && !formData[field.key as keyof BusinessAccountData]) {
        newErrors[field.key as keyof BusinessAccountData] = `${field.label} is required`;
      }
    });

    // Additional validation for email fields
    if (currentStep === 1 && formData.businessEmail && !formData.businessEmail.includes('@')) {
      newErrors.businessEmail = 'Please enter a valid email address';
    }
    if (currentStep === 3 && formData.ownerEmail && !formData.ownerEmail.includes('@')) {
      newErrors.ownerEmail = 'Please enter a valid email address';
    }

    // Validate ABN is 11 digits
    if (currentStep === 1 && formData.abn) {
      const abnDigits = formData.abn.replace(/\D/g, '');
      if (abnDigits.length !== 11) {
        newErrors.abn = 'ABN must be 11 digits';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        navigation.navigate('AccountReview', {
          accountType: 'business',
          accountData: formData,
        });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  const renderFormFields = () => {
    const fields = getFieldsForStep();

    return fields.map((field) => {
      const key = field.key as keyof BusinessAccountData;
      const value = formData[key];

      if (field.type === 'select' && field.options) {
        return (
          <Select
            key={field.key}
            label={field.label}
            value={value as string}
            onValueChange={(val) => updateFormData(key, val)}
            options={field.options}
            placeholder={field.placeholder}
            required={field.required}
            error={errors[key]}
          />
        );
      }

      if (field.type === 'toggle') {
        return (
          <Toggle
            key={field.key}
            label={field.label}
            value={value as boolean}
            onValueChange={(val) => updateFormData(key, val)}
          />
        );
      }

      return (
        <Input
          key={field.key}
          label={field.label}
          value={value as string}
          onChangeText={(text) => updateFormData(key, text)}
          placeholder={field.placeholder}
          type={field.type}
          required={field.required}
          error={errors[key]}
        />
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Business Account</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Progress Steps */}
          <ProgressSteps steps={BUSINESS_ONBOARDING_STEPS} currentStep={currentStep} />

          {/* Form Fields */}
          <View style={styles.formContainer}>{renderFormFields()}</View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerButtons}>
            {currentStep > 1 && (
              <Button
                title="Previous"
                onPress={handleBack}
                variant="outline"
                style={styles.previousButton}
              />
            )}
            <Button
              title={currentStep === totalSteps ? 'Review Application' : 'Continue'}
              onPress={handleNext}
              style={styles.continueButton}
              fullWidth={currentStep === 1}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardAvoid: {
    flex: 1,
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
  formContainer: {
    marginTop: Spacing.base,
  },
  footer: {
    padding: Spacing.xl,
    paddingTop: Spacing.base,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  footerButtons: {
    flexDirection: 'row',
  },
  previousButton: {
    flex: 1,
    marginRight: Spacing.md,
  },
  continueButton: {
    flex: 2,
  },
});
