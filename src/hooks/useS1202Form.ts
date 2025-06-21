/**
 * Arquivo: useS1202Form.ts
 * Caminho: src/hooks/useS1202Form.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { S1202Schema } from '@/schemas/esocial/S1202Schema';
import { S1202Service } from '@/services/api/esocial/S1202Service';

interface UseS1202FormProps {
  initialData?: S1202Schema;
  id?: string;
}

export function useS1202Form(props?: UseS1202FormProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({
    resolver: zodResolver(S1202Schema),
    defaultValues: props?.initialData,
    mode: 'onChange'
  });

  const onSubmit = async (data: S1202Schema) => {
    try {
      if (props?.id) {
        await S1202Service.update(props.id, data);
        enqueueSnackbar(t('messages.success.update'), { variant: 'success' });
      } else {
        await S1202Service.create(data);
        enqueueSnackbar(t('messages.success.create'), { variant: 'success' });
      }
      router.push('/esocial/events');
    } catch (error) {
      enqueueSnackbar(
        error instanceof Error ? error.message : t('messages.error.generic'),
        { variant: 'error' }
      );
    }
  };

  const handleDelete = async () => {
    if (!props?.id) return;

    try {
      await S1202Service.delete(props.id);
      enqueueSnackbar(t('messages.success.delete'), { variant: 'success' });
      router.push('/esocial/s1202');
    } catch (error) {
      console.error('Erro ao excluir S-1202:', error);
      enqueueSnackbar(t('messages.error.delete'), { variant: 'error' });
    }
  };

  const handleGenerateXml = async () => {
    if (!props?.id) return;

    try {
      const xml = await S1202Service.generateXml(props.id);
      // Criar blob e fazer download
      const blob = new Blob([xml], { type: 'text/xml' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `s1202-${props.id}.xml`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Erro ao gerar XML:', error);
      enqueueSnackbar(t('messages.error.generateXml'), { variant: 'error' });
    }
  };

  return {
    ...methods,
    control: methods.control,
    onSubmit: methods.handleSubmit(onSubmit),
    isSubmitting: methods.formState.isSubmitting,
    handleDelete,
    handleGenerateXml
  };
} 
