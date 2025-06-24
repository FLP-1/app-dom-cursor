/**
 * Arquivo: empregador.messages.ts
 * Caminho: src/i18n/messages/empregador.messages.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Mensagens centralizadas para o módulo de empregador
 */

export const empregadorMessages = {
  pt: {
    title: 'Empregador',
    subtitle: 'Gerencie os dados do empregador',
    form: {
      title: 'Formulário de Empregador',
      fields: {
        nome: {
          label: 'Nome',
          placeholder: 'Digite o nome do empregador'
        },
        cnpj: {
          label: 'CNPJ',
          placeholder: 'Digite o CNPJ'
        },
        razaoSocial: {
          label: 'Razão Social',
          placeholder: 'Digite a razão social'
        },
        tipo: {
          label: 'Tipo',
          placeholder: 'Selecione o tipo'
        },
        telefone: {
          label: 'Telefone',
          placeholder: 'Digite o telefone'
        },
        email: {
          label: 'E-mail',
          placeholder: 'Digite o e-mail'
        },
        endereco: {
          label: 'Endereço',
          placeholder: 'Digite o endereço'
        },
        cidade: {
          label: 'Cidade',
          placeholder: 'Digite a cidade'
        },
        estado: {
          label: 'Estado',
          placeholder: 'Selecione o estado'
        },
        cep: {
          label: 'CEP',
          placeholder: 'Digite o CEP'
        },
        ativo: {
          label: 'Ativo'
        },
        observacoes: {
          label: 'Observações',
          placeholder: 'Digite observações'
        }
      }
    },
    validation: {
      nome: {
        required: 'Nome é obrigatório',
        minLength: 'Nome deve ter pelo menos 3 caracteres',
        maxLength: 'Nome deve ter no máximo 100 caracteres'
      },
      cnpj: {
        required: 'CNPJ é obrigatório',
        format: 'CNPJ deve estar no formato XX.XXX.XXX/XXXX-XX'
      },
      razaoSocial: {
        required: 'Razão Social é obrigatória',
        minLength: 'Razão Social deve ter pelo menos 3 caracteres'
      },
      tipo: {
        required: 'Tipo é obrigatório'
      },
      telefone: {
        required: 'Telefone é obrigatório',
        format: 'Telefone deve estar no formato (XX) XXXXX-XXXX'
      },
      email: {
        required: 'E-mail é obrigatório',
        format: 'E-mail deve estar em formato válido'
      },
      endereco: {
        required: 'Endereço é obrigatório',
        minLength: 'Endereço deve ter pelo menos 10 caracteres'
      },
      cidade: {
        required: 'Cidade é obrigatória'
      },
      estado: {
        required: 'Estado é obrigatório'
      },
      cep: {
        required: 'CEP é obrigatório',
        format: 'CEP deve estar no formato XXXXX-XXX'
      }
    },
    success: {
      create: 'Empregador criado com sucesso!',
      update: 'Empregador atualizado com sucesso!',
      delete: 'Empregador excluído com sucesso!'
    },
    error: {
      create: 'Erro ao criar empregador',
      update: 'Erro ao atualizar empregador',
      delete: 'Erro ao excluir empregador',
      load: 'Erro ao carregar empregadores',
      cnpjInvalid: 'CNPJ inválido',
      cepInvalid: 'CEP inválido'
    },
    tipos: {
      PJ: 'Pessoa Jurídica',
      PF: 'Pessoa Física'
    },
    estados: {
      AC: 'Acre',
      AL: 'Alagoas',
      AP: 'Amapá',
      AM: 'Amazonas',
      BA: 'Bahia',
      CE: 'Ceará',
      DF: 'Distrito Federal',
      ES: 'Espírito Santo',
      GO: 'Goiás',
      MA: 'Maranhão',
      MT: 'Mato Grosso',
      MS: 'Mato Grosso do Sul',
      MG: 'Minas Gerais',
      PA: 'Pará',
      PB: 'Paraíba',
      PR: 'Paraná',
      PE: 'Pernambuco',
      PI: 'Piauí',
      RJ: 'Rio de Janeiro',
      RN: 'Rio Grande do Norte',
      RS: 'Rio Grande do Sul',
      RO: 'Rondônia',
      RR: 'Roraima',
      SC: 'Santa Catarina',
      SP: 'São Paulo',
      SE: 'Sergipe',
      TO: 'Tocantins'
    }
  },
  en: {
    title: 'Employer',
    subtitle: 'Manage employer data',
    form: {
      title: 'Employer Form',
      fields: {
        nome: {
          label: 'Name',
          placeholder: 'Enter employer name'
        },
        cnpj: {
          label: 'CNPJ',
          placeholder: 'Enter CNPJ'
        },
        razaoSocial: {
          label: 'Corporate Name',
          placeholder: 'Enter corporate name'
        },
        tipo: {
          label: 'Type',
          placeholder: 'Select type'
        },
        telefone: {
          label: 'Phone',
          placeholder: 'Enter phone number'
        },
        email: {
          label: 'E-mail',
          placeholder: 'Enter e-mail'
        },
        endereco: {
          label: 'Address',
          placeholder: 'Enter address'
        },
        cidade: {
          label: 'City',
          placeholder: 'Enter city'
        },
        estado: {
          label: 'State',
          placeholder: 'Select state'
        },
        cep: {
          label: 'ZIP Code',
          placeholder: 'Enter ZIP code'
        },
        ativo: {
          label: 'Active'
        },
        observacoes: {
          label: 'Observations',
          placeholder: 'Enter observations'
        }
      }
    },
    validation: {
      nome: {
        required: 'Name is required',
        minLength: 'Name must have at least 3 characters',
        maxLength: 'Name must have at most 100 characters'
      },
      cnpj: {
        required: 'CNPJ is required',
        format: 'CNPJ must be in format XX.XXX.XXX/XXXX-XX'
      },
      razaoSocial: {
        required: 'Corporate Name is required',
        minLength: 'Corporate Name must have at least 3 characters'
      },
      tipo: {
        required: 'Type is required'
      },
      telefone: {
        required: 'Phone is required',
        format: 'Phone must be in format (XX) XXXXX-XXXX'
      },
      email: {
        required: 'E-mail is required',
        format: 'E-mail must be in valid format'
      },
      endereco: {
        required: 'Address is required',
        minLength: 'Address must have at least 10 characters'
      },
      cidade: {
        required: 'City is required'
      },
      estado: {
        required: 'State is required'
      },
      cep: {
        required: 'ZIP Code is required',
        format: 'ZIP Code must be in format XXXXX-XXX'
      }
    },
    success: {
      create: 'Employer created successfully!',
      update: 'Employer updated successfully!',
      delete: 'Employer deleted successfully!'
    },
    error: {
      create: 'Error creating employer',
      update: 'Error updating employer',
      delete: 'Error deleting employer',
      load: 'Error loading employers',
      cnpjInvalid: 'Invalid CNPJ',
      cepInvalid: 'Invalid ZIP Code'
    },
    tipos: {
      PJ: 'Legal Entity',
      PF: 'Individual'
    },
    estados: {
      AC: 'Acre',
      AL: 'Alagoas',
      AP: 'Amapá',
      AM: 'Amazonas',
      BA: 'Bahia',
      CE: 'Ceará',
      DF: 'Federal District',
      ES: 'Espírito Santo',
      GO: 'Goiás',
      MA: 'Maranhão',
      MT: 'Mato Grosso',
      MS: 'Mato Grosso do Sul',
      MG: 'Minas Gerais',
      PA: 'Pará',
      PB: 'Paraíba',
      PR: 'Paraná',
      PE: 'Pernambuco',
      PI: 'Piauí',
      RJ: 'Rio de Janeiro',
      RN: 'Rio Grande do Norte',
      RS: 'Rio Grande do Sul',
      RO: 'Rondônia',
      RR: 'Roraima',
      SC: 'Santa Catarina',
      SP: 'São Paulo',
      SE: 'Sergipe',
      TO: 'Tocantins'
    }
  }
}; 