import axios from 'axios';

export interface Geolocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number;
  altitudeAccuracy?: number;
  heading?: number;
  speed?: number;
  timestamp: number;
}

export interface Address {
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  pais: string;
}

export const GeolocationService = {
  async obterLocalizacaoAtual(): Promise<Geolocation> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocalização não suportada pelo navegador'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            altitude: position.coords.altitude,
            altitudeAccuracy: position.coords.altitudeAccuracy,
            heading: position.coords.heading,
            speed: position.coords.speed,
            timestamp: position.timestamp,
          });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    });
  },

  async obterEndereco(latitude: number, longitude: number): Promise<Address> {
    const { data } = await axios.get<Address>('/api/geolocation/address', {
      params: {
        latitude,
        longitude,
      },
    });
    return data;
  },

  async obterCoordenadas(endereco: string): Promise<Geolocation> {
    const { data } = await axios.get<Geolocation>('/api/geolocation/coordinates', {
      params: {
        endereco,
      },
    });
    return data;
  },

  async calcularDistancia(
    origem: { latitude: number; longitude: number },
    destino: { latitude: number; longitude: number }
  ): Promise<number> {
    const { data } = await axios.get<{ distancia: number }>('/api/geolocation/distance', {
      params: {
        origemLatitude: origem.latitude,
        origemLongitude: origem.longitude,
        destinoLatitude: destino.latitude,
        destinoLongitude: destino.longitude,
      },
    });
    return data.distancia;
  },

  async obterWifiSSID(): Promise<string | null> {
    try {
      const { data } = await axios.get<{ ssid: string | null }>('/api/geolocation/wifi');
      return data.ssid;
    } catch (error) {
      console.error('Erro ao obter SSID do WiFi:', error);
      return null;
    }
  },

  async obterTimezone(): Promise<string> {
    const { data } = await axios.get<{ timezone: string }>('/api/geolocation/timezone');
    return data.timezone;
  },

  async obterDispositivo(): Promise<{
    tipo: string;
    modelo: string;
    sistema: string;
    versao: string;
  }> {
    const { data } = await axios.get('/api/geolocation/device');
    return data;
  },
}; 