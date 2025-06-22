/**
 * Arquivo: useMessages.ts
 * Caminho: src/hooks/useMessages.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Hook personalizado para gerenciar mensagens centralizadas com suporte a múltiplos idiomas
 */

import { useLanguage } from '@/contexts/LanguageContext';
import { 
  alertMessages, 
  tarefaMessages, 
  documentMessages, 
  pontoMessages, 
  financeiroMessages, 
  dashboardMessages, 
  familiaMessages, 
  authMessages 
} from '@/i18n/messages';

export const useMessages = () => {
  const { language, t } = useLanguage();

  const getMessage = (key: string, messages: any): string => {
    return t(key, messages);
  };

  const alerts = {
    labels: {
      titulo: getMessage('labels.titulo', alertMessages),
      tipo: getMessage('labels.tipo', alertMessages),
      prioridade: getMessage('labels.prioridade', alertMessages),
      status: getMessage('labels.status', alertMessages),
      data: getMessage('labels.data', alertMessages),
      acoes: getMessage('labels.acoes', alertMessages),
    },
    status: {
      ativo: getMessage('status.ativo', alertMessages),
      inativo: getMessage('status.inativo', alertMessages),
      pendente: getMessage('status.pendente', alertMessages),
    },
    tooltips: {
      novo: getMessage('tooltips.novo', alertMessages),
      editar: getMessage('tooltips.editar', alertMessages),
      excluir: getMessage('tooltips.excluir', alertMessages),
    },
  };

  const tarefas = {
    labels: {
      titulo: getMessage('labels.titulo', tarefaMessages),
      descricao: getMessage('labels.descricao', tarefaMessages),
      responsavel: getMessage('labels.responsavel', tarefaMessages),
      prioridade: getMessage('labels.prioridade', tarefaMessages),
      status: getMessage('labels.status', tarefaMessages),
      dataInicio: getMessage('labels.dataInicio', tarefaMessages),
      dataFim: getMessage('labels.dataFim', tarefaMessages),
      acoes: getMessage('labels.acoes', tarefaMessages),
    },
    status: {
      pendente: getMessage('status.pendente', tarefaMessages),
      emAndamento: getMessage('status.emAndamento', tarefaMessages),
      concluida: getMessage('status.concluida', tarefaMessages),
      cancelada: getMessage('status.cancelada', tarefaMessages),
    },
    prioridades: {
      baixa: getMessage('prioridades.baixa', tarefaMessages),
      media: getMessage('prioridades.media', tarefaMessages),
      alta: getMessage('prioridades.alta', tarefaMessages),
      urgente: getMessage('prioridades.urgente', tarefaMessages),
    },
    tooltips: {
      novo: getMessage('tooltips.novo', tarefaMessages),
      editar: getMessage('tooltips.editar', tarefaMessages),
      excluir: getMessage('tooltips.excluir', tarefaMessages),
      concluir: getMessage('tooltips.concluir', tarefaMessages),
    },
  };

  const documentos = {
    labels: {
      titulo: getMessage('labels.titulo', documentMessages),
      nome: getMessage('labels.nome', documentMessages),
      tipo: getMessage('labels.tipo', documentMessages),
      tamanho: getMessage('labels.tamanho', documentMessages),
      dataUpload: getMessage('labels.dataUpload', documentMessages),
      status: getMessage('labels.status', documentMessages),
      acoes: getMessage('labels.acoes', documentMessages),
    },
    status: {
      pendente: getMessage('status.pendente', documentMessages),
      aprovado: getMessage('status.aprovado', documentMessages),
      rejeitado: getMessage('status.rejeitado', documentMessages),
    },
    tooltips: {
      upload: getMessage('tooltips.upload', documentMessages),
      download: getMessage('tooltips.download', documentMessages),
      visualizar: getMessage('tooltips.visualizar', documentMessages),
      excluir: getMessage('tooltips.excluir', documentMessages),
    },
  };

  const ponto = {
    labels: {
      funcionario: getMessage('labels.funcionario', pontoMessages),
      data: getMessage('labels.data', pontoMessages),
      entrada: getMessage('labels.entrada', pontoMessages),
      saida: getMessage('labels.saida', pontoMessages),
      horasTrabalhadas: getMessage('labels.horasTrabalhadas', pontoMessages),
      horasExtras: getMessage('labels.horasExtras', pontoMessages),
      aprovado: getMessage('labels.aprovado', pontoMessages),
      alerta: getMessage('labels.alerta', pontoMessages),
      acoes: getMessage('labels.acoes', pontoMessages),
    },
    tooltips: {
      filtros: getMessage('tooltips.filtros', pontoMessages),
      carregando: getMessage('tooltips.carregando', pontoMessages),
      listaPonto: getMessage('tooltips.listaPonto', pontoMessages),
    },
  };

  const financeiro = {
    labels: {
      tipo: getMessage('labels.tipo', financeiroMessages),
      valor: getMessage('labels.valor', financeiroMessages),
      data: getMessage('labels.data', financeiroMessages),
      vencimento: getMessage('labels.vencimento', financeiroMessages),
      status: getMessage('labels.status', financeiroMessages),
      parcelas: getMessage('labels.parcelas', financeiroMessages),
      acoes: getMessage('labels.acoes', financeiroMessages),
    },
    status: {
      PENDENTE: getMessage('status.PENDENTE', financeiroMessages),
      APROVADO: getMessage('status.APROVADO', financeiroMessages),
      REJEITADO: getMessage('status.REJEITADO', financeiroMessages),
      PAGO: getMessage('status.PAGO', financeiroMessages),
      CANCELADO: getMessage('status.CANCELADO', financeiroMessages),
    },
    tooltips: {
      aprovar: getMessage('tooltips.aprovar', financeiroMessages),
      rejeitar: getMessage('tooltips.rejeitar', financeiroMessages),
      registrar: getMessage('tooltips.registrar', financeiroMessages),
      editar: getMessage('tooltips.editar', financeiroMessages),
      excluir: getMessage('tooltips.excluir', financeiroMessages),
    },
  };

  const auth = {
    labels: {
      email: getMessage('labels.email', authMessages),
      senha: getMessage('labels.senha', authMessages),
      nome: getMessage('labels.nome', authMessages),
      telefone: getMessage('labels.telefone', authMessages),
      cpf: getMessage('labels.cpf', authMessages),
      dataNascimento: getMessage('labels.dataNascimento', authMessages),
      sexo: getMessage('labels.sexo', authMessages),
      masculino: getMessage('labels.masculino', authMessages),
      feminino: getMessage('labels.feminino', authMessages),
      verificado: getMessage('labels.verificado', authMessages),
      naoVerificado: getMessage('labels.naoVerificado', authMessages),
    },
    placeholders: {
      email: getMessage('placeholders.email', authMessages),
      senha: getMessage('placeholders.senha', authMessages),
      telefone: getMessage('placeholders.telefone', authMessages),
    },
    erros: {
      emailInvalido: getMessage('erros.emailInvalido', authMessages),
      senhaInvalida: getMessage('erros.senhaInvalida', authMessages),
      telefoneInvalido: getMessage('erros.telefoneInvalido', authMessages),
      cpfInvalido: getMessage('erros.cpfInvalido', authMessages),
    },
  };

  return {
    language,
    alerts,
    tarefas,
    documentos,
    ponto,
    financeiro,
    auth,
    getMessage,
  };
};

export default useMessages; 