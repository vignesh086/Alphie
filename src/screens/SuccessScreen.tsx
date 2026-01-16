import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Button } from '../components';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { RootStackParamList } from '../types';

type SuccessScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Success'>;
  route: RouteProp<RootStackParamList, 'Success'>;
};

export const SuccessScreen: React.FC<SuccessScreenProps> = ({
  navigation,
  route,
}) => {
  const { accountType } = route.params;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate success icon
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim, fadeAnim]);

  const handleGoToDashboard = () => {
    // Reset navigation to prevent going back to onboarding
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  };

  // Australian bank account details
  const bsb = `06${Math.floor(1000 + Math.random() * 9000).toString().slice(0, 4)}`;
  const accountNumber = `${Math.floor(10000000 + Math.random() * 90000000)}`;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <View style={styles.content}>
        {/* Success Animation */}
        <Animated.View
          style={[
            styles.successIconContainer,
            { transform: [{ scale: scaleAnim }] },
          ]}
        >
          <View style={styles.successIcon}>
            <Text style={styles.successEmoji}>✓</Text>
          </View>
        </Animated.View>

        <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
          <Text style={styles.title}>Account Created!</Text>
          <Text style={styles.subtitle}>
            Congratulations! Your{' '}
            {accountType === 'personal' ? 'personal' : 'business'} account has
            been successfully created.
          </Text>
        </Animated.View>

        {/* Account Details Card */}
        <Animated.View style={[styles.accountCard, { opacity: fadeAnim }]}>
          <View style={styles.accountCardHeader}>
            <Text style={styles.accountCardIcon}>
              {accountType === 'personal' ? '👤' : '🏢'}
            </Text>
            <View>
              <Text style={styles.accountCardTitle}>
                {accountType === 'personal' ? 'Everyday Account' : 'Business Transaction'}
              </Text>
              <Text style={styles.accountCardSubtitle}>Active</Text>
            </View>
          </View>

          <View style={styles.accountCardDivider} />

          <View style={styles.accountCardDetails}>
            <View style={styles.accountCardRow}>
              <Text style={styles.accountCardLabel}>BSB</Text>
              <Text style={styles.accountCardValue}>{bsb}</Text>
            </View>
            <View style={styles.accountCardRow}>
              <Text style={styles.accountCardLabel}>Account Number</Text>
              <Text style={styles.accountCardValue}>{accountNumber}</Text>
            </View>
            <View style={styles.accountCardRow}>
              <Text style={styles.accountCardLabel}>Current Balance</Text>
              <Text style={styles.accountCardValueHighlight}>$0.00</Text>
            </View>
          </View>
        </Animated.View>

        {/* Next Steps */}
        <Animated.View style={[styles.nextStepsContainer, { opacity: fadeAnim }]}>
          <Text style={styles.nextStepsTitle}>What's Next?</Text>

          <View style={styles.nextStepItem}>
            <View style={styles.nextStepNumber}>
              <Text style={styles.nextStepNumberText}>1</Text>
            </View>
            <View style={styles.nextStepContent}>
              <Text style={styles.nextStepItemTitle}>Fund Your Account</Text>
              <Text style={styles.nextStepItemDescription}>
                Transfer money via PayID, Osko, or direct transfer using your BSB and account number
              </Text>
            </View>
          </View>

          <View style={styles.nextStepItem}>
            <View style={styles.nextStepNumber}>
              <Text style={styles.nextStepNumberText}>2</Text>
            </View>
            <View style={styles.nextStepContent}>
              <Text style={styles.nextStepItemTitle}>Set Up PayID</Text>
              <Text style={styles.nextStepItemDescription}>
                Link your mobile or email for instant payments
              </Text>
            </View>
          </View>

          <View style={styles.nextStepItem}>
            <View style={styles.nextStepNumber}>
              <Text style={styles.nextStepNumberText}>3</Text>
            </View>
            <View style={styles.nextStepContent}>
              <Text style={styles.nextStepItemTitle}>Order Your Card</Text>
              <Text style={styles.nextStepItemDescription}>
                Get your Visa Debit card delivered in 5-7 business days
              </Text>
            </View>
          </View>
        </Animated.View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Button
          title="Go to Dashboard"
          onPress={handleGoToDashboard}
          size="large"
          fullWidth
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
  content: {
    flex: 1,
    padding: Spacing.xl,
    alignItems: 'center',
  },
  successIconContainer: {
    marginTop: Spacing['2xl'],
    marginBottom: Spacing.xl,
  },
  successIcon: {
    width: 100,
    height: 100,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.lg,
  },
  successEmoji: {
    fontSize: 48,
    color: Colors.white,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: Spacing.xl,
  },
  accountCard: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    ...Shadows.md,
  },
  accountCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountCardIcon: {
    fontSize: 40,
    marginRight: Spacing.md,
  },
  accountCardTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
  },
  accountCardSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.accent,
    fontWeight: Typography.fontWeight.medium,
  },
  accountCardDivider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginVertical: Spacing.base,
  },
  accountCardDetails: {},
  accountCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  accountCardLabel: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
  },
  accountCardValue: {
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.medium,
  },
  accountCardValueHighlight: {
    fontSize: Typography.fontSize.lg,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.bold,
  },
  nextStepsContainer: {
    width: '100%',
  },
  nextStepsTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.base,
  },
  nextStepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  nextStepNumber: {
    width: 28,
    height: 28,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  nextStepNumberText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
  },
  nextStepContent: {
    flex: 1,
  },
  nextStepItemTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  nextStepItemDescription: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  footer: {
    padding: Spacing.xl,
    paddingTop: Spacing.base,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
});
