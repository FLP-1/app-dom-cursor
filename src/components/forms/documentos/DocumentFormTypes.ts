/**
 * Arquivo: DocumentFormTypes.ts
 * Caminho: src/components/forms/documentos/DocumentFormTypes.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Tipos e schema de validação para o formulário de documentos.
 */

import { z } from 'zod';
import { TipoDocumentoEsocial } from '@prisma/client';

export const documentFormSchema = z.object({
  nome: z.string()
    .min(3, 'O nome deve ter no mínimo 3 caracteres')
    .max(100, 'O nome deve ter no máximo 100 caracteres'),
  tipo: z.nativeEnum(TipoDocumentoEsocial, {
    required_error: 'O tipo do documento é obrigatório',
  }),
  url: z.string()
    .min(1, 'A URL é obrigatória')
    .url('URL inválida'),
  dataValidade: z.string().optional(),
  isPublic: z.boolean().default(false),
});

export type DocumentFormData = z.infer<typeof documentFormSchema>;

export interface DocumentFormProps {
  initialValues?: Partial<DocumentFormData>;
  onSubmit?: (data: DocumentFormData) => Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
} 