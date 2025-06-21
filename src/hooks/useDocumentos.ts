/**
 * Arquivo: useDocumentos.ts
 * Caminho: src/hooks/useDocumentos.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useState } from 'react';

// Tipo provisório para documento, ajuste conforme a estrutura real
interface Documento {
  id?: string;
  nome?: string;
  data?: Date;
  [key: string]: unknown;
}

export function useDocumentos() {
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const addDocumento = (doc: Documento) => setDocumentos(prev => [...prev, doc]);
  return { documentos, addDocumento };
} 
