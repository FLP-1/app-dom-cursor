/**
 * Arquivo: RejeitarOperacaoDialog.tsx
 * Caminho: src/components/operacoes-financeiras/RejeitarOperacaoDialog.tsx
 * Criado em: 2025-06-02
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { tooltips } from '@/i18n/tooltips';

interface RejeitarOperacaoDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const RejeitarOperacaoDialog: React.FC<RejeitarOperacaoDialogProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="rejeitar-operacao-dialog-title">
      <DialogTitle id="rejeitar-operacao-dialog-title">Rejeitar Operação</DialogTitle>
      <DialogContent>
        {tooltips.rejeitar.pt}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} aria-label="Cancelar rejeição">Cancelar</Button>
        <Button onClick={onConfirm} color="error" variant="contained" aria-label="Confirmar rejeição" title={tooltips.rejeitar.pt}>Rejeitar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RejeitarOperacaoDialog; 
