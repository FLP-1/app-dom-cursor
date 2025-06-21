/**
 * Arquivo: useUsuarios.ts
 * Caminho: src/hooks/useUsuarios.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useState } from 'react';

// Tipo provisório para usuário, ajuste conforme a estrutura real
interface Usuario {
  id?: string;
  nome?: string;
  email?: string;
  [key: string]: unknown;
}

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const addUsuario = (usuario: Usuario) => setUsuarios(prev => [...prev, usuario]);
  return { usuarios, addUsuario };
} 
