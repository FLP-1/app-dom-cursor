/**
 * Arquivo: RejeitarOperacaoDialog.tsx
 * Caminho: src/components/operacoes-financeiras/RejeitarOperacaoDialog.tsx
 * Criado em: 2025-06-02
 * Última atualização: 2025-01-27
 * Descrição: Dialog para rejeitar operação financeira
 */

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { tooltips } from '@/i18n/tooltips';
import { financeiroMessages } from '@/i18n/messages/financeiro.messages';

interface RejeitarOperacaoDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const RejeitarOperacaoDialog: React.FC<RejeitarOperacaoDialogProps> = ({ open, onClose, onConfirm }) => {
  // Usar mensagens em português por padrão
  const messages = financeiroMessages.pt;

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="rejeitar-operacao-dialog-title">
      <DialogTitle id="rejeitar-operacao-dialog-title">
        {messages.labels.rejeitar}
      </DialogTitle>
      <DialogContent>
        {messages.mensagens.confirmRejeitar}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} aria-label={messages.tooltips.cancelar}>
          {messages.labels.cancelar}
        </Button>
        <Button 
          onClick={onConfirm} 
          color="error" 
          variant="contained" 
          aria-label={messages.tooltips.confirmarRejeicao} 
          title={tooltips.rejeitar.pt}
        >
          {messages.labels.rejeitar}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RejeitarOperacaoDialog; 
