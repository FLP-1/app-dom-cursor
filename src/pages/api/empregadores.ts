/**
 * Arquivo: empregadores.ts
 * Caminho: src/pages/api/empregadores.ts
 * Criado em: 2024-01-01
 * Última atualização: 2025-01-27
 * Descrição: API endpoint para gerenciar empregadores.
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' });
  }
  try {
    const empregadores = await prisma.empregadoDomestico.findMany({
      select: { id: true, nomeCompleto: true }
    });
    res.status(200).json(empregadores);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar empregadores' });
  }
} 
