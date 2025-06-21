/**
 * Arquivo: useConfiguracoes.ts
 * Caminho: src/hooks/useConfiguracoes.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useState } from 'react';

// Tipo provisório para configuração, ajuste conforme a estrutura real
interface Configuracao {
  id?: string;
  chave?: string;
  valor?: unknown;
  [key: string]: unknown;
}

export function useConfiguracoes() {
  const [configuracoes, setConfiguracoes] = useState<Configuracao[]>([]);
  const addConfiguracao = (config: Configuracao) => setConfiguracoes(prev => [...prev, config]);
  return { configuracoes, addConfiguracao };
} 
