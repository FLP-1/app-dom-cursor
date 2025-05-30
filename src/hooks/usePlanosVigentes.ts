import { useEffect, useState } from 'react';
import axios from 'axios';

export function usePlanosVigentes(perfil: 'EMPREGADOR' | 'PARCEIRO' | 'AMBOS') {
  const [planos, setPlanos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/planos', { params: { perfil } })
      .then(res => setPlanos(res.data))
      .finally(() => setIsLoading(false));
  }, [perfil]);

  return { planos, isLoading };
} 