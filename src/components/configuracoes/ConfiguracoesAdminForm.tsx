/**
 * Arquivo: ConfiguracoesAdminForm.tsx
 * Caminho: src/components/configuracoes/ConfiguracoesAdminForm.tsx
 * Criado em: 2025-06-12
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Tooltip } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { configuracaoGlobalSchema } from './ConfiguracoesAdminUtils';
import { ConfiguracaoGlobal } from './ConfiguracoesAdminTypes';
import { tooltips } from '@/i18n/tooltips';

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  config?: ConfiguracaoGlobal | null;
}

export const ConfiguracoesAdminForm: React.FC<Props> = ({ open, onClose, onSuccess, config }) => {
  const { t } = useTranslation();
  const isEdit = Boolean(config);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ConfiguracaoGlobal>({
    resolver: zodResolver(configuracaoGlobalSchema),
    defaultValues: config || { chave: '', valor: '', descricao: '' },
  });

  useEffect(() => {
    reset(config || { chave: '', valor: '', descricao: '' });
  }, [config, reset]);

  const onSubmit = async (data: ConfiguracaoGlobal) => {
    const method = isEdit ? 'PUT' : 'POST';
    const res = await fetch('/api/configuracoes', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      onSuccess();
    } else {
      // Trate o erro conforme padrão do projeto
      alert(t('configuracoes.erroSalvar'));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        {isEdit ? t('configuracoes.editar') : t('configuracoes.nova')}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Tooltip title={tooltips.configuracoes.chave.pt}>
            <TextField
              label={t('configuracoes.chave')}
              fullWidth
              margin="normal"
              {...register('chave')}
              error={!!errors.chave}
              helperText={errors.chave?.message}
              disabled={isEdit}
              inputProps={{ 'aria-label': t('configuracoes.chave') }}
            />
          </Tooltip>
          <Tooltip title={tooltips.configuracoes.valor.pt}>
            <TextField
              label={t('configuracoes.valor')}
              fullWidth
              margin="normal"
              {...register('valor')}
              error={!!errors.valor}
              helperText={errors.valor?.message}
              inputProps={{ 'aria-label': t('configuracoes.valor') }}
            />
          </Tooltip>
          <Tooltip title={tooltips.configuracoes.descricao.pt}>
            <TextField
              label={t('configuracoes.descricao')}
              fullWidth
              margin="normal"
              {...register('descricao')}
              error={!!errors.descricao}
              helperText={errors.descricao?.message}
              inputProps={{ 'aria-label': t('configuracoes.descricao') }}
            />
          </Tooltip>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            {t('comum.cancelar')}
          </Button>
          <Button type="submit" color="primary" disabled={isSubmitting}>
            {t('comum.salvar')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}; 
