/**
 * Arquivo: S1000Validation.ts
 * Caminho: src/schemas/esocial/validation/S1000Validation.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Validação do evento S-1000
 */

import { z } from 'zod';
import { cnpjSchema, cpfSchema } from '@/schemas/commonSchemas';
import {
  TIPO_INSCRICAO,
  CLASSIFICACAO_TRIBUTARIA,
  INDICADOR_COOPERATIVA,
  INDICADOR_CONSTRUTORA,
  INDICADOR_DESFOLHA,
  INDICADOR_OPCAO_CP,
  INDICADOR_PORTE,
  INDICADOR_OPTANTE_REGISTRO_ELETRONICO,
  INDICADOR_ENTIDADE_EDUCACIONAL,
  INDICADOR_ETT,
  INDICADOR_ACORDO_ISENCAO_MULTA,
  SITUACAO_PJ,
  INDICADOR_CONTRIBUINTE_APROVADO,
  INDICADOR_RPPS,
  INDICADOR_SUBTETO,
} from '@/schemas/esocial/validation/constants/S1000Constants';

export const ideEmpregadorSchema = z.object({
  tpInsc: z.enum([TIPO_INSCRICAO.CNPJ, TIPO_INSCRICAO.CPF, TIPO_INSCRICAO.CAEPF, TIPO_INSCRICAO.CNO]),
  nrInsc: z.string().refine((val) => {
    if (val.length !== 11 && val.length !== 14) return false;
    return true;
  }, 'Número de inscrição inválido'),
  iniValid: z.string().regex(/^\d{4}-(?:0[1-9]|1[0-2])$/, 'Formato inválido (AAAA-MM)'),
  fimValid: z.string().regex(/^\d{4}-(?:0[1-9]|1[0-2])$/, 'Formato inválido (AAAA-MM)').optional(),
});

export const infoCadastroSchema = z.object({
  classTrib: z.enum(Object.keys(CLASSIFICACAO_TRIBUTARIA) as [string, ...string[]]),
  indCoop: z.enum([INDICADOR_COOPERATIVA.NAO_COOPERATIVA, INDICADOR_COOPERATIVA.COOPERATIVA_TRABALHO, INDICADOR_COOPERATIVA.COOPERATIVA_PRODUCAO]).optional(),
  indConstr: z.enum([INDICADOR_CONSTRUTORA.NAO_CONSTRUTORA, INDICADOR_CONSTRUTORA.CONSTRUTORA]).optional(),
  indDesFolha: z.enum([INDICADOR_DESFOLHA.NAO_DESFOLHA, INDICADOR_DESFOLHA.DESFOLHA]).optional(),
  indOpcCP: z.enum([INDICADOR_OPCAO_CP.NAO_OPTANTE, INDICADOR_OPCAO_CP.OPTANTE]).optional(),
  indPorte: z.enum([
    INDICADOR_PORTE.NAO_INFORMADO,
    INDICADOR_PORTE.MICROEMPRESA,
    INDICADOR_PORTE.EPP,
    INDICADOR_PORTE.DEMAIS,
    INDICADOR_PORTE.MEDIO_PORTE,
    INDICADOR_PORTE.GRANDE_PORTE,
  ]).optional(),
  indOptRegEletron: z.enum([INDICADOR_OPTANTE_REGISTRO_ELETRONICO.NAO_OPTANTE, INDICADOR_OPTANTE_REGISTRO_ELETRONICO.OPTANTE]).optional(),
  indEntEd: z.enum([INDICADOR_ENTIDADE_EDUCACIONAL.NAO, INDICADOR_ENTIDADE_EDUCACIONAL.SIM]).optional(),
  indEtt: z.enum([INDICADOR_ETT.NAO, INDICADOR_ETT.SIM]).optional(),
  nrRegEtt: z.string().max(30).optional(),
  indAcordoIsenMulta: z.enum([INDICADOR_ACORDO_ISENCAO_MULTA.NAO, INDICADOR_ACORDO_ISENCAO_MULTA.SIM]).optional(),
  sitPJ: z.enum([SITUACAO_PJ.NAO, SITUACAO_PJ.SIM]).optional(),
  contApr: z.object({
    nrProcJud: z.string().max(20),
    contEntEd: z.enum([INDICADOR_CONTRIBUINTE_APROVADO.NAO, INDICADOR_CONTRIBUINTE_APROVADO.SIM]),
    infoEntMe: z.object({
      tpInsc: z.enum([TIPO_INSCRICAO.CNPJ, '4']), // 1-CNPJ, 4-CEI
      nrInsc: z.string().max(14),
    }).optional(),
  }).optional(),
});

export const dadosIsencaoSchema = z.object({
  ideMinLei: z.string().max(120),
  nrCertif: z.string().max(40),
  dtEmisCertif: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato inválido (AAAA-MM-DD)'),
  dtVencCertif: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato inválido (AAAA-MM-DD)'),
  nrProtRenov: z.string().max(40).optional(),
  dtProtRenov: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato inválido (AAAA-MM-DD)').optional(),
  dtDou: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato inválido (AAAA-MM-DD)').optional(),
  pagDou: z.string().max(5).optional(),
});

export const infoOPSchema = z.object({
  infoEFR: z.object({
    ideEFR: z.string().max(30),
    cnpjEFR: z.string().length(14),
    indSit: z.enum(['1', '2']), // 1-Ativo, 2-Inativo
  }),
  infoEnte: z.object({
    nmEnte: z.string().max(100),
    uf: z.string().length(2),
    codMunic: z.string().length(7),
    indRPPS: z.enum([INDICADOR_RPPS.NAO, INDICADOR_RPPS.SIM]),
    subteto: z.enum([INDICADOR_SUBTETO.NAO, INDICADOR_SUBTETO.SIM]),
    subtetoDec: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato inválido (AAAA-MM-DD)').optional(),
  }),
});

export const infoOrgInternacionalSchema = z.object({
  indAcordoIsenMulta: z.enum([INDICADOR_ACORDO_ISENCAO_MULTA.NAO, INDICADOR_ACORDO_ISENCAO_MULTA.SIM]),
}); 
