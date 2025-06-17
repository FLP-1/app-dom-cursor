/**
 * Arquivo: S2400Schema.ts
 * Caminho: src/schemas/esocial/S2400Schema.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Schema para o evento S-2400
 */

import { z } from 'zod';

export const S2400Schema = z.object({
  cpf: z.string().length(11).regex(/^\d+$/),
  dataInicioBeneficio: z.date(),
  tipoBeneficio: z.string().min(1).max(2),
  tiposBeneficio: {
    '01': 'Aposentadoria por Idade',
    '02': 'Aposentadoria por Invalidez',
    '03': 'Aposentadoria por Tempo de Contribuição',
    '04': 'Aposentadoria Especial',
    '05': 'Auxílio-Doença',
    '06': 'Auxílio-Acidente',
    '07': 'Auxílio-Reclusão',
    '08': 'Pensão por Morte',
    '09': 'Salário-Maternidade',
    '10': 'Salário-Família',
    '11': 'Auxílio-Inclusão',
    '12': 'BPC/LOAS'
  },
  valorBeneficio: z.number().min(0),
  dataFimBeneficio: z.date().optional(),
  motivoFimBeneficio: z.string().max(100).optional(),
  observacao: z.string().max(1000).optional()
}); 
