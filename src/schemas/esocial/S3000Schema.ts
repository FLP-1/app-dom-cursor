/**
 * Arquivo: S3000Schema.ts
 * Caminho: src/schemas/esocial/S3000Schema.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Schema para o evento S-3000
 */

import { z } from 'zod';
import { TipoEventoEsocial } from '@/types/esocial';

export const S3000Schema = z.object({
  tipoEventoExcluido: z.nativeEnum(TipoEventoEsocial),
  protocoloEventoExcluido: z.string().min(1).max(50),
  dataExclusao: z.date(),
  justificativa: z.string().min(15).max(1000),
  observacao: z.string().max(1000).optional()
}); 
