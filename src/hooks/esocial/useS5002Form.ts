/**
 * Arquivo: useS5002Form.ts
 * Caminho: src/hooks/esocial/useS5002Form.ts
 * Criado em: 2025-06-05
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import { S5002Schema } from '@/schemas/esocial/S5002Schema';
import { useEsocialApi } from '@/hooks/useEsocialApi';

export const useS5002Form = (initialData?: Partial<typeof S5002Schema._type>) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { createEvent, updateEvent } = useEsocialApi();

  const methods = useForm<typeof S5002Schema._type>({
    resolver: zodResolver(S5002Schema),
    defaultValues: {
      campoExemplo: '',
      ...initialData,
    },
  });

  const onSubmit = async (data: typeof S5002Schema._type) => {
    try {
      if (initialData) {
        await updateEvent('S-5002', data);
        enqueueSnackbar(t('messages.success.update'), { variant: 'success' });
      } else {
        await createEvent('S-5002', data);
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
