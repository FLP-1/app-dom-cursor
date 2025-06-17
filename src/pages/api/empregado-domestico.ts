/**
 * Arquivo: empregado-domestico.ts
 * Caminho: src/pages/api/empregado-domestico.ts
 * Criado em: 2025-06-08
 * Última atualização: 2025-06-13
 * Descrição: API para gerenciar empregados domésticos
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const empregados = await prisma.empregadorDomestico.findMany();
      return res.status(200).json(empregados);
    } catch (error) {
      console.error('Erro detalhado ao buscar empregados domésticos:', error);
      return res.status(500).json({ message: 'Erro ao buscar empregados domésticos', error: String(error) });
    }
  }
  res.status(405).end();
} 
