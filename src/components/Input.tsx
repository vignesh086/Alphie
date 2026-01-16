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
  type?: 'text' | 'email' | 'phone' | 'date' | 'tfn' | 'abn' | 'currency' | 'password';
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
        // Australian phone format: 0412 345 678 (mobile) or 02 1234 5678 (landline)
        const phoneDigits = text.replace(/\D/g, '').slice(0, 10);
        if (phoneDigits.startsWith('04')) {
          // Mobile format: 0412 345 678
          if (phoneDigits.length >= 7) {
            return `${phoneDigits.slice(0, 4)} ${phoneDigits.slice(4, 7)} ${phoneDigits.slice(7)}`;
          } else if (phoneDigits.length >= 5) {
            return `${phoneDigits.slice(0, 4)} ${phoneDigits.slice(4)}`;
          }
        } else {
          // Landline format: 02 1234 5678
          if (phoneDigits.length >= 6) {
            return `${phoneDigits.slice(0, 2)} ${phoneDigits.slice(2, 6)} ${phoneDigits.slice(6)}`;
          } else if (phoneDigits.length >= 3) {
            return `${phoneDigits.slice(0, 2)} ${phoneDigits.slice(2)}`;
          }
        }
        return phoneDigits;

      case 'tfn':
        // Australian Tax File Number format: XXX XXX XXX (9 digits)
        const tfnDigits = text.replace(/\D/g, '').slice(0, 9);
        if (tfnDigits.length >= 7) {
          return `${tfnDigits.slice(0, 3)} ${tfnDigits.slice(3, 6)} ${tfnDigits.slice(6)}`;
        } else if (tfnDigits.length >= 4) {
          return `${tfnDigits.slice(0, 3)} ${tfnDigits.slice(3)}`;
        }
        return tfnDigits;

      case 'abn':
        // Australian Business Number format: XX XXX XXX XXX (11 digits)
        const abnDigits = text.replace(/\D/g, '').slice(0, 11);
        if (abnDigits.length >= 9) {
          return `${abnDigits.slice(0, 2)} ${abnDigits.slice(2, 5)} ${abnDigits.slice(5, 8)} ${abnDigits.slice(8)}`;
        } else if (abnDigits.length >= 6) {
          return `${abnDigits.slice(0, 2)} ${abnDigits.slice(2, 5)} ${abnDigits.slice(5)}`;
        } else if (abnDigits.length >= 3) {
          return `${abnDigits.slice(0, 2)} ${abnDigits.slice(2)}`;
        }
        return abnDigits;

      case 'date':
        // Australian date format: DD/MM/YYYY
        const dateDigits = text.replace(/\D/g, '').slice(0, 8);
        if (dateDigits.length >= 5) {
          return `${dateDigits.slice(0, 2)}/${dateDigits.slice(2, 4)}/${dateDigits.slice(4)}`;
        } else if (dateDigits.length >= 3) {
          return `${dateDigits.slice(0, 2)}/${dateDigits.slice(2)}`;
        }
        return dateDigits;

      case 'currency':
        // Format as AUD currency
        const currencyDigits = text.replace(/[^0-9.]/g, '');
        if (currencyDigits) {
          const num = parseFloat(currencyDigits);
          if (!isNaN(num)) {
            return `$${num.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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
      case 'tfn':
      case 'abn':
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
