/**
 * Arquivo: useRefreshToken.ts
 * Caminho: src/hooks/useRefreshToken.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { api } from '@/lib/api';

const REFRESH_TOKEN_INTERVAL = 4 * 60 * 1000; // 4 minutos

export function useRefreshToken() {
  const router = useRouter();
  const refreshTimeoutRef = useRef<NodeJS.Timeout>();

  const refreshToken = useCallback(async () => {
    try {
      const response = await api.post('/auth/refresh-token');
      const { token } = response.data;

      // Atualiza o token no localStorage
      localStorage.setItem('token', token);

      // Atualiza o token no header padrão do axios
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Agenda o próximo refresh
      scheduleRefresh();
    } catch (error) {
      console.error('Erro ao renovar token:', error);
      // Se houver erro, faz logout
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/auth/login');
    }
  }, [router]);

  const scheduleRefresh = useCallback(() => {
    // Limpa o timeout anterior se existir
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }

    // Agenda o próximo refresh
    refreshTimeoutRef.current = setTimeout(refreshToken, REFRESH_TOKEN_INTERVAL);
  }, [refreshToken]);

  useEffect(() => {
    // Inicia o ciclo de refresh quando o componente montar
    scheduleRefresh();

    // Limpa o timeout quando o componente desmontar
    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, [scheduleRefresh]);

  return { refreshToken };
} 
