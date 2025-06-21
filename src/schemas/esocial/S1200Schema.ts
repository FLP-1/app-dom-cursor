/**
 * Arquivo: S1200Schema.ts
 * Caminho: src/schemas/esocial/S1200Schema.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Schema para o evento S-1200
 */

import { z } from 'zod';

export const S1200Schema = z.object({
  cpf: z.string().length(11).regex(/^\d+$/),
  competencia: z.date(),
  valorTotal: z.number().min(0),
  valorBaseINSS: z.number().min(0),
  valorBaseIRRF: z.number().min(0),
  valorBaseFGTS: z.number().min(0),
  valorFGTS: z.number().min(0),
  valorINSS: z.number().min(0),
  valorIRRF: z.number().min(0),
  valorOutrasEntidades: z.number().min(0).optional(),
  valorOutrasDeducoes: z.number().min(0).optional(),
  valorLiquido: z.number().min(0),
  observacao: z.string().max(1000).optional(),
  itensRemuneracao: z.array(z.object({
    codigo: z.string().min(1).max(30),
    descricao: z.string().min(1).max(100),
    valor: z.number().min(0)
  })).optional()
}); 
