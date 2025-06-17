/**
 * Arquivo: ChatWindow.tsx
 * Caminho: src/components/ChatWindow.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React from 'react';
import { Box, Typography, CircularProgress, Link, Paper } from '@mui/material';
import { Mensagem } from '@/hooks/useChat';

interface ChatWindowProps {
  mensagens: Mensagem[];
  loading: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ mensagens, loading }) => {
  if (loading) {
    return <CircularProgress aria-label="Carregando mensagens" />;
  }
  if (!mensagens || mensagens.length === 0) {
    return <Typography variant="body1">Nenhuma mensagem encontrada.</Typography>;
  }
  return (
    <Box sx={{ maxHeight: 350, overflowY: 'auto', mb: 2 }} aria-label="Histórico de mensagens">
      {mensagens.map((msg) => (
        <Paper key={msg.id} sx={{ p: 1, mb: 1, background: '#f5f5f5' }}>
          <Typography variant="subtitle2" color="primary.main">
            {msg.senderNome} <span sx={{ color: '#888', fontSize: 12 }}>({new Date(msg.createdAt).toLocaleString()})</span>
          </Typography>
          {msg.text && <Typography variant="body1">{msg.text}</Typography>}
          {msg.documentoUrl && (
            <Typography variant="body2">
              <Link href={msg.documentoUrl} target="_blank" rel="noopener">
                📎 {msg.documentoNome || 'Documento'}
              </Link>
            </Typography>
          )}
          {msg.tarefaTitulo && (
            <Typography variant="body2" color="secondary">
              🔗 Relacionado à tarefa: {msg.tarefaTitulo}
            </Typography>
          )}
        </Paper>
      ))}
    </Box>
  );
};

export default ChatWindow; 
