/**
 * Arquivo: RejeitarOperacaoDialog.tsx
 * Caminho: src/components/dialogs/RejeitarOperacaoDialog.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useOperacoesFinanceiras } from '@/hooks/useOperacoesFinanceiras';

interface RejeitarOperacaoDialogProps {
  open: boolean;
  onClose: () => void;
  operacaoId: string;
}

export function RejeitarOperacaoDialog({
  open,
  onClose,
  operacaoId,
}: RejeitarOperacaoDialogProps) {
  const { t } = useTranslation();
  const { loading, rejeitarOperacao } = useOperacoesFinanceiras();
  const [motivo, setMotivo] = useState('');

  const handleSubmit = async () => {
    await rejeitarOperacao(operacaoId, motivo);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t('operacoesFinanceiras.acoes.rejeitar')}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label={t('operacoesFinanceiras.acoes.motivoRejeicao')}
          fullWidth
          multiline
          rows={3}
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          error={!motivo}
          helperText={!motivo ? t('common.required') : ''}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('common.cancel')}</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="error"
          disabled={loading || !motivo}
        >
          {t('operacoesFinanceiras.acoes.rejeitar')}
        </Button>
      </DialogActions>
    </Dialog>
  );
} 
