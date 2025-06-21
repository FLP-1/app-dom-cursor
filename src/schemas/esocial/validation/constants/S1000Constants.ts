/**
 * Arquivo: S1000Constants.ts
 * Caminho: src/schemas/esocial/validation/constants/S1000Constants.ts
 * Criado em: 2025-06-02
 * Última atualização: 2025-06-13
 * Descrição: Constantes para validação do evento S1000
 */

// Constantes para validação do evento S1000
export const INDICADOR_OPTANTE_REGISTRO_ELETRONICO = {
  SIM: 'S',
  NAO: 'N'
};

export const INDICADOR_ENTIDADE_EDUCACIONAL = {
  SIM: 'S',
  NAO: 'N'
};

export const INDICADOR_ETT = {
  SIM: 'S',
  NAO: 'N'
};

export const INDICADOR_ACORDO_ISENCAO_MULTA = {
  SIM: 'S',
  NAO: 'N'
};

export const SITUACAO_PJ = {
  ATIVA: 'A',
  SUSPENSA: 'S',
  INAPTA: 'I'
};

export const INDICADOR_CONTRIBUINTE_APROVADO = {
  SIM: 'S',
  NAO: 'N'
};

export const TIPO_INSCRICAO = {
  CNPJ: 'CNPJ',
  CPF: 'CPF',
  CEI: 'CEI'
};

export const INDICADOR_RPPS = {
  SIM: 'S',
  NAO: 'N'
};

export const INDICADOR_SUBTETO = {
  SIM: 'S',
  NAO: 'N'
};

export const CLASSIFICACAO_TRIBUTARIA = {
  EMPRESA_INSCRITA_NO_CNPJ: '01',
  EMPRESA_INSCRITA_NO_CEI: '02',
  EMPRESA_INSCRITA_NO_CPF: '03',
  ORGAO_PUBLICO: '04',
  AUTONOMO: '05',
  COOPERATIVA: '06',
  EMPRESA_ESTRANGEIRA: '07',
  OUTROS: '99'
};

export const INDICADOR_COOPERATIVA = {
  SIM: 'S',
  NAO: 'N'
};

export const INDICADOR_CONSTRUTORA = {
  SIM: 'S',
  NAO: 'N'
};

export const INDICADOR_DESFOLHA = {
  SIM: 'S',
  NAO: 'N'
};

export const INDICADOR_OPCAO_CP = {
  SIM: 'S',
  NAO: 'N'
};

export const INDICADOR_PORTE = {
  MICRO_EMPRESA: '01',
  PEQUENA_EMPRESA: '02',
  MEDIA_EMPRESA: '03',
  GRANDE_EMPRESA: '04',
  NAO_APLICAVEL: '05'
};

export const S1000Constants = {
  INDICADOR_OPTANTE_REGISTRO_ELETRONICO,
  INDICADOR_ENTIDADE_EDUCACIONAL,
  INDICADOR_ETT,
  INDICADOR_ACORDO_ISENCAO_MULTA,
  SITUACAO_PJ,
  INDICADOR_CONTRIBUINTE_APROVADO,
  TIPO_INSCRICAO,
  INDICADOR_RPPS,
  INDICADOR_SUBTETO,
  CLASSIFICACAO_TRIBUTARIA,
  INDICADOR_COOPERATIVA,
  INDICADOR_CONSTRUTORA,
  INDICADOR_DESFOLHA,
  INDICADOR_OPCAO_CP,
  INDICADOR_PORTE
}; 
