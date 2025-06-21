/**
 * Arquivo: cep.ts
 * Caminho: src/utils/validations/cep.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Função para validar CEP
 */

export const isValidCEP = (cep: string): boolean => {
  const cleanCEP = cep.replace(/\D/g, '');
  return cleanCEP.length === 8;
}; 
