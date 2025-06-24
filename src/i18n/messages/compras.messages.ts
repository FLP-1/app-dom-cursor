/**
 * Arquivo: compras.messages.ts
 * Caminho: src/i18n/messages/compras.messages.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Mensagens para o módulo de compras
 */

export const comprasMessages = {
  pt: {
    title: 'Compras',
    new: 'Nova Compra',
    edit: 'Editar Compra',
    delete: 'Excluir Compra',
    list: 'Lista de Compras',
    form: {
      title: 'Formulário de Compra',
      fields: {
        descricao: {
          label: 'Descrição',
          placeholder: 'Digite a descrição da compra'
        },
        valor: {
          label: 'Valor',
          placeholder: 'Digite o valor'
        },
        data: {
          label: 'Data',
          placeholder: 'Selecione a data'
        },
        categoria: {
          label: 'Categoria',
          placeholder: 'Selecione a categoria'
        },
        fornecedor: {
          label: 'Fornecedor',
          placeholder: 'Digite o fornecedor'
        }
      }
    },
    validation: {
      descricao: {
        required: 'Descrição é obrigatória',
        minLength: 'Descrição deve ter pelo menos 3 caracteres'
      },
      valor: {
        required: 'Valor é obrigatório',
        positive: 'Valor deve ser positivo'
      },
      data: {
        required: 'Data é obrigatória'
      },
      categoria: {
        required: 'Categoria é obrigatória'
      }
    },
    success: {
      create: 'Compra criada com sucesso!',
      update: 'Compra atualizada com sucesso!',
      delete: 'Compra excluída com sucesso!'
    },
    error: {
      create: 'Erro ao criar compra',
      update: 'Erro ao atualizar compra',
      delete: 'Erro ao excluir compra',
      load: 'Erro ao carregar compras'
    }
  },
  en: {
    title: 'Purchases',
    new: 'New Purchase',
    edit: 'Edit Purchase',
    delete: 'Delete Purchase',
    list: 'Purchase List',
    form: {
      title: 'Purchase Form',
      fields: {
        descricao: {
          label: 'Description',
          placeholder: 'Enter purchase description'
        },
        valor: {
          label: 'Value',
          placeholder: 'Enter value'
        },
        data: {
          label: 'Date',
          placeholder: 'Select date'
        },
        categoria: {
          label: 'Category',
          placeholder: 'Select category'
        },
        fornecedor: {
          label: 'Supplier',
          placeholder: 'Enter supplier'
        }
      }
    },
    validation: {
      descricao: {
        required: 'Description is required',
        minLength: 'Description must have at least 3 characters'
      },
      valor: {
        required: 'Value is required',
        positive: 'Value must be positive'
      },
      data: {
        required: 'Date is required'
      },
      categoria: {
        required: 'Category is required'
      }
    },
    success: {
      create: 'Purchase created successfully!',
      update: 'Purchase updated successfully!',
      delete: 'Purchase deleted successfully!'
    },
    error: {
      create: 'Error creating purchase',
      update: 'Error updating purchase',
      delete: 'Error deleting purchase',
      load: 'Error loading purchases'
    }
  }
}; 