/**
 * Arquivo: cnpj.ts
 * Caminho: src/utils/validations/cnpj.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Funções de validação para CNPJ
 */

export function validateCNPJ(cnpj: string): boolean {
  // Remove caracteres não numéricos
  const cleanCNPJ = cnpj.replace(/\D/g, '');
  
  // Verifica se tem 14 dígitos
  if (cleanCNPJ.length !== 14) {
    return false;
  }
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{13}$/.test(cleanCNPJ)) {
    return false;
  }
  
  // Implementação básica da validação de CNPJ
  // Em produção, usar uma biblioteca específica como cpf-cnpj-validator
  return true;
} 