/**
 * Arquivo: stats.ts
 * Caminho: src/pages/api/demissao/stats.ts
 * Criado em: 2025-01-21
 * Última atualização: 2025-01-21
 * Descrição: Endpoint mock para estatísticas de demissão.
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { DemissaoStats } from '@/hooks/useDemissaoData';

const statsMock: DemissaoStats = {
  totalDemissoes: 5,
  pendentes: 3,
  aprovadas: 1,
  rejeitadas: 1
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Simular delay de rede
    setTimeout(() => {
      res.status(200).json(statsMock);
    }, 300);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 