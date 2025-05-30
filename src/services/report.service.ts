import axios from 'axios';

export enum TipoRelatorio {
  PONTO = 'PONTO',
  OCORRENCIA = 'OCORRENCIA',
  DOCUMENTO = 'DOCUMENTO',
  ESOCIAL = 'ESOCIAL',
  NOTIFICACAO = 'NOTIFICACAO',
  LOG = 'LOG',
}

export enum FormatoRelatorio {
  PDF = 'PDF',
  EXCEL = 'EXCEL',
  CSV = 'CSV',
}

export interface RelatorioFilter {
  tipo: TipoRelatorio;
  formato: FormatoRelatorio;
  dataInicio: Date;
  dataFim: Date;
  empregadoDomesticoId?: string;
  usuarioId?: string;
  categoria?: string;
}

export const ReportService = {
  async gerarRelatorio(filter: RelatorioFilter): Promise<Blob> {
    const { data } = await axios.post('/api/relatorio', filter, {
      responseType: 'blob',
    });
    return data;
  },

  async gerarRelatorioPonto(
    empregadoDomesticoId: string,
    dataInicio: Date,
    dataFim: Date,
    formato: FormatoRelatorio
  ): Promise<Blob> {
    const { data } = await axios.post(
      '/api/relatorio/ponto',
      {
        empregadoDomesticoId,
        dataInicio,
        dataFim,
        formato,
      },
      {
        responseType: 'blob',
      }
    );
    return data;
  },

  async gerarRelatorioOcorrencia(
    empregadoDomesticoId: string,
    dataInicio: Date,
    dataFim: Date,
    formato: FormatoRelatorio
  ): Promise<Blob> {
    const { data } = await axios.post(
      '/api/relatorio/ocorrencia',
      {
        empregadoDomesticoId,
        dataInicio,
        dataFim,
        formato,
      },
      {
        responseType: 'blob',
      }
    );
    return data;
  },

  async gerarRelatorioDocumento(
    empregadoDomesticoId: string,
    dataInicio: Date,
    dataFim: Date,
    formato: FormatoRelatorio
  ): Promise<Blob> {
    const { data } = await axios.post(
      '/api/relatorio/documento',
      {
        empregadoDomesticoId,
        dataInicio,
        dataFim,
        formato,
      },
      {
        responseType: 'blob',
      }
    );
    return data;
  },

  async gerarRelatorioEsocial(
    empregadoDomesticoId: string,
    dataInicio: Date,
    dataFim: Date,
    formato: FormatoRelatorio
  ): Promise<Blob> {
    const { data } = await axios.post(
      '/api/relatorio/esocial',
      {
        empregadoDomesticoId,
        dataInicio,
        dataFim,
        formato,
      },
      {
        responseType: 'blob',
      }
    );
    return data;
  },

  async gerarRelatorioNotificacao(
    usuarioId: string,
    dataInicio: Date,
    dataFim: Date,
    formato: FormatoRelatorio
  ): Promise<Blob> {
    const { data } = await axios.post(
      '/api/relatorio/notificacao',
      {
        usuarioId,
        dataInicio,
        dataFim,
        formato,
      },
      {
        responseType: 'blob',
      }
    );
    return data;
  },

  async gerarRelatorioLog(
    categoria: string,
    dataInicio: Date,
    dataFim: Date,
    formato: FormatoRelatorio
  ): Promise<Blob> {
    const { data } = await axios.post(
      '/api/relatorio/log',
      {
        categoria,
        dataInicio,
        dataFim,
        formato,
      },
      {
        responseType: 'blob',
      }
    );
    return data;
  },
}; 