/**
 * Arquivo: useShoppingData.ts
 * Caminho: src/hooks/useShoppingData.ts
 * Criado em: 2025-01-21
 * Última atualização: 2025-01-21
 * Descrição: Hook customizado para gerenciar dados de shopping com SWR.
 */

import useSWR from 'swr';
import { fetcher } from '@/lib/api';

export interface ShoppingGroup {
  id: string;
  name: string;
  items: number;
  budget: number;
  spent: number;
  icon: string;
  color: string;
}

export interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  status: 'pendente' | 'comprado';
  assignedTo: string;
  urgent: boolean;
}

export interface ShoppingStats {
  totalItems: number;
  totalBudget: number;
  totalSpent: number;
  pendingItems: number;
  completedItems: number;
}

export const useShoppingData = () => {
  const { data: groups, error: groupsError, mutate: mutateGroups } = useSWR<ShoppingGroup[]>('/api/shopping/groups', fetcher);
  const { data: items, error: itemsError, mutate: mutateItems } = useSWR<ShoppingItem[]>('/api/shopping/items', fetcher);
  const { data: stats, error: statsError } = useSWR<ShoppingStats>('/api/shopping/stats', fetcher);

  return {
    groups: groups || [],
    items: items || [],
    stats: stats || { totalItems: 0, totalBudget: 0, totalSpent: 0, pendingItems: 0, completedItems: 0 },
    isLoading: (!groups && !groupsError) || (!items && !itemsError),
    isStatsLoading: !stats && !statsError,
    error: groupsError || itemsError || statsError,
    mutateGroups,
    mutateItems
  };
}; 