/**
 * Arquivo: stripe.ts
 * Caminho: src/pages/api/webhooks/stripe.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: API para processar webhooks do Stripe
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { PaymentService } from '@/services/payment.service';
import { buffer } from 'micro';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const signature = req.headers['stripe-signature'] as string;
    const payload = await buffer(req);

    await PaymentService.processarWebhook(payload.toString(), signature);

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    res.status(400).json({ error: 'Erro ao processar webhook' });
  }
} 
