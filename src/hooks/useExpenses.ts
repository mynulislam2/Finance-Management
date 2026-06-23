import { useState, useEffect } from 'react';
import { Expense } from '../types';
import { expenseService } from '../services/db/ExpenseService';

export const useExpenses = (userId: string) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    expenseService.getAll(userId).then(data => {
      setExpenses(data);
      setLoading(false);
    });
  }, [userId]);

  return { expenses, loading };
};