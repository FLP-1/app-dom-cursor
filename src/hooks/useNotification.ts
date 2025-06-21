/**
 * Arquivo: useNotification.ts
 * Caminho: src/hooks/useNotification.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useSnackbar } from 'notistack';

interface NotificationOptions {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

export function showNotification(enqueueSnackbar: (msg: string, opts: any) => void, { type, message }: NotificationOptions) {
  enqueueSnackbar(message, { variant: type });
}

export const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  return {
    showNotification: (options: NotificationOptions) => showNotification(enqueueSnackbar, options),
  };
};

export default useNotification; 
