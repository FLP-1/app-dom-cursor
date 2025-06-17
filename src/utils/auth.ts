/**
 * Arquivo: auth.ts
 * Caminho: src/utils/auth.ts
 * Criado em: 2025-06-02
 * Última atualização: 2025-06-13
 * Descrição: Funções de autenticação
 */

import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

// Funções fake de autenticação
export function isAuthenticated(): boolean {
  // TODO: Implementar verificação real de autenticação
  return true;
}

export function getUser(): unknown {
  // TODO: Implementar obtenção real do usuário
  return {};
}

export function verifyToken(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: 'Token não fornecido.' });
    return null;
  }
  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded as { userId: string; userType: string; [key: string]: any };
  } catch (err) {
    res.status(401).json({ message: 'Token inválido.' });
    return null;
  }
} 
