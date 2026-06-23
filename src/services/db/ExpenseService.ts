import { httpService } from '../http/HttpService';
import { API_URLS } from '../urls';
import { Expense } from '../../types';

export const expenseService = {
  getAll: async (userId: string) => {
    const { data } = await httpService.get<Expense[]>(
      `${API_URLS.EXPENSES}?user_id=eq.${userId}&order=date.desc`,
    );
    return data ?? [];
  },

  getById: async (id: string) => {
    const { data } = await httpService.get<Expense[]>(
      `${API_URLS.EXPENSES}?id=eq.${id}`,
    );
    return data?.[0] ?? null;
  },

  create: async (expense: Omit<Expense, 'id' | 'created_at'>) => {
    const { data } = await httpService.post<Expense>(API_URLS.EXPENSES, expense);
    return data;
  },

  update: async (id: string, updates: Partial<Expense>) => {
    const { data } = await httpService.put<Expense>(
      `${API_URLS.EXPENSES}?id=eq.${id}`, updates,
    );
    return data;
  },

  delete: async (id: string) => {
    await httpService.delete(`${API_URLS.EXPENSES}?id=eq.${id}`);
  },
};