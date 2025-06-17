/**
 * Arquivo: EmpregadorFormUtils.ts
 * Caminho: src/components/forms/empregador/EmpregadorFormUtils.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Funções utilitárias para o formulário de cadastro de empregador.
 */
import { EmpregadorFormData } from './EmpregadorFormTypes';

export const formatEmpregadorData = (data: EmpregadorFormData): EmpregadorFormData => {
  return {
    ...data,
    nome: data.nome.trim(),
    cnpj: data.cnpj.replace(/\D/g, ''),
    telefone: data.telefone?.replace(/\D/g, ''),
    endereco: {
      ...data.endereco,
      cep: data.endereco.cep.replace(/\D/g, ''),
      uf: data.endereco.uf.toUpperCase()
    }
  };
};

export const validateEmpregadorData = (data: EmpregadorFormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!data.nome) {
    errors.nome = 'Nome é obrigatório';
  }

  if (!data.cnpj) {
    errors.cnpj = 'CNPJ é obrigatório';
  } else if (data.cnpj.length !== 14) {
    errors.cnpj = 'CNPJ deve ter 14 dígitos';
  } else if (!validarCNPJ(data.cnpj)) {
    errors.cnpj = 'CNPJ inválido';
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

export const getEmpregadorDefaultValues = (): Partial<EmpregadorFormData> => {
  return {
    nome: '',
    cnpj: '',
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

interface CEPResponse {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

/**
 * Valida um CNPJ usando o algoritmo oficial da Receita Federal
 * @param cnpj - CNPJ a ser validado (com ou sem máscara)
 * @returns boolean indicando se o CNPJ é válido
 */
export function validarCNPJ(cnpj: string): boolean {
  const cnpjLimpo = cnpj.replace(/\D/g, '');
  
  if (cnpjLimpo.length !== 14) return false;
  if (/^(\d)\1+$/.test(cnpjLimpo)) return false;

  let tamanho = cnpjLimpo.length - 2;
  let numeros = cnpjLimpo.substring(0, tamanho);
  const digitos = cnpjLimpo.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0))) return false;

  tamanho = tamanho + 1;
  numeros = cnpjLimpo.substring(0, tamanho);
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

/**
 * Busca informações de endereço a partir de um CEP usando a API ViaCEP
 * @param cep - CEP a ser consultado (com ou sem máscara)
 * @returns Promise com os dados do endereço ou null em caso de erro
 */
export async function buscarCEP(cep: string): Promise<CEPResponse | null> {
  try {
    const cepLimpo = cep.replace(/\D/g, '');
    const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
    
    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    
    if (data.erro) {
      return null;
    }

    return {
      logradouro: data.logradouro,
      bairro: data.bairro,
      localidade: data.localidade,
      uf: data.uf,
    };
  } catch (error) {
    console.error('Erro ao buscar CEP:', error);
    return null;
  }
} 
