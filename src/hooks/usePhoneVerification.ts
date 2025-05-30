import { useState } from 'react';
import { validateBrazilianCellPhone } from '../utils/validation';

interface UsePhoneVerificationProps {
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

interface UsePhoneVerificationReturn {
  loading: boolean;
  error: string | null;
  sendCode: (phone: string) => Promise<void>;
  verifyCode: (phone: string, code: string) => Promise<void>;
}

export function usePhoneVerification({
  onSuccess,
  onError,
}: UsePhoneVerificationProps = {}): UsePhoneVerificationReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendCode = async (phone: string) => {
    try {
      if (!validateBrazilianCellPhone(phone)) {
        throw new Error('Número de celular inválido');
      }

      setLoading(true);
      setError(null);

      const response = await fetch('/api/validacao/celular/send-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erro ao enviar código');
      }

      onSuccess?.();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao enviar código';
      setError(message);
      onError?.(message);
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async (phone: string, code: string) => {
    try {
      if (!validateBrazilianCellPhone(phone)) {
        throw new Error('Número de celular inválido');
      }

      if (!code || code.length !== 6) {
        throw new Error('Código inválido');
      }

      setLoading(true);
      setError(null);

      const response = await fetch('/api/validacao/celular/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, code }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erro ao verificar código');
      }

      onSuccess?.();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao verificar código';
      setError(message);
      onError?.(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    sendCode,
    verifyCode,
  };
} 