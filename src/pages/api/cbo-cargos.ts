/**
 * Arquivo: cbo-cargos.ts
 * Caminho: src/pages/api/cbo-cargos.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: API para buscar cargos CBO
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' });
  }
  try {
    const cargos = await prisma.cboCargo.findMany();
    res.status(200).json(cargos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar cargos' });
  }
} 
