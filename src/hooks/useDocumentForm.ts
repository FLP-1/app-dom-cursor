/**
 * Arquivo: useDocumentForm.ts
 * Caminho: src/hooks/useDocumentForm.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Document, TipoDocumentoEsocial } from '@prisma/client';
import { DocumentService } from '@/services/DocumentService';
import { useNotification } from '@/hooks/useNotification';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const documentSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  tipo: z.nativeEnum(TipoDocumentoEsocial, {
    required_error: 'Tipo é obrigatório',
  }),
  url: z.string().min(1, 'URL é obrigatória'),
  dataValidade: z.string().optional(),
  empregadoDomesticoId: z.string().optional(),
  esocialEventId: z.string().optional(),
  isPublic: z.boolean().default(false),
});

type DocumentFormData = z.infer<typeof documentSchema>;

interface UseDocumentFormProps {
  document?: Document;
  onSuccess?: () => void;
}

export function useDocumentForm({ document, onSuccess }: UseDocumentFormProps = {}) {
  const { t } = useTranslation();
  const router = useRouter();
  const { showNotification } = useNotification();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DocumentFormData>({
    resolver: zodResolver(documentSchema),
    defaultValues: document || {
      nome: '',
      tipo: undefined,
      url: '',
      dataValidade: '',
      empregadoDomesticoId: '',
      esocialEventId: '',
      isPublic: false,
    },
  });

  const onSubmit = async (data: DocumentFormData) => {
    try {
      if (document) {
        await DocumentService.update(document.id, data);
        showNotification({
          type: 'success',
          message: t('document.messages.updateSuccess'),
        });
      } else {
        await DocumentService.create(data);
        showNotification({
          type: 'success',
          message: t('document.messages.createSuccess'),
        });
      }

      onSuccess?.();
      router.push('/documents');
    } catch (error) {
      console.error('Erro ao salvar documento:', error);
      showNotification({
        type: 'error',
        message: t('document.messages.error'),
      });
    }
  };

  const handleDelete = async () => {
    if (!document) return;

    try {
      await DocumentService.delete(document.id);
      showNotification({
        type: 'success',
        message: t('document.messages.deleteSuccess'),
      });
      router.push('/documents');
    } catch (error) {
      console.error('Erro ao excluir documento:', error);
      showNotification({
        type: 'error',
        message: t('document.messages.deleteError'),
      });
    }
  };

  return {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    reset,
    onSubmit,
    handleDelete,
  };
} 
