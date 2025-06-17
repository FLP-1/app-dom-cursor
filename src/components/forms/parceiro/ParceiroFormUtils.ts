/**
 * Arquivo: ParceiroFormUtils.ts
 * Caminho: src/components/forms/parceiro/ParceiroFormUtils.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Funções utilitárias para o formulário de parceiro.
 */

import { ParceiroFormData } from './ParceiroFormTypes';

export function formatParceiroData(data: ParceiroFormData): ParceiroFormData {
  return {
    ...data,
    nome: data.nome.trim(),
    cnpj: data.cnpj.replace(/\D/g, ''),
    endereco: {
      ...data.endereco,
      cep: data.endereco.cep.replace(/\D/g, ''),
      logradouro: data.endereco.logradouro.trim(),
      complemento: data.endereco.complemento?.trim(),
      bairro: data.endereco.bairro.trim(),
      cidade: data.endereco.cidade.trim(),
      estado: data.endereco.estado.trim().toUpperCase(),
    },
    observacoes: data.observacoes?.trim(),
  };
}

export function validateParceiroData(data: ParceiroFormData): string[] {
  const errors: string[] = [];

  if (!data.nome || data.nome.length < 3 || data.nome.length > 100) {
    errors.push('O nome deve ter entre 3 e 100 caracteres');
  }

  if (!data.cnpj || data.cnpj.length !== 14) {
    errors.push('CNPJ inválido');
  }

  if (!data.tipo) {
    errors.push('O tipo é obrigatório');
  }

  if (!data.dataInicio) {
    errors.push('A data de início é obrigatória');
  }

  if (!data.endereco.cep || data.endereco.cep.length !== 8) {
    errors.push('CEP inválido');
  }

  if (!data.endereco.logradouro || data.endereco.logradouro.length < 3) {
    errors.push('O logradouro deve ter no mínimo 3 caracteres');
  }

  if (!data.endereco.numero) {
    errors.push('O número é obrigatório');
  }

  if (!data.endereco.bairro || data.endereco.bairro.length < 3) {
    errors.push('O bairro deve ter no mínimo 3 caracteres');
  }

  if (!data.endereco.cidade || data.endereco.cidade.length < 3) {
    errors.push('A cidade deve ter no mínimo 3 caracteres');
  }

  if (!data.endereco.estado || data.endereco.estado.length !== 2) {
    errors.push('Estado inválido');
  }

  if (data.observacoes && data.observacoes.length > 1000) {
    errors.push('As observações devem ter no máximo 1000 caracteres');
  }

  return errors;
}

export function getParceiroDefaultValues(): ParceiroFormData {
  return {
    nome: '',
    cnpj: '',
    tipo: undefined,
    dataInicio: '',
    dataFim: '',
    endereco: {
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
    },
    observacoes: '',
  };
}

export function validarCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/\D/g, '');
  if (cnpj.length !== 14) return false;
  if (/^(\d)\1+$/.test(cnpj)) return false;
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  const digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0))) return false;
  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(1))) return false;
  return true;
}

export async function buscarCEP(cep: string): Promise<{logradouro: string; bairro: string; localidade: string; uf: string;} | null> {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    if (data.erro) return null;
    return {
      logradouro: data.logradouro,
      bairro: data.bairro,
      localidade: data.localidade,
      uf: data.uf,
    };
  } catch {
    return null;
  }
} 
