import { supabase } from '../../lib/supabase';
import { Expense } from '../../types';

export const getExpenses = async (userId: string) => {
  return supabase
    .from('expenses')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false });
};

export const addExpense = async (expense: Omit<Expense, 'id' | 'created_at'>) => {
  return supabase.from('expenses').insert(expense).select().single();
};

export const updateExpense = async (id: string, updates: Partial<Expense>) => {
  return supabase.from('expenses').update(updates).eq('id', id).select().single();
};

export const deleteExpense = async (id: string) => {
  return supabase.from('expenses').delete().eq('id', id);
};