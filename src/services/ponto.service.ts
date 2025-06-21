/**
 * Arquivo: ponto.service.ts
 * Caminho: src/services/ponto.service.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Serviço de ponto
 */

import { RegistroPonto, RegistroPontoFilter, RegistroPontoFormData } from '@/types/ponto';
import axios from 'axios';

const API_URL = '/api/ponto';

export const PontoService = {
  async list(filters?: RegistroPontoFilter): Promise<RegistroPonto[]> {
    const { data } = await axios.get<RegistroPonto[]>(API_URL, { params: filters });
    return data;
  },

  async getById(id: string): Promise<RegistroPonto> {
    const { data } = await axios.get<RegistroPonto>(`${API_URL}/${id}`);
    return data;
  },

  async create(formData: RegistroPontoFormData): Promise<RegistroPonto> {
    const { data } = await axios.post<RegistroPonto>(API_URL, formData);
    return data;
  },

  async update(id: string, formData: Partial<RegistroPontoFormData>): Promise<RegistroPonto> {
    const { data } = await axios.put<RegistroPonto>(`${API_URL}/${id}`, formData);
    return data;
  },

  async remove(id: string): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
  },

  async validar(id: string): Promise<RegistroPonto> {
    const { data } = await axios.post<RegistroPonto>(`${API_URL}/${id}/validar`);
    return data;
  },

  async obterHorarioTrabalho(empregadoDomesticoId: string, data: Date): Promise<{
    horaInicio: string;
    horaFim: string;
    intervaloInicio: string;
    intervaloFim: string;
  }> {
    const { data: horario } = await axios.get(`${API_URL}/horario-trabalho`, {
      params: {
        empregadoDomesticoId,
        data: data.toISOString(),
      },
    });
    return horario;
  },

  async obterAtrasos(empregadoDomesticoId: string, data: Date): Promise<{
    atrasos: number;
    mensagens: string[];
  }> {
    const { data: atrasos } = await axios.get(`${API_URL}/atrasos`, {
      params: {
        empregadoDomesticoId,
        data: data.toISOString(),
      },
    });
    return atrasos;
  },
}; 
