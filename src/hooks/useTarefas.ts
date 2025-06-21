/**
 * Arquivo: useTarefas.ts
 * Caminho: src/hooks/useTarefas.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useState, useEffect } from 'react';
import { Task, TaskStatus, TaskPriority } from '@/types/task';
import { api } from '@/services/api';

export interface FiltrosTarefa {
  status?: TaskStatus;
  prioridade?: TaskPriority;
  responsavelId?: string;
  busca?: string;
}

export function useTarefas() {
  const [tarefas, setTarefas] = useState<Task[]>([]);
  const [filtros, setFiltros] = useState<FiltrosTarefa>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTarefas = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/tarefas', { params: filtros });
      setTarefas(response.data);
    } catch (err) {
      setError('Erro ao carregar tarefas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTarefas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filtros)]);

  const createTarefa = async (data: Partial<Task>) => {
    setLoading(true);
    setError(null);
    try {
      await api.post('/tarefas', data);
      await fetchTarefas();
    } catch (err) {
      setError('Erro ao criar tarefa.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTarefa = async (id: string, data: Partial<Task>) => {
    setLoading(true);
    setError(null);
    try {
      await api.put(`/tarefas/${id}`, data);
      await fetchTarefas();
    } catch (err) {
      setError('Erro ao editar tarefa.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTarefa = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/tarefas/${id}`);
      await fetchTarefas();
    } catch (err) {
      setError('Erro ao excluir tarefa.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    tarefas,
    filtros,
    setFiltros,
    loading,
    error,
    createTarefa,
    updateTarefa,
    deleteTarefa,
    fetchTarefas,
  };
} 
