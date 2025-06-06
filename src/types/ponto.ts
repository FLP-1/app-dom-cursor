import { User } from './user';
import { EmpregadorDomestico } from './empregador-domestico';
import { EsocialEvent } from './esocial-event';

export type TipoRegistroPonto = 'ENTRADA' | 'SAIDA' | 'INICIO_INTERVALO' | 'FIM_INTERVALO';

export interface RegistroPonto {
  id: string;
  dataHora: Date;
  tipo: TipoRegistroPonto;
  usuarioId: string;
  usuario: User;
  empregadoDomesticoId: string;
  empregadoDomestico: EmpregadorDomestico;
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
  empregadoDomesticoId?: string;
  esocialEventId?: string;
  validado?: boolean;
}

export interface RegistroPontoFormData {
  tipo: TipoRegistroPonto;
  observacao?: string;
  empregadoDomesticoId: string;
  esocialEventId?: string;
} 