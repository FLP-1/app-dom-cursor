/**
 * Arquivo: useEmpregadosDomesticos.ts
 * Caminho: src/hooks/useEmpregadosDomesticos.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface EmpregadoDomestico {
  id: string;
  nome: string;
  cpf: string;
  rg: string;
  dataNascimento: string;
  endereco: {
    cep: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
  };
  telefone: string;
  email?: string;
  dataAdmissao: string;
  cargo: string;
  salario: number;
  status: 'ATIVO' | 'INATIVO';
}

export function useEmpregadosDomesticos() {
  const { data: session } = useSession();
  const [empregadosDomesticos, setEmpregadosDomesticos] = useState<EmpregadoDomestico[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmpregadosDomesticos = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/empregados-domesticos');
        
        if (!response.ok) {
          throw new Error('Erro ao carregar empregados domésticos');
        }

        const data = await response.json();
        setEmpregadosDomesticos(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchEmpregadosDomesticos();
    }
  }, [session]);

  return {
    empregadosDomesticos,
    loading,
    error,
  };
} 
