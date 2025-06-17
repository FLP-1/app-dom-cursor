/**
 * Arquivo: S1202Schema.ts
 * Caminho: src/schemas/esocial/S1202Schema.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
* Descrição: Schema para o evento S-1202 
 */

import { z } from 'zod';
import { cpfSchema, cnpjSchema } from '@/schemas/common';

// Schema para detVerbas
const detVerbasSchema = z.object({
  codRubr: z.string().min(1, { message: 's1202.detVerbas.codRubr.required' }),
  ideTabRubr: z.string().min(1, { message: 's1202.detVerbas.ideTabRubr.required' }),
  qtdRubr: z.number().min(0, { message: 's1202.detVerbas.qtdRubr.min' }),
  vrRubr: z.number().min(0, { message: 's1202.detVerbas.vrRubr.min' }),
  indApurIR: z.number().min(0).max(1, { message: 's1202.detVerbas.indApurIR.range' })
});

// Schema para ideEstabLot
const ideEstabLotSchema = z.object({
  tpInsc: z.number().min(1).max(4, { message: 's1202.ideEstabLot.tpInsc.range' }),
  nrInsc: z.string().min(1, { message: 's1202.ideEstabLot.nrInsc.required' }),
  codLotacao: z.string().min(1, { message: 's1202.ideEstabLot.codLotacao.required' }),
  detVerbas: z.array(detVerbasSchema).min(1, { message: 's1202.ideEstabLot.detVerbas.required' })
});

// Schema para infoPerApur
const infoPerApurSchema = z.object({
  ideEstabLot: z.array(ideEstabLotSchema).min(1, { message: 's1202.infoPerApur.ideEstabLot.required' })
});

// Schema para dmDev
const dmDevSchema = z.object({
  ideDmDev: z.string().min(1, { message: 's1202.dmDev.ideDmDev.required' }),
  // Validação de range de codCateg conforme tabela eSocial (exemplo: 101 a 905)
  codCateg: z.number().int().gte(101, { message: 's1202.dmDev.codCateg.range' }).lte(905, { message: 's1202.dmDev.codCateg.range' }),
  infoPerApur: infoPerApurSchema
});

// Schema para ideTrabalhador
const ideTrabalhadorSchema = z.object({
  cpfTrab: cpfSchema.refine((val) => val.length === 11, { message: 's1202.ideTrabalhador.cpfTrab.length' }),
  nisTrab: z.string().length(11, { message: 's1202.ideTrabalhador.nisTrab.length' }).optional(),
  nmTrab: z.string().min(1, { message: 's1202.ideTrabalhador.nmTrab.required' }),
  sexo: z.enum(['M', 'F'], { errorMap: () => ({ message: 's1202.ideTrabalhador.sexo.enum' }) }),
  racaCor: z.string().min(1, { message: 's1202.ideTrabalhador.racaCor.required' }).max(6, { message: 's1202.ideTrabalhador.racaCor.max' }),
  estCiv: z.string().min(1, { message: 's1202.ideTrabalhador.estCiv.required' }).max(5, { message: 's1202.ideTrabalhador.estCiv.max' }),
  grauInstr: z.string().length(2, { message: 's1202.ideTrabalhador.grauInstr.length' }),
  nmSoc: z.string().optional()
});

// Schema para ideEmpregador
const ideEmpregadorSchema = z.object({
  tpInsc: z.number().min(1).max(4, { message: 's1202.ideEmpregador.tpInsc.range' }),
  nrInsc: z.string()
}).superRefine((obj, ctx) => {
  const tpInscNum = Number(obj.tpInsc);
  const strVal = String(obj.nrInsc);
  // eslint-disable-next-line no-console
  console.log('VALIDACAO nrInsc (superRefine):', { tpInscNum, strVal });
  if (tpInscNum === 1 && strVal.length !== 14) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 's1202.ideEmpregador.nrInsc.invalid',
      path: ['nrInsc']
    });
  } else if (tpInscNum === 1 && !cnpjSchema.safeParse(strVal).success) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 's1202.ideEmpregador.nrInsc.invalid',
      path: ['nrInsc']
    });
  } else if (tpInscNum === 2 && strVal.length !== 11) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 's1202.ideEmpregador.nrInsc.invalid',
      path: ['nrInsc']
    });
  } else if (tpInscNum === 2 && !cpfSchema.safeParse(strVal).success) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 's1202.ideEmpregador.nrInsc.invalid',
      path: ['nrInsc']
    });
  } else if ((tpInscNum === 3 || tpInscNum === 4) && strVal.length < 8) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 's1202.ideEmpregador.nrInsc.invalid',
      path: ['nrInsc']
    });
  }
});

// Schema para ideEvento
const ideEventoSchema = z.object({
  indRetif: z.string().refine(
    (val) => ['1', '2'].includes(val),
    { message: 's1202.ideEvento.indRetif.enum' }
  ),
  nrRecibo: z.string().length(44, { message: 's1202.ideEvento.nrRecibo.length' }).optional(),
  perApur: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, { message: 's1202.ideEvento.perApur.format' }),
  indApuracao: z.string().refine(
    (val) => ['1', '2'].includes(val),
    { message: 's1202.ideEvento.indApuracao.enum' }
  ),
  indGuia: z.string().refine(
    (val) => ['1', '2'].includes(val),
    { message: 's1202.ideEvento.indGuia.enum' }
  ),
  tpAmb: z.string().refine(
    (val) => ['1', '2'].includes(val),
    { message: 's1202.ideEvento.tpAmb.enum' }
  ),
  procEmi: z.string().refine(
    (val) => ['1', '2', '3', '4', '5'].includes(val),
    { message: 's1202.ideEvento.procEmi.enum' }
  ),
  verProc: z.string().min(1, { message: 's1202.ideEvento.verProc.required' })
});

// Schema principal
export const s1202Schema = z.object({
  ideEvento: ideEventoSchema,
  ideEmpregador: ideEmpregadorSchema,
  ideTrabalhador: ideTrabalhadorSchema,
  dmDev: z.array(dmDevSchema)
    .min(1, { message: 's1202.dmDev.required' })
    // Validação de unicidade de ideDmDev
    .refine((arr) => {
      const set = new Set(arr.map((item) => item.ideDmDev));
      return set.size === arr.length;
    }, { message: 's1202.dmDev.ideDmDev.unique' })
});

export type S1202Schema = z.infer<typeof s1202Schema>; 
