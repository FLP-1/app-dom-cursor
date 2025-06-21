/**
 * Arquivo: useEsocialEventForm.ts
 * Caminho: src/hooks/forms/useEsocialEventForm.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Hook customizado para lógica, validação e submit do formulário de evento do eSocial, com carregamento de tipos, busca por ID e validação de datas.
 */

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { EsocialEvent, EsocialEventType } from '@/types/esocial-event';
import { EsocialEventService } from '@/services/esocial-event.service';
import { useTranslation } from 'react-i18next';
import { MESSAGES } from '@/i18n/messages';

interface UseEsocialEventFormProps {
  id?: string;
}

export function useEsocialEventForm(props?: UseEsocialEventFormProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [eventTypes, setEventTypes] = useState<EsocialEventType[]>([]);

  const methods = useForm<EsocialEvent>({
    mode: 'onChange',
    defaultValues: {
      type: '',
      status: 'DRAFT',
      data: {}
    }
  });

  useEffect(() => {
    loadEventTypes();
    if (props?.id) {
      loadEvent();
    }
  }, [props?.id]);

  const loadEventTypes = async () => {
    try {
      const types = await EsocialEventService.getEventTypes();
      setEventTypes(types);
    } catch (error) {
      console.error('Erro ao carregar tipos de evento:', error);
    }
  };

  const loadEvent = async () => {
    if (!props?.id) return;

    setLoading(true);
    try {
      const event = await EsocialEventService.getById(props.id);
      methods.reset(event);
    } catch (error) {
      console.error('Erro ao carregar evento:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: EsocialEvent) => {
    setLoading(true);
    try {
      if (props?.id) {
        await EsocialEventService.update(props.id, data);
      } else {
        await EsocialEventService.create(data);
      }
      return true;
    } catch (error) {
      console.error('Erro ao salvar evento:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Validação customizada para datas
  const validateDateBR = (value?: string) => {
    if (!value) return MESSAGES.requiredDate;
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return MESSAGES.invalidDateFormat;
    const [day, month, year] = value.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    if (isNaN(date.getTime())) return MESSAGES.invalidDate;
    return true;
  };

  // Adiciona a validação ao register do RHF
  const registerWithValidation = (name: keyof Partial<EsocialEvent>) =>
    name === 'dataEnvio' || name === 'dataRetorno'
      ? { ...methods.register(name, { validate: validateDateBR }) }
      : { ...methods.register(name) };

  const submit = () => {};

  return {
    ...methods,
    control: methods.control,
    onSubmit: methods.handleSubmit(onSubmit),
    loading,
    eventTypes,
    registerWithValidation,
    submit,
  };
} 
