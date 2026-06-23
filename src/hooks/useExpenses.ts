import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Expense } from '../types';

export const useExpenses = (userId: string) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false });
      if (data) setExpenses(data);
      setLoading(false);
    };
    fetch();
  }, [userId]);

  return { expenses, loading };
};