/**
 * Arquivo: useEmailVerification.ts
 * Caminho: src/hooks/useEmailVerification.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useState } from 'react';
import { validateEmail } from '@/utils/validations';

interface UseEmailVerificationProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

interface UseEmailVerificationReturn {
  isLoading: boolean;
  error: string | null;
  sendCode: (email: string) => Promise<void>;
  verifyCode: (email: string, code: string) => Promise<boolean>;
}

export function useEmailVerification({
  onSuccess,
  onError
}: UseEmailVerificationProps = {}): UseEmailVerificationReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendCode = async (email: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      if (!validateEmail(email)) {
        throw new Error('Email inválido');
      }

      const response = await fetch('/api/validacao/email/send-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao enviar código');
      }

      onSuccess?.();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao enviar código';
      setError(errorMessage);
      onError?.(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyCode = async (email: string, code: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      if (!validateEmail(email)) {
        throw new Error('Email inválido');
      }

      if (!code || code.length !== 6) {
        throw new Error('Código inválido');
      }

      const response = await fetch('/api/validacao/email/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao verificar código');
      }

      onSuccess?.();
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao verificar código';
      setError(errorMessage);
      onError?.(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    sendCode,
    verifyCode,
  };
} 
