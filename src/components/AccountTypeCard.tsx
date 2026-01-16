import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';

interface AccountTypeCardProps {
  title: string;
  description: string;
  icon: string;
  features: string[];
  onPress: () => void;
  selected?: boolean;
}

export const AccountTypeCard: React.FC<AccountTypeCardProps> = ({
  title,
  description,
  icon,
  features,
  onPress,
  selected = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.containerSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={[styles.iconContainer, selected && styles.iconContainerSelected]}>
          <Text style={styles.icon}>{icon}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, selected && styles.titleSelected]}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
          {selected && <View style={styles.radioInner} />}
        </View>
      </View>

      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Text style={[styles.featureCheck, selected && styles.featureCheckSelected]}>
              ✓
            </Text>
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.base,
    borderWidth: 2,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  containerSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '05',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  iconContainerSelected: {
    backgroundColor: Colors.primary + '15',
  },
  icon: {
    fontSize: 28,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  titleSelected: {
    color: Colors.primary,
  },
  description: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: Colors.primary,
  },
  radioInner: {
    width: 14,
    height: 14,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
  },
  featuresContainer: {
    paddingTop: Spacing.base,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  featureCheck: {
    fontSize: Typography.fontSize.md,
    color: Colors.textTertiary,
    marginRight: Spacing.sm,
    width: 20,
  },
  featureCheckSelected: {
    color: Colors.accent,
  },
  featureText: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    flex: 1,
  },
});
