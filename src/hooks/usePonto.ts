import { useState } from 'react';
import { useNotification } from './useNotification';
import axios from 'axios';

interface PontoRegistro {
  id: string;
  dataHora: Date;
  tipo: 'ENTRADA' | 'SAIDA';
  latitude?: number;
  longitude?: number;
  timezone: string;
  dispositivo: string;
  ip: string;
}

interface UsePontoReturn {
  registrarPonto: (tipo: 'ENTRADA' | 'SAIDA') => Promise<void>;
  loading: boolean;
  ultimoRegistro?: PontoRegistro;
}

export function usePonto(): UsePontoReturn {
  const [loading, setLoading] = useState(false);
  const [ultimoRegistro, setUltimoRegistro] = useState<PontoRegistro>();
  const { error, success } = useNotification();

  const validarDataHora = async (): Promise<boolean> => {
    try {
      // Obtém timestamp do servidor para comparação
      const { data: serverTime } = await axios.get('/api/time');
      const localTime = new Date().getTime();
      const diff = Math.abs(localTime - serverTime);
      
      // Permite diferença de até 5 minutos
      if (diff > 5 * 60 * 1000) {
        error('A data/hora do seu dispositivo está incorreta. Por favor, sincronize seu relógio.');
        return false;
      }
      return true;
    } catch (err) {
      error('Não foi possível validar a data/hora. Tente novamente.');
      return false;
    }
  };

  const obterGeolocalizacao = async (): Promise<{ latitude: number; longitude: number } | null> => {
    try {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          (err) => {
            error('Não foi possível obter sua localização. O registro de ponto requer permissão de localização.');
            reject(err);
          },
          { timeout: 10000 }
        );
      });
    } catch (err) {
      return null;
    }
  };

  const registrarPonto = async (tipo: 'ENTRADA' | 'SAIDA'): Promise<void> => {
    try {
      setLoading(true);

      // Valida data/hora do dispositivo
      const dataHoraValida = await validarDataHora();
      if (!dataHoraValida) return;

      // Obtém geolocalização
      const geolocalizacao = await obterGeolocalizacao();
      if (!geolocalizacao) return;

      // Obtém informações do dispositivo
      const userAgent = navigator.userAgent;
      const ip = await axios.get('https://api.ipify.org?format=json').then(res => res.data.ip);

      const registro: Omit<PontoRegistro, 'id'> = {
        dataHora: new Date(),
        tipo,
        latitude: geolocalizacao.latitude,
        longitude: geolocalizacao.longitude,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        dispositivo: userAgent,
        ip
      };

      // Envia registro para API
      const { data } = await axios.post('/api/ponto/registrar', registro);
      setUltimoRegistro(data);
      success('Ponto registrado com sucesso!');
    } catch (err) {
      error('Erro ao registrar ponto. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return {
    registrarPonto,
    loading,
    ultimoRegistro
  };
} 