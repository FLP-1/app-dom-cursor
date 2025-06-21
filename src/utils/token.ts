/**
 * Arquivo: token.ts
 * Caminho: src/utils/token.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Funções para manipulação de tokens
 */

import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';

// A chave secreta deve ser a mesma usada para gerar o token (geralmente do .env)
const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_padrao'; // Use uma chave padrão se a variável de ambiente não estiver definida

export function generateToken(length: number = 32): string {
  return randomBytes(length).toString('hex');
}

export function verifyToken(token: string): unknown | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded; // Retorna o payload do token decodificado
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    return null; // Retorna null se a verificação falhar
  }
} 
