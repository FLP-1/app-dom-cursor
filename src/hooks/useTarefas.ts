import { useState, useEffect } from 'react';
import { Task, TaskStatus, TaskPriority } from '../types/task';

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

  useEffect(() => {
    setLoading(true);
    // Aqui futuramente será feita a chamada à API/backend
    // Por enquanto, simula fetch
    setTimeout(() => {
      setTarefas([]); // Substituir por dados reais ou mockados
      setLoading(false);
    }, 500);
  }, [filtros]);

  return {
    tarefas,
    filtros,
    setFiltros,
    loading,
  };
} 