/**
 * Arquivo: groups.ts
 * Caminho: src/pages/api/shopping/groups.ts
 * Criado em: 2025-01-21
 * Última atualização: 2025-01-21
 * Descrição: Endpoint mock para grupos de shopping.
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { ShoppingGroup } from '@/hooks/useShoppingData';

const groupsMock: ShoppingGroup[] = [
  {
    id: '1',
    name: 'Supermercado',
    items: 12,
    budget: 450,
    spent: 280,
    icon: 'LocalGroceryStore',
    color: '#4CAF50'
  },
  {
    id: '2',
    name: 'Farmácia',
    items: 3,
    budget: 80,
    spent: 65,
    icon: 'LocalPharmacy',
    color: '#2196F3'
  },
  {
    id: '3',
    name: 'Manutenção',
    items: 5,
    budget: 200,
    spent: 150,
    icon: 'Build',
    color: '#FF9800'
  },
  {
    id: '4',
    name: 'Diversos',
    items: 8,
    budget: 300,
    spent: 120,
    icon: 'Store',
    color: '#9C27B0'
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Simular delay de rede
    setTimeout(() => {
      res.status(200).json(groupsMock);
    }, 300);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 