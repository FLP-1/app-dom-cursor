/**
 * Arquivo: useFamilyData.ts
 * Caminho: src/hooks/useFamilyData.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Hook customizado para buscar e gerenciar os dados de família.
 */

import useSWR from 'swr';
import axios from 'axios';

export interface FamilyMember {
  id: string;
  name: string;
  relationship: 'spouse' | 'child' | 'parent' | 'sibling' | 'other';
  age: number;
  birthDate: string;
  phone: string;
  email?: string;
  address: string;
  occupation?: string;
  emergencyContact: boolean;
  medicalInfo?: {
    bloodType?: string;
    allergies?: string[];
    medications?: string[];
    conditions?: string[];
  };
  documents: {
    id: string;
    name: string;
    type: string;
    expiryDate?: string;
  }[];
  avatar?: string;
}

export interface FamilyData {
  members: FamilyMember[];
  emergencyContacts: FamilyMember[];
  upcomingBirthdays: FamilyMember[];
  medicalAlerts: {
    memberId: string;
    memberName: string;
    alert: string;
    priority: 'low' | 'medium' | 'high';
  }[];
  stats: {
    totalMembers: number;
    children: number;
    adults: number;
    seniors: number;
  };
}

const fetcher = (url: string) => axios.get<FamilyData>(url).then(res => res.data);

export const useFamilyData = () => {
  const { data, error, mutate } = useSWR<FamilyData>('/api/familia', fetcher);

  const addMember = async (member: Omit<FamilyMember, 'id'>) => {
    try {
      await axios.post('/api/familia', member);
      mutate(); // Revalida os dados
    } catch (error) {
      console.error('Erro ao adicionar membro:', error);
      throw error;
    }
  };

  const updateMember = async (id: string, updates: Partial<FamilyMember>) => {
    try {
      await axios.put(`/api/familia/${id}`, updates);
      mutate(); // Revalida os dados
    } catch (error) {
      console.error('Erro ao atualizar membro:', error);
      throw error;
    }
  };

  const deleteMember = async (id: string) => {
    try {
      await axios.delete(`/api/familia/${id}`);
      mutate(); // Revalida os dados
    } catch (error) {
      console.error('Erro ao deletar membro:', error);
      throw error;
    }
  };

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    addMember,
    updateMember,
    deleteMember,
  };
}; 