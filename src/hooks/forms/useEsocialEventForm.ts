import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { EsocialEvent, EsocialEventType } from '../../types/esocial-event';
import { EsocialEventService } from '../../services/esocial-event.service';
import { useTranslation } from 'react-i18next';
import { MESSAGES } from '../../i18n/messages';

interface UseEsocialEventFormProps {
  id?: string;
}

export function useEsocialEventForm({ id }: UseEsocialEventFormProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [tipos, setTipos] = useState<EsocialEventType[]>([]);
  const [initialValues, setInitialValues] = useState<Partial<EsocialEvent>>({ status: 'PENDING' });
  const [error, setError] = useState<string | null>(null);
  const isEdit = Boolean(id);

  const form = useForm<Partial<EsocialEvent>>({
    defaultValues: initialValues,
  });

  useEffect(() => {
    async function fetchTipos() {
      const tiposData = await EsocialEventService.listTypes();
      setTipos(tiposData);
    }
    fetchTipos();
  }, []);

  useEffect(() => {
    if (id) {
      setLoading(true);
      EsocialEventService.getById(id)
        .then((data) => {
          setInitialValues(data);
          form.reset(data);
        })
        .catch(() => setError(t('Erro ao carregar evento.')))
        .finally(() => setLoading(false));
    }
  }, [id, form, t]);

  const onSubmit = async (values: Partial<EsocialEvent>) => {
    setLoading(true);
    setError(null);
    try {
      if (isEdit && id) {
        await EsocialEventService.update(id, values);
      } else {
        await EsocialEventService.create(values);
      }
    } catch {
      setError(t('Erro ao salvar evento.'));
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
      ? { ...form.register(name, { validate: validateDateBR }) }
      : { ...form.register(name) };

  return {
    ...form,
    tipos,
    loading,
    error,
    isEdit,
    onSubmit: form.handleSubmit(onSubmit),
    initialValues,
    registerWithValidation,
  };
} 