/**
 * Arquivo: index.tsx
 * Caminho: src/pages/empregados/index.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-01-27
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
import { useMessages } from '@/hooks/useMessages';

export default function EmpregadosPage() {
  const { messages } = useMessages();
  const router = useRouter();
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
      title: 'Confirmar exclusão',
      message: 'Tem certeza que deseja excluir este empregado?',
      confirmText: 'Excluir',
      cancelText: 'Cancelar',
    });

    if (confirmed) {
      try {
        // Implemente a lógica para excluir o empregado
        showNotification({
          type: 'success',
          message: 'Empregado excluído com sucesso',
        });
      } catch (error) {
        showNotification({
          type: 'error',
          message: 'Erro ao excluir empregado',
        });
      }
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>{messages.empregados.loading}</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">{messages.empregados.error.loadEmployees}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" component="h1">
              Empregados
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleNovo}
            >
              Novo Empregado
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
                      <TableCell>Nome</TableCell>
                      <TableCell>CPF</TableCell>
                      <TableCell>{messages.empregados.table.cargo}</TableCell>
                      <TableCell>Remuneração</TableCell>
                      <TableCell>{messages.empregados.table.dataAdmissao}</TableCell>
                      <TableCell>{messages.empregados.table.acoes}</TableCell>
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
                            <Tooltip title="Editar">
                              <IconButton
                                size="small"
                                onClick={() => handleEditar(empregado.id)}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Excluir">
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
