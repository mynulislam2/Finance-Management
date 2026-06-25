import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { Colors } from '../../constants/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  fullWidth = true,
  style,
}) => {
  const isDisabled = disabled || loading;

  const bgColor = {
    primary: Colors.primary,
    secondary: Colors.background,
    outline: 'transparent',
    ghost: 'transparent',
  }[variant];

  const txtColor = {
    primary: Colors.white,
    secondary: Colors.text,
    outline: Colors.primary,
    ghost: Colors.primary,
  }[variant];

  const borderStyle =
    variant === 'outline' ? { borderWidth: 1.5, borderColor: Colors.primary } : {};

  const height = { sm: 40, md: 48, lg: 56 }[size];
  const fontSize = { sm: 13, md: 15, lg: 17 }[size];

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        { height, backgroundColor: bgColor, opacity: pressed && !isDisabled ? 0.85 : 1 },
        borderStyle,
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {icon && <>{icon}</>}
      {loading ? (
        <ActivityIndicator color={txtColor} size="small" />
      ) : (
        <Text style={[styles.text, { color: txtColor, fontSize }]}>{title}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    gap: 8,
    paddingHorizontal: 20,
  },
  fullWidth: { width: '100%' },
  disabled: { opacity: 0.5 },
  text: { fontFamily: 'Inter-SemiBold' },
});

export default Button;
