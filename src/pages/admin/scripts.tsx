/**
 * Arquivo: scripts.tsx
 * Caminho: src/pages/admin/scripts.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Grid, Snackbar, Alert, CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import { useRouter } from 'next/router';
import { Layout } from '@/components/layout/Layout';
import { useTranslation } from 'react-i18next';

export default function AdminScriptsPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });
  const [resultado, setResultado] = useState<{ alterados: string[]; erros: string[]; total: number } | null>(null);

  const handlePadronizarCabecalhos = async () => {
    setLoading(true);
    setResultado(null);
    try {
      const res = await fetch('/api/utils/padronizar-cabecalhos', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        setResultado(data);
        setSnackbar({ open: true, message: `Cabeçalhos padronizados em ${data.total} arquivos.`, severity: 'success' });
      } else {
        setSnackbar({ open: true, message: data.error || 'Erro ao padronizar cabeçalhos.', severity: 'error' });
      }
    } catch (e) {
      setSnackbar({ open: true, message: 'Erro inesperado ao padronizar cabeçalhos.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {t('Painel de Scripts e Automações')}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {t('Execute tarefas administrativas e automações do projeto de forma centralizada. Acesso restrito a administradores.')}
        </Typography>
        <Paper sx={{ p: 2, mt: 3 }}>
          <Grid container columns={12} spacing={2}>
            <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                aria-label="Padronizar cabeçalhos dos arquivos do projeto"
                onClick={handlePadronizarCabecalhos}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : undefined}
              >
                Padronizar cabeçalhos dos arquivos
              </Button>
            </Grid>
            {/* Espaço para outros scripts/botões */}
          </Grid>
        </Paper>

        {resultado && (
          <Paper sx={{ p: 2, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Resultado da padronização
            </Typography>
            <Typography variant="body2" gutterBottom>
              {`Total de arquivos alterados: ${resultado.total}`}
            </Typography>
            {resultado.alterados.length > 0 && (
              <>
                <Typography variant="subtitle2">Arquivos alterados:</Typography>
                <List dense>
                  {resultado.alterados.map((arq) => (
                    <ListItem key={arq}>
                      <ListItemText primary={arq} />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
            {resultado.erros.length > 0 && (
              <>
                <Typography variant="subtitle2" color="error">Erros:</Typography>
                <List dense>
                  {resultado.erros.map((err, i) => (
                    <ListItem key={i}>
                      <ListItemText primary={err} />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </Paper>
        )}

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Layout>
  );
} 
