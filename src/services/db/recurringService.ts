import { supabase } from '../../lib/supabase';
import { addDays, addWeeks, addMonths, addYears } from 'date-fns';

export const getRecurring = async (userId: string) => {
  return supabase
    .from('recurring_payments')
    .select('*')
    .eq('user_id', userId)
    .eq('is_paused', false);
};

export const checkDueRecurring = async (userId: string) => {
  const today = new Date().toISOString().split('T')[0];
  const { data } = await supabase
    .from('recurring_payments')
    .select('*')
    .eq('user_id', userId)
    .lte('next_date', today)
    .eq('is_paused', false);
  return data ?? [];
};

export const createExpenseFromRecurring = async (recurring: any) => {
  const expense = {
    user_id: recurring.user_id,
    title: recurring.name,
    amount: recurring.amount,
    category: recurring.category,
    date: recurring.next_date,
    recurring_id: recurring.id,
  };
  return supabase.from('expenses').insert(expense);
};

export const updateNextDate = async (id: string, frequency: string) => {
  const { data } = await supabase
    .from('recurring_payments')
    .select('next_date')
    .eq('id', id)
    .single();

  const current = new Date(data!.next_date);
  const next =
    frequency === 'daily'
      ? addDays(current, 1)
      : frequency === 'weekly'
        ? addWeeks(current, 1)
        : frequency === 'monthly'
          ? addMonths(current, 1)
          : addYears(current, 1);

  return supabase
    .from('recurring_payments')
    .update({ next_date: next.toISOString().split('T')[0] })
    .eq('id', id);
};