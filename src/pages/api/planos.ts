/**
 * Arquivo: planos.ts
 * Caminho: src/pages/api/planos.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: API para buscar planos
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { LogService, TipoLog, CategoriaLog } from '@/services/log.service';

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
