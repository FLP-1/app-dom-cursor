/**
 * Arquivo: ConfiguracoesAdmin.tsx
 * Caminho: src/components/configuracoes/ConfiguracoesAdmin.tsx
 * Criado em: 2025-06-12
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Snackbar, Alert, CircularProgress, Grid, Tooltip, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';
import { ConfiguracoesAdminForm } from './ConfiguracoesAdminForm';
import { ConfiguracaoGlobal } from './ConfiguracoesAdminTypes';
import { tooltips } from '@/i18n/tooltips';

export const ConfiguracoesAdmin: React.FC = () => {
  const { t } = useTranslation();
  const [configs, setConfigs] = useState<ConfiguracaoGlobal[]>([]);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [editConfig, setEditConfig] = useState<ConfiguracaoGlobal | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

  const fetchConfigs = async () => {
    setLoading(true);
    const res = await fetch('/api/configuracoes');
    const data = await res.json();
    setConfigs(Object.entries(data).map(([chave, valor]) => ({ chave, valor })));
    setLoading(false);
  };

  useEffect(() => {
    fetchConfigs();
  }, []);

  const handleAdd = () => {
    setEditConfig(null);
    setOpenForm(true);
  };

  const handleEdit = (config: ConfiguracaoGlobal) => {
    setEditConfig(config);
    setOpenForm(true);
  };

  const handleDelete = async (chave: string) => {
    if (!window.confirm(t('configuracoes.confirmarRemover'))) return;
    const res = await fetch('/api/configuracoes', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chave }),
    });
    if (res.ok) {
      setSnackbar({ open: true, message: t('configuracoes.removidaSucesso'), severity: 'success' });
      fetchConfigs();
    } else {
      setSnackbar({ open: true, message: t('configuracoes.erroRemover'), severity: 'error' });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {t('configuracoes.titulo')}
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAdd}
        sx={{ mb: 2 }}
      >
        {t('configuracoes.nova')}
      </Button>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container columns={12} spacing={2}>
          {configs.map((config) => (
            <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }} key={config.chave}>
              <Box sx={{ border: 1, borderRadius: 2, p: 2, mb: 2 }}>
                <Typography variant="subtitle1">
                  <Tooltip title={tooltips.configuracoes.chave.pt}>
                    <span>{config.chave}</span>
                  </Tooltip>
                </Typography>
                <Typography variant="body2">
                  <Tooltip title={tooltips.configuracoes.valor.pt}>
                    <span>{config.valor}</span>
                  </Tooltip>
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Tooltip title={tooltips.configuracoes.editar.pt}>
                    <IconButton onClick={() => handleEdit(config)} aria-label={t('configuracoes.editar')}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={tooltips.configuracoes.remover.pt}>
                    <IconButton onClick={() => handleDelete(config.chave)} aria-label={t('configuracoes.remover')}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
      <ConfiguracoesAdminForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSuccess={() => { setOpenForm(false); fetchConfigs(); }}
        config={editConfig}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}; 
