/**
 * Arquivo: validate.ts
 * Caminho: src/pages/api/auth/validate.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: API para validar tokens de acesso
 */

import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.status(200).json({ valid: true, decoded });
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
} 
