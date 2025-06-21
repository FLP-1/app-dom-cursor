/**
 * Arquivo: useEsocialEventForm.ts
 * Caminho: src/hooks/esocial/useEsocialEventForm.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useNotification } from '@/hooks/useNotification';
import { EsocialEvent } from '@/types/esocial';
import { esocialEventSchema, EsocialEventFormValues } from '@/hooks/esocial/types';
import { loadEvent, updateEventStatus, createNewEvent } from '@/hooks/esocial/utils';

export function useEsocialEventForm(eventId?: string) {
  const { t } = useTranslation();
  const router = useRouter();
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState<EsocialEvent | null>(null);

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

  const loadEventData = useCallback(async () => {
    if (!eventId) return;

    try {
      setLoading(true);
      const data = await loadEvent(eventId);
      setEvent(data);
      reset(data);
    } catch {
      showNotification({
        type: 'error',
        message: t('esocial.messages.erroCarregarEvento')
      });
    } finally {
      setLoading(false);
    }
  }, [eventId, reset, t, showNotification]);

  useEffect(() => {
    loadEventData();
  }, [loadEventData]);

  const onSubmit = useCallback(
    async (data: EsocialEventFormValues) => {
      try {
        setLoading(true);
        if (eventId) {
          await updateEventStatus(eventId, 'PENDENTE');
          showNotification({
            type: 'success',
            message: t('messages:esocial.event.updated')
          });
        } else {
          await createNewEvent(data);
          showNotification({
            type: 'success',
            message: t('messages:esocial.event.created')
          });
        }
        router.push('/esocial/eventos');
      } catch {
        showNotification({
          type: 'error',
          message: t('messages:esocial.event.error')
        });
      } finally {
        setLoading(false);
      }
    },
    [eventId, showNotification, t, router]
  );

  const enviarEvento = useCallback(
    async (eventId: string) => {
      try {
        await updateEventStatus(eventId, 'ENVIADO');
        showNotification({
          type: 'success',
          message: t('messages:esocial.event.sent')
        });
      } catch {
        showNotification({
          type: 'error',
          message: t('messages:esocial.event.sendError')
        });
      }
    },
    [showNotification, t]
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
    loading,
  };
} 
