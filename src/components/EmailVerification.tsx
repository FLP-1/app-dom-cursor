import { useState } from 'react';
import { useEmailVerification } from '../hooks/useEmailVerification';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

interface EmailVerificationProps {
  onVerified?: () => void;
}

export function EmailVerification({ onVerified }: EmailVerificationProps) {
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
        Verificação de Email
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Email"
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
          {isLoading ? 'Enviando...' : 'Enviar Código'}
        </Button>
      ) : (
        <>
          <TextField
            fullWidth
            label="Código de Verificação"
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
            {isLoading ? 'Verificando...' : 'Verificar Código'}
          </Button>
        </>
      )}
    </Box>
  );
} 