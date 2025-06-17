/**
 * Arquivo: phone.ts
 * Caminho: src/utils/validations/phone.ts
 * Criado em: 2024-03-19
 * Última atualização: 2024-03-19
 * Descrição: Funções para validação de números de telefone
 */

/**
 * Valida um número de telefone brasileiro
 * @param phone - Número de telefone a ser validado
 * @returns boolean indicando se o número é válido
 */
export function validatePhoneNumber(phone: string): boolean {
  // Remove caracteres não numéricos
  const cleanedPhone = phone.replace(/\D/g, '');

  // Validação básica para números brasileiros com DDD (10 ou 11 dígitos)
  return cleanedPhone.length >= 10 && cleanedPhone.length <= 11;
}

/**
 * Valida um número de celular brasileiro
 * @param phone - Número de celular a ser validado
 * @returns boolean indicando se o número é válido
 */
export function validateBrazilianCellPhone(phone: string): boolean {
  // Remove caracteres não numéricos
  const cleanedPhone = phone.replace(/\D/g, '');

  // Validação específica para celulares brasileiros (11 dígitos)
  if (cleanedPhone.length !== 11) {
    return false;
  }

  // Verifica se começa com 9 (padrão de celular)
  return cleanedPhone.charAt(2) === '9';
} 