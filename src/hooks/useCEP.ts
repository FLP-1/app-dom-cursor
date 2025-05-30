import { useState } from 'react';
import { buscarCEP } from '../lib/cep';

interface Endereco {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
}

interface UseCEPProps {
  onSuccess?: (endereco: Endereco) => void;
  onError?: (message: string) => void;
}

interface UseCEPReturn {
  loading: boolean;
  error: string | null;
  buscarEndereco: (cep: string) => Promise<void>;
}

export function useCEP({
  onSuccess,
  onError,
}: UseCEPProps = {}): UseCEPReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buscarEndereco = async (cep: string) => {
    try {
      setLoading(true);
      setError(null);

      const data = await buscarCEP(cep);

      const endereco: Endereco = {
        cep: data.cep,
        logradouro: data.logradouro,
        complemento: data.complemento,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf,
      };

      onSuccess?.(endereco);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao buscar CEP';
      setError(message);
      onError?.(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    buscarEndereco,
  };
} 