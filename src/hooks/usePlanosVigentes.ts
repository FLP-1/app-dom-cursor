/**
 * Arquivo: usePlanosVigentes.ts
 * Caminho: src/hooks/usePlanosVigentes.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useEffect, useState } from 'react';
import axios from 'axios';

// Tipo provisório para plano vigente, ajuste conforme a estrutura real
interface PlanoVigente {
  id?: string;
  nome?: string;
  valor?: number;
  [key: string]: unknown;
}

export function usePlanosVigentes(perfil: 'EMPREGADOR' | 'PARCEIRO' | 'AMBOS') {
  const [planos, setPlanos] = useState<PlanoVigente[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/planos', { params: { perfil } })
      .then(res => setPlanos(res.data))
      .finally(() => setIsLoading(false));
  }, [perfil]);

  return { planos, isLoading };
} 
