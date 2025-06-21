/**
 * Arquivo: useS5013Form.ts
 * Caminho: src/hooks/esocial/useS5013Form.ts
 * Criado em: 2025-06-05
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { S5013Schema } from '@/schemas/esocial/S5013Schema';
import type { z } from 'zod';
import { useEsocialApi } from '@/hooks/useEsocialApi';
import { useState } from 'react';
import { forms } from '@/i18n/forms';

export type S5013FormValues = z.infer<typeof S5013Schema>;

export function useS5013Form() {
  const { submitS5013 } = useEsocialApi();
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<S5013FormValues>({
    resolver: zodResolver(S5013Schema),
    mode: 'onTouched',
    defaultValues: {
      campoExemplo: '',
    },
  });

  const onSubmit = async (values: S5013FormValues) => {
    setSuccess(null);
    setError(null);
    try {
      await submitS5013(values);
      setSuccess(forms.S5013.success);
    } catch (e) {
      setError(forms.S5013.error);
    }
  };

  return {
    ...form,
    onSubmit,
    success,
    error,
    control: form.control,
  };
} 
