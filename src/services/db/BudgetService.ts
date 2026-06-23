import { httpService } from '../http/HttpService';
import { API_URLS } from '../urls';
import { Budget } from '../../types';

export const budgetService = {
  getAll: async (userId: string) => {
    const { data } = await httpService.get<Budget[]>(
      `${API_URLS.BUDGETS}?user_id=eq.${userId}&order=month.desc`,
    );
    return data ?? [];
  },

  create: async (budget: Omit<Budget, 'id' | 'created_at'>) => {
    const { data } = await httpService.post<Budget>(API_URLS.BUDGETS, budget);
    return data;
  },

  update: async (id: string, updates: Partial<Budget>) => {
    const { data } = await httpService.put<Budget>(
      `${API_URLS.BUDGETS}?id=eq.${id}`, updates,
    );
    return data;
  },

  delete: async (id: string) => {
    await httpService.delete(`${API_URLS.BUDGETS}?id=eq.${id}`);
  },
};