/**
 * Arquivo: index.ts
 * Caminho: src/pages/api/push/index.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: API para gerenciar notificações push
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '@/lib/prisma';
import { PushNotificationService } from '@/services/push-notification.service';
import { z } from 'zod';

const pushNotificationSchema = z.object({
  tipo: z.enum(['sistema', 'usuario', 'empresa', 'ponto', 'ocorrencia', 'documento', 'esocial', 'backup', 'seguranca']),
  titulo: z.string().min(1).max(100),
  mensagem: z.string().min(1).max(500),
  icone: z.string().optional(),
  imagem: z.string().optional(),
  url: z.string().url().optional(),
  dados: z.record(z.unknown()).optional(),
  usuarioId: z.string().uuid(),
  dispositivoId: z.string().optional()
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  switch (req.method) {
    case 'GET':
      return handleGet(req, res, session);
    case 'POST':
      return handlePost(req, res, session);
    default:
      return res.status(405).json({ message: 'Método não permitido' });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse, session: any) {
  try {
    const { tipo, status, usuarioId, dataInicio, dataFim } = req.query;

    const filtros = {
      ...(tipo && { tipo: tipo as string }),
      ...(status && { status: status as string }),
      ...(usuarioId && { usuarioId: usuarioId as string }),
      ...(dataInicio && { dataInicio: new Date(dataInicio as string) }),
      ...(dataFim && { dataFim: new Date(dataFim as string) })
    };

    const notificacoes = await PushNotificationService.listar(filtros);
    return res.status(200).json(notificacoes);
  } catch (error) {
    console.error('Erro ao listar notificações push:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse, session: any) {
  try {
    const data = pushNotificationSchema.parse(req.body);

    // Envia a notificação push
    const sucesso = await PushNotificationService.sendToUser(
      data.usuarioId,
      data.titulo,
      data.mensagem,
      data.dados
    );

    if (!sucesso) {
      return res.status(500).json({ message: 'Erro ao enviar notificação push' });
    }

    // Salva no banco de dados
    const notificacao = await prisma.pushNotification.create({
      data: {
        tipo: data.tipo,
        titulo: data.titulo,
        mensagem: data.mensagem,
        icone: data.icone,
        imagem: data.imagem,
        url: data.url,
        dados: data.dados,
        status: 'ENVIADO',
        usuarioId: data.usuarioId,
        dispositivoId: data.dispositivoId,
        dataEnvio: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    return res.status(201).json(notificacao);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: 'Dados inválidos', 
        errors: error.errors 
      });
    }

    console.error('Erro ao enviar notificação push:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
} 