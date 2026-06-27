import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { Colors } from '../../constants/colors';
import { Strings } from '../../constants/strings';
import { budgetService } from '../../services/db/BudgetService';
import { addBudget } from '../../store/budgetSlice';
import { useAuth } from '../../hooks/useAuth';
import { handleError } from '../../utils/errorHandler';
import { showToast } from '../../utils/toast';
import { format } from 'date-fns';

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Health', 'Entertainment', 'Other'];

const MONTHS = Array.from({ length: 12 }, (_, i) => {
  const d = new Date(2024, i, 1);
  return format(d, 'yyyy-MM');
});

const CreateBudgetScreen = () => {
  const nav = useNavigation();
  const dispatch = useDispatch();
  const { user } = useAuth();

  const [category, setCategory] = useState('');
  const [limitAmount, setLimitAmount] = useState('');
  const [month, setMonth] = useState(format(new Date(), 'yyyy-MM'));
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!category) e.category = 'Please select a category';
    if (!limitAmount) e.amount = 'Limit amount is required';
    else if (isNaN(Number(limitAmount)) || Number(limitAmount) <= 0)
      e.amount = 'Enter a valid amount';
    if (!month) e.month = 'Please select a month';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const clearError = (field: string) =>
    setErrors(p => {
      const n = { ...p };
      delete n[field];
      return n;
    });

  const handleSubmit = async () => {
    if (!validate() || !user) return;
    setLoading(true);
    try {
      const result = await budgetService.create({
        user_id: user.id,
        category,
        limit_amount: Number(limitAmount),
        month,
      });
      dispatch(addBudget(result));
      showToast('Budget created', 'success');
      nav.goBack();
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable onPress={() => nav.goBack()}>
            <Icon name="close" size={24} color={Colors.text} />
          </Pressable>
          <Text style={styles.title}>{Strings.CREATE_BUDGET}</Text>
          <View style={{ width: 24 }} />
        </View>

        <Text style={styles.sectionLabel}>Category</Text>
        <View style={styles.chipRow}>
          {CATEGORIES.map(c => (
            <Pressable
              key={c}
              onPress={() => {
                setCategory(c);
                clearError('category');
              }}
              style={[styles.chip, category === c && styles.chipActive]}
            >
              <Text style={[styles.chipText, category === c && styles.chipTextActive]}>{c}</Text>
            </Pressable>
          ))}
        </View>
        {errors.category ? <Text style={styles.errorText}>{errors.category}</Text> : null}

        <View style={{ marginTop: 20 }}>
          <Input
            label={Strings.BUDGET_LIMIT}
            value={limitAmount}
            onChangeText={t => {
              setLimitAmount(t);
              clearError('amount');
            }}
            keyboardType="numeric"
            error={errors.amount}
          />
        </View>

        <Text style={[styles.sectionLabel, { marginTop: 20 }]}>{Strings.BUDGET_MONTH}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.monthRow}>
          {MONTHS.map(m => (
            <Pressable
              key={m}
              onPress={() => {
                setMonth(m);
                clearError('month');
              }}
              style={[styles.monthChip, month === m && styles.chipActive]}
            >
              <Text style={[styles.chipText, month === m && styles.chipTextActive]}>
                {format(new Date(m + '-01'), 'MMM yyyy')}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
        {errors.month ? <Text style={styles.errorText}>{errors.month}</Text> : null}

        <View style={styles.submitSection}>
          <Button title={Strings.CREATE_BUDGET} onPress={handleSubmit} loading={loading} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: 20, paddingTop: 56 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  title: { fontSize: 20, fontFamily: 'Inter-Bold', color: Colors.text },
  sectionLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
    marginBottom: 12,
  },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.border,
  },
  chipActive: { backgroundColor: Colors.primary },
  chipText: { fontSize: 14, fontFamily: 'Inter-Medium', color: Colors.textSecondary },
  chipTextActive: { color: Colors.white },
  errorText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.expense,
    marginTop: 4,
    marginLeft: 4,
  },
  monthRow: { marginBottom: 4 },
  monthChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.border,
    marginRight: 8,
  },
  submitSection: { marginTop: 32 },
});

export default CreateBudgetScreen;
