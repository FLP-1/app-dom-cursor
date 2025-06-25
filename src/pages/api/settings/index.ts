/**
 * Arquivo: index.ts
 * Caminho: src/pages/api/configuracoes/index.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Endpoint da API para fornecer dados de configurações do sistema.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { SettingsData } from '@/hooks/useSettingsData';

// Endpoint mínimo para teste
export default function handler(req, res) {
  res.status(200).json({ ok: true });
} 