/**
 * Arquivo: parceiro.service.ts
 * Caminho: src/services/parceiro.service.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Serviço de parceiros
 */

import { Parceiro } from '@/types/parceiro';

const API_URL = '/api/parceiros';

export const parceiroService = {
  async create(data: Omit<Parceiro, 'id' | 'createdAt' | 'updatedAt'>): Promise<Parceiro> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erro ao criar parceiro');
    return response.json();
  },

  async update(id: string, data: Partial<Parceiro>): Promise<Parceiro> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erro ao atualizar parceiro');
    return response.json();
  },

  async getById(id: string): Promise<Parceiro> {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar parceiro');
    return response.json();
  },

  async list(): Promise<Parceiro[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Erro ao listar parceiros');
    return response.json();
  },

  async remove(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Erro ao remover parceiro');
  },
}; 
