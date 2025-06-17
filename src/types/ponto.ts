/**
 * Arquivo: ponto.ts
 * Caminho: src/types/ponto.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Tipos de registros de ponto
 */

import { User } from '@/types/user';
import { Empregado } from '@/types/empregado';
import { EsocialEvent } from '@/types/esocial-event';

export type TipoRegistroPonto = 'ENTRADA' | 'SAIDA' | 'INICIO_INTERVALO' | 'FIM_INTERVALO';

export interface RegistroPonto {
  id: string;
  dataHora: Date;
  tipo: TipoRegistroPonto;
  usuarioId: string;
  usuario: User;
  empregadoId: string;
  empregado: Empregado;
  latitude?: number;
  longitude?: number;
  wifiSSID?: string;
  wifiBSSID?: string;
  wifiSignal?: number;
  timezone: string;
  dispositivo: string;
  ip: string;
  validado: boolean;
  validadoPor?: string;
  validadoEm?: Date;
  observacao?: string;
  esocialEventId?: string;
  esocialEvent?: EsocialEvent;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegistroPontoFilter {
  dataInicio?: Date;
  dataFim?: Date;
  tipo?: TipoRegistroPonto;
  empregadoId?: string;
  esocialEventId?: string;
  validado?: boolean;
}

export interface RegistroPontoFormData {
  tipo: TipoRegistroPonto;
  observacao?: string;
  empregadoId: string;
  esocialEventId?: string;
} 
