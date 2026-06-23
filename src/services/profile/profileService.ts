import { httpService } from '../http/HttpService';
import { API_URLS } from '../urls';
import { Profile } from '../../types';

export const profileService = {
  get: async (userId: string) => {
    const { data } = await httpService.get<Profile[]>(
      `${API_URLS.PROFILES}?id=eq.${userId}`,
    );
    return data?.[0] ?? null;
  },

  update: async (userId: string, updates: Partial<Profile>) => {
    const { data } = await httpService.put<Profile>(
      `${API_URLS.PROFILES}?id=eq.${userId}`, updates,
    );
    return data;
  },
};