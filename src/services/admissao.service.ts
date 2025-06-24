/**
 * Arquivo: admissao.service.ts
 * Caminho: src/services/admissao.service.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Serviço para gerenciamento de admissão de funcionários
 */

export interface Candidato {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  status: "pendente" | "aprovado" | "reprovado" | "contratado";
  dataCandidatura: string;
  cargo: string;
  experiencia: string;
}

export interface ProcessoAdmissao {
  id: string;
  candidatoId: string;
  status: string;
  dataInicio: string;
  dataFim?: string;
  observacoes?: string;
}

export interface EstatisticasAdmissao {
  totalCandidatos: number;
  candidatosAprovados: number;
  candidatosPendentes: number;
  candidatosReprovados: number;
  candidatosContratados: number;
}

export interface DadosAdmissao {
  candidatos: Candidato[];
  processos: ProcessoAdmissao[];
  stats: EstatisticasAdmissao;
}

// Mock data para desenvolvimento
const mockCandidatos: Candidato[] = [
  {
    id: "1",
    nome: "João Silva",
    email: "joao.silva@email.com",
    telefone: "(11) 99999-9999",
    status: "pendente",
    dataCandidatura: "2025-01-20",
    cargo: "Desenvolvedor Frontend",
    experiencia: "3 anos"
  },
  {
    id: "2",
    nome: "Maria Santos",
    email: "maria.santos@email.com",
    telefone: "(11) 88888-8888",
    status: "aprovado",
    dataCandidatura: "2025-01-18",
    cargo: "Designer UX/UI",
    experiencia: "5 anos"
  },
  {
    id: "3",
    nome: "Pedro Costa",
    email: "pedro.costa@email.com",
    telefone: "(11) 77777-7777",
    status: "contratado",
    dataCandidatura: "2025-01-15",
    cargo: "Desenvolvedor Backend",
    experiencia: "4 anos"
  }
];

const mockProcessos: ProcessoAdmissao[] = [
  {
    id: "1",
    candidatoId: "1",
    status: "em_analise",
    dataInicio: "2025-01-20",
    observacoes: "Aguardando análise de currículo"
  },
  {
    id: "2",
    candidatoId: "2",
    status: "aprovado",
    dataInicio: "2025-01-18",
    dataFim: "2025-01-22",
    observacoes: "Candidato aprovado após entrevista"
  },
  {
    id: "3",
    candidatoId: "3",
    status: "contratado",
    dataInicio: "2025-01-15",
    dataFim: "2025-01-25",
    observacoes: "Candidato contratado com sucesso"
  }
];

const mockStats: EstatisticasAdmissao = {
  totalCandidatos: 3,
  candidatosAprovados: 1,
  candidatosPendentes: 1,
  candidatosReprovados: 0,
  candidatosContratados: 1
};

export const useAdmissaoData = async (): Promise<DadosAdmissao> => {
  // Simula uma chamada de API
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    candidatos: mockCandidatos,
    processos: mockProcessos,
    stats: mockStats
  };
};

export const aprovarCandidato = async (candidatoId: string): Promise<void> => {
  // Simula uma chamada de API
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const candidato = mockCandidatos.find(c => c.id === candidatoId);
  if (candidato) {
    candidato.status = "aprovado";
  }
};

export const reprovarCandidato = async (candidatoId: string, motivo: string): Promise<void> => {
  // Simula uma chamada de API
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const candidato = mockCandidatos.find(c => c.id === candidatoId);
  if (candidato) {
    candidato.status = "reprovado";
  }
};

export const contratarCandidato = async (candidatoId: string, dataContratacao: string): Promise<void> => {
  // Simula uma chamada de API
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const candidato = mockCandidatos.find(c => c.id === candidatoId);
  if (candidato) {
    candidato.status = "contratado";
  }
};
