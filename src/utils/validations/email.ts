/**
 * Arquivo: email.ts
 * Caminho: src/utils/validations/email.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Função para validar email
 */

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}; 
