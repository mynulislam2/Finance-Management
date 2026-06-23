import { supabase } from '../../lib/supabase';
import { Income } from '../../types';

export const getIncomes = async (userId: string) => {
  return supabase
    .from('incomes')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false });
};

export const addIncome = async (income: Omit<Income, 'id' | 'created_at'>) => {
  return supabase.from('incomes').insert(income).select().single();
};

export const updateIncome = async (id: string, updates: Partial<Income>) => {
  return supabase.from('incomes').update(updates).eq('id', id).select().single();
};

export const deleteIncome = async (id: string) => {
  return supabase.from('incomes').delete().eq('id', id);
};