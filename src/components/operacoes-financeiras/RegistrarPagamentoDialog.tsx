/**
 * Arquivo: RegistrarPagamentoDialog.tsx
 * Caminho: src/components/operacoes-financeiras/RegistrarPagamentoDialog.tsx
 * Criado em: 2025-06-02
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { tooltips } from '@/i18n/tooltips';

interface RegistrarPagamentoDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const RegistrarPagamentoDialog: React.FC<RegistrarPagamentoDialogProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="registrar-pagamento-dialog-title">
      <DialogTitle id="registrar-pagamento-dialog-title">Registrar Pagamento</DialogTitle>
      <DialogContent>
        {tooltips.registrarPagamento.pt}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} aria-label="Cancelar registro de pagamento">Cancelar</Button>
        <Button onClick={onConfirm} color="primary" variant="contained" aria-label="Confirmar registro de pagamento" title={tooltips.registrarPagamento.pt}>Registrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegistrarPagamentoDialog; 
