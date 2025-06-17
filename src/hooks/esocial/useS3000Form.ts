/**
 * Arquivo: useS3000Form.ts
 * Caminho: src/hooks/esocial/useS3000Form.ts
 * Criado em: 2025-06-05
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import { S3000Schema } from '@/schemas/esocial/S3000Schema';
import { useEsocialApi } from '@/hooks/useEsocialApi';

export const useS3000Form = (initialData?: Partial<typeof S3000Schema._type>) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { createEvent, updateEvent } = useEsocialApi();

  const methods = useForm<typeof S3000Schema._type>({
    resolver: zodResolver(S3000Schema),
    defaultValues: {
      tipoEventoExcluido: undefined,
      protocoloEventoExcluido: '',
      dataExclusao: undefined,
      justificativa: '',
      observacao: '',
      ...initialData,
    },
  });

  const onSubmit = async (data: typeof S3000Schema._type) => {
    try {
      if (initialData) {
        await updateEvent('S-3000', data);
        enqueueSnackbar(t('messages.success.update'), { variant: 'success' });
      } else {
        await createEvent('S-3000', data);
        enqueueSnackbar(t('messages.success.create'), { variant: 'success' });
      }
      router.push('/esocial/events');
    } catch (error) {
      enqueueSnackbar(t('messages.error.generic'), { variant: 'error' });
    }
  };

  return {
    methods,
    onSubmit: methods.handleSubmit(onSubmit),
  };
}; 
