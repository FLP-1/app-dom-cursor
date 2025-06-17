/**
 * Arquivo: S2399Schema.ts
 * Caminho: src/schemas/esocial/S2399Schema.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Schema para o evento S-2399
 */

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
