/**
 * Arquivo: esocial-integration.service.ts
 * Caminho: src/services/esocial-integration.service.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Serviço de integração com o eSocial
 */

import axios from 'axios';
import { EsocialEvent, TipoEventoEsocial } from '@/types/esocial';

export interface EsocialConfig {
  ambiente: 'PRODUCAO' | 'HOMOLOGACAO';
  certificado: string;
  senha: string;
  empresa: {
    cnpj: string;
    razaoSocial: string;
    nomeFantasia: string;
    endereco: {
      logradouro: string;
      numero: string;
      complemento?: string;
      bairro: string;
      cidade: string;
      estado: string;
      cep: string;
    };
  };
}

export interface EsocialResponse {
  protocolo: string;
  dataEnvio: Date;
  dataProcessamento?: Date;
  status: string;
  mensagem?: string;
  erros?: Array<{
    codigo: string;
    descricao: string;
  }>;
}

export const EsocialIntegrationService = {
  async configurar(config: EsocialConfig): Promise<void> {
    await axios.post('/api/esocial/config', config);
  },

  async obterConfig(): Promise<EsocialConfig> {
    const { data } = await axios.get<EsocialConfig>('/api/esocial/config');
    return data;
  },

  async enviarEvento(evento: EsocialEvent): Promise<EsocialResponse> {
    const { data } = await axios.post<EsocialResponse>(`/api/esocial/enviar/${evento.id}`);
    return data;
  },

  async consultarEvento(evento: EsocialEvent): Promise<EsocialResponse> {
    const { data } = await axios.get<EsocialResponse>(`/api/esocial/consultar/${evento.id}`);
    return data;
  },

  async consultarLote(protocolo: string): Promise<EsocialResponse> {
    const { data } = await axios.get<EsocialResponse>(`/api/esocial/consultar-lote/${protocolo}`);
    return data;
  },

  async consultarRecibo(recibo: string): Promise<EsocialResponse> {
    const { data } = await axios.get<EsocialResponse>(`/api/esocial/consultar-recibo/${recibo}`);
    return data;
  },

  async consultarStatus(): Promise<{
    status: string;
    mensagem: string;
    ultimaConsulta?: Date;
  }> {
    const { data } = await axios.get('/api/esocial/status');
    return data;
  },

  async consultarVersao(): Promise<{
    versao: string;
    data: Date;
  }> {
    const { data } = await axios.get('/api/esocial/versao');
    return data;
  },

  async consultarWsdl(): Promise<{
    wsdl: string;
    data: Date;
  }> {
    const { data } = await axios.get('/api/esocial/wsdl');
    return data;
  },

  async consultarXsd(tipo: TipoEventoEsocial): Promise<{
    xsd: string;
    data: Date;
  }> {
    const { data } = await axios.get(`/api/esocial/xsd/${tipo}`);
    return data;
  },

  async consultarManifestacao(protocolo: string): Promise<{
    manifestacao: string;
    data: Date;
  }> {
    const { data } = await axios.get(`/api/esocial/manifestacao/${protocolo}`);
    return data;
  },

  async consultarInconsistencia(protocolo: string): Promise<{
    inconsistencia: string;
    data: Date;
  }> {
    const { data } = await axios.get(`/api/esocial/inconsistencia/${protocolo}`);
    return data;
  },

  async consultarErro(protocolo: string): Promise<{
    erro: string;
    data: Date;
  }> {
    const { data } = await axios.get(`/api/esocial/erro/${protocolo}`);
    return data;
  },

  async consultarAviso(protocolo: string): Promise<{
    aviso: string;
    data: Date;
  }> {
    const { data } = await axios.get(`/api/esocial/aviso/${protocolo}`);
    return data;
  },

  async consultarAlerta(protocolo: string): Promise<{
    alerta: string;
    data: Date;
  }> {
    const { data } = await axios.get(`/api/esocial/alerta/${protocolo}`);
    return data;
  },

  async consultarOcorrencia(protocolo: string): Promise<{
    ocorrencia: string;
    data: Date;
  }> {
    const { data } = await axios.get(`/api/esocial/ocorrencia/${protocolo}`);
    return data;
  },
}; 
