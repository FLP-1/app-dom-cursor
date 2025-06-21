/**
 * Arquivo: auth.service.ts
 * Caminho: src/services/auth.service.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Serviço de autenticação
 */

import { User, LoginFormData, LoginResponse } from '@/types/user';
import axios from 'axios';

const API_URL = '/api/auth';

export const AuthService = {
  async login(formData: LoginFormData): Promise<LoginResponse> {
    const { data } = await axios.post<LoginResponse>(`${API_URL}/login`, formData);
    return data;
  },

  async logout(): Promise<void> {
    await axios.post(`${API_URL}/logout`);
  },

  async refreshToken(): Promise<{ token: string }> {
    const { data } = await axios.post<{ token: string }>(`${API_URL}/refresh-token`);
    return data;
  },

  async validarToken(token: string): Promise<User> {
    const { data } = await axios.post<User>(`${API_URL}/validar-token`, { token });
    return data;
  },

  async redefinirSenha(email: string): Promise<void> {
    await axios.post(`${API_URL}/redefinir-senha`, { email });
  },

  async alterarSenha(token: string, novaSenha: string): Promise<void> {
    await axios.post(`${API_URL}/alterar-senha`, { token, novaSenha });
  },

  async verificarEmail(token: string): Promise<void> {
    await axios.post(`${API_URL}/verificar-email`, { token });
  },

  async reenviarVerificacaoEmail(email: string): Promise<void> {
    await axios.post(`${API_URL}/reenviar-verificacao-email`, { email });
  },
}; 
