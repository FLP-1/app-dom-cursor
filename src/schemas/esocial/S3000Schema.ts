import { z } from 'zod';
import { TipoEventoEsocial } from '@/types/esocial';

export const S3000Schema = z.object({
  tipoEventoExcluido: z.nativeEnum(TipoEventoEsocial),
  protocoloEventoExcluido: z.string().min(1).max(50),
  dataExclusao: z.date(),
  justificativa: z.string().min(15).max(1000),
  observacao: z.string().max(1000).optional()
}); 