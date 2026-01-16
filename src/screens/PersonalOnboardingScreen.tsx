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
import { RootStackParamList, PersonalAccountData } from '../types';
import {
  PERSONAL_ONBOARDING_STEPS,
  PERSONAL_STEP_1_FIELDS,
  PERSONAL_STEP_2_FIELDS,
  PERSONAL_STEP_3_FIELDS,
  PERSONAL_STEP_4_FIELDS,
} from '../constants/onboarding';

type PersonalOnboardingScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PersonalOnboarding'>;
};

const initialFormData: PersonalAccountData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  streetAddress: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'US',
  ssn: '',
  idType: 'drivers_license',
  idNumber: '',
  accountNickname: '',
  initialDeposit: '',
  enablePaperlessStatements: true,
  enableMobileDeposit: true,
};

export const PersonalOnboardingScreen: React.FC<PersonalOnboardingScreenProps> = ({
  navigation,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PersonalAccountData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof PersonalAccountData, string>>>({});

  const totalSteps = PERSONAL_ONBOARDING_STEPS.length;

  const updateFormData = (key: keyof PersonalAccountData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const validateStep = (): boolean => {
    const newErrors: Partial<Record<keyof PersonalAccountData, string>> = {};
    let fields: typeof PERSONAL_STEP_1_FIELDS = [];

    switch (currentStep) {
      case 1:
        fields = PERSONAL_STEP_1_FIELDS;
        break;
      case 2:
        fields = PERSONAL_STEP_2_FIELDS;
        break;
      case 3:
        fields = PERSONAL_STEP_3_FIELDS;
        break;
      case 4:
        fields = PERSONAL_STEP_4_FIELDS;
        break;
    }

    fields.forEach((field) => {
      if (field.required && !formData[field.key as keyof PersonalAccountData]) {
        newErrors[field.key as keyof PersonalAccountData] = `${field.label} is required`;
      }
    });

    // Additional validation for email
    if (currentStep === 1 && formData.email && !formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        // Navigate to review screen
        navigation.navigate('AccountReview', {
          accountType: 'personal',
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
    let fields: typeof PERSONAL_STEP_1_FIELDS = [];

    switch (currentStep) {
      case 1:
        fields = PERSONAL_STEP_1_FIELDS;
        break;
      case 2:
        fields = PERSONAL_STEP_2_FIELDS;
        break;
      case 3:
        fields = PERSONAL_STEP_3_FIELDS;
        break;
      case 4:
        fields = PERSONAL_STEP_4_FIELDS;
        break;
    }

    return fields.map((field) => {
      const key = field.key as keyof PersonalAccountData;
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
          <Text style={styles.headerTitle}>Personal Account</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Progress Steps */}
          <ProgressSteps steps={PERSONAL_ONBOARDING_STEPS} currentStep={currentStep} />

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
