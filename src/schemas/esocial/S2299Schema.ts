import { z } from 'zod';

export const S2299Schema = z.object({
  cpf: z.string().length(11).regex(/^\d+$/),
  dataDesligamento: z.date(),
  motivoDesligamento: z.string().min(1).max(100),
  observacao: z.string().max(1000).optional()
}); 