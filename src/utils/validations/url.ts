/**
 * Arquivo: url.ts
 * Caminho: src/utils/validations/url.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Função para validar URLs
 */

export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}; 
