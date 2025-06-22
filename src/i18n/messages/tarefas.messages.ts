/**
 * Arquivo: tarefas.messages.ts
 * Caminho: src/i18n/messages/tarefas.messages.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Mensagens centralizadas para o módulo de tarefas
 */

export const tarefasMessages = {
  pt: {
    titulo: 'Tarefas',
    status: {
      all: 'Todas',
      pending: 'Pendentes',
      in_progress: 'Em Progresso',
      completed: 'Concluídas',
      cancelled: 'Canceladas',
      overdue: 'Atrasadas',
    },
    labels: {
      status: 'Status',
      titulo: 'Título',
      descricao: 'Descrição',
      dataVencimento: 'Data de Vencimento',
      tempoEstimado: 'Tempo Estimado',
      prioridade: 'Prioridade',
      categoria: 'Categoria',
      adicionar: 'Adicionar Tarefa',
      editar: 'Editar Tarefa',
      remover: 'Remover Tarefa',
      concluir: 'Concluir Tarefa',
      cancelar: 'Cancelar Tarefa',
      buscar: 'Buscar tarefas...',
      placeholderTempo: 'ex: 1h, 30min',
    },
    erros: {
      carregar: 'Falha ao carregar as tarefas.',
      salvar: 'Erro ao salvar tarefa.',
      remover: 'Erro ao remover tarefa.',
      concluir: 'Erro ao concluir tarefa.',
    },
    estatisticas: {
      total: 'Total',
      pendentes: 'Pendentes',
      emProgresso: 'Em Progresso',
      concluidas: 'Concluídas',
      atrasadas: 'Atrasadas',
    },
    mensagens: {
      nenhuma: 'Nenhuma tarefa encontrada.',
      confirmRemover: 'Tem certeza que deseja remover esta tarefa?',
      confirmConcluir: 'Deseja marcar esta tarefa como concluída?',
      tarefaAdicionada: 'Tarefa adicionada com sucesso!',
      tarefaRemovida: 'Tarefa removida com sucesso!',
      tarefaConcluida: 'Tarefa concluída com sucesso!',
    },
  },
  en: {
    titulo: 'Tasks',
    status: {
      all: 'All',
      pending: 'Pending',
      in_progress: 'In Progress',
      completed: 'Completed',
      cancelled: 'Cancelled',
      overdue: 'Overdue',
    },
    labels: {
      status: 'Status',
      titulo: 'Title',
      descricao: 'Description',
      dataVencimento: 'Due Date',
      tempoEstimado: 'Estimated Time',
      prioridade: 'Priority',
      categoria: 'Category',
      adicionar: 'Add Task',
      editar: 'Edit Task',
      remover: 'Remove Task',
      concluir: 'Complete Task',
      cancelar: 'Cancel Task',
      buscar: 'Search tasks...',
      placeholderTempo: 'e.g.: 1h, 30min',
    },
    erros: {
      carregar: 'Failed to load tasks.',
      salvar: 'Error saving task.',
      remover: 'Error removing task.',
      concluir: 'Error completing task.',
    },
    estatisticas: {
      total: 'Total',
      pendentes: 'Pending',
      emProgresso: 'In Progress',
      concluidas: 'Completed',
      atrasadas: 'Overdue',
    },
    mensagens: {
      nenhuma: 'No tasks found.',
      confirmRemover: 'Are you sure you want to remove this task?',
      confirmConcluir: 'Do you want to mark this task as completed?',
      tarefaAdicionada: 'Task added successfully!',
      tarefaRemovida: 'Task removed successfully!',
      tarefaConcluida: 'Task completed successfully!',
    },
  },
}; 