/**
 * Arquivo: items.ts
 * Caminho: src/pages/api/shopping/items.ts
 * Criado em: 2025-01-21
 * Última atualização: 2025-01-21
 * Descrição: Endpoint mock para itens de shopping.
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { ShoppingItem } from '@/hooks/useShoppingData';

const itemsMock: ShoppingItem[] = [
  {
    id: '1',
    name: 'Arroz 5kg',
    category: 'Supermercado',
    price: 18.90,
    quantity: 2,
    status: 'pendente',
    assignedTo: 'Maria Silva',
    urgent: false
  },
  {
    id: '2',
    name: 'Detergente',
    category: 'Supermercado',
    price: 3.50,
    quantity: 3,
    status: 'comprado',
    assignedTo: 'João Santos',
    urgent: false
  },
  {
    id: '3',
    name: 'Paracetamol',
    category: 'Farmácia',
    price: 12.50,
    quantity: 1,
    status: 'pendente',
    assignedTo: 'Ana Costa',
    urgent: true
  },
  {
    id: '4',
    name: 'Lâmpada LED',
    category: 'Manutenção',
    price: 25.00,
    quantity: 4,
    status: 'pendente',
    assignedTo: 'Pedro Lima',
    urgent: false
  },
  {
    id: '5',
    name: 'Papel Higiênico',
    category: 'Supermercado',
    price: 8.90,
    quantity: 2,
    status: 'comprado',
    assignedTo: 'Maria Silva',
    urgent: false
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Simular delay de rede
    setTimeout(() => {
      res.status(200).json(itemsMock);
    }, 400);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 