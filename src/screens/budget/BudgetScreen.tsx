import React, { useCallback } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/colors';
import { Strings } from '../../constants/strings';
import { budgetService } from '../../services/db/BudgetService';
import { setBudgets, setLoading } from '../../store/budgetSlice';
import { RootState } from '../../store';
import { useAuth } from '../../hooks/useAuth';
import { useExpenses } from '../../hooks/useExpenses';
import { formatCurrency } from '../../utils';
import { BudgetStackParamList } from '../../navigation/BudgetStackNavigator';
import { Expense } from '../../types';

type Nav = NativeStackNavigationProp<BudgetStackParamList, 'BudgetList'>;

const BudgetScreen = () => {
  const nav = useNavigation<Nav>();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { items: budgets, loading } = useSelector((s: RootState) => s.budgets);
  const { expenses } = useExpenses(user?.id ?? '');

  const fetchBudgets = useCallback(async () => {
    if (!user) return;
    dispatch(setLoading(true));
    const data = await budgetService.getAll(user.id);
    dispatch(setBudgets(data));
    dispatch(setLoading(false));
  }, [user, dispatch]);

  useFocusEffect(
    useCallback(() => {
      fetchBudgets();
    }, [fetchBudgets]),
  );

  const getSpent = (category: string) =>
    expenses
      .filter((e: Expense) => e.category === category)
      .reduce((s: number, e: Expense) => s + e.amount, 0);

  if (loading) {
    return (
      <View style={styles.center}>
        <Icon name="wallet-outline" size={48} color={Colors.muted} />
        <Text style={styles.loadingText}>{Strings.LOADING}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{Strings.BUDGETS}</Text>
        <Pressable onPress={() => nav.navigate('CreateBudget')} style={styles.addBtn}>
          <Icon name="add" size={24} color={Colors.white} />
        </Pressable>
      </View>

      {budgets.length === 0 ? (
        <View style={styles.emptyState}>
          <Icon name="wallet-outline" size={64} color={Colors.muted} />
          <Text style={styles.emptyTitle}>No budgets yet</Text>
          <Text style={styles.emptySubtitle}>Create your first budget to start tracking</Text>
          <Pressable onPress={() => nav.navigate('CreateBudget')} style={styles.emptyBtn}>
            <Icon name="add-circle-outline" size={20} color={Colors.white} />
            <Text style={styles.emptyBtnText}>{Strings.CREATE_BUDGET}</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
          {budgets.map(budget => {
            const spent = getSpent(budget.category);
            const percent = budget.limit_amount > 0 ? (spent / budget.limit_amount) * 100 : 0;
            const overBudget = percent > 100;
            const remaining = budget.limit_amount - spent;

            return (
              <View key={budget.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.categoryRow}>
                    <View
                      style={[
                        styles.dot,
                        { backgroundColor: overBudget ? Colors.expense : Colors.primary },
                      ]}
                    />
                    <Text style={styles.categoryText}>{budget.category}</Text>
                  </View>
                  <Text
                    style={[
                      styles.percentText,
                      { color: overBudget ? Colors.expense : Colors.primary },
                    ]}
                  >
                    {Math.round(percent)}%
                  </Text>
                </View>

                <View style={styles.barBg}>
                  <View
                    style={[
                      styles.barFill,
                      {
                        width: `${Math.min(percent, 100)}%`,
                        backgroundColor: overBudget ? Colors.expense : Colors.primary,
                      },
                    ]}
                  />
                </View>

                <View style={styles.cardFooter}>
                  <Text style={styles.spentText}>
                    {Strings.SPENT}: {formatCurrency(spent)}
                  </Text>
                  <Text style={styles.remainingText}>
                    {overBudget
                      ? Strings.OVER_BUDGET
                      : `${formatCurrency(remaining)} ${Strings.REMAINING}`}
                  </Text>
                </View>

                <View style={styles.limitRow}>
                  <Icon name="flag-outline" size={14} color={Colors.muted} />
                  <Text style={styles.limitText}>Limit: {formatCurrency(budget.limit_amount)}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  loadingText: { marginTop: 12, fontSize: 15, fontFamily: 'Inter-Regular', color: Colors.muted },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
  },
  title: { fontSize: 28, fontFamily: 'Inter-Bold', color: Colors.text },
  addBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: { padding: 20, paddingTop: 4 },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  categoryText: { fontSize: 16, fontFamily: 'Inter-SemiBold', color: Colors.text },
  percentText: { fontSize: 16, fontFamily: 'Inter-Bold' },
  barBg: {
    height: 10,
    backgroundColor: Colors.border,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 8,
  },
  barFill: { height: 10, borderRadius: 5 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  spentText: { fontSize: 13, fontFamily: 'Inter-Regular', color: Colors.textSecondary },
  remainingText: { fontSize: 13, fontFamily: 'Inter-SemiBold', color: Colors.textSecondary },
  limitRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  limitText: { fontSize: 12, fontFamily: 'Inter-Regular', color: Colors.muted },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
  emptyTitle: { fontSize: 20, fontFamily: 'Inter-Bold', color: Colors.text, marginTop: 16 },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.muted,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  emptyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  emptyBtnText: { fontSize: 15, fontFamily: 'Inter-SemiBold', color: Colors.white },
});

export default BudgetScreen;
