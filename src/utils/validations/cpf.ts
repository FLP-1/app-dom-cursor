/**
 * Arquivo: cpf.ts
 * Caminho: src/utils/validations/cpf.ts
 * Criado em: 2024-03-19
 * Última atualização: 2024-03-19
 * Descrição: Funções para validação de CPF
 */

/**
 * Valida um CPF
 * @param cpf - CPF a ser validado
 * @returns boolean indicando se o CPF é válido
 */
export function validateCPF(cpf: string): boolean {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/\D/g, '');

  // Verifica se tem 11 dígitos
  if (cpf.length !== 11) {
    return false;
  }

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  // Validação do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let rest = 11 - (sum % 11);
  const digit1 = rest > 9 ? 0 : rest;

  if (digit1 !== parseInt(cpf.charAt(9))) {
    return false;
  }

  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  rest = 11 - (sum % 11);
  const digit2 = rest > 9 ? 0 : rest;

  return digit2 === parseInt(cpf.charAt(10));
} 