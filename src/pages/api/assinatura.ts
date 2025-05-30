import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { PaymentService } from '@/services/payment.service';
import { LogService, TipoLog, CategoriaLog } from '@/services/log.service';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { planoId, usuarioId } = req.body;
  if (!planoId || !usuarioId) {
    return res.status(400).json({ error: 'Dados obrigatórios não informados' });
  }

  try {
    // Cria registro inicial do plano
    const planoUsuario = await prisma.planoUsuario.create({
      data: {
        usuarioId,
        planoId,
        dataInicio: new Date(),
        status: 'PENDENTE_PAGAMENTO',
        criadoEm: new Date(),
      },
    });

    // Cria sessão de checkout no Stripe
    const checkoutSession = await PaymentService.criarSessaoCheckout(planoId, usuarioId);

    // Registra log
    await LogService.create({
      tipo: TipoLog.INFO,
      categoria: CategoriaLog.PAGAMENTO,
      mensagem: 'Assinatura iniciada',
      detalhes: { 
        planoUsuarioId: planoUsuario.id,
        sessionId: checkoutSession.id
      }
    });

    return res.status(201).json({ 
      planoUsuarioId: planoUsuario.id,
      checkoutUrl: checkoutSession.url
    });
  } catch (error) {
    await LogService.create({
      tipo: TipoLog.ERROR,
      categoria: CategoriaLog.PAGAMENTO,
      mensagem: 'Erro ao criar assinatura',
      detalhes: { error, planoId, usuarioId }
    });
    return res.status(500).json({ error: 'Erro ao criar assinatura' });
  }
} 