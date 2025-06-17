/**
 * Arquivo: PontoFormUtils.ts
 * Caminho: src/components/forms/ponto/PontoFormUtils.ts
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Funções utilitárias para o formulário de ponto.
 */

import { PontoFormData } from './PontoFormTypes';

export function formatPontoData(data: PontoFormData): PontoFormData {
  return {
    ...data,
    horaEntrada: data.horaEntrada.trim(),
    horaSaida: data.horaSaida.trim(),
    horaEntradaAlmoco: data.horaEntradaAlmoco?.trim(),
    horaSaidaAlmoco: data.horaSaidaAlmoco?.trim(),
    observacoes: data.observacoes?.trim()
  };
}

export function validatePontoData(data: PontoFormData): string[] {
  const errors: string[] = [];

  if (!data.data) {
    errors.push('Data é obrigatória');
  }

  if (!data.horaEntrada) {
    errors.push('Hora de entrada é obrigatória');
  }

  if (!data.horaSaida) {
    errors.push('Hora de saída é obrigatória');
  }

  if (data.horaEntradaAlmoco && !data.horaSaidaAlmoco) {
    errors.push('Hora de saída do almoço é obrigatória quando há hora de entrada do almoço');
  }

  if (!data.horaEntradaAlmoco && data.horaSaidaAlmoco) {
    errors.push('Hora de entrada do almoço é obrigatória quando há hora de saída do almoço');
  }

  if (data.horaEntradaAlmoco && data.horaSaidaAlmoco) {
    if (data.horaEntradaAlmoco >= data.horaSaidaAlmoco) {
      errors.push('Hora de saída do almoço deve ser posterior à hora de entrada do almoço');
    }
  }

  if (data.horaEntrada >= data.horaSaida) {
    errors.push('Hora de saída deve ser posterior à hora de entrada');
  }

  return errors;
}

export function getPontoDefaultValues(): PontoFormData {
  return {
    data: undefined,
    horaEntrada: '',
    horaSaida: '',
    horaEntradaAlmoco: '',
    horaSaidaAlmoco: '',
    observacoes: ''
  };
}

export const getServerTime = async (): Promise<string> => {
  try {
    const response = await fetch('/api/servertime');
    const data = await response.json();
    return data.time;
  } catch {
    return new Date().toLocaleString();
  }
};

export const getGeolocation = (): Promise<{ lat: number; lng: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocalização não suportada'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => reject(err)
    );
  });
}; 