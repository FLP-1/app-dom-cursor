/**
 * Arquivo: usePonto.ts
 * Caminho: src/hooks/usePonto.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useState, useEffect } from 'react';
import { useNotification } from '@/hooks/useNotification';
import axios from 'axios';
import { api } from '@/services/api';
import { RegistroPonto, RegistroPontoFormData } from '@/types/ponto';

interface PontoRegistro {
  id: string;
  dataHora: Date;
  tipo: 'ENTRADA' | 'SAIDA';
  latitude?: number;
  longitude?: number;
  timezone: string;
  dispositivo: string;
  ip: string;
}

interface UsePontoReturn {
  registros: RegistroPonto[];
  filtros: any;
  setFiltros: (f: any) => void;
  loading: boolean;
  error?: string;
  horasDia?: string;
  horasSemana?: string;
  horasMes?: string;
  alertas?: string[];
  registrarPonto: (data: RegistroPontoFormData & { file?: File | null }) => Promise<void>;
  editarPonto: (id: string, data: RegistroPontoFormData & { file?: File | null }) => Promise<void>;
  excluirPonto: (id: string) => Promise<void>;
  aprovarPonto: (id: string) => Promise<void>;
  fetchRegistros: () => Promise<void>;
}

export function usePonto(): UsePontoReturn {
  const [registros, setRegistros] = useState<RegistroPonto[]>([]);
  const [filtros, setFiltros] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [horasDia, setHorasDia] = useState<string>('');
  const [horasSemana, setHorasSemana] = useState<string>('');
  const [horasMes, setHorasMes] = useState<string>('');
  const [alertas, setAlertas] = useState<string[]>([]);

  const fetchRegistros = async () => {
    setLoading(true);
    setError(undefined);
    try {
      const response = await api.get('/ponto', { params: filtros });
      setRegistros(response.data.registros);
      setHorasDia(response.data.horasDia);
      setHorasSemana(response.data.horasSemana);
      setHorasMes(response.data.horasMes);
      setAlertas(response.data.alertas || []);
    } catch (err) {
      setError('Erro ao carregar registros de ponto.');
    } finally {
      setLoading(false);
    }
  };

  const registrarPonto = async (data: RegistroPontoFormData & { file?: File | null }) => {
    setLoading(true);
    setError(undefined);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value as any);
        }
      });
      if (data.file) formData.append('file', data.file);
      await api.post('/ponto', formData);
      await fetchRegistros();
    } catch (err) {
      setError('Erro ao registrar ponto.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editarPonto = async (id: string, data: RegistroPontoFormData & { file?: File | null }) => {
    setLoading(true);
    setError(undefined);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value as any);
        }
      });
      if (data.file) formData.append('file', data.file);
      await api.put(`/ponto/${id}`, formData);
      await fetchRegistros();
    } catch (err) {
      setError('Erro ao editar ponto.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const excluirPonto = async (id: string) => {
    setLoading(true);
    setError(undefined);
    try {
      await api.delete(`/ponto/${id}`);
      await fetchRegistros();
    } catch (err) {
      setError('Erro ao excluir ponto.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const aprovarPonto = async (id: string) => {
    setLoading(true);
    setError(undefined);
    try {
      await api.post(`/ponto/${id}/aprovar`);
      await fetchRegistros();
    } catch (err) {
      setError('Erro ao aprovar ponto.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch inicial e ao mudar filtros
  useEffect(() => {
    fetchRegistros();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filtros)]);

  return {
    registros,
    filtros,
    setFiltros,
    loading,
    error,
    horasDia,
    horasSemana,
    horasMes,
    alertas,
    registrarPonto,
    editarPonto,
    excluirPonto,
    aprovarPonto,
    fetchRegistros,
  };
} 
