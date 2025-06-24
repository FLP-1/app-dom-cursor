/**
 * Arquivo: messages.ts
 * Caminho: src/i18n/messages.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-01-27
 * Descrição: Mensagens centralizadas da aplicação
 */

export const MESSAGES = {
  required: 'Campo obrigatório',
  invalidEmail: 'E-mail inválido',
  createSuccess: 'Cadastro realizado com sucesso!',
  updateSuccess: 'Cadastro atualizado com sucesso!',
  genericError: 'Ocorreu um erro inesperado. Tente novamente.',
  deleteSuccess: 'Registro excluído com sucesso!',
  notFound: 'Registro não encontrado.',
  invalidDate: 'Data inválida',
  requiredDate: 'Data obrigatória',
  dateInFuture: 'A data não pode ser no futuro',
  dateInPast: 'A data não pode ser no passado',
  invalidDateFormat: 'Formato de data inválido (use dd/mm/aaaa)',
  // Adicione outras mensagens padronizadas conforme necessidade
  success: {
    create: 'Registro criado com sucesso!',
    update: 'Registro atualizado com sucesso!',
  },
  error: {
    generic: 'Ocorreu um erro ao processar sua solicitação.',
  },
};

// Mensagens para autenticação
export const authMessages = {
  pt: {
    labels: {
      email: 'E-mail',
      senha: 'Senha',
      nome: 'Nome',
      telefone: 'Telefone',
      cpf: 'CPF',
      dataNascimento: 'Data de Nascimento',
      sexo: 'Sexo',
      masculino: 'Masculino',
      feminino: 'Feminino',
      verificado: 'Verificado',
      naoVerificado: 'Não Verificado',
    },
    placeholders: {
      email: 'Digite seu e-mail',
      senha: 'Digite sua senha',
      telefone: 'Digite seu telefone',
    },
    erros: {
      emailInvalido: 'E-mail inválido',
      senhaInvalida: 'Senha inválida',
      telefoneInvalido: 'Telefone inválido',
      cpfInvalido: 'CPF inválido',
    },
  },
  en: {
    labels: {
      email: 'Email',
      senha: 'Password',
      nome: 'Name',
      telefone: 'Phone',
      cpf: 'CPF',
      dataNascimento: 'Birth Date',
      sexo: 'Gender',
      masculino: 'Male',
      feminino: 'Female',
      verificado: 'Verified',
      naoVerificado: 'Not Verified',
    },
    placeholders: {
      email: 'Enter your email',
      senha: 'Enter your password',
      telefone: 'Enter your phone',
    },
    erros: {
      emailInvalido: 'Invalid email',
      senhaInvalida: 'Invalid password',
      telefoneInvalido: 'Invalid phone',
      cpfInvalido: 'Invalid CPF',
    },
  },
};

// Mensagens para alertas
export const alertMessages = {
  pt: {
    labels: {
      titulo: 'Título',
      tipo: 'Tipo',
      prioridade: 'Prioridade',
      status: 'Status',
      data: 'Data',
      acoes: 'Ações',
    },
    status: {
      ativo: 'Ativo',
      inativo: 'Inativo',
      pendente: 'Pendente',
    },
    tooltips: {
      novo: 'Novo alerta',
      editar: 'Editar alerta',
      excluir: 'Excluir alerta',
    },
  },
  en: {
    labels: {
      titulo: 'Title',
      tipo: 'Type',
      prioridade: 'Priority',
      status: 'Status',
      data: 'Date',
      acoes: 'Actions',
    },
    status: {
      ativo: 'Active',
      inativo: 'Inactive',
      pendente: 'Pending',
    },
    tooltips: {
      novo: 'New alert',
      editar: 'Edit alert',
      excluir: 'Delete alert',
    },
  },
};

