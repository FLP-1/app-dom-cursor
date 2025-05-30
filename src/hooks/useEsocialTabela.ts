import { useState, useEffect } from 'react';
import { EsocialTabelaService } from '../services/esocial-tabela.service';
import { EsocialTabela, EsocialTabelaItem } from '@prisma/client';

export function useEsocialTabela() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const service = new EsocialTabelaService();

  const getTabela = async (codigo: string): Promise<EsocialTabela | null> => {
    try {
      setLoading(true);
      setError(null);
      return await service.getTabela(codigo);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Erro ao buscar tabela'));
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getItemTabela = async (tabelaCodigo: string, itemCodigo: string): Promise<EsocialTabelaItem | null> => {
    try {
      setLoading(true);
      setError(null);
      return await service.getItemTabela(tabelaCodigo, itemCodigo);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Erro ao buscar item da tabela'));
      return null;
    } finally {
      setLoading(false);
    }
  };

  const atualizarTabela = async (codigo: string, dados: Partial<EsocialTabela>): Promise<EsocialTabela | null> => {
    try {
      setLoading(true);
      setError(null);
      return await service.atualizarTabela(codigo, dados);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Erro ao atualizar tabela'));
      return null;
    } finally {
      setLoading(false);
    }
  };

  const adicionarItemTabela = async (
    tabelaCodigo: string,
    item: Omit<EsocialTabelaItem, 'id' | 'tabelaId' | 'createdAt' | 'updatedAt'>
  ): Promise<EsocialTabelaItem | null> => {
    try {
      setLoading(true);
      setError(null);
      return await service.adicionarItemTabela(tabelaCodigo, item);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Erro ao adicionar item na tabela'));
      return null;
    } finally {
      setLoading(false);
    }
  };

  const atualizarItemTabela = async (
    tabelaCodigo: string,
    itemCodigo: string,
    dados: Partial<EsocialTabelaItem>
  ): Promise<EsocialTabelaItem | null> => {
    try {
      setLoading(true);
      setError(null);
      return await service.atualizarItemTabela(tabelaCodigo, itemCodigo, dados);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Erro ao atualizar item da tabela'));
      return null;
    } finally {
      setLoading(false);
    }
  };

  const desativarItemTabela = async (
    tabelaCodigo: string,
    itemCodigo: string
  ): Promise<EsocialTabelaItem | null> => {
    try {
      setLoading(true);
      setError(null);
      return await service.desativarItemTabela(tabelaCodigo, itemCodigo);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Erro ao desativar item da tabela'));
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getTabela,
    getItemTabela,
    atualizarTabela,
    adicionarItemTabela,
    atualizarItemTabela,
    desativarItemTabela
  };
} 