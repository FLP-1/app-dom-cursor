/**
 * Arquivo: payment.service.ts
 * Caminho: src/services/payment.service.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Serviço de pagamento
 */

import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { LogService, TipoLog, CategoriaLog } from '@/services/log.service';
import { notificationService } from '@/services/notification.service';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  typescript: true,
});

export interface StripeConfig {
  webhookSecret: string;
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutSession {
  id: string;
  url: string;
  status: 'open' | 'complete' | 'expired';
  amount: number;
  currency: string;
  customerId?: string;
}

export interface PaymentIntent {
  id: string;
  status: 'succeeded' | 'processing' | 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'canceled';
  amount: number;
  currency: string;
  customerId?: string;
}

export const PaymentService = {
  /**
   * Cria uma sessão de checkout no Stripe
   * @param planoId ID do plano
   * @param usuarioId ID do usuário
   * @returns Sessão de checkout
   */
  async criarSessaoCheckout(planoId: string, usuarioId: string): Promise<CheckoutSession> {
    try {
      // Busca plano e usuário
      const [plano, usuario] = await Promise.all([
        prisma.plano.findUnique({ where: { id: planoId } }),
        prisma.usuario.findUnique({ where: { id: usuarioId } })
      ]);

      if (!plano || !usuario) {
        throw new Error('Plano ou usuário não encontrado');
      }

      // Cria ou recupera cliente no Stripe
      let customerId = usuario.stripeCustomerId;
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: usuario.email,
          name: usuario.nome,
          metadata: {
            usuarioId: usuario.id
          }
        });
        customerId = customer.id;
        
        // Atualiza usuário com ID do cliente Stripe
        await prisma.usuario.update({
          where: { id: usuarioId },
          data: { stripeCustomerId: customerId }
        });
      }

      // Cria sessão de checkout
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'brl',
            product_data: {
              name: plano.nome,
              description: plano.descricao
            },
            unit_amount: plano.valor * 100 // Stripe usa centavos
          },
          quantity: 1
        }],
        mode: 'subscription',
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/assinatura/sucesso?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/assinatura/cancelado`,
        metadata: {
          planoId,
          usuarioId
        }
      });

      // Registra log
      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.PAGAMENTO,
        mensagem: 'Sessão de checkout criada',
        detalhes: { 
          sessionId: session.id,
          planoId,
          usuarioId
        }
      });

      return {
        id: session.id,
        url: session.url!,
        status: session.status as CheckoutSession['status'],
        amount: session.amount_total! / 100,
        currency: session.currency!,
        customerId
      };
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PAGAMENTO,
        mensagem: 'Erro ao criar sessão de checkout',
        detalhes: { error, planoId, usuarioId }
      });
      throw error;
    }
  },

  /**
   * Processa webhook do Stripe
   * @param payload Payload do webhook
   * @param signature Assinatura do webhook
   * @returns Evento processado
   */
  async processarWebhook(payload: string, signature: string): Promise<Stripe.Event> {
    try {
      const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );

      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object as Stripe.Checkout.Session;
          await this.processarCheckoutCompleto(session);
          break;
        }
        case 'invoice.paid': {
          const invoice = event.data.object as Stripe.Invoice;
          await this.processarFaturaPaga(invoice);
          break;
        }
        case 'invoice.payment_failed': {
          const invoice = event.data.object as Stripe.Invoice;
          await this.processarFalhaPagamento(invoice);
          break;
        }
        case 'customer.subscription.deleted': {
          const subscription = event.data.object as Stripe.Subscription;
          await this.processarCancelamentoAssinatura(subscription);
          break;
        }
      }

      await LogService.create({
        tipo: TipoLog.INFO,
        categoria: CategoriaLog.PAGAMENTO,
        mensagem: 'Webhook processado com sucesso',
        detalhes: { eventType: event.type }
      });

      return event;
    } catch (error) {
      await LogService.create({
        tipo: TipoLog.ERROR,
        categoria: CategoriaLog.PAGAMENTO,
        mensagem: 'Erro ao processar webhook',
        detalhes: { error }
      });
      throw error;
    }
  },

  /**
   * Processa checkout completo
   * @param session Sessão do Stripe
   */
  async processarCheckoutCompleto(session: Stripe.Checkout.Session) {
    const { planoId, usuarioId } = session.metadata!;

    await prisma.planoUsuario.update({
      where: {
        usuarioId_planoId: {
          usuarioId,
          planoId
        }
      },
      data: {
        status: 'ATIVO',
        dataInicio: new Date(),
        stripeSubscriptionId: session.subscription as string
      }
    });

    await notificationService.success(
      'Assinatura ativada com sucesso!',
      'Pagamento confirmado'
    );
  },

  /**
   * Processa fatura paga
   * @param invoice Fatura do Stripe
   */
  async processarFaturaPaga(invoice: Stripe.Invoice) {
    const customer = await stripe.customers.retrieve(invoice.customer as string);
    const usuarioId = customer.metadata.usuarioId;

    await prisma.pagamento.create({
      data: {
        usuarioId,
        valor: invoice.amount_paid / 100,
        status: 'CONFIRMADO',
        dataPagamento: new Date(invoice.created * 1000),
        comprovanteUrl: invoice.hosted_invoice_url || undefined,
        stripeInvoiceId: invoice.id
      }
    });
  },

  /**
   * Processa falha no pagamento
   * @param invoice Fatura do Stripe
   */
  async processarFalhaPagamento(invoice: Stripe.Invoice) {
    const customer = await stripe.customers.retrieve(invoice.customer as string);
    const usuarioId = customer.metadata.usuarioId;

    await prisma.pagamento.create({
      data: {
        usuarioId,
        valor: invoice.amount_due / 100,
        status: 'FALHA',
        dataPagamento: new Date(invoice.created * 1000),
        stripeInvoiceId: invoice.id
      }
    });

    await notificationService.error(
      'Falha no pagamento da assinatura. Por favor, verifique seus dados de pagamento.',
      'Erro no pagamento'
    );
  },

  /**
   * Processa cancelamento de assinatura
   * @param subscription Assinatura do Stripe
   */
  async processarCancelamentoAssinatura(subscription: Stripe.Subscription) {
    const customer = await stripe.customers.retrieve(subscription.customer as string);
    const usuarioId = customer.metadata.usuarioId;

    await prisma.planoUsuario.updateMany({
      where: {
        usuarioId,
        stripeSubscriptionId: subscription.id
      },
      data: {
        status: 'CANCELADO',
        dataFim: new Date()
      }
    });

    await notificationService.warning(
      'Sua assinatura foi cancelada. Você ainda tem acesso até o final do período pago.',
      'Assinatura cancelada'
    );
  }
}; 
