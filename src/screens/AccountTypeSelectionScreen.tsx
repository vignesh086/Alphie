import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, AccountTypeCard } from '../components';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/theme';
import { RootStackParamList, AccountType } from '../types';

type AccountTypeSelectionScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AccountTypeSelection'>;
};

export const AccountTypeSelectionScreen: React.FC<AccountTypeSelectionScreenProps> = ({
  navigation,
}) => {
  const [selectedType, setSelectedType] = useState<AccountType | null>(null);

  const handleContinue = () => {
    if (selectedType === 'personal') {
      navigation.navigate('PersonalOnboarding');
    } else if (selectedType === 'business') {
      navigation.navigate('BusinessOnboarding');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Choose Account Type</Text>
          <Text style={styles.subtitle}>
            Select the type of account that best fits your needs
          </Text>
        </View>

        {/* Account Type Cards */}
        <View style={styles.cardsContainer}>
          <AccountTypeCard
            title="Personal Account"
            description="For individual banking needs"
            icon="👤"
            features={[
              'Free checking and savings',
              'Mobile check deposit',
              'Debit card with rewards',
              'Budgeting tools',
              'No minimum balance',
            ]}
            selected={selectedType === 'personal'}
            onPress={() => setSelectedType('personal')}
          />

          <AccountTypeCard
            title="Business Account"
            description="For businesses and organizations"
            icon="🏢"
            features={[
              'Business checking and savings',
              'Invoicing and payment tools',
              'Multi-user access',
              'Business credit card',
              'Dedicated support',
            ]}
            selected={selectedType === 'business'}
            onPress={() => setSelectedType('business')}
          />
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <Text style={styles.infoText}>
            You can open additional accounts later from your dashboard.
            Choose the one you need most right now.
          </Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Button
          title="Continue"
          onPress={handleContinue}
          size="large"
          fullWidth
          disabled={!selectedType}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.xl,
    paddingBottom: Spacing['3xl'],
  },
  header: {
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
  },
  cardsContainer: {
    marginBottom: Spacing.xl,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: Colors.info + '15',
    padding: Spacing.base,
    borderRadius: BorderRadius.md,
    alignItems: 'flex-start',
  },
  infoIcon: {
    fontSize: Typography.fontSize.lg,
    marginRight: Spacing.sm,
  },
  infoText: {
    flex: 1,
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    lineHeight: Typography.fontSize.sm * Typography.lineHeight.relaxed,
  },
  footer: {
    padding: Spacing.xl,
    paddingTop: Spacing.base,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
});
