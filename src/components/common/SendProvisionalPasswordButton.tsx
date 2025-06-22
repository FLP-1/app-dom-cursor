/**
 * Arquivo: SendProvisionalPasswordButton.tsx
 * Caminho: src/components/common/SendProvisionalPasswordButton.tsx
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Componente para enviar senha provisória com mensagens centralizadas
 */

import React, { useState } from 'react';
import { IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControlLabel, Checkbox, CircularProgress } from '@mui/material';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { tooltips } from '@/i18n/tooltips';
import { interfaceMessages } from '@/i18n/messages/interface.messages';
import { useLanguage } from '@/hooks/useLanguage';

interface SendProvisionalPasswordButtonProps {
  userId: string;
  userType: 'empregado' | 'familiar' | 'parceiro' | 'usuario-parceiro';
  contact: { email?: string; phone?: string };
  onSuccess?: () => void;
  onError?: (error: string) => void;
  disabled?: boolean;
}

export const SendProvisionalPasswordButton: React.FC<SendProvisionalPasswordButtonProps> = ({
  userId, userType, contact, onSuccess, onError, disabled
}) => {
  const { language } = useLanguage();
  const messages = interfaceMessages[language].common;
  
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendEmail, setSendEmail] = useState(!!contact.email);
  const [sendWhats, setSendWhats] = useState(!!contact.phone);

  const handleSend = async () => {
    setSending(true);
    try {
      const res = await fetch('/api/users/send-provisional-password', {
        method: 'POST',
        body: JSON.stringify({
          userId,
          userType,
          channels: {
            email: sendEmail,
            whatsapp: sendWhats
          }
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        onSuccess?.();
        setOpen(false);
      } else {
        const data = await res.json();
        onError?.(data.error || 'Erro ao enviar senha.');
      }
    } catch (e) {
      onError?.('Erro inesperado ao enviar senha.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Tooltip title={tooltips.enviarSenhaProvisoria?.[language] || messages.sendProvisionalPassword}>
        <span>
          <IconButton
            aria-label={tooltips.enviarSenhaProvisoria?.[language] || messages.sendProvisionalPassword}
            onClick={() => setOpen(true)}
            disabled={disabled || sending}
          >
            <VpnKeyIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{messages.sendProvisionalPassword}</DialogTitle>
        <DialogContent>
          <FormControlLabel
            control={<Checkbox checked={sendEmail} onChange={e => setSendEmail(e.target.checked)} disabled={!contact.email} />}
            label={`E-mail (${contact.email || 'não informado'})`}
          />
          <FormControlLabel
            control={<Checkbox checked={sendWhats} onChange={e => setSendWhats(e.target.checked)} disabled={!contact.phone} />}
            label={`WhatsApp (${contact.phone || 'não informado'})`}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={sending}>{messages.cancel}</Button>
          <Button onClick={handleSend} disabled={sending || (!sendEmail && !sendWhats)} variant="contained" color="primary" startIcon={sending ? <CircularProgress size={20} /> : undefined}>
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}; 
