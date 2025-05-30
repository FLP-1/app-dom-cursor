import { z } from 'zod';

export const S1207Schema = z.object({
  cpf: z.string().length(11).regex(/^\d+$/),
  dataInicioBeneficio: z.date(),
  tipoBeneficio: z.enum([
    'AUXILIO_DOENCA',
    'AUXILIO_ACIDENTE',
    'PENSAO_MORTE',
    'AUXILIO_RECLUSAO',
    'SALARIO_MATERNIDADE',
    'SALARIO_FAMILIA',
    'BPC_LOAS',
    'OUTROS'
  ]),
  valorBeneficio: z.number().min(0),
  dataFimBeneficio: z.date().optional(),
  motivoFimBeneficio: z.string().max(1000).optional(),
  observacao: z.string().max(1000).optional()
}); 