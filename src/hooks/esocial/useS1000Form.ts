/**
 * Arquivo: useS1000Form.ts
 * Caminho: src/hooks/esocial/useS1000Form.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import { s1000Schema, S1000Schema } from '@/schemas/esocial/S1000Schema';
import { useEsocialApi } from '@/hooks/useEsocialApi';

export const useS1000Form = (initialData?: Partial<S1000Schema>) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { createEvent, updateEvent } = useEsocialApi();

  const methods = useForm<S1000Schema>({
    resolver: zodResolver(s1000Schema),
    defaultValues: {
      ideEmpregador: {
        tpInsc: '1',
        nrInsc: '',
        iniValid: '',
      },
      infoCadastro: {
        classTrib: '01',
        indCoop: '0',
        indConstr: '0',
        indDesFolha: '0',
        indOpcCP: '0',
        indPorte: '0',
        indOptRegEletron: '0',
        indEntEd: 'N',
        indEtt: 'N',
        indAcordoIsenMulta: '0',
        sitPJ: '0',
      },
      ...initialData,
    },
  });

  const onSubmit = async (data: S1000Schema) => {
    try {
      if (initialData) {
        await updateEvent('S-1000', data);
        enqueueSnackbar(t('messages.success.update'), { variant: 'success' });
      } else {
        await createEvent('S-1000', data);
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
