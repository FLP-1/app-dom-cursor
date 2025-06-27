/**
 * Arquivo: document.messages.ts
 * Caminho: src/i18n/messages/document.messages.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Mensagens centralizadas para o módulo de documentos
 */

export const documentMessages = {
  pt: {
    // Mensagens da página principal
    titulo: 'Documentos',
    
    // Header
    header: {
      title: 'Documentos 📄',
      subtitle: 'Gerencie todos os seus documentos de forma segura e organizada',
      uploadButton: 'Upload de Documento',
    },
    
    // Filtros
    filters: {
      searchPlaceholder: 'Buscar documentos...',
      categoryLabel: 'Categoria',
      categories: {
        all: 'Todas',
        personal: 'Pessoal',
        work: 'Trabalho',
        medical: 'Médico',
        financial: 'Financeiro',
        legal: 'Legal',
        other: 'Outros',
      },
    },
    
    // Sidebar
    sidebar: {
      recentUploads: {
        title: 'Uploads Recentes',
      },
      categories: {
        title: 'Categorias',
      },
      storage: {
        title: 'Armazenamento',
        used: 'utilizado',
      },
    },
    
    // Dialog de Upload
    uploadDialog: {
      title: 'Upload de Documento',
      fileInputLabel: 'Selecionar arquivo para upload',
      cancel: 'Cancelar',
    },
    
    // Labels para tabelas e formulários
    labels: {
      categoria: 'Categoria',
      nome: 'Nome',
      tipo: 'Tipo',
      dataUpload: 'Data de Upload',
      dataValidade: 'Data de Validade',
      tamanho: 'Tamanho',
      url: 'URL',
      isPublic: 'Público',
      upload: 'Upload',
      buscar: 'Buscar documentos...',
      adicionar: 'Adicionar Documento',
      editar: 'Editar Documento',
      remover: 'Remover Documento',
      visualizar: 'Visualizar Documento',
      download: 'Download',
      descricao: 'Descrição',
      tags: 'Tags',
      status: 'Status',
      acoes: 'Ações',
    },
    
    // Categorias
    categorias: {
      all: 'Todas',
      personal: 'Pessoal',
      work: 'Trabalho',
      medical: 'Médico',
      financial: 'Financeiro',
      legal: 'Legal',
      other: 'Outros',
    },
    
    // Tipos de documento
    tipos: {
      DOC_ADMISSAO_CTPS: 'CTPS',
      DOC_ADMISSAO_PIS: 'PIS',
      DOC_ADMISSAO_RG: 'RG',
      DOC_ADMISSAO_CPF: 'CPF',
      DOC_ADMISSAO_TITULO_ELEITOR: 'Título de Eleitor',
      DOC_ADMISSAO_RESERVISTA: 'Reservista',
      DOC_ADMISSAO_CERTIDAO_CASAMENTO: 'Certidão de Casamento',
      DOC_ADMISSAO_CERTIDAO_NASCIMENTO: 'Certidão de Nascimento',
      DOC_MEDICO_ASO_ADMISSIONAL: 'ASO Admissional',
      DOC_MEDICO_ASO_DEMISSIONAL: 'ASO Demissional',
      DOC_MEDICO_ASO_PERIODICO: 'ASO Periódico',
      DOC_MEDICO_ATESTADO: 'Atestado Médico',
      DOC_MEDICO_LAUDO: 'Laudo Médico',
      DOC_AFASTAMENTO_ACIDENTE_TRABALHO: 'Afastamento por Acidente de Trabalho',
      DOC_AFASTAMENTO_AUXILIO_DOENCA: 'Auxílio Doença',
      DOC_AFASTAMENTO_LICENCA_MATERNIDADE: 'Licença Maternidade',
      DOC_AFASTAMENTO_LICENCA_PATERNIDADE: 'Licença Paternidade',
      DOC_AFASTAMENTO_SERVICO_MILITAR: 'Serviço Militar',
      DOC_FERIAS_AVISO: 'Aviso de Férias',
      DOC_FERIAS_GOZO: 'Gozo de Férias',
      DOC_FERIAS_ABONO: 'Abono de Férias',
      DOC_RESCISAO_AVISO_PREVIO: 'Aviso Prévio',
      DOC_RESCISAO_TERMO: 'Termo de Rescisão',
      DOC_RESCISAO_QUITACAO: 'Quitação',
      DOC_OUTROS: 'Outros',
    },
    
    // Status
    status: {
      active: 'Ativo',
      archived: 'Arquivado',
      expired: 'Expirado',
      pending: 'Pendente',
      approved: 'Aprovado',
      rejected: 'Rejeitado',
    },
    
    // Mensagens de erro
    error: {
      loadData: 'Falha ao carregar os documentos.',
      upload: 'Erro ao fazer upload do documento.',
      salvar: 'Erro ao salvar documento.',
      remover: 'Erro ao remover documento.',
      download: 'Erro ao fazer download do documento.',
      visualizar: 'Erro ao visualizar documento.',
    },
    
    // Mensagens de sucesso
    mensagens: {
      nenhum: 'Nenhum documento encontrado.',
      uploadSucesso: 'Documento enviado com sucesso!',
      uploadErro: 'Erro ao enviar documento.',
      confirmRemover: 'Tem certeza que deseja remover este documento?',
      documentoRemovido: 'Documento removido com sucesso!',
      documentoSalvo: 'Documento salvo com sucesso!',
      selecionarArquivo: 'Selecionar arquivo para upload',
      documentoAtualizado: 'Documento atualizado com sucesso!',
      documentoBaixado: 'Documento baixado com sucesso!',
    },
    
    // Placeholders
    placeholders: {
      buscar: 'Buscar documentos...',
      nome: 'Digite o nome do documento...',
      descricao: 'Digite uma descrição...',
      tags: 'Digite as tags separadas por vírgula...',
    },
    
    // Tooltips
    tooltips: {
      upload: 'Fazer upload de novo documento',
      editar: 'Editar documento',
      excluir: 'Excluir documento',
      visualizar: 'Visualizar documento',
      download: 'Baixar documento',
      filtros: 'Aplicar filtros',
      carregando: 'Carregando...',
      listaDocumentos: 'Lista de documentos',
    },
    
    // Validação
    validation: {
      nome: {
        minLength: 'Nome deve ter pelo menos 3 caracteres',
        maxLength: 'Nome deve ter no máximo 100 caracteres',
        required: 'Nome é obrigatório',
      },
      tipo: {
        required: 'Tipo é obrigatório',
      },
      url: {
        required: 'URL é obrigatória',
        invalid: 'URL inválida',
      },
      arquivo: {
        required: 'Arquivo é obrigatório',
        tamanho: 'Arquivo deve ter no máximo 10MB',
        tipo: 'Tipo de arquivo não suportado',
      },
    },
  },
  
  en: {
    // Main page messages
    titulo: 'Documents',
    
    // Header
    header: {
      title: 'Documents 📄',
      subtitle: 'Manage all your documents safely and organized',
      uploadButton: 'Upload Document',
    },
    
    // Filters
    filters: {
      searchPlaceholder: 'Search documents...',
      categoryLabel: 'Category',
      categories: {
        all: 'All',
        personal: 'Personal',
        work: 'Work',
        medical: 'Medical',
        financial: 'Financial',
        legal: 'Legal',
        other: 'Other',
      },
    },
    
    // Sidebar
    sidebar: {
      recentUploads: {
        title: 'Recent Uploads',
      },
      categories: {
        title: 'Categories',
      },
      storage: {
        title: 'Storage',
        used: 'used',
      },
    },
    
    // Upload Dialog
    uploadDialog: {
      title: 'Upload Document',
      fileInputLabel: 'Select file for upload',
      cancel: 'Cancel',
    },
    
    // Labels for tables and forms
    labels: {
      categoria: 'Category',
      nome: 'Name',
      tipo: 'Type',
      dataUpload: 'Upload Date',
      dataValidade: 'Expiration Date',
      tamanho: 'Size',
      url: 'URL',
      isPublic: 'Public',
      upload: 'Upload',
      buscar: 'Search documents...',
      adicionar: 'Add Document',
      editar: 'Edit Document',
      remover: 'Remove Document',
      visualizar: 'View Document',
      download: 'Download',
      descricao: 'Description',
      tags: 'Tags',
      status: 'Status',
      acoes: 'Actions',
    },
    
    // Categories
    categorias: {
      all: 'All',
      personal: 'Personal',
      work: 'Work',
      medical: 'Medical',
      financial: 'Financial',
      legal: 'Legal',
      other: 'Other',
    },
    
    // Document types
    tipos: {
      DOC_ADMISSAO_CTPS: 'Work Card',
      DOC_ADMISSAO_PIS: 'PIS',
      DOC_ADMISSAO_RG: 'ID Card',
      DOC_ADMISSAO_CPF: 'CPF',
      DOC_ADMISSAO_TITULO_ELEITOR: 'Voter ID',
      DOC_ADMISSAO_RESERVISTA: 'Military Service',
      DOC_ADMISSAO_CERTIDAO_CASAMENTO: 'Marriage Certificate',
      DOC_ADMISSAO_CERTIDAO_NASCIMENTO: 'Birth Certificate',
      DOC_MEDICO_ASO_ADMISSIONAL: 'Pre-employment Medical Exam',
      DOC_MEDICO_ASO_DEMISSIONAL: 'Termination Medical Exam',
      DOC_MEDICO_ASO_PERIODICO: 'Periodic Medical Exam',
      DOC_MEDICO_ATESTADO: 'Medical Certificate',
      DOC_MEDICO_LAUDO: 'Medical Report',
      DOC_AFASTAMENTO_ACIDENTE_TRABALHO: 'Work Accident Leave',
      DOC_AFASTAMENTO_AUXILIO_DOENCA: 'Sick Leave',
      DOC_AFASTAMENTO_LICENCA_MATERNIDADE: 'Maternity Leave',
      DOC_AFASTAMENTO_LICENCA_PATERNIDADE: 'Paternity Leave',
      DOC_AFASTAMENTO_SERVICO_MILITAR: 'Military Service Leave',
      DOC_FERIAS_AVISO: 'Vacation Notice',
      DOC_FERIAS_GOZO: 'Vacation Period',
      DOC_FERIAS_ABONO: 'Vacation Bonus',
      DOC_RESCISAO_AVISO_PREVIO: 'Notice Period',
      DOC_RESCISAO_TERMO: 'Termination Agreement',
      DOC_RESCISAO_QUITACAO: 'Termination Receipt',
      DOC_OUTROS: 'Others',
    },
    
    // Status
    status: {
      active: 'Active',
      archived: 'Archived',
      expired: 'Expired',
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
    },
    
    // Error messages
    error: {
      loadData: 'Failed to load documents.',
      upload: 'Error uploading document.',
      salvar: 'Error saving document.',
      remover: 'Error removing document.',
      download: 'Error downloading document.',
      visualizar: 'Error viewing document.',
    },
    
    // Success messages
    mensagens: {
      nenhum: 'No documents found.',
      uploadSucesso: 'Document uploaded successfully!',
      uploadErro: 'Error uploading document.',
      confirmRemover: 'Are you sure you want to remove this document?',
      documentoRemovido: 'Document removed successfully!',
      documentoSalvo: 'Document saved successfully!',
      selecionarArquivo: 'Select file for upload',
      documentoAtualizado: 'Document updated successfully!',
      documentoBaixado: 'Document downloaded successfully!',
    },
    
    // Placeholders
    placeholders: {
      buscar: 'Search documents...',
      nome: 'Enter document name...',
      descricao: 'Enter a description...',
      tags: 'Enter tags separated by commas...',
    },
    
    // Tooltips
    tooltips: {
      upload: 'Upload new document',
      editar: 'Edit document',
      excluir: 'Delete document',
      visualizar: 'View document',
      download: 'Download document',
      filtros: 'Apply filters',
      carregando: 'Loading...',
      listaDocumentos: 'Documents list',
    },
    
    // Validation
    validation: {
      nome: {
        minLength: 'Name must have at least 3 characters',
        maxLength: 'Name must have maximum 100 characters',
        required: 'Name is required',
      },
      tipo: {
        required: 'Type is required',
      },
      url: {
        required: 'URL is required',
        invalid: 'Invalid URL',
      },
      arquivo: {
        required: 'File is required',
        tamanho: 'File must be maximum 10MB',
        tipo: 'File type not supported',
      },
    },
  },
}; 