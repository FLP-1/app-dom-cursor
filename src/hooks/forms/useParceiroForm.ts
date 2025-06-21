/**
 * Arquivo: useParceiroForm.ts
 * Caminho: src/hooks/forms/useParceiroForm.ts
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Hook customizado para lógica do formulário de parceiro (PJ), alternando entre modo simplificado e complementar.
 */

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { parceiroService } from '@/services/parceiro.service';
import { Parceiro } from '@/types/parceiro';
import { useTranslation } from 'react-i18next';
import { partnerMessages } from '@/messages/partner.messages';
import { zodResolver } from '@hookform/resolvers/zod';
import { parceiroSchemaSimplificado, parceiroSchemaCompleto } from '@/components/forms/parceiro/ParceiroFormSchema';

export interface ParceiroFormValues extends Omit<Parceiro, 'id' | 'createdAt' | 'updatedAt'> {}

export function useParceiroForm({ complementar }: { complementar: boolean }) {
  const schema = complementar ? parceiroSchemaCompleto : parceiroSchemaSimplificado;
  const methods = useForm({ resolver: zodResolver(schema) });
  return methods;
}

export function useParceiroFormOld(initialValues?: Partial<ParceiroFormValues>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'pt' | 'en';

  const form = useForm<ParceiroFormValues>({
    defaultValues: initialValues || {},
    mode: 'onChange',
  });

  const onSubmit = async (data: ParceiroFormValues) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      if (initialValues && (initialValues as any).id) {
        await parceiroService.update((initialValues as any).id, data);
        setSuccess(t(partnerMessages[lang].successUpdate));
      } else {
        await parceiroService.create(data);
        setSuccess(t(partnerMessages[lang].successCreate));
      }
      form.reset();
    } catch (err: unknown) {
      setError(t(partnerMessages[lang].error));
    } finally {
      setLoading(false);
    }
  };

  return {
    ...form,
    loading,
    error,
    success,
    onSubmit: form.handleSubmit(onSubmit),
  };
} 
