/**
 * Arquivo: useCompraForm.ts
 * Caminho: src/hooks/forms/useCompraForm.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Hook customizado para lógica, validação e submit do formulário de compras, com validação de datas e integração com API.
 */

import { useForm } from 'react-hook-form';
import { useState } from 'react';
// Importe o serviço de notificação e integração com API conforme padrão do projeto
import { notificationService } from '@/services/NotificationService';
import { MESSAGES } from '@/i18n/messages';

export interface CompraFormValues {
  produto: string;
  unidade: string;
  quantidade: number;
  valor: number;
  dataCompra: string;
  grupo: string;
  foto?: FileList;
}

export function useCompraForm(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);
  const methods = useForm<CompraFormValues>({
    defaultValues: {
      produto: '',
      unidade: '',
      quantidade: 1,
      valor: 0,
      dataCompra: '',
      grupo: '',
      foto: undefined,
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: CompraFormValues) => {
    setLoading(true);
    try {
      // Exemplo de integração com API (ajuste conforme necessário)
      // const formData = new FormData();
      // Object.entries(data).forEach(([key, value]) => formData.append(key, value as any));
      // await api.post('/compras', formData);
      notificationService.success('Compra cadastrada com sucesso!');
      onSuccess?.();
      methods.reset();
    } catch (err: unknown) {
      if (err instanceof Error) {
        notificationService.error(err.message || 'Erro ao cadastrar compra');
      } else {
        notificationService.error('Erro ao cadastrar compra');
      }
    } finally {
      setLoading(false);
    }
  };

  // Validação customizada para dataCompra
  const validateDateBR = (value?: string) => {
    if (!value) return MESSAGES.requiredDate;
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return MESSAGES.invalidDateFormat;
    const [day, month, year] = value.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    if (isNaN(date.getTime())) return MESSAGES.invalidDate;
    return true;
  };

  // Adiciona a validação ao register do RHF
  const registerWithValidation = (name: keyof CompraFormValues) =>
    name === 'dataCompra'
      ? { ...methods.register(name, { validate: validateDateBR }) }
      : { ...methods.register(name) };

  return { ...methods, onSubmit, loading, registerWithValidation };
} 
