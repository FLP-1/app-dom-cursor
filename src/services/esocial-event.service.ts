import { EsocialEvent, EsocialEventFilter, EsocialEventType } from '../types/esocial-event';
import axios from 'axios';

const API_URL = '/api/esocial-event';

export const EsocialEventService = {
  async list(filters?: EsocialEventFilter): Promise<EsocialEvent[]> {
    const { data } = await axios.get<EsocialEvent[]>(API_URL, { params: filters });
    return data;
  },

  async getById(id: string): Promise<EsocialEvent> {
    const { data } = await axios.get<EsocialEvent>(`${API_URL}/${id}`);
    return data;
  },

  async create(event: Partial<EsocialEvent>): Promise<EsocialEvent> {
    const { data } = await axios.post<EsocialEvent>(API_URL, event);
    return data;
  },

  async update(id: string, event: Partial<EsocialEvent>): Promise<EsocialEvent> {
    const { data } = await axios.put<EsocialEvent>(`${API_URL}/${id}`, event);
    return data;
  },

  async remove(id: string): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
  },

  async listTypes(): Promise<EsocialEventType[]> {
    const { data } = await axios.get<EsocialEventType[]>(`${API_URL}/types`);
    return data;
  },

  // Métodos de integração (exemplo: gerar alerta, vincular ponto, anexar documento)
  async gerarAlerta(eventId: string): Promise<void> {
    await axios.post(`${API_URL}/${eventId}/alerta`);
  },
  async vincularPonto(eventId: string, timeRecordId: string): Promise<void> {
    await axios.post(`${API_URL}/${eventId}/ponto`, { timeRecordId });
  },
  async anexarDocumento(eventId: string, documentId: string): Promise<void> {
    await axios.post(`${API_URL}/${eventId}/documento`, { documentId });
  },
}; 