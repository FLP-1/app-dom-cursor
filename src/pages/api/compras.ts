/**
 * Arquivo: compras.ts
 * Caminho: src/pages/api/compras.ts
 * Criado em: 2025-06-12
 * Última atualização: 2025-06-13
 * Descrição: API para gerenciar compras
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { produto, data, grupo, status } = req.query;
    try {
      const compras = await prisma.compra.findMany({
        where: {
          produto: produto ? { contains: String(produto), mode: 'insensitive' } : undefined,
          dataCompra: data ? new Date(String(data)) : undefined,
          grupo: grupo ? { contains: String(grupo), mode: 'insensitive' } : undefined,
          status: status ? String(status) : undefined,
        },
        orderBy: { dataCompra: 'desc' },
      });
      return res.status(200).json(compras);
    } catch (error) {
      console.error('Erro ao buscar compras:', error);
      return res.status(500).json({ message: 'Erro ao buscar compras' });
    }
  }

  if (req.method === 'PATCH') {
    const { id, status } = req.body;
    if (!id || !status) {
      return res.status(400).json({ message: 'ID e status são obrigatórios.' });
    }
    try {
      const compra = await prisma.compra.update({
        where: { id },
        data: { status },
      });
      return res.status(200).json(compra);
    } catch (error) {
      console.error('Erro ao atualizar status da compra:', error);
      return res.status(500).json({ message: 'Erro ao atualizar status da compra' });
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: 'ID é obrigatório.' });
    }
    try {
      await prisma.compra.delete({ where: { id } });
      return res.status(200).json({ message: 'Compra removida com sucesso.' });
    } catch (error) {
      console.error('Erro ao remover compra:', error);
      return res.status(500).json({ message: 'Erro ao remover compra' });
    }
  }

  if (req.method === 'PUT') {
    const { id, produto, foto, unidade, quantidade, valor, dataCompra, grupo, status } = req.body;
    if (!id || !produto || !unidade || !quantidade || !valor || !dataCompra || !status) {
      return res.status(400).json({ message: 'Campos obrigatórios ausentes.' });
    }
    try {
      const compra = await prisma.compra.update({
        where: { id },
        data: { produto, foto, unidade, quantidade, valor, dataCompra: new Date(dataCompra), grupo, status },
      });
      return res.status(200).json(compra);
    } catch (error) {
      console.error('Erro ao editar compra:', error);
      return res.status(500).json({ message: 'Erro ao editar compra' });
    }
  }

  return res.status(405).json({ message: 'Método não permitido' });
} 
