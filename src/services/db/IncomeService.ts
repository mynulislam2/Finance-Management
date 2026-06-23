import { httpService } from '../http/HttpService';
import { API_URLS } from '../urls';
import { Income } from '../../types';

export const incomeService = {
  getAll: async (userId: string) => {
    const { data } = await httpService.get<Income[]>(
      `${API_URLS.INCOMES}?user_id=eq.${userId}&order=date.desc`,
    );
    return data ?? [];
  },

  getById: async (id: string) => {
    const { data } = await httpService.get<Income[]>(
      `${API_URLS.INCOMES}?id=eq.${id}`,
    );
    return data?.[0] ?? null;
  },

  create: async (income: Omit<Income, 'id' | 'created_at'>) => {
    const { data } = await httpService.post<Income>(API_URLS.INCOMES, income);
    return data;
  },

  update: async (id: string, updates: Partial<Income>) => {
    const { data } = await httpService.put<Income>(
      `${API_URLS.INCOMES}?id=eq.${id}`, updates,
    );
    return data;
  },

  delete: async (id: string) => {
    await httpService.delete(`${API_URLS.INCOMES}?id=eq.${id}`);
  },
};