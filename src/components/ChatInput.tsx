import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Box, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';

interface ChatInputProps {
  onEnviar: (texto: string) => void;
  onEnviarDocumento: (file: File) => void;
  loading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onEnviar, onEnviarDocumento, loading }) => {
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
    <Box component="form" onSubmit={handleEnviar} sx={{ display: 'flex', gap: 1 }} aria-label="Enviar mensagem">
      <TextField
        value={texto}
        onChange={e => setTexto(e.target.value)}
        placeholder="Digite uma mensagem..."
        fullWidth
        size="small"
        disabled={loading}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton component="label" aria-label="Anexar arquivo" disabled={loading}>
                <AttachFileIcon />
                <input type="file" hidden onChange={handleFileChange} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        inputProps={{ 'aria-label': 'Mensagem' }}
      />
      <Button type="submit" variant="contained" color="primary" disabled={loading || !texto.trim()} aria-label="Enviar mensagem">
        <SendIcon />
      </Button>
    </Box>
  );
};

export default ChatInput; 