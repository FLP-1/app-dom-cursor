/**
 * Arquivo: useAuth.ts
 * Caminho: src/hooks/useAuth.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Hook de autenticação, controle de login, logout e validação de token JWT para o sistema.
 */

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { api } from '@/services/api';
import { useRefreshToken } from '@/hooks/useRefreshToken';
import { FormError } from '@/types/forms';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  cpf: string;
  phone: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useAuth() {
  const router = useRouter();
  const { refreshToken } = useRefreshToken();
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
  });

  const checkAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setState(prev => ({ ...prev, isLoading: false }));
        return;
      }

      // Configura o token no header padrão do axios
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const response = await api.get('/auth/validate');
      setState({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
    } catch (error: unknown) {
      const formError = error as FormError;
      throw new Error(formError.message || 'Erro ao autenticar');
    }
  }, []);

  const login = useCallback(async (credentials: { cpf: string; password: string }) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const response = await api.post('/auth/login/employer', credentials);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Configura o token no header padrão do axios
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });

      router.push('/dashboard');
    } catch (error: unknown) {
      const formError = error as FormError;
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: formError.message || 'Erro ao fazer login'
      }));
    }
  }, [router]);

  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete api.defaults.headers.common['Authorization'];
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
      router.push('/auth/login');
    }
  }, [router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    login,
    logout,
    checkAuth
  };
} 
