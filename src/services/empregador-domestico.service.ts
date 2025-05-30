import { EmpregadorDomestico, EmpregadorDomesticoFilter, EmpregadorDomesticoFormData } from '../types/empregador-domestico';
import axios from 'axios';

const API_URL = '/api/empregador-domestico';

export const EmpregadorDomesticoService = {
  async list(filters?: EmpregadorDomesticoFilter): Promise<EmpregadorDomestico[]> {
    const { data } = await axios.get<EmpregadorDomestico[]>(API_URL, { params: filters });
    return data;
  },

  async getById(id: string): Promise<EmpregadorDomestico> {
    const { data } = await axios.get<EmpregadorDomestico>(`${API_URL}/${id}`);
    return data;
  },

  async create(formData: EmpregadorDomesticoFormData): Promise<EmpregadorDomestico> {
    const { data } = await axios.post<EmpregadorDomestico>(API_URL, formData);
    return data;
  },

  async update(id: string, formData: Partial<EmpregadorDomesticoFormData>): Promise<EmpregadorDomestico> {
    const { data } = await axios.put<EmpregadorDomestico>(`${API_URL}/${id}`, formData);
    return data;
  },

  async remove(id: string): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
  },

  async obterHorarioTrabalho(id: string, data: Date): Promise<{
    horaInicio: string;
    horaFim: string;
    intervaloInicio: string;
    intervaloFim: string;
  }> {
    const { data: horario } = await axios.get(`${API_URL}/${id}/horario-trabalho`, {
      params: {
        data: data.toISOString(),
      },
    });
    return horario;
  },

  async obterAtrasos(id: string, data: Date): Promise<{
    atrasos: number;
    mensagens: string[];
  }> {
    const { data: atrasos } = await axios.get(`${API_URL}/${id}/atrasos`, {
      params: {
        data: data.toISOString(),
      },
    });
    return atrasos;
  },

  async obterOcorrencias(id: string, dataInicio: Date, dataFim: Date): Promise<{
    ocorrencias: Array<{
      tipo: string;
      dataInicio: Date;
      dataFim: Date;
      justificativa?: string;
    }>;
  }> {
    const { data } = await axios.get(`${API_URL}/${id}/ocorrencias`, {
      params: {
        dataInicio: dataInicio.toISOString(),
        dataFim: dataFim.toISOString(),
      },
    });
    return data;
  },

  async obterRegistrosPonto(id: string, dataInicio: Date, dataFim: Date): Promise<{
    registros: Array<{
      dataHora: Date;
      tipo: string;
      latitude?: number;
      longitude?: number;
      wifiSSID?: string;
    }>;
  }> {
    const { data } = await axios.get(`${API_URL}/${id}/registros-ponto`, {
      params: {
        dataInicio: dataInicio.toISOString(),
        dataFim: dataFim.toISOString(),
      },
    });
    return data;
  },
}; 