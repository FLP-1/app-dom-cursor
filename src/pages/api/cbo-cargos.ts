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