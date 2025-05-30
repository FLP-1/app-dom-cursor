import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import { s1202Schema, S1202Schema } from '@/schemas/esocial/S1202Schema';
import { useEsocialApi } from '@/hooks/useEsocialApi';

export const useS1202Form = (initialData?: Partial<S1202Schema>) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { createEvent, updateEvent } = useEsocialApi();

  const methods = useForm<S1202Schema>({
    resolver: zodResolver(s1202Schema),
    defaultValues: {
      ideEvento: {
        perApur: '',
        indRetif: '1',
        indApuracao: '1',
        perApurRPPS: '',
        tpAmb: '1',
        procEmi: '1',
        verProc: '1.0',
      },
      ideEmpregador: {
        tpInsc: '1',
        nrInsc: '',
      },
      ideTrabalhador: {
        cpfTrab: '',
        nmTrab: '',
        sexo: 'M',
        racaCor: '1',
        estCiv: '1',
        grauInstr: '01',
      },
      dmDev: [],
      ...initialData,
    },
  });

  const onSubmit = async (data: S1202Schema) => {
    try {
      if (initialData) {
        await updateEvent('S-1202', data);
        enqueueSnackbar(t('messages.success.update'), { variant: 'success' });
      } else {
        await createEvent('S-1202', data);
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