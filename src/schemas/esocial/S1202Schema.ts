import { z } from 'zod';
import { cpfSchema, cnpjSchema } from '@/schemas/common';

// Schema para detVerbas
const detVerbasSchema = z.object({
  codRubr: z.string().min(1, 'Código da rubrica é obrigatório'),
  ideTabRubr: z.string().min(1, 'Identificação da tabela de rubricas é obrigatória'),
  qtdRubr: z.number().min(0, 'Quantidade deve ser maior ou igual a zero'),
  vrRubr: z.number().min(0, 'Valor deve ser maior ou igual a zero'),
  indApurIR: z.number().min(0).max(1, 'Indicador de apuração IR deve ser 0 ou 1')
});

// Schema para ideEstabLot
const ideEstabLotSchema = z.object({
  tpInsc: z.number().min(1).max(4, 'Tipo de inscrição inválido'),
  nrInsc: z.string().min(1, 'Número de inscrição é obrigatório'),
  codLotacao: z.string().min(1, 'Código da lotação é obrigatório'),
  detVerbas: z.array(detVerbasSchema).min(1, 'Pelo menos uma verba deve ser informada')
});

// Schema para infoPerApur
const infoPerApurSchema = z.object({
  ideEstabLot: z.array(ideEstabLotSchema).min(1, 'Pelo menos um estabelecimento/lotação deve ser informado')
});

// Schema para dmDev
const dmDevSchema = z.object({
  ideDmDev: z.string().min(1, 'Identificação do demonstrativo é obrigatória'),
  codCateg: z.number().min(101).max(905, 'Código da categoria inválido'),
  infoPerApur: infoPerApurSchema
});

// Schema para ideTrabalhador
const ideTrabalhadorSchema = z.object({
  cpfTrab: cpfSchema,
  nisTrab: z.string().length(11, 'NIS deve ter 11 dígitos').optional(),
  nmTrab: z.string().min(1, 'Nome do trabalhador é obrigatório'),
  sexo: z.enum(['M', 'F'], { errorMap: () => ({ message: 'Sexo deve ser M ou F' }) }),
  racaCor: z.string().min(1).max(6, 'Raça/cor inválida'),
  estCiv: z.string().min(1).max(5, 'Estado civil inválido'),
  grauInstr: z.string().length(2, 'Grau de instrução deve ter 2 dígitos'),
  nmSoc: z.string().optional()
});

// Schema para ideEmpregador
const ideEmpregadorSchema = z.object({
  tpInsc: z.number().min(1).max(4, 'Tipo de inscrição inválido'),
  nrInsc: z.string().refine(
    (val) => {
      if (val.length === 11) return cpfSchema.safeParse(val).success;
      if (val.length === 14) return cnpjSchema.safeParse(val).success;
      return false;
    },
    { message: 'Número de inscrição inválido' }
  )
});

// Schema para ideEvento
const ideEventoSchema = z.object({
  indRetif: z.string().refine(
    (val) => ['1', '2'].includes(val),
    { message: 'Indicador de retificação deve ser 1 ou 2' }
  ),
  nrRecibo: z.string().length(44, 'Número do recibo deve ter 44 caracteres').optional(),
  perApur: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Período de apuração inválido'),
  indApuracao: z.string().refine(
    (val) => ['1', '2'].includes(val),
    { message: 'Indicador de apuração deve ser 1 ou 2' }
  ),
  indGuia: z.string().refine(
    (val) => ['1', '2'].includes(val),
    { message: 'Indicador de guia deve ser 1 ou 2' }
  ),
  tpAmb: z.string().refine(
    (val) => ['1', '2'].includes(val),
    { message: 'Tipo de ambiente deve ser 1 ou 2' }
  ),
  procEmi: z.string().refine(
    (val) => ['1', '2', '3', '4', '5'].includes(val),
    { message: 'Processo de emissão inválido' }
  ),
  verProc: z.string().min(1, 'Versão do processo é obrigatória')
});

// Schema principal
export const s1202Schema = z.object({
  ideEvento: ideEventoSchema,
  ideEmpregador: ideEmpregadorSchema,
  ideTrabalhador: ideTrabalhadorSchema,
  dmDev: z.array(dmDevSchema).min(1, 'Pelo menos um demonstrativo deve ser informado')
});

export type S1202Schema = z.infer<typeof s1202Schema>; 