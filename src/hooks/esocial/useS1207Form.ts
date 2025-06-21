/**
 * Arquivo: useS1207Form.ts
 * Caminho: src/hooks/esocial/useS1207Form.ts
 * Criado em: 2025-06-05
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import { S1207Schema } from '@/schemas/esocial/S1207Schema';
import { useEsocialApi } from '@/hooks/useEsocialApi';

export const useS1207Form = (initialData?: Partial<typeof S1207Schema._type>) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { createEvent, updateEvent } = useEsocialApi();

  const methods = useForm<typeof S1207Schema._type>({
    resolver: zodResolver(S1207Schema),
    defaultValues: {
      cpf: '',
      dataInicioBeneficio: undefined,
      tipoBeneficio: undefined,
      valorBeneficio: undefined,
      dataFimBeneficio: undefined,
      motivoFimBeneficio: '',
      observacao: '',
      ...initialData,
    },
  });

  const onSubmit = async (data: typeof S1207Schema._type) => {
    try {
      if (initialData) {
        await updateEvent('S-1207', data);
        enqueueSnackbar(t('messages.success.update'), { variant: 'success' });
      } else {
        await createEvent('S-1207', data);
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
