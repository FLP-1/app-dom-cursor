/**
 * Arquivo: FamiliarFormUtils.ts
 * Caminho: src/components/forms/familiar/FamiliarFormUtils.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Funções utilitárias para o formulário de familiar.
 */

import { FamiliarFormData } from './FamiliarFormTypes';

export function formatFamiliarData(data: FamiliarFormData): FamiliarFormData {
  return {
    ...data,
    nome: data.nome.trim(),
    cpf: data.cpf.replace(/\D/g, ''),
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

export function validateFamiliarData(data: FamiliarFormData): string[] {
  const errors: string[] = [];

  if (!data.nome || data.nome.length < 3 || data.nome.length > 100) {
    errors.push('O nome deve ter entre 3 e 100 caracteres');
  }

  if (!data.cpf || data.cpf.length !== 11) {
    errors.push('CPF inválido');
  }

  if (!data.dataNascimento) {
    errors.push('A data de nascimento é obrigatória');
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

export function getFamiliarDefaultValues(): FamiliarFormData {
  return {
    nome: '',
    cpf: '',
    dataNascimento: '',
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

export function validarCPF(cpf: string): boolean {
  // Validação simples de CPF (pode ser substituída por lib externa se necessário)
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let soma = 0;
  let resto;
  for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;
  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;
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
