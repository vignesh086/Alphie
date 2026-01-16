import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/theme';

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'phone' | 'date' | 'ssn' | 'currency' | 'password';
  error?: string;
  required?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  style?: ViewStyle;
  secureTextEntry?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  type = 'text',
  error,
  required = false,
  disabled = false,
  multiline = false,
  numberOfLines = 1,
  style,
  secureTextEntry = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formatValue = (text: string): string => {
    switch (type) {
      case 'phone':
        // Format as (XXX) XXX-XXXX
        const phoneDigits = text.replace(/\D/g, '').slice(0, 10);
        if (phoneDigits.length >= 7) {
          return `(${phoneDigits.slice(0, 3)}) ${phoneDigits.slice(3, 6)}-${phoneDigits.slice(6)}`;
        } else if (phoneDigits.length >= 4) {
          return `(${phoneDigits.slice(0, 3)}) ${phoneDigits.slice(3)}`;
        } else if (phoneDigits.length > 0) {
          return `(${phoneDigits}`;
        }
        return phoneDigits;

      case 'ssn':
        // Format as XXX-XX-XXXX
        const ssnDigits = text.replace(/\D/g, '').slice(0, 9);
        if (ssnDigits.length >= 6) {
          return `${ssnDigits.slice(0, 3)}-${ssnDigits.slice(3, 5)}-${ssnDigits.slice(5)}`;
        } else if (ssnDigits.length >= 4) {
          return `${ssnDigits.slice(0, 3)}-${ssnDigits.slice(3)}`;
        }
        return ssnDigits;

      case 'date':
        // Format as MM/DD/YYYY
        const dateDigits = text.replace(/\D/g, '').slice(0, 8);
        if (dateDigits.length >= 5) {
          return `${dateDigits.slice(0, 2)}/${dateDigits.slice(2, 4)}/${dateDigits.slice(4)}`;
        } else if (dateDigits.length >= 3) {
          return `${dateDigits.slice(0, 2)}/${dateDigits.slice(2)}`;
        }
        return dateDigits;

      case 'currency':
        // Format as currency
        const currencyDigits = text.replace(/[^0-9.]/g, '');
        if (currencyDigits) {
          const num = parseFloat(currencyDigits);
          if (!isNaN(num)) {
            return `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          }
        }
        return text;

      default:
        return text;
    }
  };

  const handleChangeText = (text: string) => {
    const formattedText = formatValue(text);
    onChangeText(formattedText);
  };

  const getKeyboardType = () => {
    switch (type) {
      case 'email':
        return 'email-address';
      case 'phone':
      case 'ssn':
      case 'date':
      case 'currency':
        return 'numeric';
      default:
        return 'default';
    }
  };

  const isSecure = type === 'password' || (secureTextEntry && !showPassword);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      </View>

      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          error && styles.inputError,
          disabled && styles.inputDisabled,
        ]}
      >
        <TextInput
          style={[styles.input, multiline && styles.multilineInput]}
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.textTertiary}
          editable={!disabled}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          keyboardType={getKeyboardType()}
          secureTextEntry={isSecure}
          autoCapitalize={type === 'email' ? 'none' : 'sentences'}
        />

        {type === 'password' && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.eyeIconText}>{showPassword ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.base,
  },
  labelContainer: {
    flexDirection: 'row',
    marginBottom: Spacing.sm,
  },
  label: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textPrimary,
  },
  required: {
    color: Colors.error,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.base,
  },
  inputFocused: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  inputError: {
    borderColor: Colors.error,
  },
  inputDisabled: {
    backgroundColor: Colors.background,
    opacity: 0.7,
  },
  input: {
    flex: 1,
    fontSize: Typography.fontSize.md,
    color: Colors.textPrimary,
    paddingVertical: Spacing.md,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  eyeIcon: {
    padding: Spacing.sm,
  },
  eyeIconText: {
    color: Colors.primary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },
  error: {
    fontSize: Typography.fontSize.sm,
    color: Colors.error,
    marginTop: Spacing.xs,
  },
});
