/**
 * Arquivo: types.ts
 * Caminho: src/hooks/esocial/types.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { z } from 'zod';
import { TipoEvento } from '@/types/esocial';

export const esocialEventSchema = z.object({
  tipo: z.object({
    codigo: z.string(),
    descricao: z.string()
  }),
  dataEvento: z.date(),
  payload: z.object({}).refine((data) => {
    const tipo = data.tipo as TipoEvento;
    if (tipo.codigo === 'S2200') {
      return S2200Schema.safeParse(data).success;
    }
    // ... outros tipos de evento
    return false;
  }, 'Dados inválidos para o tipo de evento')
});

export type EsocialEventFormValues = z.infer<typeof esocialEventSchema>; 
