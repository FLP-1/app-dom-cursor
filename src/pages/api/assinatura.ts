import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { planoId, usuarioId } = req.body;
  if (!planoId || !usuarioId) {
    return res.status(400).json({ error: 'Dados obrigatórios não informados' });
  }

  try {
    const planoUsuario = await prisma.planoUsuario.create({
      data: {
        usuarioId,
        planoId,
        dataInicio: new Date(),
        status: 'PENDENTE_PAGAMENTO',
        criadoEm: new Date(),
      },
    });
    // Futuro: criar sessão Stripe e retornar checkoutUrl
    return res.status(201).json({ planoUsuarioId: planoUsuario.id });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar contratação' });
  }
} 