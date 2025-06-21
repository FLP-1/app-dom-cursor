/**
 * Arquivo: time.ts
 * Caminho: src/pages/api/time.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: API para buscar timestamp do servidor
 */

import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  // Retorna o timestamp atual do servidor
  res.status(200).json(Date.now());
} 
