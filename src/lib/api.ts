/**
 * Arquivo: api.ts
 * Caminho: src/lib/api.ts
 * Criado em: 2025-06-02
 * Última atualização: 2025-06-13
 * Descrição: Instância centralizada do Axios para integração com a API do sistema.
 */

import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
}); 
