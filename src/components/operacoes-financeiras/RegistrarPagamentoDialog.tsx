/**
 * Arquivo: RegistrarPagamentoDialog.tsx
 * Caminho: src/components/operacoes-financeiras/RegistrarPagamentoDialog.tsx
 * Criado em: 2025-06-02
 * Última atualização: 2025-01-27
 * Descrição: Dialog para registrar pagamento de operação financeira
 */

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { tooltips } from '@/i18n/tooltips';
import { financeiroMessages } from '@/i18n/messages/financeiro.messages';

interface RegistrarPagamentoDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const RegistrarPagamentoDialog: React.FC<RegistrarPagamentoDialogProps> = ({ open, onClose, onConfirm }) => {
  // Usar mensagens em português por padrão
  const messages = financeiroMessages.pt;

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="registrar-pagamento-dialog-title">
      <DialogTitle id="registrar-pagamento-dialog-title">
        {messages.labels.registrar}
      </DialogTitle>
      <DialogContent>
        {messages.mensagens.confirmRegistrar}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} aria-label={messages.tooltips.cancelar}>
          {messages.labels.cancelar}
        </Button>
        <Button 
          onClick={onConfirm} 
          color="primary" 
          variant="contained" 
          aria-label={messages.tooltips.confirmarRegistro} 
          title={tooltips.registrarPagamento.pt}
        >
          {messages.labels.registrar}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegistrarPagamentoDialog; 
