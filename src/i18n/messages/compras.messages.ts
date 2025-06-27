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
        },
        produto: {
          label: 'Produto',
          placeholder: 'Digite o nome do produto'
        },
        unidade: {
          label: 'Unidade',
          placeholder: 'Selecione a unidade'
        },
        quantidade: {
          label: 'Quantidade',
          placeholder: 'Digite a quantidade'
        },
        dataCompra: {
          label: 'Data da Compra',
          placeholder: 'Selecione a data da compra'
        },
        grupo: {
          label: 'Grupo',
          placeholder: 'Selecione o grupo'
        },
        foto: {
          label: 'Foto',
          placeholder: 'Selecione uma imagem'
        }
      },
      ariaLabel: 'Formulário de compra',
      buttons: {
        save: 'Salvar',
        saving: 'Salvando...',
        cancel: 'Cancelar',
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
      load: 'Erro ao carregar compras',
      edit: 'Erro ao editar compra',
      fillRequiredFields: 'Preencha todos os campos obrigatórios.'
    },
    filters: {
      all: 'Todas',
      pending: 'Pendente',
      completed: 'Realizada',
      product: 'Produto',
      productFilter: 'Filtrar por produto',
      date: 'Data',
      dateFilter: 'Filtrar por data',
      group: 'Grupo',
      groupFilter: 'Filtrar por grupo',
      status: 'Status',
      statusFilter: 'Filtrar por status',
    },
    status: {
      pending: 'Pendente',
      completed: 'Realizada',
    },
    common: {
      save: 'Salvar',
      cancel: 'Cancelar',
    },
    header: {
      title: 'Compras',
      newPurchase: 'Nova Compra',
    },
    table: {
      photo: 'Foto',
      product: 'Produto',
      unit: 'Unidade',
      quantity: 'Quantidade',
      value: 'Valor',
      purchaseDate: 'Data da Compra',
      group: 'Grupo',
      status: 'Status',
      actions: 'Ações',
    },
    editDialog: {
      title: 'Editar Compra',
      save: 'Salvar',
      cancel: 'Cancelar',
      fields: {
        product: 'Produto',
        unit: 'Unidade',
        quantity: 'Quantidade',
        value: 'Valor',
        purchaseDate: 'Data da Compra',
        status: 'Status',
      }
    },
    confirmations: {
      delete: 'Tem certeza que deseja excluir esta compra?',
      edit: 'Tem certeza que deseja salvar as alterações?',
    },
    empty: {
      list: 'Nenhuma compra encontrada.'
    },
    tooltips: {
      edit: 'Editar compra',
      delete: 'Excluir compra',
      add: 'Adicionar nova compra',
      filter: 'Filtrar compras',
    },
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
        },
        produto: {
          label: 'Product',
          placeholder: 'Enter product name'
        },
        unidade: {
          label: 'Unit',
          placeholder: 'Select unit'
        },
        quantidade: {
          label: 'Quantity',
          placeholder: 'Enter quantity'
        },
        dataCompra: {
          label: 'Purchase Date',
          placeholder: 'Select purchase date'
        },
        grupo: {
          label: 'Group',
          placeholder: 'Select group'
        },
        foto: {
          label: 'Photo',
          placeholder: 'Select an image'
        }
      },
      ariaLabel: 'Purchase form',
      buttons: {
        save: 'Save',
        saving: 'Saving...',
        cancel: 'Cancel',
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
      load: 'Error loading purchases',
      edit: 'Error editing purchase',
      fillRequiredFields: 'Please fill in all required fields.'
    },
    filters: {
      all: 'All',
      pending: 'Pending',
      completed: 'Completed',
      product: 'Product',
      productFilter: 'Filter by product',
      date: 'Date',
      dateFilter: 'Filter by date',
      group: 'Group',
      groupFilter: 'Filter by group',
      status: 'Status',
      statusFilter: 'Filter by status',
    },
    status: {
      pending: 'Pending',
      completed: 'Completed',
    },
    common: {
      save: 'Save',
      cancel: 'Cancel',
    },
    header: {
      title: 'Purchases',
      newPurchase: 'New Purchase',
    },
    table: {
      photo: 'Photo',
      product: 'Product',
      unit: 'Unit',
      quantity: 'Quantity',
      value: 'Value',
      purchaseDate: 'Purchase Date',
      group: 'Group',
      status: 'Status',
      actions: 'Actions',
    },
    editDialog: {
      title: 'Edit Purchase',
      save: 'Save',
      cancel: 'Cancel',
      fields: {
        product: 'Product',
        unit: 'Unit',
        quantity: 'Quantity',
        value: 'Value',
        purchaseDate: 'Purchase Date',
        status: 'Status',
      }
    },
    confirmations: {
      delete: 'Are you sure you want to delete this purchase?',
      edit: 'Are you sure you want to save the changes?',
    },
    empty: {
      list: 'No purchases found.'
    },
    tooltips: {
      edit: 'Edit purchase',
      delete: 'Delete purchase',
      add: 'Add new purchase',
      filter: 'Filter purchases',
    },
  }
}; 