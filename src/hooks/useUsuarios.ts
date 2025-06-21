/**
 * Arquivo: useUsuarios.ts
 * Caminho: src/hooks/useUsuarios.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Hook para gerenciamento de usuários
 */

import { useState } from 'react';

export function useUsuarios() {
  const [loading, setLoading] = useState(false);

  return {
    loading,
    setLoading
  };
} 