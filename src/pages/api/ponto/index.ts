/**
 * Arquivo: index.ts
 * Caminho: src/pages/api/ponto/index.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Handler de API para listagem de registros de ponto.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const registros = await prisma.registroPonto.findMany({
        include: {
          usuario: true,
          empregadoDomestico: true,
        },
        orderBy: { dataHora: 'desc' },
      });
      return res.status(200).json(registros);
    } catch (error) {
      console.error('Erro ao buscar registros de ponto:', error);
      return res.status(500).json({ message: 'Erro ao buscar registros de ponto' });
    }
  }
  return res.status(405).json({ message: 'Método não permitido' });
} 
