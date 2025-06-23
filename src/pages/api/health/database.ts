/**
 * Arquivo: database.ts
 * Caminho: src/pages/api/health/database.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: API de health check para o banco de dados
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const startTime = Date.now();

  try {
    // Testa conexão com o banco
    await prisma.$queryRaw`SELECT 1`;

    // Testa operação de leitura
    const userCount = await prisma.user.count();

    // Testa operação de escrita (transação de teste)
    await prisma.$transaction(async (tx) => {
      // Cria um registro temporário para teste
      const testRecord = await tx.configuracaoGlobal.create({
        data: {
          chave: `health_check_${Date.now()}`,
          valor: 'test',
          descricao: 'Registro temporário para health check'
        }
      });

      // Remove o registro de teste
      await tx.configuracaoGlobal.delete({
        where: { id: testRecord.id }
      });
    });

    const responseTime = Date.now() - startTime;

    return res.status(200).json({
      status: 'healthy',
      service: 'database',
      responseTime,
      details: {
        userCount,
        connection: 'active',
        readWrite: 'working'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    const responseTime = Date.now() - startTime;

    return res.status(503).json({
      status: 'down',
      service: 'database',
      responseTime,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
} 