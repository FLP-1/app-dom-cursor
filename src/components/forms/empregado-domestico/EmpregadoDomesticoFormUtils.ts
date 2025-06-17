/**
 * Arquivo: EmpregadoDomesticoFormUtils.ts
 * Caminho: src/components/forms/empregado-domestico/EmpregadoDomesticoFormUtils.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Funções utilitárias para o formulário de empregado doméstico.
 */

import { EmpregadoDomesticoFormData } from './EmpregadoDomesticoFormTypes';

export function formatEmpregadoDomesticoData(data: EmpregadoDomesticoFormData): EmpregadoDomesticoFormData {
  return {
    ...data,
    nome: data.nome.trim(),
    cpf: data.cpf.replace(/\D/g, ''),
    endereco: {
      ...data.endereco,
      cep: data.endereco.cep.replace(/\D/g, ''),
      logradouro: data.endereco.logradouro.trim(),
      numero: data.endereco.numero.trim(),
      complemento: data.endereco.complemento?.trim(),
      bairro: data.endereco.bairro.trim(),
      cidade: data.endereco.cidade.trim(),
      estado: data.endereco.estado.trim()
    },
    funcao: data.funcao.trim(),
    observacoes: data.observacoes?.trim()
  };
}

export function validateEmpregadoDomesticoData(data: EmpregadoDomesticoFormData): string[] {
  const errors: string[] = [];

  if (!data.nome) {
    errors.push('Nome é obrigatório');
  }

  if (!data.cpf || data.cpf.length !== 11) {
    errors.push('CPF inválido');
  }

  if (!data.dataNascimento) {
    errors.push('Data de nascimento é obrigatória');
  }

  if (!data.dataInicio) {
    errors.push('Data de início é obrigatória');
  }

  if (data.dataFim && data.dataFim < data.dataInicio) {
    errors.push('Data de fim deve ser posterior à data de início');
  }

  if (!data.endereco.cep || data.endereco.cep.length !== 8) {
    errors.push('CEP inválido');
  }

  if (!data.endereco.logradouro) {
    errors.push('Logradouro é obrigatório');
  }

  if (!data.endereco.numero) {
    errors.push('Número é obrigatório');
  }

  if (!data.endereco.bairro) {
    errors.push('Bairro é obrigatório');
  }

  if (!data.endereco.cidade) {
    errors.push('Cidade é obrigatória');
  }

  if (!data.endereco.estado || data.endereco.estado.length !== 2) {
    errors.push('Estado inválido');
  }

  if (!data.salario || data.salario <= 0) {
    errors.push('Salário deve ser maior que zero');
  }

  if (!data.cargaHoraria || data.cargaHoraria <= 0) {
    errors.push('Carga horária deve ser maior que zero');
  }

  if (!data.funcao) {
    errors.push('Função é obrigatória');
  }

  return errors;
}

export function getEmpregadoDomesticoDefaultValues(): EmpregadoDomesticoFormData {
  return {
    nome: '',
    cpf: '',
    dataNascimento: undefined,
    dataInicio: undefined,
    dataFim: undefined,
    endereco: {
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: ''
    },
    salario: 0,
    cargaHoraria: 0,
    funcao: '',
    observacoes: ''
  };
} 