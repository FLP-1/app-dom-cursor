/**
 * Arquivo: ponto.messages.ts
 * Caminho: src/i18n/messages/ponto.messages.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Mensagens centralizadas para o módulo de ponto eletrônico
 */

export const pontoMessages = {
  pt: {
    // Mensagens da página principal
    title: 'Ponto Eletrônico ⏰',
    subtitle: 'Controle de entrada e saída dos funcionários',
    loadError: 'Falha ao carregar os dados de ponto.',
    saveError: 'Erro ao salvar registro:',
    registerPonto: 'Registrar Ponto',
    editRecord: 'Editar Registro',
    todayRecords: 'Registros de Hoje',
    upcomingBreaks: 'Próximos Intervalos',
    recentRecords: 'Registros Recentes',
    weeklySummary: 'Resumo Semanal',
    
    // Estatísticas
    workedDays: 'Dias Trabalhados',
    totalHours: 'Total de Horas',
    overtimeHours: 'Horas Extras',
    lateDays: 'Dias com Atraso',
    
    // Campos do formulário
    employee: 'Funcionário',
    type: 'Tipo',
    time: 'Horário',
    location: 'Local',
    notes: 'Observações',
    
    // Tipos de registro
    entrada: 'Entrada',
    saida: 'Saída',
    breakStart: 'Início do Intervalo',
    breakEnd: 'Fim do Intervalo',
    
    // Status
    late: 'atraso',
    extras: 'extras',
    
    // Labels para tabelas e formulários
    labels: {
      funcionario: 'Funcionário',
      data: 'Data',
      entrada: 'Entrada',
      saida: 'Saída',
      entradaIntervalo: 'Início Intervalo',
      saidaIntervalo: 'Fim Intervalo',
      entradaAlmoco: 'Início Almoço',
      saidaAlmoco: 'Fim Almoço',
      totalHoras: 'Total de Horas',
      horasTrabalhadas: 'Horas Trabalhadas',
      horasExtras: 'Horas Extras',
      horasFaltantes: 'Horas Faltantes',
      observacao: 'Observação',
      status: 'Status',
      justificativa: 'Justificativa',
      aprovado: 'Aprovado',
      pendente: 'Pendente',
      rejeitado: 'Rejeitado',
      registrar: 'Registrar Ponto',
      editar: 'Editar Ponto',
      excluir: 'Excluir Ponto',
      aprovar: 'Aprovar Ponto',
      rejeitar: 'Rejeitar Ponto',
      justificar: 'Justificar Ponto',
      relatorio: 'Relatório de Ponto',
      filtros: 'Filtros',
      periodo: 'Período',
      funcionarios: 'Funcionários',
      buscar: 'Buscar registros de ponto...',
      sim: 'Sim',
      nao: 'Não',
      todos: 'Todos',
      acoes: 'Ações',
      alerta: 'Alerta',
      carregando: 'Carregando...',
      listaPonto: 'Lista de Ponto',
    },
    
    // Status
    status: {
      PENDENTE: 'Pendente',
      APROVADO: 'Aprovado',
      REJEITADO: 'Rejeitado',
      CORRIGIDO: 'Corrigido',
      JUSTIFICADO: 'Justificado',
    },
    
    // Tipos de registro
    tipos: {
      ENTRADA: 'Entrada',
      SAIDA: 'Saída',
      ENTRADA_ALMOCO: 'Início Almoço',
      SAIDA_ALMOCO: 'Fim Almoço',
      ENTRADA_INTERVALO: 'Início Intervalo',
      SAIDA_INTERVALO: 'Fim Intervalo',
    },
    
    // Mensagens de erro
    erros: {
      carregar: 'Falha ao carregar os registros de ponto.',
      salvar: 'Erro ao salvar registro de ponto.',
      excluir: 'Erro ao excluir registro de ponto.',
      aprovar: 'Erro ao aprovar registro de ponto.',
      rejeitar: 'Erro ao rejeitar registro de ponto.',
      justificar: 'Erro ao justificar registro de ponto.',
      relatorio: 'Erro ao gerar relatório de ponto.',
      horarioInvalido: 'Horário inválido.',
      horarioFuturo: 'Não é possível registrar ponto para horário futuro.',
      horarioDuplicado: 'Já existe registro para este horário.',
      horarioInconsistente: 'Horário inconsistente com registros anteriores.',
    },
    
    // Mensagens de sucesso
    mensagens: {
      nenhum: 'Nenhum registro de ponto encontrado.',
      pontoRegistrado: 'Ponto registrado com sucesso!',
      pontoSalvo: 'Ponto salvo com sucesso!',
      pontoExcluido: 'Ponto excluído com sucesso!',
      pontoAprovado: 'Ponto aprovado com sucesso!',
      pontoRejeitado: 'Ponto rejeitado com sucesso!',
      pontoJustificado: 'Ponto justificado com sucesso!',
      confirmExcluir: 'Tem certeza que deseja excluir este registro de ponto?',
      confirmAprovar: 'Tem certeza que deseja aprovar este registro de ponto?',
      confirmRejeitar: 'Tem certeza que deseja rejeitar este registro de ponto?',
      relatorioGerado: 'Relatório gerado com sucesso!',
      horarioObrigatorio: 'Horário é obrigatório.',
      dataObrigatoria: 'Data é obrigatória.',
      funcionarioObrigatorio: 'Funcionário é obrigatório.',
      justificativaObrigatoria: 'Justificativa é obrigatória.',
    },
    
    // Placeholders
    placeholders: {
      buscar: 'Buscar registros de ponto...',
      observacao: 'Digite uma observação...',
      justificativa: 'Digite a justificativa...',
      dataInicio: 'Data de início',
      dataFim: 'Data de fim',
    },
    
    // Tooltips
    tooltips: {
      registrar: 'Registrar novo ponto',
      editar: 'Editar registro de ponto',
      excluir: 'Excluir registro de ponto',
      aprovar: 'Aprovar registro de ponto',
      rejeitar: 'Rejeitar registro de ponto',
      justificar: 'Justificar registro de ponto',
      relatorio: 'Gerar relatório de ponto',
      filtros: 'Aplicar filtros',
      carregando: 'Carregando...',
      listaPonto: 'Lista de registros de ponto',
    },
  },
  
  en: {
    // Main page messages
    title: 'Time Clock ⏰',
    subtitle: 'Employee entry and exit control',
    loadError: 'Failed to load time clock data.',
    saveError: 'Error saving record:',
    registerPonto: 'Record Time',
    editRecord: 'Edit Record',
    todayRecords: 'Today\'s Records',
    upcomingBreaks: 'Upcoming Breaks',
    recentRecords: 'Recent Records',
    weeklySummary: 'Weekly Summary',
    
    // Statistics
    workedDays: 'Worked Days',
    totalHours: 'Total Hours',
    overtimeHours: 'Overtime Hours',
    lateDays: 'Late Days',
    
    // Form fields
    employee: 'Employee',
    type: 'Type',
    time: 'Time',
    location: 'Location',
    notes: 'Notes',
    
    // Record types
    entrada: 'Clock In',
    saida: 'Clock Out',
    breakStart: 'Break Start',
    breakEnd: 'Break End',
    
    // Status
    late: 'late',
    extras: 'overtime',
    
    // Labels for tables and forms
    labels: {
      funcionario: 'Employee',
      data: 'Date',
      entrada: 'Clock In',
      saida: 'Clock Out',
      entradaIntervalo: 'Break Start',
      saidaIntervalo: 'Break End',
      entradaAlmoco: 'Lunch Start',
      saidaAlmoco: 'Lunch End',
      totalHoras: 'Total Hours',
      horasTrabalhadas: 'Worked Hours',
      horasExtras: 'Overtime Hours',
      horasFaltantes: 'Missing Hours',
      observacao: 'Observation',
      status: 'Status',
      justificativa: 'Justification',
      aprovado: 'Approved',
      pendente: 'Pending',
      rejeitado: 'Rejected',
      registrar: 'Record Time',
      editar: 'Edit Time',
      excluir: 'Delete Time',
      aprovar: 'Approve Time',
      rejeitar: 'Reject Time',
      justificar: 'Justify Time',
      relatorio: 'Time Report',
      filtros: 'Filters',
      periodo: 'Period',
      funcionarios: 'Employees',
      buscar: 'Search time records...',
      sim: 'Yes',
      nao: 'No',
      todos: 'All',
      acoes: 'Actions',
      alerta: 'Alert',
      carregando: 'Loading...',
      listaPonto: 'Time Records List',
    },
    
    // Status
    status: {
      PENDENTE: 'Pending',
      APROVADO: 'Approved',
      REJEITADO: 'Rejected',
      CORRIGIDO: 'Corrected',
      JUSTIFICADO: 'Justified',
    },
    
    // Record types
    tipos: {
      ENTRADA: 'Clock In',
      SAIDA: 'Clock Out',
      ENTRADA_ALMOCO: 'Lunch Start',
      SAIDA_ALMOCO: 'Lunch End',
      ENTRADA_INTERVALO: 'Break Start',
      SAIDA_INTERVALO: 'Break End',
    },
    
    // Error messages
    erros: {
      carregar: 'Failed to load time records.',
      salvar: 'Error saving time record.',
      excluir: 'Error deleting time record.',
      aprovar: 'Error approving time record.',
      rejeitar: 'Error rejecting time record.',
      justificar: 'Error justifying time record.',
      relatorio: 'Error generating time report.',
      horarioInvalido: 'Invalid time.',
      horarioFuturo: 'Cannot record time for future hours.',
      horarioDuplicado: 'Record already exists for this time.',
      horarioInconsistente: 'Time inconsistent with previous records.',
    },
    
    // Success messages
    mensagens: {
      nenhum: 'No time records found.',
      pontoRegistrado: 'Time recorded successfully!',
      pontoSalvo: 'Time saved successfully!',
      pontoExcluido: 'Time deleted successfully!',
      pontoAprovado: 'Time approved successfully!',
      pontoRejeitado: 'Time rejected successfully!',
      pontoJustificado: 'Time justified successfully!',
      confirmExcluir: 'Are you sure you want to delete this time record?',
      confirmAprovar: 'Are you sure you want to approve this time record?',
      confirmRejeitar: 'Are you sure you want to reject this time record?',
      relatorioGerado: 'Report generated successfully!',
      horarioObrigatorio: 'Time is required.',
      dataObrigatoria: 'Date is required.',
      funcionarioObrigatorio: 'Employee is required.',
      justificativaObrigatoria: 'Justification is required.',
    },
    
    // Placeholders
    placeholders: {
      buscar: 'Search time records...',
      observacao: 'Enter an observation...',
      justificativa: 'Enter the justification...',
      dataInicio: 'Start date',
      dataFim: 'End date',
    },
    
    // Tooltips
    tooltips: {
      registrar: 'Record new time',
      editar: 'Edit time record',
      excluir: 'Delete time record',
      aprovar: 'Approve time record',
      rejeitar: 'Reject time record',
      justificar: 'Justify time record',
      relatorio: 'Generate time report',
      filtros: 'Apply filters',
      carregando: 'Loading...',
      listaPonto: 'Time records list',
    },
  },
}; 