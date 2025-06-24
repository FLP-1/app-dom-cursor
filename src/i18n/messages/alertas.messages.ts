/**
 * Arquivo: alertas.messages.ts
 * Caminho: src/i18n/messages/alertas.messages.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Mensagens para o módulo de alertas
 */

export const alertasMessages = {
  pt: {
    title: 'Alertas',
    new: 'Novo Alerta',
    edit: 'Editar Alerta',
    delete: 'Excluir Alerta',
    list: 'Lista de Alertas',
    form: {
      title: 'Formulário de Alerta',
      fields: {
        titulo: {
          label: 'Título',
          placeholder: 'Digite o título do alerta'
        },
        descricao: {
          label: 'Descrição',
          placeholder: 'Digite a descrição do alerta'
        },
        tipo: {
          label: 'Tipo',
          placeholder: 'Selecione o tipo'
        },
        prioridade: {
          label: 'Prioridade',
          placeholder: 'Selecione a prioridade'
        }
      }
    },
    validation: {
      titulo: {
        required: 'Título é obrigatório',
        minLength: 'Título deve ter pelo menos 3 caracteres'
      },
      descricao: {
        required: 'Descrição é obrigatória',
        minLength: 'Descrição deve ter pelo menos 10 caracteres'
      },
      tipo: {
        required: 'Tipo é obrigatório'
      },
      prioridade: {
        required: 'Prioridade é obrigatória'
      }
    },
    success: {
      create: 'Alerta criado com sucesso!',
      update: 'Alerta atualizado com sucesso!',
      delete: 'Alerta excluído com sucesso!'
    },
    error: {
      create: 'Erro ao criar alerta',
      update: 'Erro ao atualizar alerta',
      delete: 'Erro ao excluir alerta',
      load: 'Erro ao carregar alertas'
    }
  },
  en: {
    title: 'Alerts',
    new: 'New Alert',
    edit: 'Edit Alert',
    delete: 'Delete Alert',
    list: 'Alert List',
    form: {
      title: 'Alert Form',
      fields: {
        titulo: {
          label: 'Title',
          placeholder: 'Enter alert title'
        },
        descricao: {
          label: 'Description',
          placeholder: 'Enter alert description'
        },
        tipo: {
          label: 'Type',
          placeholder: 'Select type'
        },
        prioridade: {
          label: 'Priority',
          placeholder: 'Select priority'
        }
      }
    },
    validation: {
      titulo: {
        required: 'Title is required',
        minLength: 'Title must have at least 3 characters'
      },
      descricao: {
        required: 'Description is required',
        minLength: 'Description must have at least 10 characters'
      },
      tipo: {
        required: 'Type is required'
      },
      prioridade: {
        required: 'Priority is required'
      }
    },
    success: {
      create: 'Alert created successfully!',
      update: 'Alert updated successfully!',
      delete: 'Alert deleted successfully!'
    },
    error: {
      create: 'Error creating alert',
      update: 'Error updating alert',
      delete: 'Error deleting alert',
      load: 'Error loading alerts'
    }
  }
}; 