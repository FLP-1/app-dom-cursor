/**
 * Arquivo: password.ts
 * Caminho: src/utils/validations/password.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Função para validar senha
 */

export const isValidPassword = (password: string): boolean => {
  // Mínimo 8 caracteres
  // Pelo menos uma letra maiúscula
  // Pelo menos uma letra minúscula
  // Pelo menos um número
  // Pelo menos um caractere especial
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}; 
