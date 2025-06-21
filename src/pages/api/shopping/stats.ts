/**
 * Arquivo: stats.ts
 * Caminho: src/pages/api/shopping/stats.ts
 * Criado em: 2025-01-21
 * Última atualização: 2025-01-21
 * Descrição: Endpoint mock para estatísticas de shopping.
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { ShoppingStats } from '@/hooks/useShoppingData';

const statsMock: ShoppingStats = {
  totalItems: 28,
  totalBudget: 1030,
  totalSpent: 615,
  pendingItems: 18,
  completedItems: 10
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Simular delay de rede
    setTimeout(() => {
      res.status(200).json(statsMock);
    }, 200);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 