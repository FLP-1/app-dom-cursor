/**
 * Arquivo: PhoneVerification.tsx
 * Caminho: src/components/PhoneVerification.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-01-27
 * Descrição: Componente de verificação de telefone via SMS
 */

import { useState } from 'react';
import { usePhoneVerification } from '@/hooks/usePhoneVerification';
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { authMessages } from '@/i18n/messages/auth.messages';

interface PhoneVerificationProps {
  onVerified?: () => void;
}

export function PhoneVerification({ onVerified }: PhoneVerificationProps) {
  // Usar mensagens em português por padrão
  const messages = authMessages.pt;
  
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);

  const { loading, error, sendCode, verifyCode } = usePhoneVerification({
    onSuccess: () => {
      if (!showCodeInput) {
        setShowCodeInput(true);
      } else {
        onVerified?.();
      }
    },
  });

  const handleSendCode = async () => {
    await sendCode(phone);
  };

  const handleVerifyCode = async () => {
    await verifyCode(phone, code);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {messages.labels.verificacaoTelefone}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label={messages.labels.telefone}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={showCodeInput || loading}
          placeholder={messages.placeholders.telefone}
          sx={{ mb: 1 }}
        />

        {!showCodeInput ? (
          <Button
            variant="contained"
            onClick={handleSendCode}
            disabled={loading || !phone}
            fullWidth
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              messages.labels.enviarCodigo
            )}
          </Button>
        ) : (
          <>
            <TextField
              fullWidth
              label={messages.labels.codigoVerificacao}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={loading}
              placeholder={messages.placeholders.codigoVerificacao}
              sx={{ mb: 1 }}
            />
            <Button
              variant="contained"
              onClick={handleVerifyCode}
              disabled={loading || !code}
              fullWidth
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                messages.labels.verificarCodigo
              )}
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
} 
