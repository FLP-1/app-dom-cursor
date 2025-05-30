import { validateCPF, validatePhoneNumber } from '../validators';

/**
 * Valida um CNPJ
 * @param cnpj - CNPJ a ser validado
 * @returns boolean indicando se o CNPJ é válido
 */
export function validateCNPJ(cnpj: string): boolean {
  // Remove caracteres não numéricos
  cnpj = cnpj.replace(/\D/g, '');

  // Verifica se tem 14 dígitos
  if (cnpj.length !== 14) {
    return false;
  }

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{13}$/.test(cnpj)) {
    return false;
  }

  // Validação do primeiro dígito verificador
  let sum = 0;
  let weight = 5;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnpj.charAt(i)) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  let rest = 11 - (sum % 11);
  const digit1 = rest > 9 ? 0 : rest;

  if (digit1 !== parseInt(cnpj.charAt(12))) {
    return false;
  }

  // Validação do segundo dígito verificador
  sum = 0;
  weight = 6;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cnpj.charAt(i)) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  rest = 11 - (sum % 11);
  const digit2 = rest > 9 ? 0 : rest;

  return digit2 === parseInt(cnpj.charAt(13));
}

/**
 * Valida um email
 * @param email - Email a ser validado
 * @returns boolean indicando se o email é válido
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * Valida um CEP
 * @param cep - CEP a ser validado
 * @returns boolean indicando se o CEP é válido
 */
export function validateCEP(cep: string): boolean {
  // Remove caracteres não numéricos
  cep = cep.replace(/\D/g, '');
  
  // Verifica se tem 8 dígitos
  if (cep.length !== 8) {
    return false;
  }

  return true;
}

/**
 * Valida uma data
 * @param date - Data a ser validada (formato: YYYY-MM-DD)
 * @returns boolean indicando se a data é válida
 */
export function validateDate(date: string): boolean {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return false;
  }

  const [year, month, day] = date.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);
  
  return dateObj.getFullYear() === year &&
         dateObj.getMonth() === month - 1 &&
         dateObj.getDate() === day;
}

/**
 * Valida uma hora
 * @param time - Hora a ser validada (formato: HH:mm)
 * @returns boolean indicando se a hora é válida
 */
export function validateTime(time: string): boolean {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return timeRegex.test(time);
}

/**
 * Valida uma senha
 * @param password - Senha a ser validada
 * @returns objeto com informações sobre a validação da senha
 */
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('A senha deve ter pelo menos 8 caracteres');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('A senha deve conter pelo menos uma letra maiúscula');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('A senha deve conter pelo menos uma letra minúscula');
  }
  
  if (!/\d/.test(password)) {
    errors.push('A senha deve conter pelo menos um número');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('A senha deve conter pelo menos um caractere especial');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Valida uma URL
 * @param url - URL a ser validada
 * @returns boolean indicando se a URL é válida
 */
export function validateURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Valida um arquivo
 * @param file - Arquivo a ser validado
 * @param options - Opções de validação
 * @returns objeto com informações sobre a validação do arquivo
 */
export function validateFile(file: File, options: {
  maxSize?: number; // em bytes
  allowedTypes?: string[];
  maxFiles?: number;
} = {}): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const { maxSize = 5 * 1024 * 1024, allowedTypes = [], maxFiles = 1 } = options;

  if (file.size > maxSize) {
    errors.push(`O arquivo deve ter no máximo ${maxSize / 1024 / 1024}MB`);
  }

  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    errors.push(`O arquivo deve ser do tipo: ${allowedTypes.join(', ')}`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Valida um número de telefone brasileiro
 * @param phone - Número de telefone a ser validado
 * @returns boolean indicando se o número é válido
 */
export function validatePhoneNumber(phone: string): boolean {
  // Remove caracteres não numéricos
  const cleanedPhone = phone.replace(/\D/g, '');

  // Validação para números brasileiros com DDD
  // Formato: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
  const phoneRegex = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;
  
  // Verifica se o número tem o formato correto
  if (!phoneRegex.test(phone)) {
    return false;
  }

  // Verifica se o número tem 10 ou 11 dígitos (com DDD)
  return cleanedPhone.length === 10 || cleanedPhone.length === 11;
}

/**
 * Valida um número de celular brasileiro
 * @param phone - Número de celular a ser validado
 * @returns boolean indicando se o número é válido
 */
export function validateBrazilianCellPhone(phone: string): boolean {
  // Remove caracteres não numéricos
  const cleanedPhone = phone.replace(/\D/g, '');

  // Validação para celulares brasileiros com DDD
  // Formato: (XX) 9XXXX-XXXX
  const cellPhoneRegex = /^\(?[1-9]{2}\)? ?9[0-9]{4}\-?[0-9]{4}$/;
  return cellPhoneRegex.test(phone);
}

// Re-exporta as funções existentes
export { validateCPF, validatePhoneNumber }; 