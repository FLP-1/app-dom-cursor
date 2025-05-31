export const TIPO_INSCRICAO = {
  CNPJ: '1',
  CPF: '2',
  CAEPF: '3',
  CNO: '4',
} as const;

export const CLASSIFICACAO_TRIBUTARIA = {
  '01': 'Empresa enquadrada no regime geral de tributação',
  '02': 'Empresa enquadrada no regime de tributação Simples Nacional',
  '03': 'Empresa enquadrada no regime de tributação Simples Nacional - excesso de sublimite de receita bruta',
  '04': 'Empresa enquadrada no regime de tributação Simples Nacional - excesso de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços',
  '05': 'Empresa enquadrada no regime de tributação Simples Nacional - excesso de sublimite relativo à receita bruta de serviços',
  '06': 'Empresa enquadrada no regime de tributação Simples Nacional - excesso de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta',
  '07': 'Empresa enquadrada no regime de tributação Simples Nacional - excesso de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços',
  '08': 'Empresa enquadrada no regime de tributação Simples Nacional - excesso de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta',
  '09': 'Empresa enquadrada no regime de tributação Simples Nacional - excesso de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços',
  '10': 'Empresa enquadrada no regime de tributação Simples Nacional - excesso de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta',
  '11': 'Empresa enquadrada no regime de tributação Simples Nacional - excesso de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços',
  '12': 'Empresa enquadrada no regime de tributação Simples Nacional - excesso de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta',
  '13': 'Empresa enquadrada no regime de tributação Simples Nacional - excesso de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços',
  '14': 'Empresa enquadrada no regime de tributação Simples Nacional - excesso de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta',
  '15': 'Empresa enquadrada no regime de tributação Simples Nacional - excesso de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços',
  '16': 'Empresa enquadrada no regime de tributação Simples Nacional - excesso de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta',
  '17': 'Empresa enquadrada no regime de tributação Simples Nacional - excesso de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços',
  '18': 'Empresa enquadrada no regime de tributação Simples Nacional - excesso de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta',
  '19': 'Empresa enquadrada no regime de tributação Simples Nacional - excesso de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços',
  '20': 'Empresa enquadrada no regime de tributação Simples Nacional - excesso de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta e de sublimite relativo à receita bruta de serviços e de sublimite de receita bruta',
} as const;

export const INDICADOR_COOPERATIVA = {
  NAO_COOPERATIVA: '0',
  COOPERATIVA_TRABALHO: '1',
  COOPERATIVA_PRODUCAO: '2',
} as const;

export const INDICADOR_CONSTRUTORA = {
  NAO_CONSTRUTORA: '0',
  CONSTRUTORA: '1',
} as const;

export const INDICADOR_DESFOLHA = {
  NAO_DESFOLHA: '0',
  DESFOLHA: '1',
} as const;

export const INDICADOR_OPCAO_CP = {
  NAO_OPTANTE: '0',
  OPTANTE: '1',
} as const;

export const INDICADOR_PORTE = {
  NAO_INFORMADO: '0',
  MICROEMPRESA: '1',
  EPP: '2',
  DEMAIS: '3',
  MEDIO_PORTE: '4',
  GRANDE_PORTE: '5',
} as const;

export const INDICADOR_OPTANTE_REGISTRO_ELETRONICO = {
  NAO_OPTANTE: '0',
  OPTANTE: '1',
} as const;

export const INDICADOR_ENTIDADE_EDUCACIONAL = {
  NAO: 'N',
  SIM: 'S',
} as const;

export const INDICADOR_ETT = {
  NAO: 'N',
  SIM: 'S',
} as const;

export const INDICADOR_ACORDO_ISENCAO_MULTA = {
  NAO: '0',
  SIM: '1',
} as const;

export const SITUACAO_PJ = {
  NAO: '0',
  SIM: '1',
} as const;

export const INDICADOR_CONTRIBUINTE_APROVADO = {
  NAO: 'N',
  SIM: 'S',
} as const;

export const INDICADOR_RPPS = {
  NAO: 'N',
  SIM: 'S',
} as const;

export const INDICADOR_SUBTETO = {
  NAO: 'N',
  SIM: 'S',
} as const; 