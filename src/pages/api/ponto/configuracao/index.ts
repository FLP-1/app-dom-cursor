import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const session = await getSession({ req });
    if (!session?.user?.id) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    const configuracao = await prisma.configuracaoPonto.findUnique({
      where: {
        usuarioId: session.user.id
      }
    });

    if (!configuracao) {
      return res.status(404).json({ message: 'Configuração não encontrada' });
    }

    return res.status(200).json(configuracao);
  } catch (error) {
    console.error('Erro ao carregar configuração:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
} 