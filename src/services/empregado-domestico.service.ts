import { EmpregadoDomestico, CboCargo } from '../types/empregado-domestico';
import { i18n } from 'i18next';
import { empregadoDomesticoMessages } from '../i18n/messages';

interface ApiError {
  message: string;
  code: string;
  field?: string;
}

export const empregadoDomesticoService = {
  async create(data: Omit<EmpregadoDomestico, 'id' | 'createdAt' | 'updatedAt' | 'user' | 'alertas' | 'compras' | 'documentos' | 'cargo'>): Promise<EmpregadoDomestico> {
    try {
      const response = await fetch('/api/empregado-domestico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json() as ApiError;
        throw new Error(errorData.message || empregadoDomesticoMessages[i18n?.language as 'pt' | 'en' || 'pt'].genericError);
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(empregadoDomesticoMessages[i18n?.language as 'pt' | 'en' || 'pt'].genericError);
    }
  },

  async update(id: string, data: Partial<EmpregadoDomestico>): Promise<EmpregadoDomestico> {
    try {
      const response = await fetch(`/api/empregado-domestico/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json() as ApiError;
        throw new Error(errorData.message || empregadoDomesticoMessages[i18n?.language as 'pt' | 'en' || 'pt'].genericError);
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(empregadoDomesticoMessages[i18n?.language as 'pt' | 'en' || 'pt'].genericError);
    }
  },

  async get(id: string): Promise<EmpregadoDomestico> {
    try {
      const response = await fetch(`/api/empregado-domestico/${id}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(empregadoDomesticoMessages[i18n?.language as 'pt' | 'en' || 'pt'].notFound);
        }
        const errorData = await response.json() as ApiError;
        throw new Error(errorData.message || empregadoDomesticoMessages[i18n?.language as 'pt' | 'en' || 'pt'].genericError);
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(empregadoDomesticoMessages[i18n?.language as 'pt' | 'en' || 'pt'].genericError);
    }
  },

  async list(): Promise<EmpregadoDomestico[]> {
    try {
      const response = await fetch('/api/empregado-domestico');

      if (!response.ok) {
        const errorData = await response.json() as ApiError;
        throw new Error(errorData.message || empregadoDomesticoMessages[i18n?.language as 'pt' | 'en' || 'pt'].genericError);
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(empregadoDomesticoMessages[i18n?.language as 'pt' | 'en' || 'pt'].genericError);
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`/api/empregado-domestico/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json() as ApiError;
        throw new Error(errorData.message || empregadoDomesticoMessages[i18n?.language as 'pt' | 'en' || 'pt'].genericError);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(empregadoDomesticoMessages[i18n?.language as 'pt' | 'en' || 'pt'].genericError);
    }
  }
}; 