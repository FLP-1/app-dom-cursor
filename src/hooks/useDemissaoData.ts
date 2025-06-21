/**
 * Arquivo: useDemissaoData.ts
 * Caminho: src/hooks/useDemissaoData.ts
 * Criado em: 2025-01-21
 * Última atualização: 2025-01-21
 * Descrição: Hook customizado para gerenciar dados de demissão com SWR.
 */

import useSWR from 'swr';
import { fetcher } from '@/lib/api';

export interface DemissaoData {
  id: string;
  nome: string;
  cargo: string;
  dataAdmissao: string;
  dataDemissao: string;
  motivo: string;
  status: 'pendente' | 'aprovada' | 'rejeitada';
  observacoes?: string;
}

export interface DemissaoStats {
  totalDemissoes: number;
  pendentes: number;
  aprovadas: number;
  rejeitadas: number;
}

export const useDemissaoData = () => {
  const { data: demissoes, error: demissoesError, mutate: mutateDemissoes } = useSWR<DemissaoData[]>('/api/demissao', fetcher);
  const { data: stats, error: statsError } = useSWR<DemissaoStats>('/api/demissao/stats', fetcher);

  return {
    demissoes: demissoes || [],
    stats: stats || { totalDemissoes: 0, pendentes: 0, aprovadas: 0, rejeitadas: 0 },
    isLoading: !demissoes && !demissoesError,
    isStatsLoading: !stats && !statsError,
    error: demissoesError || statsError,
    mutateDemissoes
  };
}; 