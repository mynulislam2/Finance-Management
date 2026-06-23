import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Budget } from '../types';

export const useBudgets = (userId: string) => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('budgets')
        .select('*')
        .eq('user_id', userId)
        .order('month', { ascending: false });
      if (data) setBudgets(data);
      setLoading(false);
    };
    fetch();
  }, [userId]);

  return { budgets, loading };
};