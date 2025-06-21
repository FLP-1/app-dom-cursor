/**
 * Arquivo: useChat.ts
 * Caminho: src/hooks/useChat.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useState, useEffect } from 'react';

export interface Mensagem {
  id: string;
  text?: string;
  senderNome: string;
  createdAt: string;
  documentoUrl?: string;
  documentoNome?: string;
  tarefaTitulo?: string;
}

export function useChat() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    // Aqui futuramente será feita a chamada à API/backend
    // Por enquanto, simula fetch
    setTimeout(() => {
      setMensagens([]); // Substituir por dados reais ou mockados
      setLoading(false);
    }, 500);
  }, []);

  function enviarMensagem(texto: string) {
    // Implementar integração com API
  }

  function enviarDocumento(file: File) {
    // Implementar integração com API para upload
  }

  return {
    mensagens,
    enviarMensagem,
    enviarDocumento,
    loading,
  };
} 
