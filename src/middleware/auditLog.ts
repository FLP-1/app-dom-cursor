import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../lib/prisma';

export interface AuditLogData {
  userId?: string;
  action: string;
  resource: string;
  details: Record<string, unknown>;
  ip?: string;
  userAgent?: string;
}

export async function createAuditLog(data: AuditLogData) {
  try {
    await prisma.auditLog.create({
      data: {
        userId: data.userId,
        action: data.action,
        resource: data.resource,
        details: data.details,
        ip: data.ip,
        userAgent: data.userAgent,
        timestamp: new Date(),
      },
    });
  } catch (error) {
    console.error('Erro ao criar log de auditoria:', error);
  }
}

export function auditLogMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  const originalEnd = res.end;
  const originalJson = res.json;

  // Sobrescreve o método json para capturar a resposta
  res.json = function (body: unknown) {
    res.locals.responseBody = body;
    return originalJson.call(this, body);
  };

  // Sobrescreve o método end para capturar o status
  res.end = function (chunk: unknown) {
    const auditData: AuditLogData = {
      action: req.method || 'UNKNOWN',
      resource: req.url || 'UNKNOWN',
      details: {
        requestBody: req.body,
        responseBody: res.locals.responseBody,
        statusCode: res.statusCode,
      },
      ip: req.headers['x-forwarded-for'] as string || req.socket.remoteAddress,
      userAgent: req.headers['user-agent'],
    };

    // Se houver um usuário autenticado, adiciona o ID
    if (req.user) {
      auditData.userId = req.user.id;
    }

    // Cria o log de auditoria
    createAuditLog(auditData);

    return originalEnd.call(this, chunk);
  };

  next();
} 