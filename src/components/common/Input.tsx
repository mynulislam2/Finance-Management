import React, { useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/colors';

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  multiline?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  multiline = false,
  autoCapitalize = 'none',
}) => {
  const [focused, setFocused] = useState(false);
  const [secure, setSecure] = useState(secureTextEntry);
  const animated = useRef(new Animated.Value(value ? 1 : 0)).current;

  React.useEffect(() => {
    if (value || focused) {
      Animated.timing(animated, { toValue: 1, duration: 200, useNativeDriver: false }).start();
    } else {
      Animated.timing(animated, { toValue: 0, duration: 200, useNativeDriver: false }).start();
    }
  }, [value, focused, animated]);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const labelStyle = {
    top: animated.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }),
    fontSize: animated.interpolate({ inputRange: [0, 1], outputRange: [16, 12] }),
    color: animated.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.muted, focused ? Colors.primary : Colors.muted],
    }),
  };

  const hasError = !!error;

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.container,
          focused && !hasError && styles.focused,
          hasError && styles.errorBorder,
        ]}
      >
        <Animated.Text style={[styles.label, labelStyle]}>{label}</Animated.Text>
        <TextInput
          style={[styles.input, multiline && styles.multiline]}
          value={value}
          onChangeText={onChangeText}
          placeholder={focused ? placeholder : ''}
          placeholderTextColor={Colors.muted}
          secureTextEntry={secure}
          keyboardType={keyboardType}
          multiline={multiline}
          autoCapitalize={autoCapitalize}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {secureTextEntry && (
          <Pressable onPress={() => setSecure(!secure)} style={styles.eye}>
            <Icon
              name={secure ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={Colors.muted}
            />
          </Pressable>
        )}
      </View>
      {hasError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.border,
    paddingHorizontal: 14,
    paddingTop: 20,
    paddingBottom: 8,
  },
  focused: { borderColor: Colors.primary },
  errorBorder: { borderColor: Colors.expense },
  label: {
    position: 'absolute',
    left: 14,
    fontFamily: 'Inter-Medium',
  },
  input: {
    fontSize: 16,
    color: Colors.text,
    fontFamily: 'Inter-Regular',
    paddingVertical: 0,
    minHeight: 24,
  },
  multiline: { minHeight: 80, textAlignVertical: 'top' },
  eye: {
    position: 'absolute',
    right: 12,
    top: 22,
  },
  errorText: {
    color: Colors.expense,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
    marginLeft: 4,
  },
});

export default Input;
