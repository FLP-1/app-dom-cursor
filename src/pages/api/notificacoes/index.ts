/**
 * Arquivo: index.ts
 * Caminho: src/pages/api/notificacoes/index.ts
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Endpoint da API para fornecer dados de notificações do sistema.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { NotificationsData } from '@/hooks/useNotificationsData';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<NotificationsData>
) {
  const notifications = [
    {
      id: '1',
      title: 'Bem-vindo ao DOM!',
      message: 'Sua conta foi criada com sucesso.',
      type: 'success',
      read: true,
      createdAt: '2025-01-25T09:00:00Z',
      link: '/dashboard'
    },
    {
      id: '2',
      title: 'Novo documento disponível',
      message: 'O documento "Contrato de Trabalho" foi adicionado.',
      type: 'info',
      read: false,
      createdAt: '2025-01-26T14:30:00Z',
      link: '/documents'
    },
    {
      id: '3',
      title: 'Atenção: Ponto não registrado',
      message: 'Você esqueceu de registrar o ponto hoje.',
      type: 'warning',
      read: false,
      createdAt: '2025-01-27T08:00:00Z'
    },
    {
      id: '4',
      title: 'Erro de integração',
      message: 'Falha ao sincronizar com o Google Drive.',
      type: 'error',
      read: true,
      createdAt: '2025-01-26T18:00:00Z'
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  res.status(200).json({ notifications, unreadCount });
} 