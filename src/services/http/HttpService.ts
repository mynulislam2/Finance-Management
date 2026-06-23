import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { API_URLS } from '../urls';
import { supabase } from '../../lib/supabase';
import { Strings } from '../../constants/strings';

interface HttpError {
  code: string;
  message: string;
  errorData?: Record<string, unknown>;
}

class HttpService {
  private static instance: HttpService;

  private constructor() {}

  static getInstance(): HttpService {
    if (!HttpService.instance) {
      HttpService.instance = new HttpService();
    }
    return HttpService.instance;
  }

  private getClient(): AxiosInstance {
    const client = axios.create({
      baseURL: API_URLS.BASE_URL,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.SUPABASE_ANON_KEY || '',
      },
    });

    client.interceptors.request.use(async config => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        config.headers.Authorization = `Bearer ${session.access_token}`;
      }
      return config;
    });

    client.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        if (error.response?.status === 401) {
          const httpError: HttpError = {
            code: 'Unauthorized',
            message: Strings.SESSION_EXPIRED,
            errorData: error.response?.data,
          };
          return Promise.reject(httpError);
        }
        if (!error.response) {
          const httpError: HttpError = {
            code: 'NetworkError',
            message: Strings.NETWORK_ERROR,
          };
          return Promise.reject(httpError);
        }
        return Promise.reject(error);
      },
    );

    return client;
  }

  async get<T>(url: string, params?: Record<string, unknown>): Promise<AxiosResponse<T>> {
    const client = this.getClient();
    return client.get<T>(url, { params });
  }

  async post<T>(url: string, data?: unknown): Promise<AxiosResponse<T>> {
    const client = this.getClient();
    return client.post<T>(url, data);
  }

  async put<T>(url: string, data?: unknown): Promise<AxiosResponse<T>> {
    const client = this.getClient();
    return client.put<T>(url, data);
  }

  async delete<T>(url: string, data?: unknown): Promise<AxiosResponse<T>> {
    const client = this.getClient();
    return client.delete<T>(url, { data });
  }
}

export const httpService = HttpService.getInstance();