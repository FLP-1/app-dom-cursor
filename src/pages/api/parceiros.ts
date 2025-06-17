/**
 * Arquivo: parceiros.ts
 * Caminho: src/pages/api/parceiros.ts
 * Criado em: 2025-06-12
 * Última atualização: 2025-06-13
 * Descrição: API para buscar parceiros
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    let parceiros = await prisma.partner.findMany();
    if (parceiros.length === 0) {
      // Povoa a base com um parceiro de exemplo se estiver vazia
      const novo = await prisma.partner.create({
        data: {
          name: 'Parceiro Exemplo',
          cnpj: '00.000.000/0001-00',
          email: 'contato@exemplo.com',
        },
      });
      parceiros = [novo];
    }
    return res.status(200).json(parceiros);
  } catch (error) {
    console.error('Erro ao buscar parceiros:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
} 
