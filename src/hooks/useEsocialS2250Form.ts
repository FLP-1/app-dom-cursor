import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEsocialEvent } from './useEsocialEvent';
import { S2250Schema } from '@/schemas/esocial/S2250Schema';
import { useSnackbar } from 'notistack';

export const useEsocialS2250Form = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { createEvent, updateEvent, loading, error } = useEsocialEvent();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(S2250Schema),
    defaultValues: {
      payload: {
        cpf: '',
        dataAviso: new Date(),
        dataInicioAviso: new Date(),
        dataFimAviso: new Date(),
        tipoAviso: '1',
        codigoMotivoAviso: '',
        motivoAviso: '',
        dataDesligamento: new Date(),
        indenizacao: {
          valor: 0,
          dataPagamento: new Date()
        },
        observacao: ''
      }
    }
  });

  const onSubmit = async (data: any) => {
    try {
      const eventData = {
        tipo: 'S2250',
        payload: data.payload
      };

      if (router.query.id) {
        await updateEvent(router.query.id as string, eventData);
        enqueueSnackbar(t('esocial:messages.eventoAtualizado'), { variant: 'success' });
      } else {
        await createEvent(eventData);
        enqueueSnackbar(t('esocial:messages.eventoCriado'), { variant: 'success' });
      }

      router.push('/esocial/eventos');
    } catch (err) {
      enqueueSnackbar(t('esocial:messages.erroSalvarEvento'), { variant: 'error' });
    }
  };

  return {
    control,
    handleSubmit,
    errors,
    loading,
    error,
    onSubmit: handleSubmit(onSubmit),
    reset
  };
}; 