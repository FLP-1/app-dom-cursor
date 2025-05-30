import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const operacaoFinanceiraSchema = z.object({
  tipo: z.enum(['ADIANTAMENTO', 'EMPRESTIMO']),
  valor: z.number().positive('Valor deve ser maior que zero'),
  dataOperacao: z.string().datetime(),
  dataVencimento: z.string().datetime(),
  numeroParcelas: z.number().min(1).optional(),
  valorParcela: z.number().positive().optional(),
  formaPagamento: z.enum(['DINHEIRO', 'PIX', 'TRANSFERENCIA', 'OUTRO']),
  observacao: z.string().optional(),
  comprovanteUrl: z.string().url('URL do comprovante inválida').optional(),
  empregadoDomesticoId: z.string().uuid(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  if (req.method === 'GET') {
    try {
      const operacoes = await prisma.operacaoFinanceira.findMany({
        where: {
          usuarioId: session.user.id,
        },
        include: {
          empregadoDomestico: {
            select: {
              id: true,
              nome: true,
            },
          },
          parcelas: {
            where: {
              status: 'PENDENTE',
            },
            orderBy: {
              dataVencimento: 'asc',
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return res.status(200).json(operacoes);
    } catch (error) {
      console.error('Erro ao listar operações financeiras:', error);
      return res.status(500).json({ message: 'Erro ao listar operações financeiras' });
    }
  }

  if (req.method === 'POST') {
    try {
      const data = operacaoFinanceiraSchema.parse(req.body);

      // Verifica se o empregado doméstico existe e pertence ao usuário
      const empregadoDomestico = await prisma.empregadoDomestico.findFirst({
        where: {
          id: data.empregadoDomesticoId,
          usuarioId: session.user.id,
        },
      });

      if (!empregadoDomestico) {
        return res.status(404).json({ message: 'Empregado doméstico não encontrado' });
      }

      // Cria a operação financeira
      const operacao = await prisma.operacaoFinanceira.create({
        data: {
          tipo: data.tipo,
          valor: data.valor,
          dataOperacao: new Date(data.dataOperacao),
          dataVencimento: new Date(data.dataVencimento),
          formaPagamento: data.formaPagamento,
          observacao: data.observacao,
          comprovanteUrl: data.comprovanteUrl,
          status: 'PENDENTE',
          usuarioId: session.user.id,
          empregadoDomesticoId: data.empregadoDomesticoId,
        },
      });

      // Se for um empréstimo com parcelas, cria as parcelas
      if (data.tipo === 'EMPRESTIMO' && data.numeroParcelas && data.valorParcela) {
        const parcelas = [];
        for (let i = 1; i <= data.numeroParcelas; i++) {
          const dataVencimento = new Date(data.dataVencimento);
          dataVencimento.setMonth(dataVencimento.getMonth() + i - 1);

          parcelas.push({
            numero: i,
            valor: data.valorParcela,
            dataVencimento,
            status: 'PENDENTE',
            operacaoFinanceiraId: operacao.id,
          });
        }

        await prisma.parcelaOperacaoFinanceira.createMany({
          data: parcelas,
        });
      }

      return res.status(201).json(operacao);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Dados inválidos', errors: error.errors });
      }

      console.error('Erro ao criar operação financeira:', error);
      return res.status(500).json({ message: 'Erro ao criar operação financeira' });
    }
  }

  return res.status(405).json({ message: 'Método não permitido' });
} 