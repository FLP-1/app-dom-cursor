import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const hoje = new Date();
    const planos = await prisma.plano.findMany({
      where: {
        ativo: true,
        vigenteDe: { lte: hoje },
        OR: [
          { vigenteAte: null },
          { vigenteAte: { gte: hoje } },
        ],
      },
      orderBy: { valorMensal: 'asc' },
    });
    res.status(200).json(planos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar planos' });
  }
} 