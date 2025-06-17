/**
 * Arquivo: rateLimit.ts
 * Caminho: src/middleware/rateLimit.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import rateLimit from 'express-rate-limit';
import { NextApiRequest, NextApiResponse } from 'next';

// Configuração do rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite de 100 requisições por IP
  message: {
    message: 'Muitas requisições deste IP, por favor tente novamente após 15 minutos',
  },
  standardHeaders: true, // Retorna rate limit info nos headers
  legacyHeaders: false, // Desabilita headers legacy
});

// Middleware para aplicar o rate limiting
export function rateLimitMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  return new Promise((resolve, reject) => {
    limiter(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// Configurações específicas para diferentes rotas
export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 5, // 5 tentativas
  message: {
    message: 'Muitas tentativas de login, por favor tente novamente após 1 hora',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 3, // 3 tentativas
  message: {
    message: 'Muitas tentativas de recuperação de senha, por favor tente novamente após 1 hora',
  },
  standardHeaders: true,
  legacyHeaders: false,
}); 
