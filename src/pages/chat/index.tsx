/**
 * Arquivo: index.tsx
 * Caminho: src/pages/chat/index.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de chat
 */

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useChat } from '@/hooks/useChat';
import ChatWindow from '@/components/ChatWindow';
import ChatInput from '@/components/ChatInput';

const ChatPage: React.FC = () => {
  const { mensagens, enviarMensagem, loading, enviarDocumento } = useChat();

  return (
    <Box sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Comunicação Interna
      </Typography>
      <Paper sx={{ p: 2, mb: 2, minHeight: 400, display: 'flex', flexDirection: 'column' }}>
        <ChatWindow mensagens={mensagens} loading={loading} />
        <Box sx={{ mt: 'auto' }}>
          <ChatInput onEnviar={enviarMensagem} onEnviarDocumento={enviarDocumento} loading={loading} />
        </Box>
      </Paper>
    </Box>
  );
};

export default ChatPage; 
