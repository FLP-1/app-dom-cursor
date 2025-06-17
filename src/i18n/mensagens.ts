/**
 * Arquivo: mensagens.ts
 * Caminho: src/i18n/mensagens.ts
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Dicionário central de mensagens do sistema, com suporte a internacionalização.
 */

export const mensagens = {
  erro_padrao: {
    pt: 'Ocorreu um erro inesperado. Por favor, tente novamente.',
    en: 'An unexpected error occurred. Please try again.',
  },
  sucesso_empregador: {
    pt: 'Empregador cadastrado com sucesso!',
    en: 'Employer successfully registered!',
  },
  validacao: {
    nome: {
      min: {
        pt: 'O nome deve ter no mínimo 3 caracteres',
        en: 'Name must have at least 3 characters',
      },
      max: {
        pt: 'O nome deve ter no máximo 100 caracteres',
        en: 'Name must have at most 100 characters',
      },
    },
    cnpj: {
      min: {
        pt: 'O CNPJ deve ter no mínimo 14 caracteres',
        en: 'CNPJ must have at least 14 characters',
      },
      max: {
        pt: 'O CNPJ deve ter no máximo 18 caracteres',
        en: 'CNPJ must have at most 18 characters',
      },
      formato: {
        pt: 'O CNPJ deve estar no formato 00.000.000/0000-00',
        en: 'CNPJ must be in the format 00.000.000/0000-00',
      },
    },
    email: {
      formato: {
        pt: 'E-mail inválido',
        en: 'Invalid email',
      },
      max: {
        pt: 'O e-mail deve ter no máximo 100 caracteres',
        en: 'Email must have at most 100 characters',
      },
    },
    telefone: {
      min: {
        pt: 'O telefone deve ter no mínimo 8 caracteres',
        en: 'Phone must have at least 8 characters',
      },
      max: {
        pt: 'O telefone deve ter no máximo 15 caracteres',
        en: 'Phone must have at most 15 characters',
      },
      formato: {
        pt: 'O telefone deve estar no formato (00) 00000-0000',
        en: 'Phone must be in the format (00) 00000-0000',
      },
    },
    cep: {
      min: {
        pt: 'O CEP deve ter no mínimo 8 caracteres',
        en: 'ZIP code must have at least 8 characters',
      },
      max: {
        pt: 'O CEP deve ter no máximo 9 caracteres',
        en: 'ZIP code must have at most 9 characters',
      },
      formato: {
        pt: 'O CEP deve estar no formato 00000-000',
        en: 'ZIP code must be in the format 00000-000',
      },
    },
    endereco: {
      min: {
        pt: 'O endereço deve ter no mínimo 3 caracteres',
        en: 'Address must have at least 3 characters',
      },
      max: {
        pt: 'O endereço deve ter no máximo 200 caracteres',
        en: 'Address must have at most 200 characters',
      },
    },
    numero: {
      min: {
        pt: 'O número deve ter no mínimo 1 caractere',
        en: 'Number must have at least 1 character',
      },
      max: {
        pt: 'O número deve ter no máximo 10 caracteres',
        en: 'Number must have at most 10 characters',
      },
    },
    complemento: {
      max: {
        pt: 'O complemento deve ter no máximo 100 caracteres',
        en: 'Complement must have at most 100 characters',
      },
    },
    bairro: {
      min: {
        pt: 'O bairro deve ter no mínimo 2 caracteres',
        en: 'Neighborhood must have at least 2 characters',
      },
      max: {
        pt: 'O bairro deve ter no máximo 100 caracteres',
        en: 'Neighborhood must have at most 100 characters',
      },
    },
    cidade: {
      min: {
        pt: 'A cidade deve ter no mínimo 2 caracteres',
        en: 'City must have at least 2 characters',
      },
      max: {
        pt: 'A cidade deve ter no máximo 100 caracteres',
        en: 'City must have at most 100 characters',
      },
    },
    estado: {
      min: {
        pt: 'O estado deve ter no mínimo 2 caracteres',
        en: 'State must have at least 2 characters',
      },
      max: {
        pt: 'O estado deve ter no máximo 2 caracteres',
        en: 'State must have at most 2 characters',
      },
    },
  },
}; 
