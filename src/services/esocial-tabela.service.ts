/**
 * Arquivo: esocial-tabela.service.ts
 * Caminho: src/services/esocial-tabela.service.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Serviço de tabelas do eSocial
 */

import { prisma } from '@/lib/prisma';
import { EsocialTabela, EsocialTabelaItem } from '@prisma/client';

export class EsocialTabelaService {
  private prisma: typeof prisma;

  constructor() {
    this.prisma = prisma;
  }

  async getTabela(codigo: string): Promise<EsocialTabela | null> {
    return this.prisma.esocialTabela.findUnique({
      where: { codigo },
      include: {
        itens: {
          where: {
            ativo: true,
            dataInicio: { lte: new Date() },
            OR: [
              { dataFim: null },
              { dataFim: { gte: new Date() } }
            ]
          }
        }
      }
    });
  }

  async getItemTabela(tabelaCodigo: string, itemCodigo: string): Promise<EsocialTabelaItem | null> {
    const tabela = await this.getTabela(tabelaCodigo);
    if (!tabela) return null;

    return this.prisma.esocialTabelaItem.findFirst({
      where: {
        tabelaId: tabela.id,
        codigo: itemCodigo,
        ativo: true,
        dataInicio: { lte: new Date() },
        OR: [
          { dataFim: null },
          { dataFim: { gte: new Date() } }
        ]
      }
    });
  }

  async atualizarTabela(codigo: string, dados: Partial<EsocialTabela>): Promise<EsocialTabela> {
    return this.prisma.esocialTabela.update({
      where: { codigo },
      data: dados
    });
  }

  async adicionarItemTabela(tabelaCodigo: string, item: Omit<EsocialTabelaItem, 'id' | 'tabelaId' | 'createdAt' | 'updatedAt'>): Promise<EsocialTabelaItem> {
    const tabela = await this.getTabela(tabelaCodigo);
    if (!tabela) throw new Error(`Tabela ${tabelaCodigo} não encontrada`);

    return this.prisma.esocialTabelaItem.create({
      data: {
        ...item,
        tabelaId: tabela.id
      }
    });
  }

  async atualizarItemTabela(tabelaCodigo: string, itemCodigo: string, dados: Partial<EsocialTabelaItem>): Promise<EsocialTabelaItem> {
    const item = await this.getItemTabela(tabelaCodigo, itemCodigo);
    if (!item) throw new Error(`Item ${itemCodigo} não encontrado na tabela ${tabelaCodigo}`);

    return this.prisma.esocialTabelaItem.update({
      where: { id: item.id },
      data: dados
    });
  }

  async desativarItemTabela(tabelaCodigo: string, itemCodigo: string): Promise<EsocialTabelaItem> {
    const item = await this.getItemTabela(tabelaCodigo, itemCodigo);
    if (!item) throw new Error(`Item ${itemCodigo} não encontrado na tabela ${tabelaCodigo}`);

    return this.prisma.esocialTabelaItem.update({
      where: { id: item.id },
      data: { ativo: false }
    });
  }
} 
