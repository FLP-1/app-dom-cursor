/**
 * Arquivo: VinculoPontoFormTypes.ts
 * Caminho: src/components/forms/vinculo-ponto/VinculoPontoFormTypes.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Tipos e schema de validação para o formulário de vínculo ponto.
 */

import { z } from 'zod';

export enum TipoVinculoPonto {
  ENTRADA = 'ENTRADA',
  SAIDA = 'SAIDA',
  ALMOCO = 'ALMOCO',
  OUTRO = 'OUTRO'
}

export const vinculoPontoFormSchema = z.object({
  tipo: z.nativeEnum(TipoVinculoPonto, {
    required_error: 'Tipo é obrigatório'
  }),
  data: z.date({
    required_error: 'Data é obrigatória'
  }),
  hora: z.string().min(1, 'Hora é obrigatória'),
  ativo: z.boolean().default(true),
  observacoes: z.string().optional()
});

export type VinculoPontoFormData = z.infer<typeof vinculoPontoFormSchema>;

export interface VinculoPontoFormProps {
  initialValues?: Partial<VinculoPontoFormData>;
  onSubmit?: (data: VinculoPontoFormData) => void;
  onCancel?: () => void;
  loading?: boolean;
} 