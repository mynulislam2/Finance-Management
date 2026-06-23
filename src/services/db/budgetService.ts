import { supabase } from '../../lib/supabase';
import { Budget } from '../../types';

export const getBudgets = async (userId: string) => {
  return supabase
    .from('budgets')
    .select('*')
    .eq('user_id', userId)
    .order('month', { ascending: false });
};

export const addBudget = async (budget: Omit<Budget, 'id' | 'created_at'>) => {
  return supabase.from('budgets').insert(budget).select().single();
};

export const updateBudget = async (id: string, updates: Partial<Budget>) => {
  return supabase.from('budgets').update(updates).eq('id', id).select().single();
};

export const deleteBudget = async (id: string) => {
  return supabase.from('budgets').delete().eq('id', id);
};