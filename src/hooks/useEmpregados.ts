/**
 * Arquivo: useEmpregados.ts
 * Caminho: src/hooks/useEmpregados.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Hook para gerenciamento de empregados
 */

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Empregado } from '@/types/empregado';

export function useEmpregados(id?: string) {
  const { data: session } = useSession();
  const [empregados, setEmpregados] = useState<Empregado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmpregados = async () => {
      try {
        setLoading(true);
        const url = id ? `/api/empregados/${id}` : '/api/empregados';
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Erro ao carregar empregados');
        }

        const data = await response.json();
        setEmpregados(id ? [data] : data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchEmpregados();
    }
  }, [session, id]);

  return {
    data: empregados,
    isLoading: loading,
    error,
  };
} 