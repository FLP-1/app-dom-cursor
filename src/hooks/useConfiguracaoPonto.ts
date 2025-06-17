/**
 * Arquivo: useConfiguracaoPonto.ts
 * Caminho: src/hooks/useConfiguracaoPonto.ts
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useState, useEffect } from 'react';
import { useNotification } from '@/hooks/useNotification';
import { useRouter } from 'next/router';

interface ConfiguracaoPonto {
  horaInicio: Date;
  horaFim: Date;
  latitude?: number;
  longitude?: number;
  raioMetros?: number;
  ativo: boolean;
}

export function useConfiguracaoPonto() {
  const [loading, setLoading] = useState(false);
  const [configuracao, setConfiguracao] = useState<ConfiguracaoPonto | null>(null);
  const { error, success } = useNotification();
  const router = useRouter();

  const carregarConfiguracao = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/ponto/configuracao');
      
      if (!response.ok) {
        throw new Error('Erro ao carregar configuração');
      }

      const data = await response.json();
      setConfiguracao(data);
    } catch (err) {
      error('Erro ao carregar configuração. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const salvarConfiguracao = async (data: ConfiguracaoPonto) => {
    try {
      setLoading(true);
      const response = await fetch('/api/ponto/configuracao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar configuração');
      }

      const configuracaoSalva = await response.json();
      setConfiguracao(configuracaoSalva);
      success('Configuração salva com sucesso!');
      router.push('/ponto/registrar');
    } catch (err) {
      error('Erro ao salvar configuração. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const validarHorarioPermitido = (dataHora: Date): boolean => {
    if (!configuracao?.ativo) return true;

    const hora = dataHora.getHours();
    const minutos = dataHora.getMinutes();
    const horaAtual = hora + minutos / 60;

    const horaInicio = configuracao.horaInicio.getHours() + configuracao.horaInicio.getMinutes() / 60;
    const horaFim = configuracao.horaFim.getHours() + configuracao.horaFim.getMinutes() / 60;

    return horaAtual >= horaInicio && horaAtual <= horaFim;
  };

  const validarLocalizacao = (latitude: number, longitude: number): boolean => {
    if (!configuracao?.ativo || !configuracao.latitude || !configuracao.longitude || !configuracao.raioMetros) {
      return true;
    }

    const R = 6371e3; // Raio da Terra em metros
    const φ1 = (configuracao.latitude * Math.PI) / 180;
    const φ2 = (latitude * Math.PI) / 180;
    const Δφ = ((latitude - configuracao.latitude) * Math.PI) / 180;
    const Δλ = ((longitude - configuracao.longitude) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distancia = R * c;

    return distancia <= configuracao.raioMetros;
  };

  useEffect(() => {
    carregarConfiguracao();
  }, [carregarConfiguracao]);

  return {
    configuracao,
    loading,
    salvarConfiguracao,
    validarHorarioPermitido,
    validarLocalizacao
  };
} 
