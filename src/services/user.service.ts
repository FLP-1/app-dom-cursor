/**
 * Arquivo: user.service.ts
 * Caminho: src/services/user.service.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Serviço de usuários
 */

import { User, UserFilter, UserFormData, LoginFormData, LoginResponse } from '@/types/user';
import axios from 'axios';

const API_URL = '/api/user';

export const UserService = {
  async list(filters?: UserFilter): Promise<User[]> {
    const { data } = await axios.get<User[]>(API_URL, { params: filters });
    return data;
  },

  async getById(id: string): Promise<User> {
    const { data } = await axios.get<User>(`${API_URL}/${id}`);
    return data;
  },

  async create(formData: UserFormData): Promise<User> {
    const { data } = await axios.post<User>(API_URL, formData);
    return data;
  },

  async update(id: string, formData: Partial<UserFormData>): Promise<User> {
    const { data } = await axios.put<User>(`${API_URL}/${id}`, formData);
    return data;
  },

  async remove(id: string): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
  },

  async login(formData: LoginFormData): Promise<LoginResponse> {
    const { data } = await axios.post<LoginResponse>(`${API_URL}/login`, formData);
    return data;
  },

  async logout(): Promise<void> {
    await axios.post(`${API_URL}/logout`);
  },

  async alterarSenha(id: string, senhaAtual: string, novaSenha: string): Promise<void> {
    await axios.post(`${API_URL}/${id}/alterar-senha`, {
      senhaAtual,
      novaSenha,
    });
  },

  async redefinirSenha(email: string): Promise<void> {
    await axios.post(`${API_URL}/redefinir-senha`, { email });
  },

  async validarToken(token: string): Promise<User> {
    const { data } = await axios.post<User>(`${API_URL}/validar-token`, { token });
    return data;
  },
}; 
