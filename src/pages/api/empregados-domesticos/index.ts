import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const empregadosDomesticos = await prisma.empregadoDomestico.findMany({
      where: {
        usuarioId: session.user.id,
      },
      orderBy: {
        nome: 'asc',
      },
    });

    return res.status(200).json(empregadosDomesticos);
  } catch (error) {
    console.error('Erro ao listar empregados domésticos:', error);
    return res.status(500).json({ message: 'Erro ao listar empregados domésticos' });
  }
} 