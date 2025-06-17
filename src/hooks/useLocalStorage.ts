/**
 * Arquivo: useLocalStorage.ts
 * Caminho: src/hooks/useLocalStorage.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useState, useEffect } from 'react';

export function useLocalStorage<T>(
  key: string, 
  initialValue: T,
  onError?: (error: Error) => void
): [T, (value: T | null) => void] {
  // Estado para armazenar o valor
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Verifica se localStorage está disponível
      if (!window.localStorage) {
        return initialValue;
      }

      // Tenta obter do localStorage
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Em caso de erro, retorna o valor inicial
      const errorMessage = error instanceof Error ? error : new Error('Erro ao ler do localStorage');
      console.error('Erro ao ler do localStorage:', errorMessage);
      onError?.(errorMessage);
      return initialValue;
    }
  });

  // Função para atualizar o estado e o localStorage
  const setValue = (value: T | null) => {
    try {
      // Verifica se localStorage está disponível
      if (!window.localStorage) {
        onError?.(new Error('localStorage não está disponível'));
        return;
      }

      // Permite que o valor seja uma função
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      // Primeiro tenta atualizar o localStorage
      if (valueToStore === null) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }

      // Só atualiza o estado se o localStorage foi atualizado com sucesso
      setStoredValue(valueToStore);
    } catch (error) {
      // Em caso de erro, mantém o estado atual
      const errorMessage = error instanceof Error ? error : new Error('Erro ao salvar no localStorage');
      console.error('Erro ao salvar no localStorage:', errorMessage);
      onError?.(errorMessage);
      // Não atualiza o estado em caso de erro
    }
  };

  // Efeito para sincronizar entre abas
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.storageArea === window.localStorage) {
        try {
          const newValue = e.newValue ? JSON.parse(e.newValue) : null;
          setStoredValue(newValue);
        } catch (error) {
          const errorMessage = error instanceof Error ? error : new Error('Erro ao processar evento de storage');
          console.error('Erro ao processar evento de storage:', errorMessage);
          onError?.(errorMessage);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, onError]);

  return [storedValue, setValue];
} 
