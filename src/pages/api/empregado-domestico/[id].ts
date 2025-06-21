/**
 * Arquivo: [id].ts
 * Caminho: src/pages/api/empregado-domestico/[id].ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: API para gerenciar empregados domésticos
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (typeof id !== 'string') return res.status(400).json({ error: 'ID inválido' });

  if (req.method === 'GET') {
    try {
      const empregado = await prisma.empregadoDomestico.findUnique({ where: { id } });
      if (!empregado) return res.status(404).json({ error: 'Empregado não encontrado' });
      res.status(200).json(empregado);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar empregado' });
    }
  } else if (req.method === 'PUT') {
    try {
      const data = req.body;
      const empregado = await prisma.empregadoDomestico.update({ where: { id }, data });
      res.status(200).json(empregado);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar empregado' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
} 