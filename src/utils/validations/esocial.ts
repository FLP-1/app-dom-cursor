/**
 * Arquivo: esocial.ts
 * Caminho: src/utils/validations/esocial.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Funções para validar dados do eSocial
 */

import { z } from 'zod';

export const validations = {
  cpf: (value: string) => {
    const cpf = value.replace(/\D/g, '');
    if (cpf.length !== 11) return false;

    // Validação do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let rest = 11 - (sum % 11);
    const digit1 = rest > 9 ? 0 : rest;
    if (digit1 !== parseInt(cpf.charAt(9))) return false;

    // Validação do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rest = 11 - (sum % 11);
    const digit2 = rest > 9 ? 0 : rest;
    if (digit2 !== parseInt(cpf.charAt(10))) return false;

    return true;
  },

  cnpj: (value: string) => {
    const cnpj = value.replace(/\D/g, '');
    if (cnpj.length !== 14) return false;

    // Validação do primeiro dígito verificador
    let sum = 0;
    let weight = 5;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cnpj.charAt(i)) * weight;
      weight = weight === 2 ? 9 : weight - 1;
    }
    let rest = sum % 11;
    const digit1 = rest < 2 ? 0 : 11 - rest;
    if (digit1 !== parseInt(cnpj.charAt(12))) return false;

    // Validação do segundo dígito verificador
    sum = 0;
    weight = 6;
    for (let i = 0; i < 13; i++) {
      sum += parseInt(cnpj.charAt(i)) * weight;
      weight = weight === 2 ? 9 : weight - 1;
    }
    rest = sum % 11;
    const digit2 = rest < 2 ? 0 : 11 - rest;
    if (digit2 !== parseInt(cnpj.charAt(13))) return false;

    return true;
  },

  pis: (value: string) => {
    const pis = value.replace(/\D/g, '');
    if (pis.length !== 11) return false;

    const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(pis.charAt(i)) * weights[i];
    }
    const rest = sum % 11;
    const digit = rest < 2 ? 0 : 11 - rest;
    return digit === parseInt(pis.charAt(10));
  },

  date: (value: string) => {
    const date = value.split('/');
    if (date.length !== 3) return false;

    const day = parseInt(date[0]);
    const month = parseInt(date[1]);
    const year = parseInt(date[2]);

    if (day < 1 || day > 31) return false;
    if (month < 1 || month > 12) return false;
    if (year < 1900 || year > 2100) return false;

    const dateObj = new Date(year, month - 1, day);
    return dateObj.getDate() === day &&
           dateObj.getMonth() === month - 1 &&
           dateObj.getFullYear() === year;
  },

  currency: (value: string) => {
    const number = parseFloat(value.replace(/\./g, '').replace(',', '.'));
    return !isNaN(number) && number >= 0;
  }
};

export const zodValidations = {
  cpf: z.string().refine(validations.cpf, {
    message: 'CPF inválido'
  }),

  cnpj: z.string().refine(validations.cnpj, {
    message: 'CNPJ inválido'
  }),

  pis: z.string().refine(validations.pis, {
    message: 'PIS inválido'
  }),

  date: z.string().refine(validations.date, {
    message: 'Data inválida'
  }),

  currency: z.string().refine(validations.currency, {
    message: 'Valor inválido'
  })
}; 
