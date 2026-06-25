import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AuthScreenWrapper from '../../components/common/AuthScreenWrapper';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { Colors } from '../../constants/colors';
import { Strings } from '../../constants/strings';
import { authService } from '../../services/auth/AuthService';
import { handleError } from '../../utils/errorHandler';
import { showToast } from '../../utils/toast';
import { AuthStackParamList } from '../../navigation/AuthNavigator';

type Nav = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

const RegisterScreen = () => {
  const nav = useNavigation<Nav>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Name is required';
    if (!email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Invalid email';
    if (!password) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'Min 6 characters';
    if (!confirmPassword) e.confirmPassword = 'Confirm your password';
    else if (password !== confirmPassword) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await authService.signUp({ name: name.trim(), email: email.trim(), password });
      showToast('Account created! Check your email to verify.', 'success');
      nav.navigate('Login');
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const clearError = (field: string) =>
    setErrors(p => {
      const next = { ...p };
      delete next[field];
      return next;
    });

  return (
    <AuthScreenWrapper title={Strings.REGISTER_TITLE} subtitle={Strings.REGISTER_SUBTITLE}>
      <Input
        label={Strings.NAME_LABEL}
        value={name}
        onChangeText={t => {
          setName(t);
          clearError('name');
        }}
        autoCapitalize="words"
        error={errors.name}
      />
      <Input
        label={Strings.EMAIL_LABEL}
        value={email}
        onChangeText={t => {
          setEmail(t);
          clearError('email');
        }}
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email}
      />
      <Input
        label={Strings.PASSWORD_LABEL}
        value={password}
        onChangeText={t => {
          setPassword(t);
          clearError('password');
        }}
        secureTextEntry
        error={errors.password}
      />
      <Input
        label={Strings.CONFIRM_PASSWORD_LABEL}
        value={confirmPassword}
        onChangeText={t => {
          setConfirmPassword(t);
          clearError('confirmPassword');
        }}
        secureTextEntry
        error={errors.confirmPassword}
      />
      <Button title={Strings.REGISTER_BUTTON} onPress={handleRegister} loading={loading} />
      <View style={styles.footer}>
        <Text style={styles.footerText}>{Strings.HAVE_ACCOUNT}</Text>
        <Pressable onPress={() => nav.navigate('Login')}>
          <Text style={styles.link}>{Strings.LOGIN_BUTTON}</Text>
        </Pressable>
      </View>
    </AuthScreenWrapper>
  );
};

const styles = StyleSheet.create({
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24, gap: 4 },
  footerText: { color: Colors.textSecondary, fontFamily: 'Inter-Regular', fontSize: 14 },
  link: { color: Colors.primary, fontFamily: 'Inter-SemiBold', fontSize: 14 },
});

export default RegisterScreen;
