/**
 * Arquivo: ChatWindow.tsx
 * Caminho: src/components/ChatWindow.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-01-27
 * Descrição: Componente de janela de chat para exibir mensagens e histórico.
 */

import React from 'react';
import { Box, Typography, CircularProgress, Link, Paper } from '@mui/material';
import { Mensagem } from '@/hooks/useChat';
import { useMessages } from '@/hooks/useMessages';
import { commonMessages } from '@/i18n/messages';

interface ChatWindowProps {
  mensagens: Mensagem[];
  loading: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ mensagens, loading }) => {
  const { messages } = useMessages(commonMessages);

  if (loading) {
    return <CircularProgress aria-label={messages.chat.loadingMessages} />;
  }
  if (!mensagens || mensagens.length === 0) {
    return <Typography variant="body1">{messages.chat.noMessagesFound}</Typography>;
  }
  return (
    <Box sx={{ maxHeight: 350, overflowY: 'auto', mb: 2 }} aria-label={messages.chat.messageHistory}>
      {mensagens.map((msg) => (
        <Paper key={msg.id} sx={{ p: 1, mb: 1, background: '#f5f5f5' }}>
          <Typography variant="subtitle2" color="primary.main">
            {msg.senderNome} <span sx={{ color: '#888', fontSize: 12 }}>({new Date(msg.createdAt).toLocaleString()})</span>
          </Typography>
          {msg.text && <Typography variant="body1">{msg.text}</Typography>}
          {msg.documentoUrl && (
            <Typography variant="body2">
              <Link href={msg.documentoUrl} target="_blank" rel="noopener">
                📎 {msg.documentoNome || messages.chat.document}
              </Link>
            </Typography>
          )}
          {msg.tarefaTitulo && (
            <Typography variant="body2" color="secondary">
              🔗 {messages.chat.relatedToTask}: {msg.tarefaTitulo}
            </Typography>
          )}
        </Paper>
      ))}
    </Box>
  );
};

export default ChatWindow; 
