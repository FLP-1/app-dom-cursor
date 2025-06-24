/**
 * Arquivo: ChatInput.tsx
 * Caminho: src/components/ChatInput.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-01-27
 * Descrição: Componente de input para chat com suporte a envio de mensagens e arquivos.
 */

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Box, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useMessages } from '@/hooks/useMessages';
import { commonMessages } from '@/i18n/messages';

interface ChatInputProps {
  onEnviar: (texto: string) => void;
  onEnviarDocumento: (file: File) => void;
  loading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onEnviar, onEnviarDocumento, loading }) => {
  const { messages } = useMessages(commonMessages);
  const [texto, setTexto] = useState('');

  const handleEnviar = (e: FormEvent) => {
    e.preventDefault();
    if (texto.trim()) {
      onEnviar(texto);
      setTexto('');
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onEnviarDocumento(e.target.files[0]);
      e.target.value = '';
    }
  };

  return (
    <Box component="form" onSubmit={handleEnviar} sx={{ display: 'flex', gap: 1 }} aria-label={messages.chat.sendMessage}>
      <TextField
        value={texto}
        onChange={e => setTexto(e.target.value)}
        placeholder={messages.chat.messagePlaceholder}
        fullWidth
        size="small"
        disabled={loading}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton component="label" aria-label={messages.chat.attachFile} disabled={loading}>
                <AttachFileIcon />
                <input type="file" hidden onChange={handleFileChange} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        inputProps={{ 'aria-label': messages.chat.messageInput }}
      />
      <Button type="submit" variant="contained" color="primary" disabled={loading || !texto.trim()} aria-label={messages.chat.sendMessage}>
        <SendIcon />
      </Button>
    </Box>
  );
};

export default ChatInput; 