// Mensagens para tarefas
export const tarefaMessages = {
  pt: {
    labels: {
      titulo: 'Título',
      descricao: 'Descrição',
      responsavel: 'Responsável',
      prioridade: 'Prioridade',
      status: 'Status',
      dataInicio: 'Data de Início',
      dataFim: 'Data de Fim',
      acoes: 'Ações',
    },
    status: {
      pendente: 'Pendente',
      emAndamento: 'Em Andamento',
      concluida: 'Concluída',
      cancelada: 'Cancelada',
    },
    prioridades: {
      baixa: 'Baixa',
      media: 'Média',
      alta: 'Alta',
      urgente: 'Urgente',
    },
    tooltips: {
      novo: 'Nova tarefa',
      editar: 'Editar tarefa',
      excluir: 'Excluir tarefa',
      concluir: 'Concluir tarefa',
    },
  },
  en: {
    labels: {
      titulo: 'Title',
      descricao: 'Description',
      responsavel: 'Responsible',
      prioridade: 'Priority',
      status: 'Status',
      dataInicio: 'Start Date',
      dataFim: 'End Date',
      acoes: 'Actions',
    },
    status: {
      pendente: 'Pending',
      emAndamento: 'In Progress',
      concluida: 'Completed',
      cancelada: 'Cancelled',
    },
    prioridades: {
      baixa: 'Low',
      media: 'Medium',
      alta: 'High',
      urgente: 'Urgent',
    },
    tooltips: {
      novo: 'New task',
      editar: 'Edit task',
      excluir: 'Delete task',
      concluir: 'Complete task',
    },
  },
};

// Mensagens para ponto
export const pontoMessages = {
  pt: {
    labels: {
      funcionario: 'Funcionário',
      data: 'Data',
      entrada: 'Entrada',
      saida: 'Saída',
      horasTrabalhadas: 'Horas Trabalhadas',
      horasExtras: 'Horas Extras',
      aprovado: 'Aprovado',
      alerta: 'Alerta',
      acoes: 'Ações',
    },
    tooltips: {
      filtros: 'Filtros',
      carregando: 'Carregando...',
      listaPonto: 'Lista de Ponto',
    },
  },
  en: {
    labels: {
      funcionario: 'Employee',
      data: 'Date',
      entrada: 'Entry',
      saida: 'Exit',
      horasTrabalhadas: 'Worked Hours',
      horasExtras: 'Overtime',
      aprovado: 'Approved',
      alerta: 'Alert',
      acoes: 'Actions',
    },
    tooltips: {
      filtros: 'Filters',
      carregando: 'Loading...',
      listaPonto: 'Time Sheet',
    },
  },
};

// Mensagens para financeiro
export const financeiroMessages = {
  pt: {
    labels: {
      tipo: 'Tipo',
      valor: 'Valor',
      data: 'Data',
      vencimento: 'Vencimento',
      status: 'Status',
      parcelas: 'Parcelas',
      acoes: 'Ações',
    },
    status: {
      PENDENTE: 'Pendente',
      APROVADO: 'Aprovado',
      REJEITADO: 'Rejeitado',
      PAGO: 'Pago',
      CANCELADO: 'Cancelado',
    },
    tooltips: {
      aprovar: 'Aprovar',
      rejeitar: 'Rejeitar',
      registrar: 'Registrar',
      editar: 'Editar',
      excluir: 'Excluir',
    },
  },
  en: {
    labels: {
      tipo: 'Type',
      valor: 'Value',
      data: 'Date',
      vencimento: 'Due Date',
      status: 'Status',
      parcelas: 'Installments',
      acoes: 'Actions',
    },
    status: {
      PENDENTE: 'Pending',
      APROVADO: 'Approved',
      REJEITADO: 'Rejected',
      PAGO: 'Paid',
      CANCELADO: 'Cancelled',
    },
    tooltips: {
      aprovar: 'Approve',
      rejeitar: 'Reject',
      registrar: 'Register',
      editar: 'Edit',
      excluir: 'Delete',
    },
  },
};

