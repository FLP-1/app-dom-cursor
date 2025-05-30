import { EsocialEvent, EsocialEventFilter, EsocialEventFormData } from '../types/esocial';
import axios from 'axios';

const API_URL = '/api/esocial';

export const EsocialService = {
  async list(filters?: EsocialEventFilter): Promise<EsocialEvent[]> {
    const { data } = await axios.get<EsocialEvent[]>(API_URL, { params: filters });
    return data;
  },

  async getById(id: string): Promise<EsocialEvent> {
    const { data } = await axios.get<EsocialEvent>(`${API_URL}/${id}`);
    return data;
  },

  async create(formData: EsocialEventFormData): Promise<EsocialEvent> {
    const { data } = await axios.post<EsocialEvent>(API_URL, formData);
    return data;
  },

  async update(id: string, formData: Partial<EsocialEventFormData>): Promise<EsocialEvent> {
    const { data } = await axios.put<EsocialEvent>(`${API_URL}/${id}`, formData);
    return data;
  },

  async remove(id: string): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
  },

  async enviar(id: string): Promise<EsocialEvent> {
    const { data } = await axios.post<EsocialEvent>(`${API_URL}/${id}/enviar`);
    return data;
  },

  async consultarStatus(id: string): Promise<{
    status: string;
    mensagem: string;
    dataProcessamento?: Date;
  }> {
    const { data } = await axios.get(`${API_URL}/${id}/status`);
    return data;
  },

  async obterEventosPorPeriodo(
    empregadoDomesticoId: string,
    dataInicio: Date,
    dataFim: Date
  ): Promise<EsocialEvent[]> {
    const { data } = await axios.get<EsocialEvent[]>(`${API_URL}/periodo`, {
      params: {
        empregadoDomesticoId,
        dataInicio: dataInicio.toISOString(),
        dataFim: dataFim.toISOString(),
      },
    });
    return data;
  },
}; 