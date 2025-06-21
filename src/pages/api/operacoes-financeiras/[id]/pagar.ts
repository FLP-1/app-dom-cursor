/**
 * Arquivo: pagar.ts
 * Caminho: src/pages/api/operacoes-financeiras/[id]/pagar.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: API para registrar pagamento de operações financeiras
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const pagarSchema = z.object({
  valor: z.number().positive('Valor deve ser maior que zero'),
  dataPagamento: z.string().datetime(),
  comprovanteUrl: z.string().url('URL do comprovante inválida').optional(),
  observacao: z.string().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { id } = req.query;

  try {
    const data = pagarSchema.parse(req.body);

    // Verifica se a operação existe e pertence ao usuário
    const operacao = await prisma.operacaoFinanceira.findFirst({
      where: {
        id: String(id),
        usuarioId: session.user.id,
      },
      include: {
        parcelas: {
          where: {
            status: 'PENDENTE',
          },
          orderBy: {
            dataVencimento: 'asc',
          },
        },
      },
    });

    if (!operacao) {
      return res.status(404).json({ message: 'Operação financeira não encontrada' });
    }

    if (operacao.status !== 'APROVADO') {
      return res.status(400).json({ message: 'Operação não está aprovada' });
    }

    // Se for um empréstimo com parcelas
    if (operacao.tipo === 'EMPRESTIMO' && operacao.parcelas.length > 0) {
      // Verifica se o valor pago corresponde ao valor da próxima parcela
      const proximaParcela = operacao.parcelas[0];
      if (data.valor !== proximaParcela.valor) {
        return res.status(400).json({ 
          message: `Valor incorreto. O valor da próxima parcela é R$ ${proximaParcela.valor.toFixed(2)}` 
        });
      }

      // Registra o pagamento da parcela
      await prisma.parcelaOperacaoFinanceira.update({
        where: { id: proximaParcela.id },
        data: {
          status: 'PAGO',
          dataPagamento: new Date(data.dataPagamento),
          comprovanteUrl: data.comprovanteUrl,
          observacao: data.observacao,
        },
      });

      // Verifica se todas as parcelas foram pagas
      const parcelasRestantes = await prisma.parcelaOperacaoFinanceira.count({
        where: {
          operacaoFinanceiraId: operacao.id,
          status: 'PENDENTE',
        },
      });

      // Se não houver mais parcelas pendentes, marca a operação como concluída
      if (parcelasRestantes === 0) {
        await prisma.operacaoFinanceira.update({
          where: { id: operacao.id },
          data: { status: 'CONCLUIDO' },
        });
      }
    } else {
      // Se for um adiantamento ou empréstimo sem parcelas
      if (data.valor !== operacao.valor) {
        return res.status(400).json({ 
          message: `Valor incorreto. O valor da operação é R$ ${operacao.valor.toFixed(2)}` 
        });
      }

      // Registra o pagamento e marca a operação como concluída
      await prisma.operacaoFinanceira.update({
        where: { id: operacao.id },
        data: {
          status: 'CONCLUIDO',
          dataPagamento: new Date(data.dataPagamento),
          comprovanteUrl: data.comprovanteUrl,
          observacao: data.observacao,
        },
      });
    }

    return res.status(200).json({ message: 'Pagamento registrado com sucesso' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Dados inválidos', errors: error.errors });
    }

    console.error('Erro ao registrar pagamento:', error);
    return res.status(500).json({ message: 'Erro ao registrar pagamento' });
  }
} 