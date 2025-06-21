/**
 * Arquivo: index.ts
 * Caminho: src/utils/validations/index.ts
 * Criado em: 2024-03-19
 * Última atualização: 2025-06-13
 * Descrição: Arquivo de exportação centralizada das funções de validação
 */

export { validateCPF } from './cpf';
export { validatePhoneNumber, validateBrazilianCellPhone } from './phone';
export { isValidEmail as validateEmail } from './email';
export { isValidCEP as validateCEP } from './cep';
export { isValidDate as validateDate, isValidTime as validateTime } from './date';
export { isValidPassword as validatePassword } from './password';
export { isValidURL as validateURL } from './url';
export { isValidFile as validateFile } from './file';
export { validateCNPJ } from './cnpj'; 