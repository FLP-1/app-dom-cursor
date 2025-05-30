import { z } from 'zod';

export const S2399Schema = z.object({
  cpf: z.string().length(11).regex(/^\d+$/),
  dataDesligamento: z.date(),
  motivoDesligamento: z.enum([
    'TERMINO_CONTRATO',
    'RESCISAO_CONTRATO',
    'MUDANCA_EMPREGADOR',
    'FALECIMENTO',
    'OUTROS'
  ]),
  observacao: z.string().max(1000).optional()
}); 