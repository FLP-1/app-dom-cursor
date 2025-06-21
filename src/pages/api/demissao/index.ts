/**
 * Arquivo: index.ts
 * Caminho: src/pages/api/demissao/index.ts
 * Criado em: 2025-01-21
 * Última atualização: 2025-01-21
 * Descrição: Endpoint mock para dados de demissão.
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { DemissaoData } from '@/hooks/useDemissaoData';

const demissoesMock: DemissaoData[] = [
  {
    id: '1',
    nome: 'João Silva',
    cargo: 'Desenvolvedor Frontend',
    dataAdmissao: '2023-03-15',
    dataDemissao: '2025-01-20',
    motivo: 'Pedido de demissão',
    status: 'pendente',
    observacoes: 'Funcionário solicitou demissão por motivos pessoais'
  },
  {
    id: '2',
    nome: 'Maria Santos',
    cargo: 'Analista de RH',
    dataAdmissao: '2022-08-10',
    dataDemissao: '2025-01-18',
    motivo: 'Demissão por justa causa',
    status: 'aprovada',
    observacoes: 'Demissão aprovada após processo disciplinar'
  },
  {
    id: '3',
    nome: 'Pedro Costa',
    cargo: 'Designer UX/UI',
    dataAdmissao: '2024-01-20',
    dataDemissao: '2025-01-22',
    motivo: 'Redução de quadro',
    status: 'pendente',
    observacoes: 'Demissão devido à reestruturação da empresa'
  },
  {
    id: '4',
    nome: 'Ana Oliveira',
    cargo: 'Gerente de Projetos',
    dataAdmissao: '2021-11-05',
    dataDemissao: '2025-01-15',
    motivo: 'Pedido de demissão',
    status: 'rejeitada',
    observacoes: 'Solicitação rejeitada - período de projeto crítico'
  },
  {
    id: '5',
    nome: 'Carlos Ferreira',
    cargo: 'Desenvolvedor Backend',
    dataAdmissao: '2023-06-12',
    dataDemissao: '2025-01-25',
    motivo: 'Demissão por justa causa',
    status: 'pendente',
    observacoes: 'Aguardando análise do departamento jurídico'
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Simular delay de rede
    setTimeout(() => {
      res.status(200).json(demissoesMock);
    }, 500);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 