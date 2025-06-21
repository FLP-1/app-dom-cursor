/**
 * Arquivo: index.ts
 * Caminho: src/pages/api/admissao/index.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Endpoint da API para fornecer dados de admissão de funcionários.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { AdmissaoData } from '@/hooks/useAdmissaoData';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<AdmissaoData>
) {
  const mockData: AdmissaoData = {
    candidatos: [
      {
        id: '1',
        nome: 'Maria Silva',
        email: 'maria.silva@email.com',
        telefone: '(11) 99999-9999',
        cargo: 'Empregada Doméstica',
        status: 'aprovado',
        dataCandidatura: '2025-01-20T10:00:00Z',
        documentos: [
          {
            id: 'doc1',
            nome: 'RG',
            status: 'aprovado',
            url: '/documents/rg.pdf'
          },
          {
            id: 'doc2',
            nome: 'CPF',
            status: 'aprovado',
            url: '/documents/cpf.pdf'
          },
          {
            id: 'doc3',
            nome: 'Carteira de Trabalho',
            status: 'pendente'
          }
        ]
      },
      {
        id: '2',
        nome: 'João Santos',
        email: 'joao.santos@email.com',
        telefone: '(11) 88888-8888',
        cargo: 'Jardineiro',
        status: 'pendente',
        dataCandidatura: '2025-01-25T14:30:00Z',
        documentos: [
          {
            id: 'doc4',
            nome: 'RG',
            status: 'enviado'
          },
          {
            id: 'doc5',
            nome: 'CPF',
            status: 'pendente'
          }
        ]
      },
      {
        id: '3',
        nome: 'Ana Costa',
        email: 'ana.costa@email.com',
        telefone: '(11) 77777-7777',
        cargo: 'Cozinheira',
        status: 'contratado',
        dataCandidatura: '2025-01-15T09:15:00Z',
        documentos: [
          {
            id: 'doc6',
            nome: 'RG',
            status: 'aprovado',
            url: '/documents/rg_ana.pdf'
          },
          {
            id: 'doc7',
            nome: 'CPF',
            status: 'aprovado',
            url: '/documents/cpf_ana.pdf'
          },
          {
            id: 'doc8',
            nome: 'Carteira de Trabalho',
            status: 'aprovado',
            url: '/documents/ctps_ana.pdf'
          }
        ]
      }
    ],
    processos: [
      {
        id: 'proc1',
        candidatoId: '1',
        candidatoNome: 'Maria Silva',
        etapa: 'exames',
        status: 'em_andamento',
        dataInicio: '2025-01-22T08:00:00Z',
        observacoes: 'Aguardando resultados dos exames médicos'
      },
      {
        id: 'proc2',
        candidatoId: '2',
        candidatoNome: 'João Santos',
        etapa: 'documentos',
        status: 'em_andamento',
        dataInicio: '2025-01-26T10:00:00Z',
        observacoes: 'Documentos em análise'
      },
      {
        id: 'proc3',
        candidatoId: '3',
        candidatoNome: 'Ana Costa',
        etapa: 'contratacao',
        status: 'concluido',
        dataInicio: '2025-01-16T09:00:00Z',
        dataConclusao: '2025-01-18T16:00:00Z',
        observacoes: 'Contratada com sucesso'
      }
    ],
    stats: {
      totalCandidatos: 3,
      candidatosAprovados: 1,
      candidatosPendentes: 1,
      candidatosContratados: 1
    }
  };

  res.status(200).json(mockData);
} 