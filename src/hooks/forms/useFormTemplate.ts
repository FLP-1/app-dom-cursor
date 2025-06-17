/**
 * Arquivo: useFormTemplate.ts
 * Caminho: src/hooks/forms/useFormTemplate.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Template de hook customizado para lógica, validação e submit de formulários, pronto para ser adaptado a diferentes schemas.
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// Importe ou defina seu schema de validação
// import { schema } from './schema';
import { useNotification } from '@/hooks/useNotification';

// Substitua 'FormData' pelo tipo/interface do seu formulário
export function useFormTemplate(onSuccess?: () => void) {
  const { error, success } = useNotification();
  const methods = useForm({
    // resolver: zodResolver(schema), // Descomente e ajuste conforme seu schema
    defaultValues: { /* ... */ },
  });

  const onSubmit = async (data: unknown) => {
    try {
      // lógica de submit (ex: chamada de API)
      success('Operação realizada com sucesso!');
      onSuccess?.();
    } catch (e: unknown) {
      if (e instanceof Error) {
        error(e.message);
      } else {
        error('Erro ao realizar operação.');
      }
    }
  };

  return { ...methods, onSubmit };
} 
