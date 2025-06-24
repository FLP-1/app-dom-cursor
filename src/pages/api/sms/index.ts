/**
 * Arquivo: index.ts
 * Caminho: src/pages/api/sms/index.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: API para gerenciamento de SMS
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '@/lib/prisma';
import { SMSService } from '@/services/sms.service';
import { z } from 'zod';
import { smsMessages } from '@/i18n/messages/sms.messages';

const smsSchema = z.object({
  tipo: z.enum(['sistema', 'usuario', 'empresa', 'ponto', 'ocorrencia', 'documento', 'esocial', 'backup', 'seguranca']),
  numero: z.string().min(10).max(15),
  mensagem: z.string().min(1).max(160),
  provedor: z.string().optional()
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  try {
    switch (req.method) {
      case 'GET':
        const filtros = req.query;
        const smsList = await SMSService.listar(filtros);
        return res.status(200).json(smsList);

      case 'POST':
        const smsData = req.body;
        const novoSMS = await SMSService.enviar(smsData);
        return res.status(201).json(novoSMS);

      default:
        return res.status(405).json({ message: 'Método não permitido' });
    }
  } catch (error) {
    console.error('Erro na API de SMS:', error);
    return res.status(500).json({ message: smsMessages.pt.errors.sendError });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse, session: any) {
  try {
    const { tipo, status, numero, dataInicio, dataFim, provedor } = req.query;

    const filtros = {
      ...(tipo && { tipo: tipo as string }),
      ...(status && { status: status as string }),
      ...(numero && { numero: numero as string }),
      ...(dataInicio && { dataInicio: new Date(dataInicio as string) }),
      ...(dataFim && { dataFim: new Date(dataFim as string) }),
      ...(provedor && { provedor: provedor as string })
    };

    const sms = await SMSService.listar(filtros);
    return res.status(200).json(sms);
  } catch (error) {
    console.error('Erro ao listar SMS:', error);
    return res.status(500).json({ message: smsMessages.pt.errors.listError });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse, session: any) {
  try {
    const data = smsSchema.parse(req.body);

    // Envia o SMS
    const sucesso = await SMSService.sendTextMessage(data.numero, data.mensagem);

    if (!sucesso) {
      return res.status(500).json({ message: smsMessages.pt.errors.sendError });
    }

    // Salva no banco de dados
    const sms = await prisma.mensagemSMS.create({
      data: {
        tipo: data.tipo,
        numero: data.numero,
        mensagem: data.mensagem,
        status: 'ENVIADO',
        provedor: data.provedor || 'default',
        dataEnvio: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    return res.status(201).json(sms);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: smsMessages.pt.errors.invalidMessage, 
        errors: error.errors 
      });
    }

    console.error('Erro ao enviar SMS:', error);
    return res.status(500).json({ message: smsMessages.pt.errors.sendError });
  }
} 