// Mensagens para dashboard
export const dashboardMessages = {
  pt: {
    labels: {
      titulo: 'Dashboard',
      totalFuncionarios: 'Total de Funcionários',
      totalTarefas: 'Total de Tarefas',
      totalDocumentos: 'Total de Documentos',
      totalAlertas: 'Total de Alertas',
    },
  },
  en: {
    labels: {
      titulo: 'Dashboard',
      totalFuncionarios: 'Total Employees',
      totalTarefas: 'Total Tasks',
      totalDocumentos: 'Total Documents',
      totalAlertas: 'Total Alerts',
    },
  },
};

// Mensagens para família
export const familiaMessages = {
  pt: {
    labels: {
      titulo: 'Família',
      nome: 'Nome',
      parentesco: 'Parentesco',
      dataNascimento: 'Data de Nascimento',
      acoes: 'Ações',
    },
  },
  en: {
    labels: {
      titulo: 'Family',
      nome: 'Name',
      parentesco: 'Relationship',
      dataNascimento: 'Birth Date',
      acoes: 'Actions',
    },
  },
};

export const empregadoDomesticoMessages = {
  pt: {
    required: 'Campo obrigatório',
    invalidEmail: 'E-mail inválido',
    createSuccess: 'Empregado doméstico cadastrado com sucesso!',
    updateSuccess: 'Empregado doméstico atualizado com sucesso!',
    genericError: 'Ocorreu um erro inesperado. Tente novamente.',
    deleteSuccess: 'Registro excluído com sucesso!',
    notFound: 'Registro não encontrado.',
    invalidDate: 'Data inválida',
    requiredDate: 'Data obrigatória',
    dateInFuture: 'A data não pode ser no futuro',
    dateInPast: 'A data não pode ser no passado',
    invalidDateFormat: 'Formato de data inválido (use dd/mm/aaaa)',
    invalidCPF: 'CPF inválido',
    invalidCEP: 'CEP inválido',
    invalidUF: 'UF deve ter 2 caracteres',
    invalidCTPSNumber: 'Número da CTPS inválido',
    invalidCTPSSeries: 'Série da CTPS inválida',
    invalidPIS: 'PIS/PASEP inválido',
    negativeSalary: 'Remuneração não pode ser negativa'
  },
  en: {
    required: 'Required field',
    invalidEmail: 'Invalid email',
    createSuccess: 'Domestic worker registered successfully!',
    updateSuccess: 'Domestic worker updated successfully!',
    genericError: 'An unexpected error occurred. Please try again.',
    deleteSuccess: 'Record deleted successfully!',
    notFound: 'Record not found.',
    invalidDate: 'Invalid date',
    requiredDate: 'Date is required',
    dateInFuture: 'Date cannot be in the future',
    dateInPast: 'Date cannot be in the past',
    invalidDateFormat: 'Invalid date format (use dd/mm/yyyy)',
    invalidCPF: 'Invalid CPF',
    invalidCEP: 'Invalid postal code',
    invalidUF: 'State must have 2 characters',
    invalidCTPSNumber: 'Invalid CTPS number',
    invalidCTPSSeries: 'Invalid CTPS series',
    invalidPIS: 'Invalid PIS/PASEP',
    negativeSalary: 'Salary cannot be negative'
  },
};

export const documentMessages = {
  pt: {
    filterType: 'Tipo',
    filterStatus: 'Status',
    filterGroup: 'Grupo',
    filterCategory: 'Categoria',
    filterSearch: 'Buscar documento',
    filterExpiresAt: 'Vencimento até',
    filterButton: 'Buscar',
    tableName: 'Nome',
    tableType: 'Tipo',
    tableUploadedAt: 'Data de Upload',
    tableExpiresAt: 'Vencimento',
    tableGroup: 'Grupo',
    tableStatus: 'Status',
    tableCategory: 'Categoria',
    tableActions: 'Ações',
    actionView: 'Visualizar',
    actionDownload: 'Baixar',
    actionDelete: 'Excluir',
    empty: 'Nenhum documento encontrado.',
    loading: 'Carregando documentos...',
    error: 'Erro ao buscar documentos. Tente novamente.',
  },
  en: {
    filterType: 'Type',
    filterStatus: 'Status',
    filterGroup: 'Group',
    filterCategory: 'Category',
    filterSearch: 'Search document',
    filterExpiresAt: 'Expires at',
    filterButton: 'Search',
    tableName: 'Name',
    tableType: 'Type',
    tableUploadedAt: 'Upload Date',
    tableExpiresAt: 'Expires',
    tableGroup: 'Group',
    tableStatus: 'Status',
    tableCategory: 'Category',
    tableActions: 'Actions',
    actionView: 'View',
    actionDownload: 'Download',
    actionDelete: 'Delete',
    empty: 'No documents found.',
    loading: 'Loading documents...',
    error: 'Error fetching documents. Please try again.',
  },
};

