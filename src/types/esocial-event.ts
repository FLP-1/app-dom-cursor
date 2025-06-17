/**
 * Arquivo: esocial-event.ts
 * Caminho: src/types/esocial-event.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Tipos de eventos do eSocial
 */

// Tipos fortes para eventos do eSocial

export type EsocialEventStatus = 'PENDING' | 'SENT' | 'PROCESSED' | 'REJECTED';

export interface EsocialEventType {
  id: string;
  codigo: string;
  descricao: string;
  createdAt: string;
}

export interface EsocialEvent {
  id: string;
  codigo: string;
  descricao: string;
  tipoId: string;
  tipo: EsocialEventType;
  xmlPayload?: string;
  status: EsocialEventStatus;
  dataEnvio?: string;
  dataRetorno?: string;
  mensagemRetorno?: string;
  empregadorId: string;
  usuarioId: string;
  createdAt: string;
  updatedAt: string;
  // Integrações
  alertaId?: string;
  timeRecordId?: string;
  documentId?: string;
}

export interface EsocialEventFilter {
  codigo?: string;
  descricao?: string;
  status?: EsocialEventStatus;
  tipoId?: string;
  empregadorId?: string;
  usuarioId?: string;
  dataInicio?: string;
  dataFim?: string;
} 
