import { useState, useEffect } from 'react';
import { Budget } from '../types';
import { budgetService } from '../services/db/BudgetService';

export const useBudgets = (userId: string) => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    budgetService.getAll(userId).then(data => {
      setBudgets(data);
      setLoading(false);
    });
  }, [userId]);

  return { budgets, loading };
};