// Mensagens comuns
export const commonMessages = {
  pt: {
    labels: {
      titulo: 'Título',
      nome: 'Nome',
      email: 'E-mail',
      telefone: 'Telefone',
      data: 'Data',
      status: 'Status',
      acoes: 'Ações',
      buscar: 'Buscar',
      filtrar: 'Filtrar',
      limpar: 'Limpar',
      salvar: 'Salvar',
      cancelar: 'Cancelar',
      editar: 'Editar',
      excluir: 'Excluir',
      visualizar: 'Visualizar',
      novo: 'Novo',
      voltar: 'Voltar',
      proximo: 'Próximo',
      anterior: 'Anterior',
    },
    status: {
      ativo: 'Ativo',
      inativo: 'Inativo',
      pendente: 'Pendente',
      aprovado: 'Aprovado',
      rejeitado: 'Rejeitado',
      concluido: 'Concluído',
      cancelado: 'Cancelado',
    },
    placeholders: {
      buscar: 'Digite para buscar...',
      selecionar: 'Selecione uma opção',
      data: 'dd/mm/aaaa',
      email: 'Digite seu e-mail',
      telefone: 'Digite seu telefone',
    },
    messages: {
      carregando: 'Carregando...',
      nenhumRegistro: 'Nenhum registro encontrado.',
      erroCarregar: 'Erro ao carregar dados. Tente novamente.',
      sucessoSalvar: 'Dados salvos com sucesso!',
      sucessoExcluir: 'Registro excluído com sucesso!',
      confirmarExclusao: 'Tem certeza que deseja excluir este registro?',
      sim: 'Sim',
      nao: 'Não',
    },
  },
  en: {
    labels: {
      titulo: 'Title',
      nome: 'Name',
      email: 'Email',
      telefone: 'Phone',
      data: 'Date',
      status: 'Status',
      acoes: 'Actions',
      buscar: 'Search',
      filtrar: 'Filter',
      limpar: 'Clear',
      salvar: 'Save',
      cancelar: 'Cancel',
      editar: 'Edit',
      excluir: 'Delete',
      visualizar: 'View',
      novo: 'New',
      voltar: 'Back',
      proximo: 'Next',
      anterior: 'Previous',
    },
    status: {
      ativo: 'Active',
      inativo: 'Inactive',
      pendente: 'Pending',
      aprovado: 'Approved',
      rejeitado: 'Rejected',
      concluido: 'Completed',
      cancelado: 'Cancelled',
    },
    placeholders: {
      buscar: 'Type to search...',
      selecionar: 'Select an option',
      data: 'mm/dd/yyyy',
      email: 'Enter your email',
      telefone: 'Enter your phone',
    },
    messages: {
      carregando: 'Loading...',
      nenhumRegistro: 'No records found.',
      erroCarregar: 'Error loading data. Please try again.',
      sucessoSalvar: 'Data saved successfully!',
      sucessoExcluir: 'Record deleted successfully!',
      confirmarExclusao: 'Are you sure you want to delete this record?',
      sim: 'Yes',
      nao: 'No',
    },
  },
};

// Exportação padrão para compatibilidade
export const messages = {
  auth: authMessages,
  alert: alertMessages,
  tarefa: tarefaMessages,
  document: documentMessages,
  ponto: pontoMessages,
  financeiro: financeiroMessages,
  dashboard: dashboardMessages,
  familia: familiaMessages,
  common: commonMessages,
}; 
