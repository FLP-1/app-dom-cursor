/**
 * Arquivo: useAdmissaoData.ts
 * Caminho: src/hooks/useAdmissaoData.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Hook customizado para buscar e gerenciar os dados de admissão de funcionários.
 */

import useSWR from 'swr';
import axios from 'axios';

export interface Candidato {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  status: 'pendente' | 'aprovado' | 'reprovado' | 'contratado';
  dataCandidatura: string;
  documentos: {
    id: string;
    nome: string;
    status: 'pendente' | 'enviado' | 'aprovado' | 'reprovado';
    url?: string;
  }[];
}

export interface ProcessoAdmissao {
  id: string;
  candidatoId: string;
  candidatoNome: string;
  etapa: 'documentos' | 'entrevista' | 'exames' | 'contratacao';
  status: 'em_andamento' | 'concluido' | 'cancelado';
  dataInicio: string;
  dataConclusao?: string;
  observacoes?: string;
}

export interface AdmissaoData {
  candidatos: Candidato[];
  processos: ProcessoAdmissao[];
  stats: {
    totalCandidatos: number;
    candidatosAprovados: number;
    candidatosPendentes: number;
    candidatosContratados: number;
  };
}

const fetcher = (url: string) => axios.get<AdmissaoData>(url).then(res => res.data);

export const useAdmissaoData = () => {
  const { data, error, mutate } = useSWR<AdmissaoData>('/api/admissao', fetcher);

  const aprovarCandidato = async (candidatoId: string) => {
    try {
      await axios.put(`/api/admissao/candidatos/${candidatoId}/aprovar`);
      mutate();
    } catch (error) {
      console.error('Erro ao aprovar candidato:', error);
      throw error;
    }
  };

  const reprovarCandidato = async (candidatoId: string, motivo: string) => {
    try {
      await axios.put(`/api/admissao/candidatos/${candidatoId}/reprovar`, { motivo });
      mutate();
    } catch (error) {
      console.error('Erro ao reprovar candidato:', error);
      throw error;
    }
  };

  const contratarCandidato = async (candidatoId: string, dataContratacao: string) => {
    try {
      await axios.post(`/api/admissao/contratacao`, {
        candidatoId,
        dataContratacao
      });
      mutate();
    } catch (error) {
      console.error('Erro ao contratar candidato:', error);
      throw error;
    }
  };

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    aprovarCandidato,
    reprovarCandidato,
    contratarCandidato,
  };
}; 