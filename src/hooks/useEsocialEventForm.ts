import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEsocialEvent } from './useEsocialEvent';
import { TipoEvento } from '@/types/esocial';
import { S2200Schema } from '@/schemas/esocial/S2200Schema';
import { S2205Schema } from '@/schemas/esocial/S2205Schema';
import { S2206Schema } from '@/schemas/esocial/S2206Schema';
import { S2210Schema } from '@/schemas/esocial/S2210Schema';
import { S2230Schema } from '@/schemas/esocial/S2230Schema';
import { S2240Schema } from '@/schemas/esocial/S2240Schema';
import { S2250Schema } from '@/schemas/esocial/S2250Schema';
import { S2299Schema } from '@/schemas/esocial/S2299Schema';
import { S2400Schema } from '@/schemas/esocial/S2400Schema';
import { S3000Schema } from '@/schemas/esocial/S3000Schema';
import { S1200Schema } from '@/schemas/esocial/S1200Schema';
import { S1210Schema } from '@/schemas/esocial/S1210Schema';
import { S2300Schema } from '@/schemas/esocial/S2300Schema';
import { S2399Schema } from '@/schemas/esocial/S2399Schema';
import { S1207Schema } from '@/schemas/esocial/S1207Schema';

const esocialEventSchema = z.object({
  tipo: z.object({
    codigo: z.string(),
    descricao: z.string()
  }),
  dataEvento: z.date(),
  payload: z.object({}).refine((data) => {
    const tipo = data.tipo as TipoEvento;
    if (tipo.codigo === 'S2200') {
      return S2200Schema.safeParse(data).success;
    }
    if (tipo.codigo === 'S2205') {
      return S2205Schema.safeParse(data).success;
    }
    if (tipo.codigo === 'S2206') {
      return S2206Schema.safeParse(data).success;
    }
    if (tipo.codigo === 'S2210') {
      return S2210Schema.safeParse(data).success;
    }
    if (tipo.codigo === 'S2230') {
      return S2230Schema.safeParse(data).success;
    }
    if (tipo.codigo === 'S2240') {
      return S2240Schema.safeParse(data).success;
    }
    if (tipo.codigo === 'S2250') {
      return S2250Schema.safeParse(data).success;
    }
    if (tipo.codigo === 'S2299') {
      return S2299Schema.safeParse(data).success;
    }
    if (tipo.codigo === 'S2400') {
      return S2400Schema.safeParse(data).success;
    }
    if (tipo.codigo === 'S3000') {
      return S3000Schema.safeParse(data).success;
    }
    if (tipo.codigo === 'S1200') {
      return S1200Schema.safeParse(data).success;
    }
    if (tipo.codigo === 'S1210') {
      return S1210Schema.safeParse(data).success;
    }
    if (tipo.codigo === 'S2300') {
      return S2300Schema.safeParse(data).success;
    }
    if (tipo.codigo === 'S2399') {
      return S2399Schema.safeParse(data).success;
    }
    if (tipo.codigo === 'S1207') {
      return S1207Schema.safeParse(data).success;
    }
    return false;
  }, 'Dados inválidos para o tipo de evento')
});

type EsocialEventFormValues = z.infer<typeof esocialEventSchema>;

export function useEsocialEventForm(eventId?: string) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { createEvent, updateEventStatus } = useEsocialEvent();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<EsocialEventFormValues>({
    resolver: zodResolver(esocialEventSchema),
    defaultValues: {
      tipo: {
        codigo: 'S2200',
        descricao: 'Cadastramento Inicial do Vínculo'
      },
      dataEvento: new Date(),
      payload: {},
    },
  });

  const tipo = watch('tipo');

  const onSubmit = useCallback(
    async (data: EsocialEventFormValues) => {
      try {
        if (eventId) {
          await updateEventStatus(eventId, 'PENDENTE');
          enqueueSnackbar(t('messages:esocial.event.updated'), { variant: 'success' });
        } else {
          await createEvent(data);
          enqueueSnackbar(t('messages:esocial.event.created'), { variant: 'success' });
        }
        router.push('/esocial/eventos');
      } catch (error) {
        enqueueSnackbar(t('messages:esocial.event.error'), { variant: 'error' });
      }
    },
    [eventId, enqueueSnackbar, t, router, createEvent, updateEventStatus]
  );

  const enviarEvento = useCallback(
    async (eventId: string) => {
      try {
        await updateEventStatus(eventId, 'ENVIADO');
        enqueueSnackbar(t('messages:esocial.event.sent'), { variant: 'success' });
      } catch (error) {
        enqueueSnackbar(t('messages:esocial.event.sendError'), { variant: 'error' });
      }
    },
    [enqueueSnackbar, t, updateEventStatus]
  );

  return {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    reset,
    onSubmit,
    enviarEvento,
    tipo,
  };
} 