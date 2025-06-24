/**
 * Arquivo: DocumentFormTypes.ts
 * Caminho: src/components/forms/documentos/DocumentFormTypes.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-01-27
 * Descrição: Tipos e schema de validação para o formulário de documentos.
 */

import { z } from 'zod';
import { TipoDocumentoEsocial } from '@prisma/client';
import { documentMessages as documentosMessages } from '@/i18n/messages/document.messages';

export const documentFormSchema = z.object({
  nome: z.string()
    .min(3, documentosMessages.validation.nome.minLength)
    .max(100, documentosMessages.validation.nome.maxLength),
  tipo: z.nativeEnum(TipoDocumentoEsocial, {
    required_error: documentosMessages.validation.tipo.required,
  }),
  url: z.string()
    .min(1, documentosMessages.validation.url.required)
    .url(documentosMessages.validation.url.invalid),
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
