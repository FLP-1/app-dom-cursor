/**
 * Arquivo: useRelatorio.ts
 * Caminho: src/hooks/useRelatorio.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useState } from 'react';

// Tipo provisório para relatório, ajuste conforme a estrutura real
interface Relatorio {
  id?: string;
  nome?: string;
  data?: Date;
  [key: string]: unknown;
}

export function useRelatorio() {
  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);
  const addRelatorio = (relatorio: Relatorio) => setRelatorios(prev => [...prev, relatorio]);
  return { relatorios, addRelatorio };
} 
