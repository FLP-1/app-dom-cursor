/**
 * Arquivo: index.ts
 * Caminho: src/pages/api/alerts/index.ts
 * Criado em: 2025-06-03
 * Última atualização: 2025-06-13
 * Descrição: API para gerenciar alertas
 */

import listHandler from './list';
import createHandler from './create';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Listar alertas
    return listHandler(req, res);
  }
  if (req.method === 'POST') {
    // Criar alerta
    return createHandler(req, res);
  }
  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).json({ message: `Método ${req.method} não permitido.` });
} 
