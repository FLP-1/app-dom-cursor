import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { LogService, TipoLog, CategoriaLog } from '@/services/log.service';

interface Plano {
  id: string;
  nome: string;
  descricao: string;
  valor: number;
  quantidadeEventos: number;
  nivelSuporte: string;
  ativo: boolean;
}

export function usePlanos() {
  const [planos, setPlanos] = useState<Plano[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const carregarPlanos = async () => {
      try {
        const response = await fetch('/api/planos');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Erro ao carregar planos');
        }

        setPlanos(data);
      } catch (error) {
        await LogService.create({
          tipo: TipoLog.ERROR,
          categoria: CategoriaLog.PAGAMENTO,
          mensagem: 'Erro ao carregar planos',
          detalhes: { error }
        });
        setError(error instanceof Error ? error : new Error('Erro desconhecido'));
      } finally {
        setLoading(false);
      }
    };

    carregarPlanos();
  }, []);

  return { planos, loading, error };
} 