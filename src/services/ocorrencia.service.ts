/**
 * Arquivo: ocorrencia.service.ts
 * Caminho: src/services/ocorrencia.service.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Serviço de ocorrências
 */

import { Ocorrencia, OcorrenciaFilter, OcorrenciaFormData } from '@/types/ocorrencia';
import axios from 'axios';

const API_URL = '/api/ocorrencia';

export const OcorrenciaService = {
  async list(filters?: OcorrenciaFilter): Promise<Ocorrencia[]> {
    const { data } = await axios.get<Ocorrencia[]>(API_URL, { params: filters });
    return data;
  },

  async getById(id: string): Promise<Ocorrencia> {
    const { data } = await axios.get<Ocorrencia>(`${API_URL}/${id}`);
    return data;
  },

  async create(formData: OcorrenciaFormData): Promise<Ocorrencia> {
    const form = new FormData();
    form.append('tipo', formData.tipo);
    form.append('dataInicio', formData.dataInicio.toISOString());
    form.append('dataFim', formData.dataFim.toISOString());
    if (formData.justificativa) {
      form.append('justificativa', formData.justificativa);
    }
    if (formData.documentos) {
      formData.documentos.forEach((file, index) => {
        form.append(`documentos[${index}]`, file);
      });
    }
    form.append('empregadoDomesticoId', formData.empregadoDomesticoId);
    if (formData.esocialEventId) {
      form.append('esocialEventId', formData.esocialEventId);
    }

    const { data } = await axios.post<Ocorrencia>(API_URL, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  async update(id: string, formData: Partial<OcorrenciaFormData>): Promise<Ocorrencia> {
    const form = new FormData();
    if (formData.tipo) form.append('tipo', formData.tipo);
    if (formData.dataInicio) {
      form.append('dataInicio', formData.dataInicio.toISOString());
    }
    if (formData.dataFim) {
      form.append('dataFim', formData.dataFim.toISOString());
    }
    if (formData.justificativa) {
      form.append('justificativa', formData.justificativa);
    }
    if (formData.documentos) {
      formData.documentos.forEach((file, index) => {
        form.append(`documentos[${index}]`, file);
      });
    }
    if (formData.empregadoDomesticoId) {
      form.append('empregadoDomesticoId', formData.empregadoDomesticoId);
    }
    if (formData.esocialEventId) {
      form.append('esocialEventId', formData.esocialEventId);
    }

    const { data } = await axios.put<Ocorrencia>(`${API_URL}/${id}`, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  async remove(id: string): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
  },

  async validar(id: string): Promise<Ocorrencia> {
    const { data } = await axios.post<Ocorrencia>(`${API_URL}/${id}/validar`);
    return data;
  },
}; 
