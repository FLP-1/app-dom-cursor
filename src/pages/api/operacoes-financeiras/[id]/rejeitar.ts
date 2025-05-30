import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const rejeitarSchema = z.object({
  motivo: z.string().min(1, 'Motivo é obrigatório'),
});

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
    const data = rejeitarSchema.parse(req.body);

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
      data: { 
        status: 'REJEITADO',
        observacao: data.motivo,
      },
    });

    return res.status(200).json(operacaoAtualizada);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Dados inválidos', errors: error.errors });
    }

    console.error('Erro ao rejeitar operação financeira:', error);
    return res.status(500).json({ message: 'Erro ao rejeitar operação financeira' });
  }
} 