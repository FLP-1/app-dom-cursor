/**
 * Arquivo: EmpregadoFormUtils.ts
 * Caminho: src/components/forms/empregado/EmpregadoFormUtils.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Funções utilitárias para o formulário de cadastro de empregado.
 */
import { EmpregadoFormData } from './EmpregadoFormTypes';

export const formatEmpregadoData = (data: EmpregadoFormData): EmpregadoFormData => {
  return {
    ...data,
    nome: data.nome.trim(),
    cpf: data.cpf.replace(/\D/g, ''),
    telefone: data.telefone?.replace(/\D/g, ''),
    salario: data.salario.replace(/\D/g, ''),
    endereco: {
      ...data.endereco,
      cep: data.endereco.cep.replace(/\D/g, ''),
      uf: data.endereco.uf.toUpperCase()
    }
  };
};

export const validateEmpregadoData = (data: EmpregadoFormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!data.nome) {
    errors.nome = 'Nome é obrigatório';
  }

  if (!data.cpf) {
    errors.cpf = 'CPF é obrigatório';
  } else if (data.cpf.length !== 11) {
    errors.cpf = 'CPF deve ter 11 dígitos';
  }

  if (!data.dataNascimento) {
    errors.dataNascimento = 'Data de nascimento é obrigatória';
  }

  if (!data.cargo) {
    errors.cargo = 'Cargo é obrigatório';
  }

  if (!data.salario) {
    errors.salario = 'Salário é obrigatório';
  }

  if (data.email && !data.email.includes('@')) {
    errors.email = 'E-mail inválido';
  }

  if (data.telefone && data.telefone.length < 10) {
    errors.telefone = 'Telefone deve ter no mínimo 10 dígitos';
  }

  if (!data.endereco.cep) {
    errors['endereco.cep'] = 'CEP é obrigatório';
  } else if (data.endereco.cep.length !== 8) {
    errors['endereco.cep'] = 'CEP deve ter 8 dígitos';
  }

  if (!data.endereco.logradouro) {
    errors['endereco.logradouro'] = 'Logradouro é obrigatório';
  }

  if (!data.endereco.numero) {
    errors['endereco.numero'] = 'Número é obrigatório';
  }

  if (!data.endereco.bairro) {
    errors['endereco.bairro'] = 'Bairro é obrigatório';
  }

  if (!data.endereco.cidade) {
    errors['endereco.cidade'] = 'Cidade é obrigatória';
  }

  if (!data.endereco.uf) {
    errors['endereco.uf'] = 'UF é obrigatória';
  } else if (data.endereco.uf.length !== 2) {
    errors['endereco.uf'] = 'UF deve ter 2 caracteres';
  }

  return errors;
};

export const getEmpregadoDefaultValues = (): Partial<EmpregadoFormData> => {
  return {
    nome: '',
    cpf: '',
    dataNascimento: '',
    cargo: '',
    salario: '',
    email: '',
    telefone: '',
    endereco: {
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      uf: ''
    }
  };
};

export function validarCPF(cpf: string): boolean {
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
