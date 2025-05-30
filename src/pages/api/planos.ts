import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { LogService, TipoLog, CategoriaLog } from '@/services/log.service';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const planos = await prisma.plano.findMany({
      where: {
        ativo: true,
      },
      orderBy: {
        valor: 'asc',
      },
    });

    // Registra log
    await LogService.create({
      tipo: TipoLog.INFO,
      categoria: CategoriaLog.PAGAMENTO,
      mensagem: 'Planos listados com sucesso',
      detalhes: { quantidade: planos.length }
    });

    return res.status(200).json(planos);
  } catch (error) {
    await LogService.create({
      tipo: TipoLog.ERROR,
      categoria: CategoriaLog.PAGAMENTO,
      mensagem: 'Erro ao listar planos',
      detalhes: { error }
    });
    return res.status(500).json({ error: 'Erro ao listar planos' });
  }
} 