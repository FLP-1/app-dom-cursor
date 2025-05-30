import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' });
  }
  try {
    const empregadores = await prisma.empregadorDomestico.findMany({
      select: { id: true, nomeCompleto: true }
    });
    res.status(200).json(empregadores);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar empregadores' });
  }
} 