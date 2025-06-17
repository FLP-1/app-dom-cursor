/**
 * Arquivo: PhoneVerification.tsx
 * Caminho: src/components/PhoneVerification.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
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

interface PhoneVerificationProps {
  onVerified?: () => void;
}

export function PhoneVerification({ onVerified }: PhoneVerificationProps) {
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
        Verificação de Celular
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Número de Celular"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={showCodeInput || loading}
          placeholder="(11) 91234-5678"
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
              'Enviar Código'
            )}
          </Button>
        ) : (
          <>
            <TextField
              fullWidth
              label="Código de Verificação"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={loading}
              placeholder="Digite o código recebido"
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
                'Verificar Código'
              )}
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
} 
