/**
 * Arquivo: index.ts
 * Caminho: src/pages/api/relatorios/index.ts
 * Criado em: 2025-06-12
 * Última atualização: 2025-06-13
 * Descrição: API para gerenciar relatórios
 */

import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: 'Endpoint de relatórios em construção.' });
} 
