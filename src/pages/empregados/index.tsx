/**
 * Arquivo: index.tsx
 * Caminho: src/pages/empregados/index.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de listagem de empregados
 */

import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Typography,
  Grid,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { formatDate } from '@/utils/date';
import { useEmpregados } from '@/hooks/useEmpregados';
import { Empregado } from '@/types/empregado';
import { useAuth } from '@/hooks/useAuth';
import { useNotification } from '@/hooks/useNotification';
import { useConfirmDialog } from '@/hooks/useConfirmDialog';
import { useTranslation } from 'next-i18next';

export default function EmpregadosPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const { confirm } = useConfirmDialog();

  const { data: empregados, isLoading, error } = useEmpregados();

  const handleNovo = () => {
    router.push('/empregados/novo');
  };

  const handleEditar = (id: string) => {
    router.push(`/empregados/${id}`);
  };

  const handleExcluir = async (id: string) => {
    const confirmed = await confirm({
      title: t('empregados.excluir.titulo'),
      message: t('empregados.excluir.mensagem'),
      confirmText: t('empregados.excluir.confirmar'),
      cancelText: t('empregados.excluir.cancelar'),
    });

    if (confirmed) {
      try {
        // Implemente a lógica para excluir o empregado
        showNotification({
          type: 'success',
          message: t('empregados.excluir.sucesso'),
        });
      } catch (error) {
        showNotification({
          type: 'error',
          message: t('empregados.excluir.erro'),
        });
      }
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Carregando...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Erro ao carregar empregados</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" component="h1">
              {t('empregados.titulo')}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleNovo}
            >
              {t('empregados.novo')}
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>{t('empregados.nome')}</TableCell>
                      <TableCell>{t('empregados.cpf')}</TableCell>
                      <TableCell>{t('empregados.cargo')}</TableCell>
                      <TableCell>{t('empregados.remuneracao')}</TableCell>
                      <TableCell>{t('empregados.dataAdmissao')}</TableCell>
                      <TableCell>{t('empregados.acoes')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {empregados?.map((empregado: Empregado) => (
                      <TableRow key={empregado.id}>
                        <TableCell>{empregado.nomeCompleto}</TableCell>
                        <TableCell>{empregado.cpf}</TableCell>
                        <TableCell>{empregado.cargo?.descricao}</TableCell>
                        <TableCell>{empregado.remuneracao}</TableCell>
                        <TableCell>{formatDate(empregado.dataAdmissao)}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Tooltip title={t('empregados.editar')}>
                              <IconButton
                                size="small"
                                onClick={() => handleEditar(empregado.id)}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={t('empregados.excluir')}>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleExcluir(empregado.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
} 
