import { api } from '@/services/api';
import { S1202Schema } from '@/schemas/esocial/S1202Schema';

export class S1202Service {
  private static readonly BASE_URL = '/esocial/s1202';

  static async create(data: S1202Schema): Promise<S1202Schema> {
    const response = await api.post<S1202Schema>(this.BASE_URL, data);
    return response.data;
  }

  static async update(id: string, data: S1202Schema): Promise<S1202Schema> {
    const response = await api.put<S1202Schema>(`${this.BASE_URL}/${id}`, data);
    return response.data;
  }

  static async getById(id: string): Promise<S1202Schema> {
    const response = await api.get<S1202Schema>(`${this.BASE_URL}/${id}`);
    return response.data;
  }

  static async delete(id: string): Promise<void> {
    await api.delete(`${this.BASE_URL}/${id}`);
  }

  static async list(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }): Promise<{
    data: S1202Schema[];
    total: number;
    page: number;
    limit: number;
  }> {
    const response = await api.get(this.BASE_URL, { params });
    return response.data;
  }

  static async validate(data: S1202Schema): Promise<{
    isValid: boolean;
    errors: Record<string, string[]>;
  }> {
    const response = await api.post(`${this.BASE_URL}/validate`, data);
    return response.data;
  }

  static async generateXml(id: string): Promise<string> {
    const response = await api.get(`${this.BASE_URL}/${id}/xml`, {
      responseType: 'text'
    });
    return response.data;
  }
} 