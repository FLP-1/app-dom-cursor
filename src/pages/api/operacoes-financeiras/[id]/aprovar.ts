import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  if (req.method !== 'PATCH') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { id } = req.query;

  try {
    // Verifica se a operação existe e pertence ao usuário
    const operacao = await prisma.operacaoFinanceira.findFirst({
      where: {
        id: String(id),
        usuarioId: session.user.id,
      },
    });

    if (!operacao) {
      return res.status(404).json({ message: 'Operação financeira não encontrada' });
    }

    if (operacao.status !== 'PENDENTE') {
      return res.status(400).json({ message: 'Operação não está pendente' });
    }

    // Atualiza o status da operação
    const operacaoAtualizada = await prisma.operacaoFinanceira.update({
      where: { id: String(id) },
      data: { status: 'APROVADO' },
    });

    return res.status(200).json(operacaoAtualizada);
  } catch (error) {
    console.error('Erro ao aprovar operação financeira:', error);
    return res.status(500).json({ message: 'Erro ao aprovar operação financeira' });
  }
} 