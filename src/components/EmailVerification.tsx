/**
 * Arquivo: EmailVerification.tsx
 * Caminho: src/components/EmailVerification.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-01-27
 * Descrição: Componente para verificação de email
 */

import { useState } from 'react';
import { useEmailVerification } from '@/hooks/useEmailVerification';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useMessages } from '@/hooks/useMessages';
import { authMessages } from '@/i18n/messages/auth.messages';

interface EmailVerificationProps {
  onVerified?: () => void;
}

export function EmailVerification({ onVerified }: EmailVerificationProps) {
  const { messages } = useMessages(authMessages);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);

  const { isLoading, error, sendCode, verifyCode } = useEmailVerification({
    onSuccess: () => {
      if (!showCodeInput) {
        setShowCodeInput(true);
      } else {
        onVerified?.();
      }
    },
  });

  const handleSendCode = async () => {
    try {
      await sendCode(email);
    } catch (error) {
      // Erro já é tratado pelo hook
    }
  };

  const handleVerifyCode = async () => {
    try {
      await verifyCode(email, code);
    } catch (error) {
      // Erro já é tratado pelo hook
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', p: 2 }}>
      <Typography variant="h6" gutterBottom>
        {messages.emailVerification.title}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label={messages.emailVerification.email.label}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading || showCodeInput}
        sx={{ mb: 2 }}
      />

      {!showCodeInput ? (
        <Button
          fullWidth
          variant="contained"
          onClick={handleSendCode}
          disabled={isLoading}
        >
          {isLoading ? messages.emailVerification.buttons.sending : messages.emailVerification.buttons.sendCode}
        </Button>
      ) : (
        <>
          <TextField
            fullWidth
            label={messages.emailVerification.code.label}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={isLoading}
            sx={{ mb: 2 }}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={handleVerifyCode}
            disabled={isLoading}
          >
            {isLoading ? messages.emailVerification.buttons.verifying : messages.emailVerification.buttons.verifyCode}
          </Button>
        </>
      )}
    </Box>
  );
} 
