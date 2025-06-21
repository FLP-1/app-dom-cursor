/**
 * Arquivo: S2299Schema.ts
 * Caminho: src/schemas/esocial/S2299Schema.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Schema para o evento S-2299
 */

import { z } from 'zod';

export const S2299Schema = z.object({
  cpf: z.string().length(11).regex(/^\d+$/),
  dataDesligamento: z.date(),
  motivoDesligamento: z.string().min(1).max(100),
  observacao: z.string().max(1000).optional()
}); 
